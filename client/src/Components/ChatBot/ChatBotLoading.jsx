// src/components/ChatBot/ChatBotLoading.jsx
import React from "react";

function ChatBotLoading({ isLoading }) {
  return (
    <>
      {isLoading && (
        <div className="d-flex justify-content-center mt-2">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBotLoading;
