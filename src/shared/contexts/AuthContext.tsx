import React, { createContext, useContext, useState, useEffect } from "react";
import { CandidateService } from "../services/Auth.Service";
export type UserRole = "applicant" | "employer" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    age: string;
    phoneNumber: string;
    role: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await CandidateService.LoginUser({ email, password });
      const { token, user: userData } = response;

      const mappedUser: User = {
        id: userData._id || userData.id || "unknown",
        name: `${userData.FirstName} ${userData.LastName}`,
        email: userData.Email,
        role: userData.UserType.toLowerCase() as UserRole,
        avatar:
          userData.profile ||
          `${userData.FirstName[0]}${userData.LastName[0]}`.toUpperCase(),
      };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(mappedUser));
      setUser(mappedUser);
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  const register = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    age: string;
    phoneNumber: string;
    role: string;
  }) => {
    try {
      const response = await CandidateService.createUser({
        FirstName: userData.firstName,
        LastName: userData.lastName,
        Age: userData.age,
        PhoneNumber: userData.phoneNumber,
        Email: userData.email,
        password: userData.password,
        UserType: userData.role as "applicant" | "employer" | "admin",
      });

      await login(userData.email, userData.password);
    } catch (error) {
      throw new Error("Registration failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
