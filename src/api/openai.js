import axios from "axios";

const API_KEY = process.env.OPEN_AI_KEY;
const ChatGptEndpoint = "https://api.openai.com/v1/chat/completions";
const dalleEndpoint = "https://api.openai.com/v1/images/generations";

const client = axios.create({
  headers: {
    Authorization: "Bearer " + API_KEY,
    "Content-Type": "application/json",
  },
});

export const apiCall = async (prompt, messages) => {
  try {
    const res = await client.post(ChatGptEndpoint, {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Does this message want to generate an AI picture, image, art or anything similar? ${prompt}. Simply answer with a yes or no`,
        },
      ],
    });

    const isImage = res.data?.choices[0]?.message?.content
      .toLowerCase()
      .includes("yes");

    if (isImage) return dalleApiCall(prompt, messages || []);
    else return chatGptApiCall(prompt, messages || []);
  } catch (error) {
    return new Promise.resolve({ success: false, error: error.message });
  }
};

const chatGptApiCall = async (prompt, messages) => {
  try {
    const res = await client.post(ChatGptEndpoint, {
      model: "gpt-3.5-turbo",
      messages,
    });

    let content = res.data?.choices[0]?.message?.content;
    messages.push({ role: "assistant", content: content.trim() });

    return new Promise.resolve({ success: true, data: messages });
  } catch (error) {
    return new Promise.resolve({ success: false, error: error.message });
  }
};

const dalleApiCall = async (prompt, messages) => {
  try {
    const res = await client.post(dalleEndpoint, {
      prompt,
      n: 1,
      size: "512x512",
    });

    let url = res.data?.data[0]?.url;
    messages.push({ role: "assistant", content: url.trim() });

    return new Promise.resolve({ success: true, data: messages });
  } catch (error) {
    return new Promise.resolve({ success: false, error: error.message });
  }
};
