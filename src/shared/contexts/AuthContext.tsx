import React, { createContext, useContext, useState } from "react";
import api from "../services/ApiSetter";

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
  id?: string;
  _id?: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  professionalTitle?: string;
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
  isVerified?: boolean; // For employer verification
  companyName?: string; // For employers
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: "CANDIDATE" | "EMPLOYER") => Promise<void>;
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
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("job_portal_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string, role?: "CANDIDATE" | "EMPLOYER") => {
    try {
      // Try candidate/admin login first
      let response;

      if (role === "EMPLOYER") {
        // Direct employer login
        response = await api.post("/employers/login", { email, password });
      } else if (role === "CANDIDATE") {
        // Direct candidate login
        response = await api.post("/auth/login", { email, password });
      } else {
        // Fallback: try candidate first, then employer (for backward compatibility)
        try {
          response = await api.post("/auth/login", { email, password });
        } catch (error) {
          // If candidate login fails, try employer login
          try {
            response = await api.post("/employers/login", { email, password });
          } catch (employerError) {
            throw error; // Throw original error if both fail
          }
        }
      }

      const data = response.data;
      const token = data.token;

      // Handle different user object structures
      const userData = data.user || data.data;

      // Ensure id and role are set correctly
      const finalUser = {
        ...userData,
        id: userData._id || userData.id,
        role: userData.role || (data.data?.companyName ? "EMPLOYER" : "CANDIDATE")
      };

      localStorage.setItem("token", token);
      localStorage.setItem("job_portal_user", JSON.stringify(finalUser));
      setUser(finalUser);

    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Invalid credentials");
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: "CANDIDATE" | "EMPLOYER";
    // Employer specific fields
    companyName?: string;
    industry?: string;
    companySize?: string;
    description?: string;
    location?: string;
    contactPhone?: string;
  }) => {
    try {
      const response = await api.post("/auth/register", userData);
      const { token, user: userDataFromApi } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("job_portal_user", JSON.stringify(userDataFromApi));

      setUser(userDataFromApi);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (user) {
      try {
        const userId = user.id || user._id;
        const isEmployer = user.role === "EMPLOYER";
        const endpoint = isEmployer ? `/employers/${userId}` : `/auth/${userId}`;

        const response = await api.put(endpoint, updates);

        const updatedData = response.data.data || response.data;

        const finalUser = {
          ...user,
          ...updatedData,
          id: updatedData._id || updatedData.id,
        };

        setUser(finalUser);
        localStorage.setItem("job_portal_user", JSON.stringify(finalUser));
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to update profile");
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("job_portal_user");
    localStorage.removeItem("token");
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
