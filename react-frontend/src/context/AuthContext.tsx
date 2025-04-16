import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate()

    const refreshUser = () => {
        axios.get<User>('/api/auth/me', { withCredentials: true })
            .then((res) => setUser(res.data))
            .catch(() => setUser(null));
    };

    const logout = () => {
        const role = user?.role;
        axios.post('/api/auth/logout', {}, { withCredentials: true })
            .then(() => {
                setUser(null);
                if (role === 'ADMIN') {
                    navigate('/admin/login');
                } else {
                    navigate('/login');
                }
            })
            .catch((error) => {
                console.error('Logout failed:', error);
            });
    };

    useEffect(() => {
        refreshUser();
    }, []);

    const isAuthenticated = !!user;
    const isAdmin = user?.role === "ADMIN";

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, refreshUser, logout }}>
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
