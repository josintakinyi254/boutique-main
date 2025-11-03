import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ⚠️ WARNING: This is a MOCK authentication system using localStorage
// For production, you need a proper backend with secure authentication
// This approach is NOT secure and should only be used for prototyping

type UserRole = "client" | "admin";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("elegante_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signup = async (email: string, password: string, name: string, role: UserRole = "client") => {
    // Mock signup - store in localStorage
    const users = JSON.parse(localStorage.getItem("elegante_users") || "[]");
    
    if (users.find((u: any) => u.email === email)) {
      return { success: false, error: "User already exists" };
    }

    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      email,
      name,
      role,
    };

    users.push({ ...newUser, password }); // In real app, NEVER store passwords like this
    localStorage.setItem("elegante_users", JSON.stringify(users));
    localStorage.setItem("elegante_user", JSON.stringify(newUser));
    setUser(newUser);

    return { success: true };
  };

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("elegante_users") || "[]");
    const foundUser = users.find((u: any) => u.email === email && u.password === password);

    if (!foundUser) {
      return { success: false, error: "Invalid credentials" };
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    localStorage.setItem("elegante_user", JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("elegante_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        signup, 
        logout, 
        isAdmin: user?.role === "admin" 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
