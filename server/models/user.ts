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

userSchema.methods.sendFriendRequest = async function (userId: string) {
  if (this._id.equals(userId)) {
    throw new Error("Cannot send a friend request to yourself.");
  }
  if (!this.friendRequests.includes(userId)) {
    this.friendRequests.push(userId);
    await this.save();
  }
  const sender = await User.findById(userId);
  if (!sender) {
    throw new Error("sender user not found.");
  }
  if (!sender.friendRequests.includes(this._id)) {
    sender.friendRequests.push(this._id);
    await sender.save();
  }
  return true;
};

userSchema.methods.acceptFriendRequest = async function (userId: string) {
  if (!this.friendRequests.includes(userId)) {
    throw new Error("No such friend request found.");
  }
  this.friendRequests = this.friendRequests.filter(
    (id: string) => id.toString() !== userId
  );
  this.friends.push(userId);
  await this.save();
  const sender = await User.findById(userId);
  if (!sender) {
    throw new Error("Sender user not found.");
  }
  if (!sender.friends.includes(this._id.toString())) {
    sender.friends.push(this._id.toString());
    sender.friendRequests = sender.friendRequests.filter(
      (id: string) => id.toString() !== this._id.toString()
    );
  }
  await sender.save();
  return true;
};

userSchema.methods.rejectFriendRequest = async function (userId: string) {
  if (!this.friendRequests.includes(userId)) {
    throw new Error("No such friend request found.");
  }
  this.friendRequests = this.friendRequests.filter(
    (id: string) => id.toString() !== userId
  );
  await this.save();
  const sender = await User.findById(userId);
  if (!sender) {
    throw new Error("Sender user not found.");
  }
  if (!sender.friendRequests.includes(this._id.toString())) {
    throw new Error("User never sent a friend request.");
  }
  sender.friendRequests = sender.friendRequests.filter(
    (id: string) => id.toString() !== this._id.toString()
  );
  await sender.save();
  return true;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
const User = mongoose.model<UserType>("User", userSchema);

export default User;
