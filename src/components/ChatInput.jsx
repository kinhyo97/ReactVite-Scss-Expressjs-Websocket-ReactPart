import "../pages/ChatRoom.scss";

import { useState } from "react";

function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  };

  return (
    <form className="chat-room__form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지를 입력하세요..."
        className="chat-room__input"
      />
      <button type="submit" className="chat-room__send">
        전송
      </button>
    </form>
  );
}

export default ChatInput;
