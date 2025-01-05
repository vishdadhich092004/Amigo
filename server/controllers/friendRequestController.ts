import { Request, Response } from "express";
import User from "../models/user";

export const sendFriendRequest = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId: receiverId } = req.body;
    const currentUser = req.user;

    if (!currentUser) {
      return res.status(401).json({ message: "User not logged in" });
    }

    if (!receiverId) {
      return res.status(400).json({ message: "Receiver ID is required" });
    }

    const sender = await User.findById(currentUser.userId);
    if (!sender) {
      return res.status(404).json({ message: "Sender not found" });
    }

    await sender.sendFriendRequest(receiverId);

    return res.status(200).json({
      message: "Friend request sent successfully",
    });
  } catch (e) {
    console.error("Friend request error:", e);
    return res.status(500).json({
      error: "Error sending friend request",
      message: e instanceof Error ? e.message : "Unknown error occurred",
    });
  }
};

export const acceptFriendRequest = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId: senderId } = req.body;
    const currentUser = req.user;

    if (!currentUser) {
      return res.status(401).json({ message: "User not logged in" });
    }

    if (!senderId) {
      return res.status(400).json({ message: "Sender ID is required" });
    }

    const receiver = await User.findById(currentUser.userId);
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    await receiver.acceptFriendRequest(senderId);

    return res.status(200).json({
      message: "Friend request accepted successfully",
    });
  } catch (e) {
    console.error("Accept request error:", e);
    return res.status(500).json({
      error: "Error accepting friend request",
      message: e instanceof Error ? e.message : "Unknown error occurred",
    });
  }
};

export const rejectFriendRequest = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId: senderId } = req.body;
    const currentUser = req.user;

    if (!currentUser) {
      return res.status(401).json({ message: "User not logged in" });
    }

    if (!senderId) {
      return res.status(400).json({ message: "Sender ID is required" });
    }

    const receiver = await User.findById(currentUser.userId);
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    await receiver.rejectFriendRequest(senderId);

    return res.status(200).json({
      message: "Friend request rejected successfully",
    });
  } catch (e) {
    console.error("Reject request error:", e);
    return res.status(500).json({
      error: "Error rejecting friend request",
      message: e instanceof Error ? e.message : "Unknown error occurred",
    });
  }
};

export const getIncomingFriendRequests = async (
  req: Request,
  res: Response
): Promise<[] | any> => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      return res.status(400).json({ message: "User Not Logged in" });
    }
    const user = await User.findById(currentUser.userId).populate(
      "incomingFriendRequests",
      "-password"
    );
    if (!user) {
      return res.status(404).json({ message: "No User Found" });
    }
    return res.status(200).json(user.incomingFriendRequests);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Error Rejecting Friend Request", e });
  }
};
