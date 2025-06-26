"use client";

import { useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';


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

export const useAuth = () => useContext(AuthContext);
