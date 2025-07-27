import { connectDB } from "@/lib/mongodb";
import Question from "@/models/question";
import Excuse from "@/models/excuse";

export async function POST(req: Request) {
  await connectDB();
  const { question, userId } = await req.json();

  if (!question)
    return Response.json({ error: "Missing question" }, { status: 400 });

  // Step 1: Save Question
  const newQuestion = await Question.create({ text: question, userId });

  // Step 2: Call Gemini
  const geminiResponse = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Give one clever and funny developer excuse for: "${question}". Make it feel realistic like "It works on my machine" or "I thought the deadline was next week". Only one line. No explanation. Just the excuse.`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.9,
          topP: 0.95,
          topK: 20,
          maxOutputTokens: 60,
        },
      }),
    }
  );

  const data = await geminiResponse.json();
  const excuseText =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || "No excuse found";

  // Step 3: Save Excuse
  const newExcuse = await Excuse.create({
    text: excuseText,
    questionId: newQuestion._id,
  });

  return Response.json({ excuse: newExcuse });
}
