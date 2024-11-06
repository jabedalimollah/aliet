import ApiError from "../utils/ApiError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

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
  res.status(201).json(new ApiResponse(201, newMessage, "success"));
});

// ==================== Get Message ================
const getMessage = asyncErrorHandler(async (req, res) => {
  const senderId = req.id;
  const receiverId = req.params.id;
  const conversation = await Conversation.find({
    participants: { $all: [senderId, receiverId] },
  });
  if (!conversation) {
    res.status(200).json(new ApiResponse(200, [], "success"));
  }
  res.status(200).json(new ApiResponse(200, conversation?.messages, "success"));
});

export { sendMessge, getMessage };
