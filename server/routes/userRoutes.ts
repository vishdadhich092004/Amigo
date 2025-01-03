import express from "express";
import { check } from "express-validator";
import { registerUser } from "../controllers/userController";
const router = express.Router();

router.post(
  "/register",
  [
    check("username", "Username is required")
      .isString()
      .notEmpty()
      .isLength({ min: 3, max: 16 }),
    check("password").notEmpty().isStrongPassword({
      minLength: 6,
      minNumbers: 1,
      minLowercase: 1,
      minSymbols: 1,
      minUppercase: 1,
    }),
  ],
  registerUser
);

export default router;
