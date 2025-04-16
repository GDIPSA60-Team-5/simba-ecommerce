import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

interface LoginForm {
    username: string;
    password: string;
}

const AdminLogin = () => {
    const [form, setForm] = useState<LoginForm>({ username: '', password: '' });
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            await axios.post('/api/admin/auth/login', form, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            navigate('/admin/dashboard');
        } catch (err: any) {
            setError(err.response?.data || 'Login failed');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-xl p-8 w-full max-w-sm space-y-4"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={form.username}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                    Login
                </button>

                <p className="text-sm text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default AdminLogin;
