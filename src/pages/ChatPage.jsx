import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatPage.scss";
import ChatRoomCard from "../components/ChatRoomCard"

function ChatPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 시 저장된 사용자 정보 불러오기
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUsername(user.username); // user.username, user.name 등 실제 필드명 맞게 수정
      console.log(user);
    }
  }, []);

  const handleEnterRoom = () => {
    navigate("/chatroom/1");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "120px" }}>
      <h1>{username ? `${username}님, 환영합니다 👋` : "환영합니다 👋"}</h1>
      <p>ExpressChat에 오신 것을 환영합니다!</p>

      <ChatRoomCard name="테스트 채팅방" onEnter={handleEnterRoom} />




    </div>

    

    
    

    




  );
}

export default ChatPage;
