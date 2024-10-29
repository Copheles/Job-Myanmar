var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Comment from "../models/Comment.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import Job from "../models/Job.js";
import User from "../models/User.js";
import { checkPermissions, checkPostOwnerDeleteCmt, } from "../utils/checkPermissions.js";
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, parentId, job: jobId } = req.body;
    if (!content) {
        throw new BadRequestError("Please provide content for comment");
    }
    const user = yield User.findById(req.user.userId);
    const count = yield Comment.countDocuments();
    req.body.commentBy = req.user.userId;
    req.body.author = user.name;
    let comment;
    if (parentId) {
        comment = yield Comment.create(req.body);
        let parentCmt = yield Comment.findByIdAndUpdate(parentId);
        parentCmt.replies.push(comment);
        yield parentCmt.save();
    }
    else {
        if (!jobId) {
            const isValidJob = yield Job.findOne({
                _id: jobId,
            });
            if (!isValidJob) {
                throw new NotFoundError(`No job with id:${jobId}`);
            }
        }
        comment = yield Comment.create(req.body);
    }
    res.status(StatusCodes.CREATED).json({
        comment,
        count,
    });
});
const getAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield Comment.find({});
    res.status(StatusCodes.OK).json({
        comments,
        count: comments.length,
    });
});
const getSingleComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: commentId } = req.params;
    const comment = yield Comment.findOne({
        _id: commentId,
    });
    if (!comment) {
        throw new NotFoundError(`No comment with id: ${commentId}`);
    }
    res.status(StatusCodes.OK).json({
        comment,
    });
});
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: commentId } = req.params;
    const { content } = req.body;
    const comment = yield Comment.findOne({
        _id: commentId,
    });
    if (!comment) {
        throw new NotFoundError(`No comment with id: ${commentId}`);
    }
    checkPermissions(req.user, comment.commentBy);
    comment.content = content;
    yield comment.save();
    res.status(StatusCodes.OK).json({
        comment,
    });
});
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: commentId } = req.params;
    const comment = yield Comment.findOne({
        _id: commentId,
    });
    if (!comment) {
        throw new NotFoundError(`No reveiw with id: ${commentId}`);
    }
    if (comment.job) {
        const job = yield Job.findById(comment.job);
        checkPostOwnerDeleteCmt(req.user, comment.commentBy, job.createdBy);
    }
    yield comment.remove();
    res.status(StatusCodes.OK).json({
        message: "Comment deleted!",
    });
});
export { createComment, deleteComment, updateComment, getSingleComment, getAllComments, };
