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
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("job_portal_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      
      // Extract token and user from various possible response formats
      let token = response.data.token;
      let userDataFromApi = response.data.user || response.data;
      
      // If user object has nested structure, extract it as well 
      if (userDataFromApi.user && userDataFromApi.token) {
        token = userDataFromApi.token;
        userDataFromApi = userDataFromApi.user;
      }

      // Ensure id is always set from _id
      const userData = {
        ...userDataFromApi,
        id: userDataFromApi._id || userDataFromApi.id,
      };

      console.log("Login response data:", response.data);
      console.log("Login user mapped with id:", userData.id);
      
      localStorage.setItem("token", token);
      localStorage.setItem("job_portal_user", JSON.stringify(userData));

      setUser(userData);
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
  }) => {
    try {
      const response = await api.post("/auth/register", userData);
      
      // Handle both response formats
      const userDataFromApi = response.data.user || response.data;
      const token = response.data.token;

      // Ensure id is set from _id
      const user_data = {
        ...userDataFromApi,
        id: userDataFromApi._id,
      };

      localStorage.setItem("token", token);
      localStorage.setItem("job_portal_user", JSON.stringify(user_data));

      setUser(user_data);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (user) {
      try {
        // Use id or fallback to _id
        const userId = user.id || user._id;
        
        const updatedData = {
          ...user,
          ...updates,
        };
        
        console.log("Sending update to backend with userId:", userId, "data:", updatedData);
        const response = await api.put(`/auth/${userId}`, updatedData);
        
        console.log("Backend response:", response.data);
        
        // Handle both response.data and response.data.data formats
        const updatedUser = response.data.data || response.data;
        
        // Ensure id is set from _id
        const finalUser = {
          ...updatedUser,
          id: updatedUser._id || updatedUser.id,
        };
        
        console.log("Updated user from response:", finalUser);
        
        setUser(finalUser);
        localStorage.setItem("job_portal_user", JSON.stringify(finalUser));
      } catch (error: any) {
        console.error("Update profile error:", error.response?.data);
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
