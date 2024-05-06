import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

import { TEMPLATE } from "src/prompts/template.js";

const chatModel = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const prompt = ChatPromptTemplate.fromMessages([
  ["system", TEMPLATE],
  ["user", "{input}"],
]);
const outputParser = new StringOutputParser();
const llmChain = prompt.pipe(chatModel).pipe(outputParser);

export async function summarize(input: string) {
  return llmChain.stream({
    input,
  });
}
