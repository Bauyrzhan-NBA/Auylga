import api from '../services/api';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email?: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export const authApi = {
  login: (data: LoginPayload) =>
    api.post<LoginResponse>('/auth/login', data),

  verify: () => api.get<{ user: AuthUser }>('/auth/verify'),
};
