import request from "./request";

type LoginPayload = {
  email: string;
  password: string;
};
type RegisterPayload = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export const sendLoginRequest = async (data: LoginPayload) => {
  return await request.post(`/auth/login`, data);
};

export const sendMeRequest = async () => {
  return await request.get("/auth/me");
};

export const sendRegisterRequest = async (data: RegisterPayload) => {
  return await request.post(`/user/register`, data);
};

export const sendVerificationRequest = async (token: string) => {
  return await request.put(`/user/verify/${token}`);
};

export const sendResendVerificationRequest = async () => {
  return await request.post("/user/resendVerification");
};
