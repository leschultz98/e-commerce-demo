import { BUYER, OWNER } from '@/constants';

export const getLocalData = (key: string, isString = true) => {
  const data = localStorage.getItem(key);
  if (!data || isString) return data;
  try {
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
};

export function setLocalData<T>(key: string, value: T | string, isString = true) {
  if (!isString) value = JSON.stringify(value);
  localStorage.setItem(key, value as string);
}

export function getInitState<T>(key: string, defaultValue: T, isString = true): T {
  const data = getLocalData(key, isString);
  if (data) return data;
  return defaultValue;
}

const USERS: Record<string, any> = {
  buyer: { password: 'buyer', userType: BUYER },
  owner: { password: 'owner', userType: OWNER },
};

export function login({ userName, password }: { userName: string; password: string }) {
  const user = USERS[userName];
  if (user && user.password === password) {
    const { userType } = user;
    return { userName, userType };
  }
  return null;
}
