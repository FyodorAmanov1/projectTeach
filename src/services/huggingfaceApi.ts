import { OpenAI } from "openai";

// Initialize the OpenAI client with Hugging Face configuration
const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: import.meta.env.VITE_HF_TOKEN || "",
  dangerouslyAllowBrowser: true, // Allow browser usage
});

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function generateChatResponse(messages: ChatMessage[]) {
  try {
    const chatCompletion = await client.chat.completions.create({
      model: "openai/gpt-oss-120b:fireworks-ai",
      messages: messages,
    });

    return chatCompletion.choices[0].message;
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw error;
  }
}