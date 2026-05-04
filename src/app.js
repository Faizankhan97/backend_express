const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookiesParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");

const app = express();
app.use(express.json());
app.use(cookiesParser());

app.post("/signup", async (req, res) => {
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
    res.status(400).send(error.message, "Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPaswordValid = await user.validatePasword(password);

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
    res.status(400).send(error.message, "Error");
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send(error.message, "Error");
  }
});

app.post("/sendConnectionRequest", async (req, res) => {
  console.log("Sending a conneection request");

  res.send("connection request sent");
});

connectDB()
  .then(() => {
    console.log("Database Connection");
    app.listen(3000, () => {
      console.log("Server started");
    });
  })
  .catch((err) => {
    console.log("Error is connecting to database", err);
  });
