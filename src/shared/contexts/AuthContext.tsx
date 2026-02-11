import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "CANDIDATE" | "EMPLOYER" | "ADMIN" | "GUEST";

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
    FirstName: string;
    LastName: string;
    Email: string;
    Age: string;
    PhoneNumber: string;
    password: string;
    UserType: "Applicant" | "Employer";
  }) => Promise<void>;
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
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const loggedInUser: User = {
        id: data.user.id || data.user._id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        avatar: data.user.avatar,
      };

      setUser(loggedInUser);
      localStorage.setItem("job_portal_user", JSON.stringify(loggedInUser));
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (userData: {
    FirstName: string;
    LastName: string;
    Email: string;
    Age: string;
    PhoneNumber: string;
    password: string;
    UserType: "Applicant" | "Employer";
  }) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      const newUser: User = {
        id: data.user.id || data.user._id,
        name: `${data.user.FirstName} ${data.user.LastName}`,
        email: data.user.Email,
        role:
          data.user.UserType === "applicant" ||
          data.user.UserType === "Applicant"
            ? "CANDIDATE"
            : "EMPLOYER",
        avatar: data.user.profile,
      };

      setUser(newUser);
      localStorage.setItem("job_portal_user", JSON.stringify(newUser));
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
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
