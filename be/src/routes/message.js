const express = require("express");
const router = express.Router();
const { getMessagesBetweenUsers, sendMessage } = require("../controllers/Message/messageController");

router.get("/:user1/:user2", getMessagesBetweenUsers);
// API: User gửi tin nhắn
router.post("/send", sendMessage);

module.exports = router;
