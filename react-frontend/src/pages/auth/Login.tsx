import { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useLogin, LoginRequest } from '../../hooks/useLogin';


const Login = () => {
    const [form, setForm] = useState<LoginRequest>({ username: '', password: '' });
    const { login, loading, error } = useLogin();

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
        <div className="flex justify-center gap-40 py-20 mx-[5rem]">
            <div className='flex flex-col items-center gap-5'>
                <img src="images/library.png" width={300} alt="" />
                <div className="body max-w-[300px] text-center">
                    <h2 className='uppercase text-3xl font-normal'>Become A Member</h2>
                    <p>You can unlock special discounts by signing our membership</p>
                </div>

                <Link to={"/signup"}>Register Now →</Link>
            </div>

            <div className='w-min'>
                <h2 className='text-center text-3xl'>Login</h2>
                <form
                    onSubmit={handleSubmit}
                    className="rounded-md w-[400px] max-w-sm space-y-4 flex flex-col items-center border-1 border-gray-400 m-5 px-15 py-15"
                >

                    {error && <p className="w-full text-center capitalize py-3 text-sm font-medium bg-red-100 text-red-500 rounded-[5px]">{error}!</p>}

                    <div className="input-group mb-10 w-full">
                        <div className='mb-10'>
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
                                className="mt-1 block w-full border-b-2 border-b-gray-400 hover:border-b-black focus:border-b-black outline-0 transition"
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
                                className="mt-1 block w-full border-b-2 border-b-gray-400 hover:border-b-black focus:border-b-black outline-0 transition"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="align-self-center w-min bg-black whitespace-nowrap cursor-pointer text-white py-2 px-10 rounded-md hover:bg-neutral-700
                        transition"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Login;
