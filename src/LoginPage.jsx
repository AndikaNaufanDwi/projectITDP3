import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import loginImage from './assets/loginImage.png';
import logoBJB from './assets/bjb.png';
import axios from 'axios';
import './App.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const base_url = 'https://a3f8-202-146-38-197.ngrok-free.app';

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${base_url}/login`, {
        email,
        password,
      });

      const { access_token, role } = response.data;

      localStorage.setItem('token', access_token);
      localStorage.setItem('role', role);

      if (role === 'Manager PPK') {
        navigate('/dashboard');
      } else if (role === 'AO PPK') {
        navigate('/dashboard/ppk');
      } else {
        navigate('/fasilitas');
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.error || 'Login failed. Please try again.'
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section - Branding */}
      <div className="w-full md:w-1/2 bg-blue-900 text-white relative overflow-hidden flex justify-center items-center p-6">
        <img
          src={loginImage}
          alt="Background Decoration"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 z-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            NPL Recovery <br /> Monitoring System
          </h1>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-8 py-12 bg-white">
        <div className="max-w-sm w-full">
          <img src={logoBJB} alt="bank bjb" className="h-16 mx-auto mb-8" />
          <h2 className="text-center text-xl font-semibold text-gray-800 mb-6">
            Log In
          </h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-900 transition"
            >
              Log In
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}