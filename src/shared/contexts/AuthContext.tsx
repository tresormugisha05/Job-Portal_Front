import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/Service";

export type UserRole = "CANDIDATE" | "EMPLOYER" | "ADMIN" | "GUEST";

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface EducationHistory {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole; // This is the system role
  professionalTitle?: string; // Standardized title field
  location?: string;
  experience?: string;
  education?: string;
  skills?: string[];
  summary?: string;
  phone?: string;
  resume?: string;
  initials?: string;
  workExperience?: WorkExperience[];
  educationHistory?: EducationHistory[];
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: "CANDIDATE" | "EMPLOYER";
  }) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Simulate persistent session
  useEffect(() => {
    const savedUser = localStorage.getItem("job_portal_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/api/candidates/login", {
        email,
        password,
      });
      const { token, user: userDataFromApi } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("job_portal_user", JSON.stringify(userDataFromApi));

      setUser(userDataFromApi);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: "CANDIDATE" | "EMPLOYER";
  }) => {
    try {
      const response = await api.post("/api/candidates/register", userData);
      const { token, user: userDataFromApi } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("job_portal_user", JSON.stringify(userDataFromApi));

      setUser(userDataFromApi);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("job_portal_user", JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("job_portal_user");
  };

  const value = {
    user,
    role: user?.role || "GUEST",
    isAuthenticated: !!user,
    login,
    register,
    updateProfile,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
