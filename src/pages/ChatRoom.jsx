import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import ChatHeader from "../components/ChatHeader";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import "./ChatRoom.scss";

function ChatRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);
  const [user, setUser] = useState(null);
  const [sending, setSending] = useState(false);

  //  로그인된 사용자 불러오기
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser.username);
      console.log(" 로그인 사용자:", parsedUser.username);
    }
  }, []);

  //  웹소켓 연결
  useEffect(() => {
    if (!user) return;

    ws.current = new WebSocket(`ws://localhost:3000?roomId=${id}&user=${user}`);

    ws.current.onopen = () => {
      console.log(" WebSocket 연결됨");
    };

    ws.current.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);

        if(msg.type === "oldMessages"){
            console.log("이전 대화 수신:", msg.data)

            setMessages(msg.data);
            return;
        }


        console.log("📨 서버로부터 받은 메시지:", msg);

        if (msg.id === user) setSending(false);
        setMessages((prev) => [...prev, msg]);
      } catch {
        console.error("❌ 메시지 파싱 오류:", event.data);
      }
    };

    ws.current.onclose = () => console.log("❌ WebSocket 연결 종료");

    return () => ws.current?.close();
  }, [user, id]);

  //  이전 대화 불러오기 (user가 세팅된 뒤 실행)
//   useEffect(() => {
//     if (!id || !user) return;

//     const fetchMessages = async () => {
//       try {
//         const res = await fetch(`http://localhost:3000/api/chat/${id}`);
//         if (!res.ok) {
//           console.warn(`⚠️ 메시지 불러오기 실패: HTTP ${res.status}`);
//           return;
//         }
//         const data = await res.json();
//         setMessages(data);
//         console.log("💬 이전 대화 불러오기 완료:", data);
//       } catch (err) {
//         console.error("❌ 메시지 불러오기 중 오류:", err.message);
//       }
//     };

//     fetchMessages();
//   }, [id, user]);

  //  메시지 전송
  const handleSend = (message) => {
    if (!message.trim()) return;
    if (!user) return alert("로그인 정보가 없습니다.");

    const payload = {
      id: user,
      content: message,
      roomId: id,
      timestamp: new Date(),
    };

    setSending(true);
    requestAnimationFrame(() => {
      ws.current?.send(JSON.stringify(payload));
    });
  };

  return (
    <div className="chat-room">
      <ChatHeader id={id} onBack={() => navigate("/chat")} />
      <ChatMessages messages={messages} user={user} sending={sending} />
      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default ChatRoom;
