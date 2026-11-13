import React, { createContext, useContext, useState } from 'react';

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  isNewCustomer: boolean;
}

interface AuthContextValue {
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (identifier: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, phone: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginAsGuest: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Start as not logged in so login/register appears at the front!
  const [user, setUser] = useState<UserProfile | null>(null);

  const login = async (identifier: string, pass: string) => {
    if (!identifier.trim()) {
      return { success: false, error: 'Masukkan nomor HP atau email Anda' };
    }
    if (!pass || pass.length < 6) {
      return { success: false, error: 'Kata sandi minimal 6 karakter' };
    }

    const cleanId = identifier.trim();
    const isEmail = cleanId.includes('@');
    const newUser: UserProfile = {
      name: isEmail ? cleanId.split('@')[0] : 'Pelanggan CleanWash',
      phone: isEmail ? '+62 812-3456-7890' : cleanId,
      email: isEmail ? cleanId : 'pelanggan@cleanwash.id',
      isNewCustomer: false,
    };
    setUser(newUser);
    return { success: true };
  };

  const register = async (name: string, phone: string, email: string, pass: string) => {
    if (!name.trim()) {
      return { success: false, error: 'Nama lengkap wajib diisi' };
    }
    if (!phone.trim()) {
      return { success: false, error: 'Nomor WhatsApp / HP wajib diisi' };
    }
    if (!email.trim() || !email.includes('@')) {
      return { success: false, error: 'Alamat email valid wajib diisi' };
    }
    if (!pass || pass.length < 6) {
      return { success: false, error: 'Kata sandi minimal 6 karakter' };
    }

    const newUser: UserProfile = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      isNewCustomer: true,
    };
    setUser(newUser);
    return { success: true };
  };

  const loginAsGuest = () => {
    setUser({
      name: 'Tamu CleanWash',
      phone: '+62 812-3456-7890',
      email: 'tamu@cleanwash.id',
      isNewCustomer: true,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: Boolean(user),
        login,
        register,
        loginAsGuest,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
