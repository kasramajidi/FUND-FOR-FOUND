"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  clearToken: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a custom event for auth changes
export const AUTH_CHANGE_EVENT = "auth-change";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const router = useRouter();

  // Function to check authentication status from localStorage
  const checkAuth = () => {
    const storedToken = localStorage.getItem("jwt");
    if (storedToken) {
      setTokenState(storedToken);
    } else {
      setTokenState(null);
    }
  };

  useEffect(() => {
    // Check for token on initial load
    checkAuth();

    // Create an event listener for storage events (when localStorage changes in other tabs)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "jwt") {
        checkAuth();
      }
    };

    // Create an event listener for custom auth change events (within the same tab)
    const handleAuthChange = () => {
      checkAuth();
    };

    // Add event listeners
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(AUTH_CHANGE_EVENT, handleAuthChange);

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
    };
  }, []);

  const setToken = (newToken: string) => {
    localStorage.setItem("jwt", newToken);
    setTokenState(newToken);

    // Dispatch custom event to notify all components about auth change
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  };

  const clearToken = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userData");
    setTokenState(null);

    // Dispatch custom event to notify all components about auth change
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));

    router.push("/Login");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        setToken,
        clearToken,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
