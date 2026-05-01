const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Token not provided");
    }

    const decodeeObj = await jwt.verify(token, "DEV@Tinder&123");

    const { _id } = decodeeObj;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("user not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send(error.message);
  }
};

module.exports = { userAuth };
