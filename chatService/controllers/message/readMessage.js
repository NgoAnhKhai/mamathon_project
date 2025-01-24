const Message = require("../../models/Message");

const readMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true } // Trả về tin nhắn đã cập nhật
    );

    if (!updatedMessage) {
      return res.status(404).json({ error: "Không tìm thấy tin nhắn với ID này." });
    }

    res.status(200).json({ message: "Tin nhắn đã được đánh dấu là đã đọc.", data: updatedMessage });
  } catch (error) {
    res.status(500).json({ error: "Có lỗi xảy ra khi đánh dấu tin nhắn." });
  }
};

module.exports = readMessage;
