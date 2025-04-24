import { createTRPCRouter, protectedProcedure } from "../trpc";
import { OpenAIToolSet } from "composio-core";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const composio = new OpenAIToolSet({ apiKey: process.env.COMPOSIO_API_KEY });

export const gmailRouter = createTRPCRouter({
  getThreads: protectedProcedure.query(async () => {
    const tools = await composio.getTools({ actions: ["GMAIL_LIST_THREADS"] });

    const instruction = "Get the 5 latest email threads from the authenticated user’s inbox";
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",   
      messages: [{ role: "user", content: instruction }],
      tools,
      tool_choice: "auto",
    });


    const seq = await composio.handleToolCall(completion);

    const chunks: string[] = [];
    for (const chunk of seq) {
      chunks.push(chunk);
    }
    const jsonText = chunks.join("");
    const parsed = JSON.parse(jsonText);
    console.log("parsed", parsed);

    return parsed.data.threads as Array<{ id: string; snippet: string }>;
  }),
});
