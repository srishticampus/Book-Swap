// src/components/ChatBot/ChatBot.jsx
import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatBotHistory from "./ChatBotHistory";
import ChatBotLoading from "./ChatBotLoading";
import { secret_key } from "./SecretKey";
import "bootstrap/dist/css/bootstrap.min.css";

function ChatBot() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(secret_key);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      const result = await model.generateContent(userInput);
      const response = await result.response;
      const botText = response.text();

      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: botText },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: "An error occurred while generating response." },
      ]);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Chatbot</h1>

      <div className="card shadow-sm w-100">
        <div className="card-body "  style={{
    height: "400px",          // You can increase this if needed
    overflowY: "auto",
    paddingBottom: "1rem"
  }}>
          <ChatBotHistory chatHistory={chatHistory} />
          <ChatBotLoading isLoading={isLoading} />
        </div>
      </div>

      <div className="d-flex mt-4">
        <input
          type="text"
          className="form-control me-2 "
          placeholder="Type your message..."
          value={userInput}
          onChange={handleUserInput}
        />
        <button className="btn btn-primary" onClick={sendMessage} disabled={isLoading}>
          Send
        </button>
      </div>

      <button className="btn btn-secondary mt-4" onClick={clearChat}>
        Clear Chat
      </button>
    </div>
  );
}

export default ChatBot;
