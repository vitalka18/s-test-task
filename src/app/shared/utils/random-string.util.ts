export const randomStringUtil = (): string => {
  return Math.random().toString(36).substring(2, 10);
};
