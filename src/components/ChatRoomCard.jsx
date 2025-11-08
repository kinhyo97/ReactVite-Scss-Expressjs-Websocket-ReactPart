import PropTypes from "prop-types";
import "./ChatRoomCard.scss";

function ChatRoomCard({ name, onEnter }) {
  return (
    <div className="chat-room-card" onClick={onEnter}>
      <h3 className="chat-room-card__name">{name}</h3>
      <p className="chat-room-card__desc">입장하려면 클릭하세요</p>
    </div>
  );
}

ChatRoomCard.propTypes = {
  name: PropTypes.string.isRequired,
  onEnter: PropTypes.func.isRequired,
};

export default ChatRoomCard;
