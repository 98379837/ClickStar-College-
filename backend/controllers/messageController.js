import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  const { receiverId, message } = req.body;
  const newMsg = new Message({ senderId: req.user.id, receiverId, message });
  await newMsg.save();
  res.json({ message: "Message sent" });
};

export const getMessages = async (req, res) => {
  const { withUser } = req.params;
  const msgs = await Message.find({
    $or: [
      { senderId: req.user.id, receiverId: withUser },
      { senderId: withUser, receiverId: req.user.id }
    ]
  }).sort({ timestamp: 1 });
  res.json(msgs);
};
