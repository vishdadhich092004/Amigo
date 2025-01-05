import express from "express";
import { check } from "express-validator";
import {
  fetchUsers,
  loginUser,
  logout,
  registerUser,
  validateToken,
} from "../controllers/userController";
import { verifyToken } from "../middlewares/authMiddleware";
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

router.post(
  "/login",
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
  loginUser
);
router.get("/validate-token", verifyToken, validateToken);
router.get("/", verifyToken, fetchUsers);
router.post("/logout", logout);
export default router;
