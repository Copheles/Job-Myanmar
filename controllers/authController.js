import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import { checkPermissions } from "../utils/checkPermissions.js";

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new BadRequestError("Email already in use");
  }
  const user = await User.create({ name, email, password });

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      name: user.name,
      location: user.location,
    },
    token,
    location: user.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ email }).select("+password");
  console.log(user);

  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Invalid Credentials");
  }
  const token = user.createJWT();
  user.password = undefined;

  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const updateUser = async (req, res) => {
  const { email, name, location} = req.body;
  if(!email || !name  || !location ){
    throw new BadRequestError('Please provide all values')
  }

  const user = await User.findOne({ _id : req.user.userId})

  user.email = email
  user.name = name
  user.location = location


  await user.save()

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const deleteUser = async (req, res) => {
  const user = await User.findOne({ _id : req.user.userId})

  checkPermissions(req.user, user._id)

  await user.remove()
  res.status(StatusCodes.OK).json({ message: "Successfully deleted"});
};

export { register, login, updateUser, deleteUser };
