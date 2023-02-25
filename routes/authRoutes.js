import express from "express";
const router = express.Router()

import { register, login, updateUser, deleteUser } from "../controllers/authController.js";
import authenticatedUser from '../middleware/auth.js'

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/updateUser').patch(authenticatedUser, updateUser)
router.route('/deleteUser').delete(authenticatedUser, deleteUser)

export default router