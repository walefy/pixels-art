export const getItemFromLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  if (!item) return null;
  return JSON.parse(item);
};

export const setItemFromLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
