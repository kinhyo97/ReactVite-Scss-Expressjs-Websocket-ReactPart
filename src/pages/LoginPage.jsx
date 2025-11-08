import { useState } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import "./LoginPage.scss";

function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //  input 변경 핸들러
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //  로그인 요청
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.username || !form.password) {
      alert("아이디와 비밀번호를 입력하세요!");
      setLoading(false);
      return;
    }

    try {
      const data = await loginUser(form);

      //  로그인 성공 시 localStorage 저장 후 바로 채팅 페이지로 이동
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log(" 로그인 성공:", data.user);

      navigate("/chat");
    } catch (err) {
      console.error(err);
      alert("로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  //  페이지 이동용 버튼들
  const goToRegister = () => navigate("/register");

  return (
    <AuthLayout>
      <div className="login-container">
        <h2>ExpressChat 로그인</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            name="username"
            placeholder="아이디"
            onChange={handleChange}
            value={form.username}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={handleChange}
            value={form.password}
          />
          <button type="submit" disabled={loading}>
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <button onClick={goToRegister}>회원가입</button>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
