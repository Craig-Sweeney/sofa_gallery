import api from './client';
import { AdminSession } from '../types';

export const requestOtp = async (identifier: string) => {
  await api.post('/auth/otp', { identifier });
};

export const verifyOtp = async (identifier: string, code: string) => {
  const { data } = await api.post<AdminSession>('/auth/verify', { identifier, code });
  localStorage.setItem('admin_token', data.token);
  return data;
};
