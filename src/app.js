const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

// Handle Auth Middleware for all(use) requests GET POST
// Handle Auth Middleware for only GET requests GET POST

app.use("/admin", adminAuth);

app.post("/user/login", (req, res) => {
  res.send("User Logged in SuccessFully!");
});

app.get("/user", userAuth, (req, res) => {
  res.send("User Data Sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data Sent");
});

app.listen(3000, () => {
  console.log("Server started");
});
