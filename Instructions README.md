# 🤖 AI Chatbot (React + Node.js + Groq API)

A simple AI chatbot built using React for the frontend and Node.js (Express) for the backend.  
It connects to the Groq API to generate smart AI responses.

---

# 🚀 Features

- 💬 Real-time chat with AI
- 🧠 Conversation memory (context-aware replies)
- ⚡ Fast responses using Groq API
- 🎨 Clean and simple UI
- 🔄 Loading state while AI is thinking
- ❌ Error handling and retry system

---

# 🛠️ Tech Stack

- React (Vite)
- Node.js
- Express.js
- Groq API (LLaMA 3 model)
- JavaScript (ES Modules)

---

# 📁 Project Structure


ChatBot/
│
├── src/ # React frontend
├── server/ # Backend (Express + Groq API)
├── api/ # Vercel serverless function (optional)
├── App.jsx
├── App.css
├── package.json
└── README.md


---

# ⚙️ How to Run This Project

## 1. Install frontend dependencies

Open terminal in the main folder:

bash

npm install

2. Start frontend (React app)
npm run dev

Frontend runs at:

http://localhost:5173

3. Setup backend (AI server)

Go to server folder:

cd server
npm install

4. Create .env file inside /server

Add your Groq API key:

GROQ_API_KEY=your_api_key_here
5. Start backend server
node index.js

Backend runs at:

http://localhost:5000
🔌 How it works

Frontend (React)
→ sends message to backend (Express)
→ backend sends request to Groq API
→ AI responds
→ backend sends response back to frontend

🤖 AI Model Used
llama-3.1-8b-instant

Provided by Groq API for fast inference.

⚠️ Important Notes
❌ Do NOT upload .env to GitHub
❌ Do NOT upload node_modules
🔐 Keep API keys private
🧠 Backend must be running for AI to work


💡 Future Improvements

Add chat history storage (database)
Add login/auth system
Improve UI (ChatGPT style)
Add typing animation
Deploy frontend (Vercel)
Deploy backend (Render / Railway)

👨‍💻 Author

Built by Dhanuka
