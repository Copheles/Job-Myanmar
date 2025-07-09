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
        enum: ["interview", "declined", "pending", "closed"],
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
async function deleteAllComments(next) {
    await this.$model("Comment").deleteMany({ job: this._id });
    next();
}
// Middleware to delete replies related to each comment for the job
async function deleteReplies(next) {
    const comments = await this.$model("Comment").find({ job: this._id });
    await Promise.all(comments.map((comment) => comment.remove()));
    next();
}
// Pre middleware for populating 'createdBy' field
JobSchema.pre("find", Populate("createdBy"));
// Apply delete middleware before job removal
JobSchema.pre("deleteOne", { document: true, query: false }, deleteReplies);
const JobModel = mongoose.model("Job", JobSchema);
export default JobModel;
