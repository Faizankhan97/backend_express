const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignData } = require("./utils/validation");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

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
      throw new Error("Invalidcredentials");
    }
    const isPaswordValid = await bcrypt.compare(password, user.password);

    if (isPaswordValid) {
      res.send("Login successful");
    } else {
      res.status(400).send("Invalid password");
    }
  } catch (error) {
    res.status(400).send(error.message, "Error");
  }
});

// Get user by email
app.get("/user", async (req, res) => {
  const email = req.body.emailId;

  try {
    const user = await User.findById();
    if (!user) {
      res.status(404).send("User not Found");
    }
    res.send(user);
    // if (user.length === 0) {
    //   res.status(404).send("User not Found");
    // }
    // res.send(user);
  } catch (error) {
    res.status(400).send(error.message, "Something went wrong");
  }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message, "Something went wrong");
  }
});

// Delete a user from database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(400).send(error.message, "Something went wrong");
  }
});

// Patch a user in the database
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((update) =>
      ALLOWED_UPDATES.includes(update),
    );

    if (!isUpdateAllowed) {
      throw new Error("Updates not allowed");
    }
    await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("User Updated successfully");
  } catch (error) {
    res.status(400).send(error.message, "Something went wrong");
  }
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
