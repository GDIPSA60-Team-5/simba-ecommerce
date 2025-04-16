import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCallback } from 'react';
import axios from 'axios';

const useLogout = () => {
    const { refreshUser, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        axios.post('/api/auth/logout', {}, { withCredentials: true })
            .then(() => {
                refreshUser();

                const redirectPath = user?.role === 'ADMIN' ? '/admin/login' : '/login';
                navigate(redirectPath);
            })
            .catch((error) => {
                console.error('Logout failed:', error);
            });
    }, [refreshUser, navigate, user?.role]);

    return handleLogout;
};

export default useLogout;
