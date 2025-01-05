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
  name: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  interests: [
    {
      type: String,
    },
  ],
  bio: {
    type: String,
    required: false,
  },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  incomingFriendRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
  sentFriendRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
  profileAvatar: {
    type: String,
    default: userProfileSVGs[0],
  },
});

userSchema.methods.setRandomAvatar = function () {
  const randomIndex = Math.floor(Math.random() * userProfileSVGs.length);
  this.profileAvatar = userProfileSVGs[randomIndex];
};

userSchema.methods.sendFriendRequest = async function (receiverId: string) {
  if (this._id.equals(receiverId)) {
    throw new Error("Cannot send a friend request to yourself.");
  }

  // Find the receiving user
  const receiver = await User.findById(receiverId);
  if (!receiver) {
    throw new Error("Recipient user not found.");
  }

  // Check if they're already friends
  if (this.friends.includes(receiverId)) {
    throw new Error("You are already friends with this user.");
  }

  // Check if request already exists
  if (receiver.incomingFriendRequests.includes(this._id)) {
    throw new Error("Friend request already sent.");
  }

  // Add to receiver's incoming requests
  receiver.incomingFriendRequests.push(this._id);
  await receiver.save();

  // Add to sender's sent requests
  this.sentFriendRequests.push(receiverId);
  await this.save();

  return true;
};

userSchema.methods.acceptFriendRequest = async function (senderId: string) {
  // Check if request exists
  if (!this.incomingFriendRequests.includes(senderId)) {
    throw new Error("No such friend request found.");
  }

  // Find the sender
  const sender = await User.findById(senderId);
  if (!sender) {
    throw new Error("Sender user not found.");
  }

  // Remove request from both users
  this.incomingFriendRequests = this.incomingFriendRequests.filter(
    (id: string) => id.toString() !== senderId
  );
  sender.sentFriendRequests = sender.sentFriendRequests.filter(
    (id) => id.toString() !== this._id.toString()
  );

  // Add each user to the other's friends array
  this.friends.push(senderId);
  sender.friends.push(this._id);

  // Save both users
  await Promise.all([this.save(), sender.save()]);
  return true;
};

userSchema.methods.rejectFriendRequest = async function (senderId: string) {
  // Check if request exists
  if (!this.incomingFriendRequests.includes(senderId)) {
    throw new Error("No such friend request found.");
  }

  // Find the sender
  const sender = await User.findById(senderId);
  if (!sender) {
    throw new Error("Sender user not found.");
  }

  // Remove request from both users
  this.incomingFriendRequests = this.incomingFriendRequests.filter(
    (id: string) => id.toString() !== senderId
  );
  sender.sentFriendRequests = sender.sentFriendRequests.filter(
    (id) => id.toString() !== this._id.toString()
  );

  // Save both users
  await Promise.all([this.save(), sender.save()]);
  return true;
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
