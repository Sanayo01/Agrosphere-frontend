import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
// 1. IMPORT YOUR CONFIG
import { API_BASE_URL } from '../config';
import AgroSphereLogo from '../assets/agrospherelogo-removebg-preview.png';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 2. REAL BACKEND ATTEMPT USING API_BASE_URL
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(email, data.token || 'user_auth_token_12345'); 
        navigate('/'); 
      } else {
        setError(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      console.warn("Backend not reachable. Proceeding with simulation for demo.");
      // FALLBACK: Allow the demo to continue even if the backend isn't live
      if (email && password) {
        login(email, 'demo_token_67890');
        navigate('/');
      } else {
        setError('Connection failed. Please check your credentials.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="flex justify-center mb-6">
            <img 
                src={AgroSphereLogo} 
                alt="AgroSphere Logo" 
                className="h-20 w-auto" 
            />
        </div>
        
        <h2 className="text-3xl font-bold text-center text-green-700">Welcome to AgroSphere</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="farmer@agrosphere.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="••••••••"
            />
          </div>
          
          {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-2 text-white font-bold rounded-md transition duration-150 ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isLoading ? 'Verifying...' : 'Log In'}
          </button>
        </form>
        
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-green-600 hover:text-green-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;