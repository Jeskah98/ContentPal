"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>; // Added refreshToken to the type
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signup: async (email, password) => {},
  login: async (email, password) => {},
  logout: async () => {},
  refreshToken: async () => {}, // Added refreshToken to the default context value
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => { // Made the callback async
      if (user) {
        // Force token refresh when auth state changes to ensure claims are up-to-date
        await user.getIdToken(true);
      }
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signup = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  }

  const logout = async () => {
    await signOut(auth);
  }

  // Added refreshToken function
  const refreshToken = async () => {
    if (auth.currentUser) {
      await auth.currentUser.getIdToken(true);
      // Optionally, update user state after refresh if needed, though onAuthStateChanged should handle this
       setUser(auth.currentUser);
    }
  }


  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout, refreshToken }}> {/* Added refreshToken to the provider value */}
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
