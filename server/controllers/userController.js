const User = require("../models/userModel");
// const Note = require("../models/noteModel");
const noteController = require("./noteController");

exports.deleteUser = async (req, res, next) => {
  // try {
  //   // const notes = await Note.find({ userId: req.params.id });
  //   // console.log(notes);
  //   // if (notes.length > 0)
  //   const userId = req.params.id;
  //   await noteController.deleteAllUserNote(userId)
  //   await User.findByIdAndDelete(userId)
  //   console.log("hi");
  //   res.status(200).json({
  //     status: "success",
  //     message: "User Account Successully Deleted",
  //   });
  // } catch (err) {
  //   res.status(401).json({
  //     status: "fail",
  //     message: err,
  //   });
  // }
  try {
    const userId = req.params.id;
    await noteController.deleteAllUserNote(userId);
    await User.findByIdAndDelete(userId);
    console.log(result);
    res.status(200).json({
      status: "success",
      message: "User Account Successully Deleted",
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const userData = await User.find();
    res.status(200).json({
      status: "success",
      data: userData,
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};
