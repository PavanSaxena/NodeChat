const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  role: { type: String, enum: ["user", "bot"], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Chat", ChatSchema);
