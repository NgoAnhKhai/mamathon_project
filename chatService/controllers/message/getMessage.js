const Message = require("../../models/Message");

const getMessage = async (req, res) => {
  const { user1, user2 } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 },
      ],
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Có lỗi xảy ra khi lấy tin nhắn." });
  }
};

module.exports = getMessage;
