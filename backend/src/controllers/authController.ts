import { Request, Response } from "express";
import User, { IUser } from "../models/User.js";
import { StatusCodes } from "http-status-codes";

import { checkPermissions } from "../utils/checkPermissions.js";
import BadRequestError from "../errors/bad-request.js";
import UnAuthenticatedError from "../errors/unauthenticated.js";
import NotFoundError from "../errors/not-found.js";
import { attacthCookieToResponse } from "../utils/jwt.js";

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const isUserExist = await User.findOne({
    email,
  });
  if (isUserExist) {
    throw new BadRequestError("Email already in use");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = user.createJWT();
  attacthCookieToResponse({ res, token });

  res.status(StatusCodes.CREATED).json({
    _id: user._id,
    email: user.email,
    name: user.name,
    location: user.location,
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({
    email,
  }).select("+password");
  console.log(user);

  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Invalid Credentials");
  }
  const token = user.createJWT();
  attacthCookieToResponse({ res, token });

  res.status(StatusCodes.OK).json({
    id: user._id,
    name: user.name,
    email: user.email,
    location: user.location,
  });
};

const getMe = async (req: Request, res: Response) => {
  const user = await User.findById(req.user.userId).select("-password");

  res.status(StatusCodes.OK).json({
    user,
  });
};

const updateUser = async (req: Request, res: Response) => {
  // remove this after
  if (req.user.userId.toString() === "63fdba3ee98cc7a4afd3e8d0") {
    throw new BadRequestError("You can't edit the job");
  }

  const { email, name, location } = req.body;
  if (!email || !name || !location) {
    throw new BadRequestError("Please provide all values");
  }

  const user: IUser | null = await User.findOne({
    _id: req.user.userId,
  }).select("-password");

  if (!user) {
    throw new NotFoundError(`User with id:${req.user.userId}`);
  }

  user.email = email;
  user.name = name;
  user.location = location;

  await user.save();

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    id: user._id,
    name: user.name,
    email: user.email,
    location: user.location,
  });
};

const deleteUser = async (req: Request, res: Response) => {
  // remove this after
  if (req.user.userId.toString() === "63fdba3ee98cc7a4afd3e8d0") {
    throw new BadRequestError("You can't delete the account");
  }
  const user: IUser | null = await User.findOne({
    _id: req.user.userId,
  });

  if (!user) {
    throw new NotFoundError(`User with id:${req.user.userId}`);
  }

  if (user._id.toString() === "63fdba3ee98cc7a4afd3e8d0") {
    throw new Error("cant delete");
  }

  checkPermissions(req.user, user._id);

  // await user.remove()
  res.status(StatusCodes.OK).json({
    message: "Successfully deleted",
  });
};

const changePassword = async (req: Request, res: Response) => {
  // remove this after
  if (req.user.userId.toString() === "63fdba3ee98cc7a4afd3e8d0") {
    throw new BadRequestError("You can't change the password");
  }

  const { oldPassword, newPassword } = req.body;
  console.log(req.body);

  if (!oldPassword || !newPassword) {
    throw new BadRequestError("Please provide all fields");
  }

  const user: IUser | null = await User.findOne({
    _id: req.user.userId,
  });

  if (!user) {
    throw new NotFoundError(`User with id:${req.user.userId}`);
  }

  const isPasswordCorrect = await user.comparePassword(oldPassword);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid crendentials");
  }

  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({
    message: "Success! Password Updated.",
  });
};

const logout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(StatusCodes.OK).json({
    message: "Logged out successfully",
  });
};

export {
  register,
  login,
  getMe,
  updateUser,
  deleteUser,
  changePassword,
  logout,
};
