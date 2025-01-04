import express from "express";
import {
  acceptFriendRequest,
  getIncomingFriendRequests,
  rejectFriendRequest,
  sendFriendRequest,
} from "../controllers/friendRequestController";
import { verifyToken } from "../middlewares/authMiddleware";
const router = express.Router();

router.get("/incoming", verifyToken, getIncomingFriendRequests);
router.post("/send", verifyToken, sendFriendRequest);
router.post("/accept", verifyToken, acceptFriendRequest);
router.post("/reject", verifyToken, rejectFriendRequest);

export default router;
