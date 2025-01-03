import { Request, Response } from "express";
import User from "../models/user";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { UserType } from "../shared/types";

const jwtKey = (process.env.JWT_SECRET_KEY as string) || "";
export const registerUser = async (
  req: Request,
  res: Response
): Promise<UserType | any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  try {
    const { username, password } = req.body;
    // check if user already exits with that username
    let user = await User.findOne({ username: username });
    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    // create a new user if not existing
    user = await User.create({
      username,
      password,
    });
    // set a random Avatar
    user.setRandomAvatar();
    // save the new user
    await user.save();
    // create a session for that user using jwt and cookie
    const token = jwt.sign(
      {
        userId: user._id,
      },
      jwtKey,
      { expiresIn: "1d" }
    );
    res.cookie("auth_token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(user);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Error Creating User", e });
  }
};
