const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      requried: true,
      maxlength: 10,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 10,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: String,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data is not add");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://hostalitecloud.com/crb/wp-content/uploads/2025/10/dummy-user-male.jpg",
    },
    about: {
      type: String,
      default: "This is my about section",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
