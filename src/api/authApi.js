import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// 로그인 or 자동 회원가입
export const loginUser = async (form) => {
  const res = await api.post("/auth/login", form);
  return res.data;
};

export const registerUser = async (form) => {
  const res = await api.post("/auth/register", form);
  return res.data;
};
