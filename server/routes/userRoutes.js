const express = require("express");
const authController = require("./../controllers/authController");
const router = express.Router();

router.get("/", authController.getAllUsers);
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// route.delete("/discard", authController.deleteUser);

module.exports = router;
