import { createContext, useContext, useState } from "react";
import { api } from "@/lib/api";

interface User {
  role: string;
  [key: string]: unknown;
}

interface AuthContextData {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

function decodeJwtPayload(token: string): User | null {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64)) as User;
  } catch {
    return null;
  }
}

const AuthContext = createContext<AuthContextData | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("accessToken"))
  );
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem("accessToken");
    return token ? decodeJwtPayload(token) : null;
  });

  async function login(email: string, password: string) {
    const response = await api.post("/auth/login", { email, password });

    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);

    setUser(decodeJwtPayload(response.data.accessToken));
    setIsAuthenticated(true);
  }

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}