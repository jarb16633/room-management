const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getAllUsers,
  getUsersByID,
  approveUser,
  changeUserRole,
} = require("../controllers/authController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/users", authenticate, authorize("admin", "manager"), getAllUsers);
router.get(
  "/user/:userId",
  authenticate,
  authorize("admin", "manager"),
  getUsersByID
);
router.patch(
  "/users/:userId/approve",
  authenticate,
  authorize("admin"),
  approveUser
);
router.patch(
  "/users/:userId/role",
  authenticate,
  authorize("admin"),
  changeUserRole
);

module.exports = router;
