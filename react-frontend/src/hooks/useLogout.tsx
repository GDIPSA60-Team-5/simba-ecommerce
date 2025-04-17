import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCallback } from 'react';
import axios from 'axios';

const useLogout = () => {
    const { refreshUser, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        // clear session for delivery type and address in cart page when user logs out
        sessionStorage.removeItem('shippingAddress');
        sessionStorage.removeItem('deliveryType');

        axios.post('http://localhost:8080/api/auth/user/logout', {}, { withCredentials: true })
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
