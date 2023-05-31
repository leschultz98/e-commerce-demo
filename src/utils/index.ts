export const getLocalData = (key: string, isString = true) => {
  const data = localStorage.getItem(key);
  if (!data || isString) return data;
  try {
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
};

export const setLocalData = (key: string, value: any) => {
  localStorage.setItem(key, value);
};
