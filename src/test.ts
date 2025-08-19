import dotenv from "dotenv";
dotenv.config();

import { prompt, stream, agent } from "./index";

(async () => {
  console.log("=== Prompt Test ===");
  const answer = await prompt("What is Node.js?");
  console.log(answer);

  console.log("\n=== Stream Test ===");
  for await (const token of stream("Write a short poem")) {
    process.stdout.write(token);
  }

  console.log("\n\n=== Agent Test ===");
  const teacher = agent({ role: "teacher", memory: true });
  console.log(await teacher.say("Explain async/await in JS"));
  console.log(await teacher.say("Now give a simple example"));
})();
