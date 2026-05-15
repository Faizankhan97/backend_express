const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignData } = require("../utils/validation");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignData(req);
    const { firstName, lastName, emailId, password } = req.body;

    //Encryppt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User created successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPaswordValid = await user.validatePassword(password);

    if (isPaswordValid) {
      //Create a JWT token and send it to the client
      const token = await user.getJWT();
      //Add the token to cookie and send it to the client
      res.cookie("token", token, {
        expires: new Date(Date.now() + 9000000000),
        httpOnly: true,
      });
      res.send("Login successful");
    } else {
      res.status(400).send("Invalid password");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("logout successful");
});

module.exports = authRouter;
