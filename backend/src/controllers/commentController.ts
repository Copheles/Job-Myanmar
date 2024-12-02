import Comment from "../models/Comment.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

import Job from "../models/Job.js";
import User from "../models/User.js";

import {
  checkPermissions,
  checkPostOwnerDeleteCmt,
} from "../utils/checkPermissions.js";
import { Request, Response } from "express";
import { io } from "../socket/socket.js";


const createComment = async (req: Request, res: Response) => {
  const { content, parentId, job: jobId } = req.body;

  console.log("reqBody: ", req.body);

  if (!content) {
    throw new BadRequestError("Please provide content for comment");
  }

  const user: any = await User.findById(req.user.userId);
  const count = await Comment.countDocuments();

  req.body.commentBy = req.user.userId;
  req.body.author = user.name;

  let comment;
  if (parentId) {
    console.log("parentId exists");
    const formatData = {
      content,
      parentId,
      commentBy: req.body.commentBy,
      author: req.body.author,
    };
    comment = await Comment.create(formatData);
    let parentCmt: any = await Comment.findByIdAndUpdate(parentId);
    console.log("comment: ", comment);
    parentCmt.replies.push(comment);
    await parentCmt.save();
  } else {
    console.log("parentId not exists");
    if (!jobId) {
      const isValidJob = await Job.findOne({
        _id: jobId,
      });
      if (!isValidJob) {
        throw new NotFoundError(`No job with id:${jobId}`);
      }
    }
    comment = await Comment.create(req.body);
  }

  const job: any = await Job.findOne({ _id: jobId }).populate("comments");
  console.log("job: ", job);
  if (job) {
    io.to(jobId).emit('comment create', { comments: job.comments, jobId });
  }

  res.status(StatusCodes.CREATED).json({
    comment,
    count,
  });
};

const getAllComments = async (req: Request, res: Response) => {
  const comments = await Comment.find({});

  res.status(StatusCodes.OK).json({
    comments,
    count: comments.length,
  });
};

const getSingleComment = async (req: Request, res: Response) => {
  const { id: commentId } = req.params;

  const comment = await Comment.findOne({
    _id: commentId,
  });

  if (!comment) {
    throw new NotFoundError(`No comment with id: ${commentId}`);
  }

  res.status(StatusCodes.OK).json({
    comment,
  });
};

const updateComment = async (req: Request, res: Response) => {
  const { id: commentId } = req.params;

  const { content, jobId } = req.body;

  const comment = await Comment.findOne({
    _id: commentId,
  });

  if (!comment) {
    throw new NotFoundError(`No comment with id: ${commentId}`);
  }
  checkPermissions(req.user, comment.commentBy);

  comment.content = content;

  await comment.save();

  const job: any = await Job.findById(jobId).populate("comments");

  if (job) {
    io.to(jobId).emit('comment update', { comments: job.comments, jobId });
  }

  res.status(StatusCodes.OK).json({
    comment,
  });
};

const deleteComment = async (req: Request, res: Response) => {
  const { id: commentId } = req.params;
  const { jobId } = req.body;

  const comment = await Comment.findOne({
    _id: commentId,
  });

  if (!comment) {
    throw new NotFoundError(`No reveiw with id: ${commentId}`);
  }

  if (comment.job) {
    const job: any = await Job.findById(comment.job);
    checkPostOwnerDeleteCmt(req.user, comment.commentBy, job.createdBy);
  }

  await comment.remove();

  const job: any = await Job.findById(jobId).populate("comments");

  if (job) {
    io.to(jobId).emit('comment delete', { comments: job.comments, jobId });
  }

  res.status(StatusCodes.OK).json({
    message: "Comment deleted!",
  });
};

export {
  createComment,
  deleteComment,
  updateComment,
  getSingleComment,
  getAllComments,
};
