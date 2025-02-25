



import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey: string | undefined = "Enter Your Gemini ai api key";

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function runChat(prompt: string): Promise<string> {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  try {
    const result = await chatSession.sendMessage(prompt);
    const response = result.response;
    const textResponse = await response.text();
    console.log(textResponse);
    return textResponse as unknown as string;
  } catch (error) {
    console.error("Error generating response:", error);
    return "Error: Unable to fetch response.";
  }
}

export default runChat;
