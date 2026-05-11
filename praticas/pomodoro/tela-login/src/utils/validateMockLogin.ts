import { MOCK_PASSWORD, MOCK_USERNAME } from '../constants/mockCredentials';

export function validateMockLogin(username: string, password: string): boolean {
  // O .trim() remove espaços vazios acidentais no início ou fim do nome
  return username.trim() === MOCK_USERNAME && password === MOCK_PASSWORD;
}