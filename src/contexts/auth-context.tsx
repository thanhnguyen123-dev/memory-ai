"use client";

import { createContext, useContext } from "react";
import type { User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
}

type AuthProviderProps = {
  children: React.ReactNode;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ 
  children, 
  user
}: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}