import { createContext, useContext } from 'react';

// Definição do tipo para garantir o uso correto de TypeScript no projeto [cite: 102]
export interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

// Criação do contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para facilitar o uso nos componentes (Ex: Login e ProtectedRoute) [cite: 99]
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
};