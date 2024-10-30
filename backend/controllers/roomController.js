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

exports.updateMeterReading = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { electricity, water } = req.body;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    room.updateMeterReadings({ electricity, water });
    await room.save();

    res.json({
      message: "Meter readings updated successfully",
      currentBill: room.currentBill,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateRoomStatus = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { status } = req.body;

    if (!["available", "occupied", "maintenace", "reserved"].includes(status)) {
      return res.status(400).json({ message: "Invalid room status" });
    }
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    room.status = status;
    await room.save();

    res.json({ message: "Room status updated successfully", room });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addAdditionalService = async (req, res) => {
  try {
    const { roomId } = req.params;
    const serviceData = req.body;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    room.additionalServices.push(serviceData);
    await room.save();

    res.json({
      message: "Additional service added successfully",
      room,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.updateAdditionalService = async (req, res) => {
  try {
    const { roomId, serviceId } = req.params;
    const updates = req.body;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const serviceIndex = room.additionalServices.findIndex(
      (service) => service._id.toString() === serviceId
    );

    if (serviceIndex === -1) {
      return res.status(404).json({ message: "Service not found" });
    }

    Object.assign(room.additionalServices[serviceIndex], updates);
    await room.save();

    res.json({
      message: "Additional service updated successfully",
      room,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addMaintenanceRecord = async (req, res) => {
  try {
    const { roomId } = req.params;
    const maintenanceData = req.body;

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    room.maintenanceHistory.push({
      ...maintenanceData,
      date: new Date(),
      performedBy: req.user.username,
    });

    room.lastMaintenanceDate = new Date();
    await room.save();

    res.json({
      message: "Maintenance record added successfully",
      room,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//get room bill
exports.getRoomBill = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    res.json({
      bill: room.currentBill,
    });
  } catch (error) {
    res.status(400).json({ mesasge: error.message });
  }
};
