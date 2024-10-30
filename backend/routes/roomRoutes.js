const express = require("express");
const router = express.Router();
const {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

router.get("/", authenticate, getAllRooms);
router.post("/", authenticate, authorize("admin", "manager"), createRoom);
router.patch(
  "/:roomId",
  authenticate,
  authorize("admin", "manager"),
  updateRoom
);
router.delete("/:roomId", authenticate, authorize("admin"), deleteRoom);

module.exports = router;
