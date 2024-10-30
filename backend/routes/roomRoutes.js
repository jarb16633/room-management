const express = require("express");
const router = express.Router();
const {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  restoreRoom,
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
router.post("/:roomId/restore", authenticate, authorize("admin"), restoreRoom);
router.post(
  "/:roomId/meter-reading",
  authenticate,
  authorize("admin", "manager"),
  roomController.updateMeterReading
);

router.patch(
  "/:roomId/status",
  authenticate,
  authorize("admin", "manager"),
  roomController.updateRoomStatus
);

router.post(
  "/:roomId/services",
  authenticate,
  authorize("admin", "manager"),
  roomController.addAdditionalService
);

router.patch(
  "/:roomId/services/:serviceId",
  authenticate,
  authorize("admin", "manager"),
  roomController.updateAdditionalService
);

router.post(
  "/:roomId/maintenance",
  authenticate,
  authorize("admin", "manager"),
  roomController.addMaintenanceRecord
);

router.get("/:roomId/bill", authenticate, roomController.getRoomBill);
module.exports = router;
