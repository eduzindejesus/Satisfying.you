export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const arePasswordsEqual = (password: string, repeatPassword: string) => {
  return password === repeatPassword;
};

export const isPasswordValid = (password: string) => {
  return password.length >= 6;
};