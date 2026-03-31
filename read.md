const express = require("express");

const app = express();

//This function is know as requried Handler

// This will only handle GET call to /user
app.get("/user/:userId", (req, res) => {
console.log(req.params);
res.send({ firstname: "Faizan", lastname: "Khan" });
});

app.post("/user", async (req, res) => {
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
// res.send("This is Profile page!");
// });

// app.use("/", (req, res) => {
// res.send("Hello from the Server");
// });

// Get /users => It Change all the app.xxx("matching route") functions
// Get /users => middleware chain => request handlet

app.use("/", (req, res, next) => {
next();
});

app.get(
"/user",
(req, res, next) => {
console.log("1st handling the route user!!");
// res.send("User route 1");
next();
},
(req, res, next) => {
next();
},
(req, res, next) => {
console.log("2nd handling the route user!!");
// res.send("User route 2");
next();
},
// (req, res, next) => {
// console.log("3rd handling the route user!!");
// res.send("User route 3");
// next();
// },
// (req, res, next) => {
// console.log("4th handling the route user!!");
// res.send("User route 4");
// },
);

app.use("/user", (req, res, next) => {
console.log("3rd handling the route user!!");
res.send("User route 3");
next();
});

app.listen(3000, () => {
console.log("Server started");
});

app.use("/", (err, req, res, next) => {
if (err) {
res.status(500).send("1st Internal Server Error");
}
});

app.get("/getAllData", (req, res) => {
// try {
throw new Error("Something went wrong");
res.send("All Data Sent");
// } catch (error) {
// res.status(500).send("Some Error contact support team");
// }
});

app.use("/", (err, req, res, next) => {
if (err) {
res.status(500).send("2nd Internal Server Error");
}
});
