const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("No profile fields provided for update");
    }

    if (!validateEditProfileData(req.body)) {
      return res.status(400).send("Invalid edit fields");
    }

    const user = req.user;
    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });
    await user.save();

    res.send("Profile updated successfully");
  } catch (error) {
    res.status(400).send(error.message || "Unable to update profile");
  }
});

module.exports = profileRouter;
