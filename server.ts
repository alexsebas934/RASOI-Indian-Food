import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely on the server side
let ai: GoogleGenAI | null = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Gemini SDK successfully initialized on the server.");
  } catch (err) {
    console.error("Failed to initialize Gemini SDK:", err);
  }
} else {
  console.warn("GEMINI_API_KEY environment variable is not defined. AI taste concierge will run in offline mode.");
}

// API endpoint for table reservations (local in-memory backup/simulation but real)
app.post("/api/reserve", (req, res) => {
  const { name, email, phone, date, time, guests, specialRequests } = req.body;
  if (!name || !email || !phone || !date || !time || !guests) {
    return res.status(400).json({ success: false, error: "Please fill out all required fields." });
  }
  // Generate a premium reservation code
  const reservationCode = "RASOI-" + Math.floor(1000 + Math.random() * 9000);
  res.json({
    success: true,
    code: reservationCode,
    message: `Thank you, ${name}! Your table for ${guests} guests on ${date} at ${time} is secured. Sami can't wait to welcome you!`,
  });
});

// Sami's AI taste concierge endpoint
app.post("/api/concierge", async (req, res) => {
  const { messages, userPreferences } = req.body;

  if (!ai) {
    return res.json({
      text: "Namaste! I am currently cooking some fresh Garlic Naan and my digital assistant is resting. However, please know that some of our must-try dishes include our award-winning Butter Chicken, Chicken Tikka Masala, and hot crispy Samosas! Please call us at (951) 449-2165 to order directly or book a table. We would love to have you!",
    });
  }

  // Set up the premium system prompt representing Sami and Rasoi Indian Food
  const systemInstruction = `
You are Sami, the legendary, friendly, and exceptionally hospitable owner of Rasoi Indian Food, located at 27738 Encanto Dr, Menifee, CA 92586 (Phone: 951-449-2165).
The user is talking to your interactive Taste Concierge.

Your personality profile:
- You are warm, deeply loving, passionate, and treat every guest like cherished family who has entered your home. 
- You speak with elegance, flair, and respect. Use warm words like "Namaste", "My friend", "My dear guest", "Wonderful choice!" or "It is an absolute honor".
- You love to talk about the magical aroma of your kitchen ("The moment you open our doors, the scent of fresh cloves, boiling cardamom, and sizzling butter takes your breath away!").
- You are highly knowledgeable about spices, dietary needs, heat adjustments (from gentle-and-mild to full Indian Heat level), and pairing dishes.
- You have a simplified menu focusing purely on the absolute highest quality dishes and best-selling family Combos. You do not serve drinks or alcohol, but you serve incredibly delicious, high-quality, authentic food!
- Recommend popular dishes proudly when asked: COMBO 2 (Indulgent rich Butter Chicken paired with savory Chicken Tikka Masala, accompanied by a full Garlic Naan and Basmati Rice), our customizable COMBO 1, crispy and spicy Chili Chicken Wings (Susan's favorite), Gobi Manchurian, and our awesome fusion Chicken Tikka Pizza.
- Highlight that each entree (Butter Chicken, Tikka Masala, Coconut Chicken) comes complete with a complimentary 16 oz Basmati Rice!
- Recommend freshly baked Plain or Garlic Naan flatbreads as the perfect tool to scoop up the luscious masala sauces.

Your answering guidelines:
- Keep answers relatively concise, highly engaging, and focus on helping them select dishes or feel welcomed.
- If the guest has food allergies (gluten, dairy, nuts, vegan, spicy levels), suggest perfect alternatives. (Our tandoori rotis, curries made with rich coconut milk, or chickpea-based chana masala, and vegan options are delightful!).
- Give beautiful, sensory, luxurious text formatting using bold headers and beautiful spacing. Do NOT use overly clinical language. Speak with the soul of a restaurateur.
  `;

  try {
    // Format conversation history into contents structure
    const formattedContents = messages.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text || msg.content }],
    }));

    // If there are user preferences, append them to guide context
    if (userPreferences) {
      const prefContext = `[Context of Guest Preferences: Heat Tolerance: ${userPreferences.heat || "Not specified"}, Dietary restriction: ${userPreferences.diet || "None"}, Mood: ${userPreferences.mood || "Happy, hungry"}]`;
      formattedContents.unshift({
        role: "user",
        parts: [{ text: prefContext }],
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.85,
      },
    });

    const replyText = response.text || "I apologize, my friend. Let me gather my recipes and answer in a moment. What else can I guide you with today?";
    res.json({ text: replyText });
  } catch (err: any) {
    console.error("Gemini API Error in /api/concierge:", err);
    res.status(500).json({
      error: "Failed to reach AI concierge.",
      text: "Namaste! I am fine-tuning our brick oven and briefly offline. But I'll tell you this: you can never go wrong with our hot tandoori Garlic Naan paired with simmered Butter Chicken! Come visit us in Menifee or call us at (951) 449-2165 if you need anything at all!",
    });
  }
});

async function startServer() {
  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted successfully.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Lucrative Luxury server is running elegantly on http://0.0.0.0:${PORT}`);
  });
}

startServer();
