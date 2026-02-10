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
    register: (userData: { firstName: string; lastName: string; email: string; password: string; age: string; phoneNumber: string; role: string }) => Promise<void>;
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

    const register = async (userData: { firstName: string; lastName: string; email: string; password: string; age: string; phoneNumber: string; role: string }) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            name: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
            role: userData.role.toUpperCase() as UserRole,
            avatar: `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase()
        };

        setUser(newUser);
        localStorage.setItem("job_portal_user", JSON.stringify(newUser));
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
