const express = require("express");

const app = express();

//This function is know as requried Handler
app.use("/test", (req, res) => {
  res.send("New Page from the Server");
});

app.use("/", (req, res) => {
  res.send("Hello from the Server");
});

app.listen(3000, () => {
  console.log("Server started");
});
