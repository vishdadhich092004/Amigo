import { Request, Response } from "express";
import User from "../models/user";
export const sendFriendRequest = async (
  req: Request,
  res: Response
): Promise<string | any> => {
  try {
    const { userId } = req.body;
    const currentUser = req.user;
    if (!currentUser) {
      return res.status(400).json({ message: "User Not Logged in" });
    }
    const user = await User.findById(currentUser.userId);
    if (!user) {
      return res.status(404).json({ message: "No User Found" });
    }
    user.sendFriendRequest(userId);
    return res
      .status(200)
      .json({ message: "Friend request sent successfully." });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Error Sending Friend Request", e });
  }
};

export const acceptFriendRequest = async (
  req: Request,
  res: Response
): Promise<string | any> => {
  try {
    const { userId } = req.body;
    const currentUser = req.user;
    if (!currentUser) {
      return res.status(400).json({ message: "User Not Logged in" });
    }
    const user = await User.findById(currentUser.userId);
    if (!user) {
      return res.status(404).json({ message: "No User Found" });
    }
    user.acceptFriendRequest(userId);
    return res
      .status(200)
      .json({ message: "Friend request accepted successfully." });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Error Accepting Friend Request", e });
  }
};
export const rejectFriendRequest = async (
  req: Request,
  res: Response
): Promise<string | any> => {
  try {
    const { userId } = req.body;
    const currentUser = req.user;
    if (!currentUser) {
      return res.status(400).json({ message: "User Not Logged in" });
    }
    const user = await User.findById(currentUser.userId);
    if (!user) {
      return res.status(404).json({ message: "No User Found" });
    }
    user.rejectFriendRequest(userId);
    return res
      .status(200)
      .json({ message: "Friend request rejected successfully." });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Error Rejecting Friend Request", e });
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
      "friendRequests",
      "-password"
    );
    if (!user) {
      return res.status(404).json({ message: "No User Found" });
    }
    return res.status(200).json({ friendRequests: user.friendRequests });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Error Rejecting Friend Request", e });
  }
};
