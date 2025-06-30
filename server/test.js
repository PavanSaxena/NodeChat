require("dotenv").config();
const axios = require("axios");

(async () => {
  try {
    console.log("🔑 Loaded API Key:", process.env.OPENROUTER_API_KEY);
    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: "Hello!" }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
        },
      }
    );

    console.log("✅ AI Response:", res.data.choices[0].message.content);
  } catch (err) {
    console.error("❌ Test failed:", err.response?.data || err.message);
    console.error("Status code:", err.response?.status);
  }
})();
