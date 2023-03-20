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
  return await request.post(`/user/login`, data);
};

export const sendRegisterRequest = async (data: RegisterPayload) => {
  return await request.post(`/user/register`, data);
};
