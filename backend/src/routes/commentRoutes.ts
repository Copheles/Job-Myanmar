import express from 'express'
const router = express.Router();
import authenticatedUser from '../middleware/auth.js'

import {
  createComment,
  getAllComments,
  getSingleComment,
  updateComment,
  deleteComment
} from '../controllers/commentController.js'

router.route('/').post(authenticatedUser, createComment).get(getAllComments)

router.route('/:id').get(authenticatedUser, getSingleComment).patch(authenticatedUser, updateComment).delete(authenticatedUser, deleteComment)

export default router