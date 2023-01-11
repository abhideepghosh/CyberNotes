const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");
const router = express.Router();

// Comment Out Before Deploying
router.get("/", userController.getAllUsers);

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.delete(
  "/deleteUser/:id",
  authController.protect,
  userController.deleteUser
);

module.exports = router;
