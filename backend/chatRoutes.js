const express = require("express");
const router = express.Router();
const ChatMessage = require("./dummyChatDb");

// save chat
router.post("/chat/save", async (req, res) => {
  try {
    const { interviewId, sender, message } = req.body;

    const chat = new ChatMessage({
      interviewId,
      sender,
      message,
    });

    await chat.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// get chat
router.get("/chat/:interviewId", async (req, res) => {
  const chats = await ChatMessage.find({
    interviewId: req.params.interviewId,
  }).sort({ createdAt: 1 });

  res.json(chats);
});

module.exports = router;
