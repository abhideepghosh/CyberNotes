const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");
const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.delete("/deleteUser/:id", userController.deleteUser);

// route.delete("/discard", authController.deleteUser);

module.exports = router;
