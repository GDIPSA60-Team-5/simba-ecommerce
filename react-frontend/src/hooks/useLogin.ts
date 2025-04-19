// hooks/useLogin.ts
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export interface LoginRequest {
    username: string;
    password: string;
}

export const useLogin = (isAdmin: boolean = false) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const { refreshUser } = useAuth();
    const navigate = useNavigate();

    const endpoint = isAdmin ? "/api/admin/auth/login" : "/api/auth/login";
    const redirectPath = isAdmin ? "/admin/dashboard" : "/account";

    const login = async (request: LoginRequest) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.post(endpoint, request, {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' },
            });
            console.log('Login response:', response.data);

            await refreshUser();
            setTimeout(() => navigate(redirectPath), 1000);
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.response?.data || 'Login failed');
        } finally {
            setLoading(false);
        }
    };


    return { login, loading, error };
};
