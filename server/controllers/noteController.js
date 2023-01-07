const Note = require("../models/noteModel");

exports.getAllUserNotes = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const userNote = await Note.find({ userId });
    res.status(200).json({
      status: "success",
      result: userNote.length,
      data: userNote,
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createNote = async (req, res, next) => {
  try {
    const newNote = await Note.create({
      userId: req.body.userId,
      title: req.body.title,
      description: req.body.description,
    });
    res.status(201).json({
      status: "success",
      data: {
        note: newNote,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};
exports.updateNote = async (req, res, next) => {
  try {
    // const noteId = req.params.id;
    // const updateNote = await Note.find({ userId });
    req.body.createdAt = Date.now();
    const updateNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      status: "success",
      data: {
        note: updateNote,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteAllUserNote = async (userId) => {
  try {
    await Note.deleteMany({ userId });
    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};
