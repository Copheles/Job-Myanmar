var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { checkPermissions } from "../utils/checkPermissions.js";
import BadRequestError from "../errors/bad-request.js";
import UnAuthenticatedError from "../errors/unauthenticated.js";
import NotFoundError from "../errors/not-found.js";
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new BadRequestError("Please provide all values");
    }
    const isUserExist = yield User.findOne({
        email,
    });
    if (isUserExist) {
        throw new BadRequestError("Email already in use");
    }
    const user = yield User.create({
        name,
        email,
        password,
    });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
        user: {
            _id: user._id,
            email: user.email,
            lastName: user.lastName,
            name: user.name,
            location: user.location,
        },
        token,
        location: user.location,
    });
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError("Please provide all values");
    }
    const user = yield User.findOne({
        email,
    }).select("+password");
    console.log(user);
    if (!user) {
        throw new UnAuthenticatedError("Invalid Credentials");
    }
    const isPasswordCorrect = yield user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new BadRequestError("Invalid Credentials");
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
        user,
        token,
        location: user.location,
    });
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, location } = req.body;
    if (!email || !name || !location) {
        throw new BadRequestError("Please provide all values");
    }
    const user = yield User.findOne({
        _id: req.user.userId,
    }).select("-password");
    if (!user) {
        throw new NotFoundError(`User with id:${req.user.userId}`);
    }
    user.email = email;
    user.name = name;
    user.location = location;
    yield user.save();
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
        user,
        token,
        location: user.location,
    });
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({
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
});
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = req.body;
    console.log(req.body);
    if (!oldPassword || !newPassword) {
        throw new BadRequestError("Please provide all fields");
    }
    const user = yield User.findOne({
        _id: req.user.userId,
    });
    if (!user) {
        throw new NotFoundError(`User with id:${req.user.userId}`);
    }
    const isPasswordCorrect = yield user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
        throw new UnAuthenticatedError("Invalid crendentials");
    }
    user.password = newPassword;
    yield user.save();
    res.status(StatusCodes.OK).json({
        message: "Success! Password Updated.",
    });
});
export { register, login, updateUser, deleteUser, changePassword };
