export enum AuthorizationPanelType {
    Login = "login",
    Register = "register",
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const validateIdenticalPasswords = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword && password.length > 0;
}