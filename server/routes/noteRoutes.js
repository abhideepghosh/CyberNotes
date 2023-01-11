const express = require("express");
const noteController = require("./../controllers/noteController");
const authController = require("./../controllers/authController");
const router = express.Router();

router.get(
  "/getAllUserNotes/:userId",
  authController.protect,
  noteController.getAllUserNotes
);
router.post("/createNote", authController.protect, noteController.createNote);
router.patch(
  "/updateNote/:userId/:id",
  authController.protect,
  noteController.updateNote
);
router.delete(
  "/delete/:userId/:id",
  authController.protect,
  noteController.deleteNote
);

// router.delete("/deleteAllUserNotes/:userId",noteController.deleteAllUserNote);
module.exports = router;
