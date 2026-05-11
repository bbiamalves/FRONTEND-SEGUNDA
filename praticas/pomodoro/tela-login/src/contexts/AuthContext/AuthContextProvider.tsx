import { useState, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import { validateMockLogin } from '../../utils/validateMockLogin';

// Usamos 'any' ou uma tipagem genérica para o children para evitar o erro do ReactNode
interface AuthProviderProps {
  children: any; 
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Inicializa o estado verificando se já existe uma "sessão" ativa 
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const savedAuth = sessionStorage.getItem('@Chronos:isAuthenticated');
    return savedAuth === 'true';
  });

  // Função de login que utiliza a validação mockada [cite: 112, 114]
  const login = useCallback((username: string, password: string): boolean => {
    const isValid = validateMockLogin(username, password);
    
    if (isValid) {
      setIsAuthenticated(true);
      sessionStorage.setItem('@Chronos:isAuthenticated', 'true');
    }
    
    return isValid;
  }, []);

  // Função para limpar a sessão 
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('@Chronos:isAuthenticated');
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}