const express = require("express");

const app = express();

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("1st Internal Server Error");
  }
});

app.get("/getAllData", (req, res) => {
  //   try {
  throw new Error("Something went wrong");
  res.send("All Data Sent");
  //   } catch (error) {
  // res.status(500).send("Some Error contact support team");
  //   }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("2nd Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server started");
});
