import mongoose, { Document, Schema } from "mongoose";
import { Populate } from "../utils/autopopulate.js";

// Define an interface for the Comment Document
interface IComment extends Document {
  content: string;
  commentBy: mongoose.Types.ObjectId;
  parentId?: mongoose.Types.ObjectId;
  author?: string;
  job: mongoose.Types.ObjectId;
  replies: mongoose.Types.ObjectId[];
}

// Define an interface for the Comment Model including static methods
interface ICommentModel extends mongoose.Model<IComment> {
  calculateNumOfCmt(jobId: mongoose.Types.ObjectId): Promise<void>;
}

// Define the Comment Schema with types
const CommentSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
      required: [true, "Please provide comment content"],
    },
    commentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    author: {
      type: String,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Static method to calculate the number of comments
CommentSchema.statics.calculateNumOfCmt = async function (
  this: mongoose.Model<ICommentModel>,
  jobId: mongoose.Types.ObjectId
): Promise<void> {
  const results = await this.aggregate([
    {
      $match: {
        job: jobId,
      },
    },
    {
      $group: {
        _id: null,
        numOfComments: {
          $sum: 1,
        },
      },
    },
  ]);

  try {
    await mongoose.model("Job").findOneAndUpdate(
      { _id: jobId },
      { numOfComments: results[0]?.numOfComments || 0 }
    );
  } catch (error) {
    console.log(error);
  }
};

// Middleware to populate replies
CommentSchema.pre<IComment>("findOne", Populate("replies"));
CommentSchema.pre<IComment>("find", Populate("replies"));

// Middleware to remove comments and their children
CommentSchema.pre<IComment>(
  "remove",
  async function (this: IComment, next) {
    const comment = this;
    const children = await (this.constructor as ICommentModel).find({
      parentId: comment._id,
    });

    // Delete all child comments recursively
    const deleteChildren = async (children: IComment[]) => {
      for (let child of children) {
        const grandChildren = await (this.constructor as ICommentModel).find({
          parentId: child._id,
        });
        if (grandChildren.length) {
          await deleteChildren(grandChildren);
        }
        await (this.constructor as ICommentModel).findByIdAndDelete(child._id);
      }
    };

    await deleteChildren(children);
    next();
  }
);

// Middleware to limit the number of comments
CommentSchema.pre(
  "validate",
  async function (this: IComment, next) {
    const count = await (this.constructor as ICommentModel).countDocuments();
    if (count > 50) {
      await (this.constructor as ICommentModel).deleteMany({});
    }
    next();
  }
);

// Post save hook to recalculate comment numbers
CommentSchema.post("save", async function (this: IComment) {
  await (this.constructor as ICommentModel).calculateNumOfCmt(this.job);
});

// Post remove hook to recalculate comment numbers
CommentSchema.post("remove", async function (this: IComment) {
  await (this.constructor as ICommentModel).calculateNumOfCmt(this.job);
});

// Export the Comment model
const Comment = mongoose.model<IComment, ICommentModel>(
  "Comment",
  CommentSchema
);
export default Comment;
