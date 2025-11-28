
import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { sendBroadcast, getBroadcastMessages } from "../controllers/broadcast.controller.js";

const router = express.Router();

router.get("/", protectRoute, getBroadcastMessages);
router.post("/send", protectRoute, sendBroadcast);

export default router;