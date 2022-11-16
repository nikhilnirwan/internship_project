const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const User = new Schema(
  {
    designation: {
      type: String,
      enum: ["Admin", "User"],
      default: 'User'
    },
    firstName: String,
    lastName: String,
    middelName: String,
    gender: String,
    dob: Date,
    mobile: String,
    email: String,
    secondaryMobile: String,
    dateOfJoining: Date,
    experience: String,
    emailVerificationCode: String,
    isEmailVerified: String,
    role: {
      type: mongoose.Types.ObjectId,
      ref: 'Roles'
    },
    password: String,
    deviceToken: String,
    avatar: String,
    isBlock: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: "active",
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", User);
