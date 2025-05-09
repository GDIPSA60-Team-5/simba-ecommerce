import { useState, useEffect, ChangeEvent, FormEvent, useMemo } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

interface RegisterForm {
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: string;
  dateOfBirth: string;
}

const EMAIL_RGX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const typeSpeed = 90;

export default function Register() {
  const [form, setForm] = useState<RegisterForm>({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    dateOfBirth: '',
  });
  const [showText, setShowText] = useState(false);
  const [typed, setTyped] = useState('');
  const heroText = 'You can unlock special discounts by signing our membership';
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const emailValid = EMAIL_RGX.test(form.email.trim());
  const pwdOK = useMemo(
    () =>
      emailValid &&
      form.password !== '' &&
      form.password === form.confirmPassword,
    [emailValid, form.password, form.confirmPassword]
  );
  const pwdMismatch =
    form.confirmPassword !== '' && form.password !== form.confirmPassword;

  const passwordStrength = useMemo(() => {
    let score = 0;
    if (form.password.length >= 8) score++;
    if (/[A-Z]/.test(form.password)) score++;
    if (/[a-z]/.test(form.password)) score++;
    if (/[0-9]/.test(form.password)) score++;
    if (/[\W_]/.test(form.password)) score++;
    return score;
  }, [form.password]);

  const strengthLabels = [
    'Too Short',
    'Weak',
    'Fair',
    'Good',
    'Strong',
    'Very Strong',
  ];
  const strengthColors = [
    'bg-gray-200',
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-400',
    'bg-green-400',
    'bg-green-600',
  ];
  const strengthLabel = strengthLabels[passwordStrength];
  const strengthColor = strengthColors[passwordStrength];

  useEffect(() => {
    const t1 = setTimeout(() => setShowText(true), 600);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (!showText) return;
    let idx = 0;
    const id = setInterval(() => {
      setTyped(heroText.slice(0, ++idx));
      if (idx === heroText.length) clearInterval(id);
    }, typeSpeed);
    return () => clearInterval(id);
  }, [showText]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!pwdOK) {
      setError('Please complete all required fields correctly.');
      return;
    }

    try {
      const { confirmPassword, ...payload } = form;
      await axios.post('/api/auth/register', payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      navigate('/login', { state: { regSuccess: true, name: form.firstName } });
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError('Registration failed. Please try again later.');
      }
    }
  };

  const renderInput = (
    label: string,
    name: keyof RegisterForm,
    type = 'text',
    required = false,
    errorBorder = false
  ) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={form[name]}
        onChange={handleChange}
        required={required}
        className={`w-full border-b-2 py-1 px-2 outline-none transition ${errorBorder
          ? 'border-red-500 focus:border-red-500'
          : 'border-gray-400 focus:border-black'
          }`}
      />
    </div>
  );

  const typedDone = typed.length === heroText.length;

  return (
    <div className="flex justify-center gap-20 py-20 mx-[5rem]">
      <div className="flex flex-col items-center">
        <div className="flex items-start gap-8">
          <img
            src="images/library3.png"
            width={300}
            alt=""
            className="animate-spin-in"
          />
          <div className="h-[80px] flex items-start">
            {showText && !typedDone && (
              <p className="text-gray-700 font-medium animate-blink-caret">
                {typed}
              </p>

            )}

          </div>
        </div>
        {typedDone && (
          <p className="text-gray-700 font-medium mt-4 animate-fade-in">
            {heroText}
          </p>
        )}
        {typedDone && (
          <Link to="/login" className="underline animate-fade-in mt-4">
            Already a member? Sign in →
          </Link>
        )}
      </div>

      {typedDone && (
        <div className="w-min animate-slide-up-smooth">
          <h2 className="text-center text-3xl mb-4">Register</h2>
          <form
            onSubmit={handleSubmit}
            className="rounded-md w-[400px] max-w-sm space-y-6 flex flex-col items-center border border-gray-400 px-8 py-8"
          >
            {error && (
              <p className="w-full text-center py-3 text-sm font-medium bg-red-100 text-red-500 rounded">
                {error}
              </p>
            )}
            <div className="w-full space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {renderInput('First Name', 'firstName', 'text', true)}
                {renderInput('Last Name', 'lastName', 'text', true)}
              </div>
              {renderInput('Username', 'username', 'text', true)}
              {renderInput('Email', 'email', 'email', true)}
            </div>

            <div
              className={`w-full overflow-hidden transition-all duration-500 ${emailValid
                ? 'max-h-[240px] opacity-100 mt-6'
                : 'max-h-0 opacity-0'
                }`}
            >
              <div className="space-y-4">
                {renderInput('Password', 'password', 'password', true, pwdMismatch)}
                <div className="w-full mt-1">
                  <div className="h-2 w-full bg-gray-200 rounded">
                    <div
                      className={`h-2 rounded ${strengthColor}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm mt-1 text-gray-700">{strengthLabel}</p>
                </div>
                {renderInput(
                  'Confirm Password',
                  'confirmPassword',
                  'password',
                  true,
                  pwdMismatch
                )}
                {pwdMismatch && (
                  <p className="text-red-500 text-sm mt-1">
                    Passwords do not match
                  </p>
                )}
              </div>
            </div>

            <div
              className={`w-full overflow-hidden transition-all duration-500 ${pwdOK ? 'max-h-[400px] opacity-100 mt-6' : 'max-h-0 opacity-0'
                }`}
            >
              <div className="space-y-6">
                {renderInput('Phone Number', 'phoneNumber')}
                {renderInput('Address', 'address')}
                {renderInput('Date of Birth', 'dateOfBirth', 'date')}
              </div>
            </div>

            <button
              type="submit"
              disabled={!pwdOK}
              className={`w-full py-2 px-4 rounded-md text-white transition ${pwdOK
                ? 'bg-black hover:bg-neutral-800'
                : 'bg-gray-400 cursor-not-allowed'
                }`}
            >
              Register
            </button>

            <p className="text-sm text-center text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-black hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
