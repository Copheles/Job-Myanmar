import Comment from "../models/Comment.js"
import {
  StatusCodes
} from "http-status-codes"
import {
  BadRequestError,
  NotFoundError,
} from "../errors/index.js";

import Job from "../models/Job.js";
import User from '../models/User.js'
import {
  checkPermissions,
  checkPostOwnerDeleteCmt
} from "../utils/checkPermissions.js";

const createComment = async (req, res) => {
  const {
    content,
    parentId,
    job: jobId
  } = req.body;

  if (!content) {
    throw new BadRequestError('Please provide content for comment')
  }
  const user = await User.findById(req.user.userId)
  const count = await Comment.countDocuments();
  req.body.commentBy = req.user.userId;
  req.body.author = user.name
  let comment;
  if (parentId) {
    comment = await Comment.create(req.body);
    let parentCmt = await Comment.findByIdAndUpdate(parentId);
    parentCmt.replies.push(comment)
    await parentCmt.save()
  } else {
    if (!jobId) {
      const isValidJob = await Job.findOne({
        _id: jobId
      })
      if (!isValidJob) {
        throw new NotFoundError(`No job with id:${jobId}`)
      }
    }
    comment = await Comment.create(req.body)

  }
  res.status(StatusCodes.CREATED).json({
    comment,
    count
  })
}

const getAllComments = async (req, res) => {
  const comments = await Comment.find({})

  res.status(StatusCodes.OK).json({
    comments,
    count: comments.length
  })
}

const getSingleComment = async (req, res) => {
  const {
    id: commentId
  } = req.params;

  const comment = await Comment.findOne({
    _id: commentId
  })

  if (!comment) {
    throw new NotFoundError(`No comment with id: ${commentId}`)
  }

  res.status(StatusCodes.OK).json({
    comment
  })
}

const updateComment = async (req, res) => {
  const {
    id: commentId
  } = req.params;

  const {
    content
  } = req.body;

  const comment = await Comment.findOne({
    _id: commentId
  })

  if (!comment) {
    throw new NotFoundError(`No comment with id: ${commentId}`)
  }
  checkPermissions(req.user, comment.commentBy)

  comment.content = content;

  await comment.save();

  res.status(StatusCodes.OK).json({
    comment
  })
}

const deleteComment = async (req, res) => {
  const {
    id: commentId
  } = req.params;

  const comment = await Comment.findOne({
    _id: commentId
  })

  if (!comment) {
    throw new NotFoundError(`No reveiw with id: ${commentId}`)
  }

  if (comment.job) {
    const job = await Job.findById(comment.job);
    checkPostOwnerDeleteCmt(req.user, comment.commentBy, job.createdBy)
  }

  await comment.remove();

  res.status(StatusCodes.OK).json({
    message: "Comment deleted!"
  })

}

export {
  createComment,
  deleteComment,
  updateComment,
  getSingleComment,
  getAllComments
}