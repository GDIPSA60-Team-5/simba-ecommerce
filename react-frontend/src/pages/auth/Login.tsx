import { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useLogin, LoginRequest } from '../../hooks/useLogin';


const Login = () => {
    const [form, setForm] = useState<LoginRequest>({ username: '', password: '' });
    const { login, loading, error } = useLogin()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(form);
    };


    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-xl p-8 w-full max-w-sm space-y-4 flex flex-col"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

                {error && <p className="px-10 py-5 bg-gray-200 text rounded-[5px]">{error}</p>}

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
                    disabled={loading}
                    className="align-self-center w-min bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                    {loading ? 'Logging in...' : 'Login'}
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

export default Login;
