import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

interface RegisterForm {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    address: string;
    dateOfBirth: string;
}

const Register = () => {
    const [form, setForm] = useState<RegisterForm>({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: '',
        dateOfBirth: '',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await axios.post('/api/auth/register', form, {
                headers: { 'Content-Type': 'application/json' },
            });

            navigate('/login');
        } catch (err: any) {
            setError(err.response?.status === 417 ? 'User already exists.' : 'Registration failed.');
        }
    };

    const renderInput = (
        label: string,
        name: keyof RegisterForm,
        type: string = 'text',
        required = false
    ) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={form[name]}
                onChange={handleChange}
                required={required}
                className="w-full border-b-2 border-gray-400 py-1 px-2 focus:outline-none focus:border-blue-600"
            />
        </div>
    );

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-xl p-8 w-full max-w-md space-y-5"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <div className="grid grid-cols-2 gap-4">
                    {renderInput('First Name', 'firstName', 'text', true)}
                    {renderInput('Last Name', 'lastName', 'text', true)}
                </div>

                {renderInput('Username', 'username', 'text', true)}
                {renderInput('Email', 'email', 'email', true)}
                {renderInput('Password', 'password', 'password', true)}
                {renderInput('Phone Number', 'phoneNumber')}
                {renderInput('Address', 'address')}
                {renderInput('Date of Birth', 'dateOfBirth', 'date')}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                    Register
                </button>

                <p className="text-sm text-center text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
