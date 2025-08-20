import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function* stream(input: string): AsyncGenerator<string> {
  const model = process.env.AI_MODEL || "gpt-4o-mini";

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set in environment.");
  }

  const response = await client.chat.completions.create({
    model,
    messages: [{ role: "user", content: input }],
    stream: true,
  });

  for await (const event of response) {
    if (event.type === "message") {
      yield event.delta?.content || "";
    }
  }
}
