const Room = require("../models/roomModel");

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createRoom = async (req, res) => {
  try {
    const { roomNumber, isAvailable, meterReading, additionalServices } =
      req.body;
    const room = new Room({
      roomNumber,
      isAvailable,
      meterReading,
      additionalServices,
    });
    await room.save();
    res.status(201).json({ message: "Room created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const updates = req.body;
    const room = await Room.findByIdAndUpdate(roomId, updates, { new: true });
    if (!room) {
      return res
        .status(404)
        .json({ message: `Room ${updates.roomNumber} not found` });
    }
    res.json(room);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findByIdAndDelete(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json({ message: "Room deleted successfully", room });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
