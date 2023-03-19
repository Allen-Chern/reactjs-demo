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

export const login = async (data: LoginPayload) => {
  return await request.post(`/user/login`, data);
};

export const register = async (data: RegisterPayload) => {
  return await request.post(`/user/register`, data);
};
