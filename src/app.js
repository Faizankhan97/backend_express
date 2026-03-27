const express = require("express");

const app = express();

//This function is know as requried Handler

// This will only handle GET call to /user
app.get("/user", (req, res) => {
  res.send({ firstname: "Faizan", lastname: "Khan" });
});

app.post("/user", async (req, res) => {
  console.log(req.body);
  res.send("Data Saved Successfully");
});

app.delete("/user", (req, res) => {
  res.send("Data Deleted Successfully");
});

app.patch("/user", (req, res) => {
  res.send("Data Updated Successfully");
});

// This will match all the http method API call to /test
app.use("/test", (req, res) => {
  res.send("New Page from the Server");
});

// app.use("/profile", (req, res) => {
//   res.send("This is Profile page!");
// });

// app.use("/", (req, res) => {
//   res.send("Hello from the Server");
// });

app.listen(3000, () => {
  console.log("Server started");
});
