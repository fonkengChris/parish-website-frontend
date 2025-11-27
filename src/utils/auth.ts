import type { User } from '../types';

export const getStoredUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const setStoredUser = (user: User, token: string): void => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
};

export const clearStoredAuth = (): void => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

export const isAdmin = (): boolean => {
  const user = getStoredUser();
  return user?.role === 'admin' || false;
};

