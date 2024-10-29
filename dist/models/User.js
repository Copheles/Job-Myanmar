var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        validate: {
            validator: validator.isEmail,
            message: "Please provide valid email",
        },
        unique: [true, "Email is already in use"],
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 6,
    },
    lastName: {
        type: String,
        maxlength: 20,
        trim: true,
        default: "lastName",
    },
    location: {
        type: String,
        trim: true,
        maxlength: 20,
        default: "Yangon",
    },
}, { timestamps: true });
UserSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(this.modifiedPaths());
        // console.log(this.isModified('name'));
        if (!this.isModified("password"))
            return;
        const salt = yield bcrypt.genSalt(10);
        this.password = yield bcrypt.hash(this.password, salt);
    });
});
UserSchema.pre("remove", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteRelatedJobs = yield this.$model("Job").deleteMany({
            createdBy: this._id,
        });
        const deleteRelatedComments = yield this.$model("Comment").deleteMany({
            commentBy: this._id,
        });
        Promise.all([deleteRelatedJobs, deleteRelatedComments]);
        next();
    });
});
UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
};
UserSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(this.password);
        const isMatch = yield bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    });
};
const User = mongoose.model("User", UserSchema);
export default User;
