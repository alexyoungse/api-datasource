import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as apiLogin, register as apiRegister } from '../services/auth.service';

interface AuthContextType {
  user: any;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: {children: ReactNode}) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ useId: payload.userId, username: payload.username });
      } catch (error) {
        console.error('Error parsing token:', error);
        logout();
      }
    }
  }, [token]);

  const login = async (username: string, password: string) => {
    const { token } = await apiLogin(username, password);
    localStorage.setItem('token', token);
    setToken(token);
  }

  const register = async (username: string, password: string) => {
    const { token } = await apiRegister(username, password);
    localStorage.setItem('token', token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
