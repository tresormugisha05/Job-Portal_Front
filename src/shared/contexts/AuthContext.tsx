import React, { createContext, useContext, useState, useEffect } from "react";

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
    register: (userData: { name: string; email: string; role: "CANDIDATE" | "EMPLOYER" }) => Promise<void>;
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

    const login = async (email: string, _password: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        let mockUser: User;

        // Simple mock logic: admin email gets admin role, otherwise based on a "database" simulation
        // In a real app, this would be a backend call
        if (email.includes("admin")) {
            mockUser = { id: "a1", name: "System Admin", email, role: "ADMIN", avatar: "SA" };
        } else if (email.includes("employer")) {
            mockUser = { id: "e1", name: "Tech Corp", email, role: "EMPLOYER", avatar: "TC" };
        } else {
            mockUser = { id: "c1", name: "John Doe", email, role: "CANDIDATE", avatar: "JD" };
        }

        setUser(mockUser);
        localStorage.setItem("job_portal_user", JSON.stringify(mockUser));
    };

    const register = async (userData: { name: string; email: string; role: "CANDIDATE" | "EMPLOYER" }) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            ...userData,
            avatar: userData.name.split(" ").map(n => n[0]).join("").toUpperCase()
        };

        setUser(newUser);
        localStorage.setItem("job_portal_user", JSON.stringify(newUser));
    };

    const updateProfile = async (updates: Partial<User>) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

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
        logout
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
