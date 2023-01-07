const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// Mongoose Schema -> Blueprint of a collection
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required for the user account"],
  },
  email: {
    type: String,
    required: [true, "Please provide and email for the user account"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required for the user account"],
    minlength: 8,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
