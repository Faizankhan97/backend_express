const mongoose = require("mongoose");

const connectDB = async () => {
  const password = encodeURIComponent("MyP@ssw0rd!");
  const uri = `mongodb+srv://NamasteNode:${password}@cluster0.ywc0sff.mongodb.net/devTinder?retryWrites=true&w=majority`;
  await mongoose.connect(uri);
};

module.exports = connectDB;
