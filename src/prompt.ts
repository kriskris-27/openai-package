import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function prompt(input: string): Promise<string> {
  const model = process.env.AI_MODEL || "gpt-4o-mini";

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set in environment.");
  }

  const response = await client.chat.completions.create({
    model,
    messages: [{ role: "user", content: input }],
  });

  return response.choices?.[0]?.message?.content || "No response from model";
}
