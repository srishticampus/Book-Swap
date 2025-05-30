import React from "react";
import ReactMarkdown from "react-markdown";

function ChatBotHistory({ chatHistory }) {
  return (
    <div
      className="d-flex flex-column"
      style={{
        maxHeight: "100%",
        overflowY: "auto",
        paddingRight: "10px",
      }}
    >
      {chatHistory.map((message, index) => (
        <div
          key={index}
          className={`d-flex ${
            message.type === "user" ? "justify-content-end" : "justify-content-start"
          }`}
        >
          <div
            className={`py-2 px-3 mb-2 rounded-3 ${
              message.type === "user"
                ? "bg-light text-dark"
                : "bg-primary text-white"
            }`}
            style={{
              maxWidth: "90%",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            {message.type === "user" && (
              <div className="fw-bold text-muted mb-1">You:</div>
            )}
            <ReactMarkdown>{message.message}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatBotHistory;
