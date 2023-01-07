const express = require("express");
const noteController = require("./../controllers/noteController");
const router = express.Router();

router.get("/getAllUserNotes/:userId", noteController.getAllUserNotes);
router.post("/createNote", noteController.createNote);
router.patch("/updateNote/:userId/:id", noteController.updateNote);
router.delete("/delete/:userId/:id", noteController.deleteNote);

// router.delete("/deleteAllUserNotes/:userId",noteController.deleteAllUserNote);
module.exports = router;
