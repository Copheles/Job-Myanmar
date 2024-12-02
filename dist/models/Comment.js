import mongoose, { Schema } from "mongoose";
import { Populate } from "../utils/autopopulate.js";
// Define the Comment Schema with types
const CommentSchema = new Schema({
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
    },
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
}, {
    timestamps: true,
});
// Static method to calculate the number of comments
CommentSchema.statics.calculateNumOfCmt = async function (jobId) {
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
        await mongoose.model("Job").findOneAndUpdate({ _id: jobId }, { numOfComments: results[0]?.numOfComments || 0 });
    }
    catch (error) {
        console.log(error);
    }
};
// Middleware to populate replies
CommentSchema.pre("findOne", Populate("replies"));
CommentSchema.pre("find", Populate("replies"));
// Middleware to remove comments and their children
CommentSchema.pre("remove", async function (next) {
    const comment = this;
    const children = await this.constructor.find({
        parentId: comment._id,
    });
    // Delete all child comments recursively
    const deleteChildren = async (children) => {
        for (let child of children) {
            const grandChildren = await this.constructor.find({
                parentId: child._id,
            });
            if (grandChildren.length) {
                await deleteChildren(grandChildren);
            }
            await this.constructor.findByIdAndDelete(child._id);
        }
    };
    await deleteChildren(children);
    next();
});
// Middleware to limit the number of comments
CommentSchema.pre("validate", async function (next) {
    const count = await this.constructor.countDocuments();
    if (count > 50) {
        await this.constructor.deleteMany({});
    }
    next();
});
// Post save hook to recalculate comment numbers
CommentSchema.post("save", async function () {
    await this.constructor.calculateNumOfCmt(this.job);
});
// Post remove hook to recalculate comment numbers
CommentSchema.post("remove", async function () {
    await this.constructor.calculateNumOfCmt(this.job);
});
// Export the Comment model
const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
