const express = require("express");
const router = express.Router();

// Import các controller
const SendMessage = require("../controllers/message/SendMessage");
const getMessage = require("../controllers/message/getMessage");
const readMessage = require("../controllers/message/readMessage");

// Gửi tin nhắn
router.post("/send", SendMessage);

// Lấy tin nhắn giữa hai người dùng
router.get("/:user1/:user2", getMessage);

// Đánh dấu tin nhắn đã đọc
router.patch("/read/:id", readMessage);

module.exports = router;
