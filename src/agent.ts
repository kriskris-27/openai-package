import { prompt } from "./prompt";

interface AgentConfig {
  role: string;
  memory?: boolean;
}

export function agent(config: AgentConfig) {
  const memory: string[] = [];

  return {
    async say(input: string): Promise<string> {
      if (config.memory) memory.push(`User: ${input}`);
      const fullPrompt = config.memory
        ? memory.join("\n") + `\n${config.role}: `
        : input;

      const answer = await prompt(fullPrompt);

      if (config.memory) memory.push(`${config.role}: ${answer}`);
      return answer;
    },
  };
}
