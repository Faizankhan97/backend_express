const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  // Creating a new instance of the User model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User created successfully");
  } catch (error) {
    res.status(400).send(error.message, "Error in creating user");
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
