import { AUTH_TOKEN } from '../constants';

export const getToken = () => localStorage.getItem(AUTH_TOKEN);

export const isLoggedIn = () => !!getToken();

export const clearToken = () => localStorage.removeItem(AUTH_TOKEN);

export const setToken = (token: string) => localStorage.setItem(AUTH_TOKEN, token);
