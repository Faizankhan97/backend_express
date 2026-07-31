const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const ConnectionRequestModel = require("../models/connectionRequest");

const requestsRouter = express.Router();

const handleReviewRequest = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;

    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status type " + status });
    }

    const connectionRequest = await ConnectionRequestModel.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });

    if (!connectionRequest) {
      return res.status(400).json({ message: "Connection Request not found" });
    }

    connectionRequest.status = status;

    const data = await connectionRequest.save();
    res.json({ message: "Connection request " + status, data });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

requestsRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      let status = req.params.status;

      const allowedStatus = ["ignore", "ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .send({ message: "Invalid status type " + status });
      }

      if (status === "ignored") {
        status = "ignore";
      }

      const toUser = await User.findById(toUserId);

      if (!toUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const existingConnectionRequest = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection request already exists" });
      }

      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      const connectionRequestData = await connectionRequest.save();
      res.send(connectionRequestData);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
);

requestsRouter.post("/request/review/:status/:requestId", userAuth, handleReviewRequest);
requestsRouter.post("/user/requests/:status/:requestId", userAuth, handleReviewRequest);

module.exports = requestsRouter;
