import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { UserType } from "../shared/types";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
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

export const loginUser = async (
  req: Request,
  res: Response
): Promise<UserType | any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  try {
    const { username, password } = req.body;

    // check if the user exists
    const findUser = await User.findOne({
      username: username,
    });
    // if not return invalid credentials
    if (!findUser) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    // check if password matches
    const isMatch = bcrypt.compare(password, findUser.password);
    // if not return invalid credentials
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    // if user exists and password mathces, create a session for that user using jwt and cookie
    const token = jwt.sign({ userId: findUser._id }, jwtKey, {
      expiresIn: "1d",
    });
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // return the user
    return res.status(200).json(findUser);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Error in login", e });
  }
};

export const validateToken = async (
  req: Request,
  res: Response
): Promise<UserType | any> => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return res.status(404).json({ message: "User Id is missing" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({ user });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Error Validating Token", e });
  }
};

export const fetchUsers = async (
  req: Request,
  res: Response
): Promise<UserType[] | any> => {
  try {
    const user = req.user;
    const users = await User.find({}).lean();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users Found" });
    }
    // exclude the current user
    if (user.userId) {
      const filteredUsers = users.filter(
        (u) => u._id.toString() !== user.userId.toString()
      );
      return res.status(200).json(filteredUsers);
    }
    return res.status(200).json(users);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to fetch Users" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};
