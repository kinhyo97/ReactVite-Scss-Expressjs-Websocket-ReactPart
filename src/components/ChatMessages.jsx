import "./ChatMessages.scss"

function ChatMessages({ messages, user, sending }) {
  return (
    <div className="chat-room__messages">
      {messages.length === 0 ? (
        <p className="chat-room__empty">아직 메시지가 없습니다.</p>
      ) : (
        messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-room__message ${msg.id === user ? "me" : "other"}`}
            >
            <div className="chat-bubble">
                <strong>{msg.id}</strong>
                <p>{msg.content}</p>
            </div>
            </div>
        ))
      )}

      {sending && (
        <div className="chat-room__sending">
          <div className="spinner"></div> 보내는 중...
        </div>
      )}
    </div>
  );
}

export default ChatMessages;