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
type ResetPasswordPayload = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
type ResetNamePayload = {
  name: string;
};

export const sendLoginRequest = async (data: LoginPayload) => {
  return await request.post(`/auth/login`, data);
};

export const sendLogoutRequest = async () => {
  return await request.post("/auth/logout");
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

export const sendDashboardRequest = async () => {
  return await request.get("/user/dashboard");
};

export const sendStatisticsRequest = async () => {
  return await request.get("/user/statistics");
};

export const sendResetPasswordRequest = async (data: ResetPasswordPayload) => {
  return await request.put("/user/changePassword", data);
};

export const sendResetNameRequest = async (data: ResetNamePayload) => {
  return await request.put("/user/updateInfo", data);
};
