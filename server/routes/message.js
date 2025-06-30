const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const aiRes = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        // Try a model that is available on OpenRouter, such as "mistralai/mistral-7b-instruct" or "google/gemini-pro"
        // You can check available models at https://openrouter.ai/docs#models
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
        },
      }
    );

    const reply = aiRes.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(
      "❌ AI service failed:",
      err.response?.data || err.message,
      err.stack
    );
    res.status(500).json({
      error: "AI service failed",
      details: err.response?.data || err.message,
    });
  }
});

module.exports = router;
