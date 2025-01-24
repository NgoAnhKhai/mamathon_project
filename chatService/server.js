require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const http = require("http");
const { Server } = require("socket.io");
const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);
const io = new Server(server,  {
  cors: {
    origin: "*", // Cho phép tất cả các nguồn
    methods: ["GET", "POST"], // Các phương thức HTTP được cho phép
    credentials: true, // Hỗ trợ cookie
  },
});

// Middleware
app.use(bodyParser.json());
app.use("/messages", messageRoutes);
app.use("/users", userRoutes);

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Đã kết nối tới MongoDB"))
  .catch((error) => console.error("Kết nối MongoDB thất bại:", error));

  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
  
    // Đăng ký người dùng với địa chỉ ví
    socket.on("register", (walletAddress) => {
      onlineUsers.set(socket.id, walletAddress);
      console.log(`${walletAddress} joined the chat.`);
    });
  
    // Nhận tin nhắn từ client
  socket.on("sendMessage", async (data) => {
    const { sender, content } = data;

    if (!sender || !content) {
      return socket.emit("error", { message: "Sender và content là bắt buộc!" });
    }

    try {
      // Receiver mặc định là "all"
      const message = new Message({ sender, receiver: "all", content });
      await message.save();

      // Phát tin nhắn đến tất cả người dùng
      io.emit("receiveMessage", message);
    } catch (error) {
      console.error("Error saving message:", error);
      socket.emit("error", { message: "Có lỗi xảy ra khi gửi tin nhắn." });
    }
  });

  // Xử lý ngắt kết nối
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.walletAddress || "Unknown"}`);
  });
});

// Khởi động server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server đang chạy trên cổng ${PORT}`));
