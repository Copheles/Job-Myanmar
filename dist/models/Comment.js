var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
CommentSchema.statics.calculateNumOfCmt = function (jobId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const results = yield this.aggregate([
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
            yield mongoose.model("Job").findOneAndUpdate({ _id: jobId }, { numOfComments: ((_a = results[0]) === null || _a === void 0 ? void 0 : _a.numOfComments) || 0 });
        }
        catch (error) {
            console.log(error);
        }
    });
};
// Middleware to populate replies
CommentSchema.pre("findOne", Populate("replies"));
CommentSchema.pre("find", Populate("replies"));
// Middleware to remove comments and their children
CommentSchema.pre("remove", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = this;
        const children = yield this.constructor.find({
            parentId: comment._id,
        });
        // Delete all child comments recursively
        const deleteChildren = (children) => __awaiter(this, void 0, void 0, function* () {
            for (let child of children) {
                const grandChildren = yield this.constructor.find({
                    parentId: child._id,
                });
                if (grandChildren.length) {
                    yield deleteChildren(grandChildren);
                }
                yield this.constructor.findByIdAndDelete(child._id);
            }
        });
        yield deleteChildren(children);
        next();
    });
});
// Middleware to limit the number of comments
CommentSchema.pre("validate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const count = yield this.constructor.countDocuments();
        if (count > 50) {
            yield this.constructor.deleteMany({});
        }
        next();
    });
});
// Post save hook to recalculate comment numbers
CommentSchema.post("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.constructor.calculateNumOfCmt(this.job);
    });
});
// Post remove hook to recalculate comment numbers
CommentSchema.post("remove", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.constructor.calculateNumOfCmt(this.job);
    });
});
// Export the Comment model
const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
