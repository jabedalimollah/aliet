import ApiError from "../utils/ApiError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { User } from "../models/user.model.js";

// ======================= Send Message ==================
const sendMessge = asyncErrorHandler(async (req, res) => {
  const senderId = req.id;
  const receiverId = req.params.id;
  const { message } = req.body;
  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }
  const newMessage = await Message.create({
    senderId,
    receiverId,
    message,
  });
  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }
  await Promise.all([conversation.save(), newMessage.save()]);

  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }
  res.status(201).json(new ApiResponse(201, newMessage, "success"));
});

// ==================== Get Message ================
const getMessage = asyncErrorHandler(async (req, res) => {
  const senderId = req.id;
  const receiverId = req.params.id;
  const isReceiverIdExists = await User.findById(receiverId);
  if (!isReceiverIdExists) {
    throw new ApiError(401, "error", "user doesn't exists");
  }

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  }).populate("messages");
  // console.log(conversation);
  if (!conversation) {
    return res.status(201).json(new ApiResponse(200, [], "no messages"));
    // .json({ status: 201, data: [], message: "no messages" });
    // res.status(201).json(new ApiResponse(201, [], "no messages"));
  }
  const messages = conversation.messages;

  res
    .status(200)
    .json(new ApiResponse(200, messages, "Message received successfully"));
});

export { sendMessge, getMessage };
