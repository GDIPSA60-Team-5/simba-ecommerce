import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLogin, LoginRequest } from '../../hooks/useLogin';

export default function Login() {
  const [form, setForm] = useState<LoginRequest>({ username: '', password: '' });
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const [welcome, setWelcome] = useState('');

  useEffect(() => {
    if (location.state?.regSuccess) {
      setWelcome(`Registration successful! Welcome, ${location.state.name}!`);
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(form).then(() => {
      
      navigate('/');
    }).catch(error => {
    
      console.error("Login failed:", error);
    });
  };
  
  return (
    <div className="flex justify-center gap-35  mx-[5rem]">
      {welcome && (
        <div className="fixed top-5 right-5 bg-emerald-800 text-white px-4 py-2 rounded shadow-lg animate-slide-up-smooth">
  
          {welcome}
          <button onClick={() => setWelcome('')} className="ml-3">
            ×
          </button>
        </div>
      )}

      <div className="flex flex-col items-center gap-5">
        <img src="images/library2.png" width={500} alt="" />
        <div className="body max-w-[300px] text-center">
          <h2 className="uppercase text-3xl font-normal">Become A Member</h2>
          <p>You can unlock special discounts by signing our membership</p>
        </div>
        <Link to="/signup">Register Now →</Link>
      </div>

      <div className="w-min animate-slide-up-smooth">
        <h2 className="text-center text-3xl">Login</h2>
        <form
          onSubmit={handleSubmit}
          className="rounded-md w-[400px] max-w-sm space-y-4 flex flex-col items-center border border-gray-400 px-8 py-8"
        >
          {error && (
            <p className="w-full text-center py-3 text-sm font-medium bg-red-100 text-red-500 rounded">
              {error}!
            </p>
          )}

          <div className="input-group mb-10 w-full">
            <div className="mb-10">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-b-2 border-gray-400 hover:border-black focus:border-black outline-0 transition"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-b-2 border-gray-400 hover:border-black focus:border-black outline-0 transition"
              />
            </div>
          </div>

          <Link to="/signup" className="text-gray-600 hover:underline text-sm">
            Forgot your password?
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="w-[120px] bg-black text-white py-2 px-4 rounded-md hover:bg-neutral-700 transition text-center"
            >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
