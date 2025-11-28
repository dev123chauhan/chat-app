import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createRoom, getMyRooms, getRoomMessages } from "../controllers/room.controller.js";
import { sendRoomMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/", protectRoute, createRoom);
router.get("/", protectRoute, getMyRooms);
router.get("/:roomId", protectRoute, getRoomMessages);
router.post("/:roomId", protectRoute, sendRoomMessage);

export default router; 
