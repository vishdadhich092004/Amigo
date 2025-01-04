import { Request, Response } from "express";
import User from "../models/user";
import { UserType } from "../shared/types";

export const searchUsers = async (
  req: Request,
  res: Response
): Promise<UserType | any> => {
  try {
    const { username } = req.query;
    if (!username || typeof username !== "string") {
      return res.status(400).json({ message: "Invalid or missing Username" });
    }
    const users = await User.find(
      {
        username: { $regex: username, $options: "i" },
      },
      "-password"
    );
    if (!users) {
      return res
        .status(404)
        .json({ message: "No User Exits with such username" });
    }
    return res.status(200).json(users);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Error Searching for users", e });
  }
};
