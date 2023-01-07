const { promisify } = require("util");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  try {
    // console.log(req.body.name);

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const token = signToken(newUser._id);
    // const newUser = await User.create(req.body);
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect username or password",
      });
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect username or password",
      });
    }
    let token = signToken(user._id);
    res.status(201).json({
      status: "success",
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      res.status(401).json({
        status: "fail",
        message: "Something went wrong!",
      });
      return next();
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      res.status(401).json({
        status: "fail",
        message: "Something went wrong!",
      });
      return next();
    }
    req.user = freshUser;
    next();
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
    return next();
  }
};
// //-----------Trial--------------//
// exports.deleteUser = async(req,res,next) => {
//   noteController.getAllUserNotes

// }
// //-----------Trial--------------//
