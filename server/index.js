import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Small delay helper
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

app.post("/chat", async (req, res) => {
  try {
    const messages = req.body.messages;

    let response;

    // Retry system
    for (let i = 0; i < 2; i++) {

      // Timeout protection
      const controller = new AbortController();
      const timeout = setTimeout(() => {
        controller.abort();
      }, 15000);

      try {

        response = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            signal: controller.signal,

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            },

            body: JSON.stringify({
              model: "llama-3.1-8b-instant",

              messages: [
                {
                  role: "system",
                  content:
                    "You are a smart, friendly AI assistant. Always reply clearly and naturally. Remember the conversation context.",
                },

                ...messages,
              ],
            }),
          }
        );

        clearTimeout(timeout);

        // Success
        if (response.ok) {
          break;
        }

      } catch (networkError) {

        clearTimeout(timeout);

        console.log("Network error:", networkError);

        // Wait before retry
        await sleep(500);
      }
    }

    // If response completely failed
    if (!response) {
      return res.json({
        reply: "⚠️ Unable to reach AI server. Please try again.",
      });
    }

    const data = await response.json();

    console.log("Groq response:", JSON.stringify(data, null, 2));

    // Safe response check
    if (!data || !data.choices || !data.choices[0]) {

      console.log("Invalid AI response:", data);

      return res.json({
        reply: "⚠️ AI is busy right now. Please try again.",
      });
    }

    const reply = data.choices[0].message.content;

    return res.json({ reply });

  } catch (error) {

    console.log("Server error:", error);

    return res.json({
      reply: "Server error ❌ Please try again.",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});