'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, getUserProfile, logout as apiLogout } from '../utils/api';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserProfile().then(setUser).catch(() => {
        localStorage.removeItem('token');
        setUser(null);
      });
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { token } = await apiLogin(email, password);
    localStorage.setItem('token', token);
    const userProfile = await getUserProfile();
    setUser(userProfile);
    if (userProfile.role === 'Admin') {
      router.push('/dashboard');
    } else {
      router.push('/events');
    }
  };

  const register = async (username: string, email: string, password: string) => {
    await apiRegister(username, email, password);
    await login(email, password);
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

