import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { UserSessionDTO } from '../types/dto/UserSessionDTO';


interface AuthContextType {
    user: UserSessionDTO | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    refreshUser: () => void;
    loading: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserSessionDTO | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = () => {
        setLoading(true);
        axios.get<UserSessionDTO>('/api/auth/me', { withCredentials: true })
            .then((res) => setUser(res.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        refreshUser();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isAdmin: user?.role === "ADMIN",
            refreshUser,
            loading
        }}>
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
