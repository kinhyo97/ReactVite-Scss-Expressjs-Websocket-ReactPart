import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi"; //  백엔드 요청 함수
import AuthLayout from "../layouts/AuthLayout";
import "./RegisterPage.scss";

function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 간단한 유효성 검사
    if (!form.username || !form.password) {
      alert("모든 항목을 입력하세요!");
      return;
    }

    try {
      setLoading(true);
      const data = await registerUser(form); //  서버 요청
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      navigate("/"); //  회원가입 후 로그인 페이지로 이동
    } catch (err) {
      console.error(err);
      alert("회원가입 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="register-container">
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            name="username"
            placeholder="이름"
            onChange={handleChange}
            value={form.username}
          />
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            onChange={handleChange}
            value={form.password}
          />
          <button type="submit" disabled={loading}>
            {loading ? "가입 중..." : "회원가입"}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}

export default RegisterPage;
