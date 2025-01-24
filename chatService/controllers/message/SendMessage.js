const Message = require("../../models/Message");

const SendMessage = async (req, res) => {
  const { sender, content } = req.body;

  if (!sender || !content) {
    return res.status(400).json({ error: "sender và content là bắt buộc!" });
  }

  try {
    // Receiver mặc định là "all" nếu không chỉ định người nhận cụ thể
    const receiver = "all";

    // Lưu tin nhắn vào MongoDB
    const message = new Message({ sender, receiver, content });
    await message.save();

    // Gửi phản hồi thành công
    res.status(200).json({ message: "Tin nhắn đã được gửi đến cộng đồng!", data: message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Có lỗi xảy ra khi gửi tin nhắn." });
  }
};

module.exports = SendMessage;
