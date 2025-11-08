import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import MainLayout from "./layouts/MainLayout";
import RegisterPage from "./pages/RegisterPage";
import ChatRoom from "./pages/ChatRoom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chatroom/:id" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
