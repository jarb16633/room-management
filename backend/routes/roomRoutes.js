const express = require("express");
const router = express.Router();
const {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  restoreRoom,
  updateMeterReading,
  updateRoomStatus,
  addAdditionalService,
  updateAdditionalService,
  addMaintenanceRecord,
  getRoomBill,
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
  updateMeterReading
);

router.patch(
  "/:roomId/status",
  authenticate,
  authorize("admin", "manager"),
  updateRoomStatus
);

router.post(
  "/:roomId/services",
  authenticate,
  authorize("admin", "manager"),
  addAdditionalService
);

router.patch(
  "/:roomId/services/:serviceId",
  authenticate,
  authorize("admin", "manager"),
  updateAdditionalService
);

router.post(
  "/:roomId/maintenance",
  authenticate,
  authorize("admin", "manager"),
  addMaintenanceRecord
);

router.get("/:roomId/bill", authenticate, getRoomBill);
module.exports = router;
