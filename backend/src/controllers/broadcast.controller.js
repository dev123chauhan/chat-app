import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { io } from "../lib/socket.js";

export const sendBroadcast = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderId = req.user._id;

    if (!text && !image) {
      return res.status(400).json({ message: "Message content is required" });
    }

    let imageUrl = null;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId: null, 
      isBroadcast: true,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    io.emit("broadcastMessage", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendBroadcast:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBroadcastMessages = async (req, res) => {
  try {
    const messages = await Message.find({ isBroadcast: true })
      .populate("senderId", "fullName profilePic")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getBroadcastMessages:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};