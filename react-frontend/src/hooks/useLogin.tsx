// hooks/useLogin.ts
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export interface LoginRequest {
    username: string;
    password: string;
}

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const { refreshUser } = useAuth();
    const navigate = useNavigate();

    const login = async (request: LoginRequest) => {
        setLoading(true);
        setError('');

        try {
            await axios.post('/api/auth/login', request, {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' },
            });

            await refreshUser();

            setTimeout(() => {
                navigate('/account');
            }, 1000);
        } catch (err: any) {
            setError(err.response?.data || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};
