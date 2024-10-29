import mongoose, { Document, Model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  lastName?: string;
  location?: string;
  createdAt: Date,
  updatedAt: Date,
  createJWT: () => string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

UserSchema.pre<IUser>("save", async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));

  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.pre<IUser>("remove", async function (next) {
  const deleteRelatedJobs = await this.$model("Job").deleteMany({
    createdBy: this._id,
  });

  const deleteRelatedComments = await this.$model("Comment").deleteMany({
    commentBy: this._id,
  });
  Promise.all([deleteRelatedJobs, deleteRelatedComments]);
  next();
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  console.log(this.password);
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
