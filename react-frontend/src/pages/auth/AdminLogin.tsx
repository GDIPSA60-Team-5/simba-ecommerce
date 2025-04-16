import { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { LoginRequest, useLogin } from '../../hooks/useLogin';
import Logo from '../../components/Logo';

const AdminLogin = () => {
    const [form, setForm] = useState<LoginRequest>({ username: '', password: '' });
    const { login, loading, error } = useLogin(true);


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
        <div className="flex flex-col items-center justify-center h-screen gap-10 bg-white">
            <Logo></Logo>
            <form
                onSubmit={handleSubmit}
                className="bg-white border border-black p-8 w-full max-w-sm space-y-4"
            >
                <h2 className="text-2xl font-light text-center text-black">Staff Portal</h2>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-black">
                        Username
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={form.username}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border shadow-sm focus:ring-black-500 focus:border-black-500"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-black">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border shadow-sm focus:ring-black-500 focus:border-black-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-black cursor-pointer text-white py-2 px-4 hover:bg-black transition"
                >
                    {loading ? "Logging In" : "Login"}
                </button>

                <p className="text-sm text-center text-gray-600">
                    <Link to="/" className="text-black hover:underline">
                        &#8592; Back To Home
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default AdminLogin;
