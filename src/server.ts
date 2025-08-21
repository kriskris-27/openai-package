import openai = require("openai");

const dotenv = require("dotenv");
dotenv.config();

const client = new openai.OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function main() {
  
  const model = process.env.AI_MODEL;
  
  const response = await client.responses.create({
    model: model as string,
    input: "Explain JavaScript promises in 3 sentences.",
  });

  // Responses API outputs are structured → dig into .output
  const aiReply =
  response.output
    ?.filter((item) => item.type === "message")
    .flatMap((item) => (item as any).content)
    .filter((block) => block.type === "output_text")
    .map((block: any) => block.text)
    .join(" ") || "";

    console.log(aiReply);
    
}

main();
