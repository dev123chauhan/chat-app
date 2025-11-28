import Room from "../models/room.model.js";
import Message from "../models/message.model.js";

export const createRoom = async (req, res) => {
  try {
    const { name, members } = req.body;

    const room = await Room.create({
      name,
      members: [...members, req.user._id],
      createdBy: req.user._id,
    });

    res.status(201).json(room);
  } catch (error) {
    console.log("Error in createRoom:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyRooms = async (req, res) => {
  try {
    const rooms = await Room.find({
      members: req.user._id,
    });

    res.status(200).json(rooms);
  } catch (error) {
    console.log("Error in getMyRooms:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getRoomMessages = async (req, res) => {
  try {
    const { roomId } = req.params;

    const messages = await Message.find({ roomId }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getRoomMessages:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

