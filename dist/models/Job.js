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
// Define the Job Schema with types
const JobSchema = new Schema({
    company: {
        type: String,
        required: [true, "Please provide company"],
        maxlength: 50,
    },
    position: {
        type: String,
        required: [true, "Please provide position"],
        maxlength: 100,
    },
    status: {
        type: String,
        enum: ["interview", "declined", "pending"],
        default: "pending",
    },
    jobType: {
        type: String,
        enum: ["full-time", "part-time", "remote", "internship"],
        default: "full-time",
    },
    jobLocation: {
        type: String,
        required: true,
    },
    jobDescription: {
        type: String,
    },
    aboutCompany: {
        type: String,
    },
    numOfComments: {
        type: Number,
        default: 0,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"],
    },
}, {
    timestamps: true,
});
// Virtual population of comments
JobSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "job",
    justOne: false,
});
// Middleware to delete all comments related to the job
function deleteAllComments(next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.$model("Comment").deleteMany({ job: this._id });
        next();
    });
}
// Middleware to delete replies related to each comment for the job
function deleteReplies(next) {
    return __awaiter(this, void 0, void 0, function* () {
        const comments = yield this.$model("Comment").find({ job: this._id });
        yield Promise.all(comments.map((comment) => comment.remove()));
        next();
    });
}
// Pre middleware for populating 'createdBy' field
JobSchema.pre("find", Populate("createdBy"));
// Apply delete middleware before job removal
JobSchema.pre("deleteOne", { document: true, query: false }, deleteReplies);
const JobModel = mongoose.model("Job", JobSchema);
export default JobModel;
