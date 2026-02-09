import express from "express";
import OpenAI from "openai";

const router = express.Router();
// 👇 ADD THIS LINE
console.log("ENV KEY:", process.env.OPENAI_API_KEY);

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});


router.post("/", async (req, res) => {

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      success: false,
      message: "Text is required."
    });
  }

  try {

    const systemPrompt = `
You are a professional fitness trainer.

Generate a DAY-WISE workout plan ONLY in valid JSON.

Format:

{
  "title": "",
  "goal": "",
  "weekly_plan": [
    {
      "day": "",
      "focus": "",
      "exercises": [
        {
          "name": "",
          "sets": "",
          "reps": ""
        }
      ]
    }
  ]
}

Rules:
- Return ONLY JSON
- No explanation
`;

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text }
      ]
    });

    const raw = completion.choices[0].message.content;

    let parsed;

    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = raw; // fallback
    }

    res.json({
      success: true,
      response: parsed
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "AI generation failed"
    });

  }

});

export default router;
