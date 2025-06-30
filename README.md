# 🗨️ NodeChat

NodeChat is a simple real-time AI-powered chatbot built using the MERN stack. It uses **React + Vite + TailwindCSS** for the frontend and **Node.js + Express** for the backend. AI integration is powered by **OpenRouter**, enabling seamless access to powerful open-source or commercial language models.

---

## 📌 Features

### 💬 Chatbot Functionality

- Real-time user input & message display
- AI response rendering via OpenRouter API
- Typing/loading indicators
- Error handling for failed AI calls

### ⚙️ Tech Stack

| Layer         | Tech                                           |
| ------------- | ---------------------------------------------- |
| Frontend      | React + Vite + Tailwind CSS                    |
| Backend       | Node.js + Express                              |
| AI Service    | OpenRouter API (OpenAI, Mistral, Claude, etc.) |
| HTTP Client   | Axios                                          |
| State Manager | useState, useEffect (React)                    |

---

## 🚀 Getting Started

### 📁 Project Structure

```
NodeChat/
│
├── client/              # Frontend (React + Vite)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   └── ...
│   ├── index.html
│   └── ...
│
├── server/              # Backend (Node + Express)
│   ├── index.js
│   ├── routes/
│   └── services/
│
├── .env
└── README.md
```

---

## 🧑‍💻 Installation

### 🔧 Prerequisites

- Node.js (v16+)
- npm or yarn
- OpenRouter API key → [https://openrouter.ai/keys](https://openrouter.ai/keys)

---

### 📦 1. Clone the Repository

```bash
git clone https://github.com/your-username/NodeChat.git
cd NodeChat
```

---

### ⚙️ 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
OPENROUTER_API_KEY=sk-xxxx...
PORT=5000
```

Then start the backend:

```bash
npm run dev
```

---

### 🌐 3. Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🔌 AI Service Integration

NodeChat uses [OpenRouter.ai](https://openrouter.ai) to interact with models like GPT-3.5, Claude, Mistral, etc.

Make sure your `.env` is correctly configured and that your API key is active and has permissions for your chosen model.

---

## 📤 Example API Request

```js
const response = await axios.post(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    model: "mistralai/mistral-7b-instruct",
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
```

---

## ✅ Features in Progress

- User authentication
- Persistent chat history
- Model selector dropdown
- Voice-to-text input (Web Speech API)

---

## 🙌 Acknowledgements

- [OpenRouter.ai](https://openrouter.ai) for the open API gateway
- [Vite](https://vitejs.dev) for fast frontend dev
- [Tailwind CSS](https://tailwindcss.com)
- [React](https://reactjs.org)

---

## 💡 Tips

- Want to switch models? Replace the `model` value in your API call.
- For production, consider environment checks and API rate limit handling.
