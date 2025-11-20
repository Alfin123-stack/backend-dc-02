import { buildGemmaPrompt } from "../utils/gemma/gemmaPromptBuilder.js";

let raw = "";

process.stdin.on("data", chunk => {
  raw += chunk.toString();
});

process.stdin.on("end", () => {
  const payload = JSON.parse(raw);

  const content = payload.content;
  const count = payload.count || 10;

  const prompt = buildGemmaPrompt(content, count);

  // Kirim prompt ke Python
  process.stdout.write(prompt);
});