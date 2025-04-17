import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

interface User {
    id: number;
    username: string;
    email: string;
    role: "ADMIN" | "USER";
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const refreshUser = () => {
        axios.get<User>('http://localhost:8080/api/auth/user/me', { withCredentials: true })
            .then((res) => setUser(res.data))
            .catch(() => setUser(null));
    };


    useEffect(() => {
        refreshUser();
    }, []);

    const isAuthenticated = !!user;
    const isAdmin = user?.role === "ADMIN";

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
