const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User_Id is Required"],
  },
  title: {
    type: String,
    required: [true, "title is Required"],
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
