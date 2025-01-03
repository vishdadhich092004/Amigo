import mongoose, { Schema } from "mongoose";
import { UserType } from "../shared/types";
import userProfileSVGs from "../utils/userProfileSVG";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: {
    type: String,
    required: true,
  },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  friendRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
  profileAvatar: {
    type: String,
    default: userProfileSVGs[0],
  },
});

userSchema.methods.setRandomAvatar = function () {
  const randomIndex = Math.floor(Math.random() * userProfileSVGs.length);
  this.profileAvatar = userProfileSVGs[randomIndex];
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
const User = mongoose.model<UserType>("User", userSchema);

export default User;
