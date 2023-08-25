export const getItemFromLocalStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  if (!item) return null;
  return JSON.parse(item) as T;
};

export const setItemFromLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
