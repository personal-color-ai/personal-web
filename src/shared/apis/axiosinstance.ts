import axios from "axios";

const isProd = import.meta.env.PROD; // 배포 환경인지 확인

export const instance = axios.create({
  baseURL: isProd ? "/api" : import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});
