const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Aysha",
    lastName: "Faizan",
    emailId: "aysha@example.com",
    password: "aysha123",
  };

  try {
    // Creating a new instance of the User model
    const user = new User(userObj);
    await user.save();
  } catch (error) {
    res.status(400).send(error.message, "Error in creating user");
  }

  res.send("User created successfully");
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
