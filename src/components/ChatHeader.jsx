import "../pages/ChatRoom.scss";

function ChatHeader({ id, onBack }) {
  return (
    <div className="chat-room__header">
      <button className="chat-room__back" onClick={onBack}>
        ← 목록으로
      </button>
      <h2 className="chat-room__title">채팅방 #{id}</h2>
    </div>
  );
}

export default ChatHeader;
