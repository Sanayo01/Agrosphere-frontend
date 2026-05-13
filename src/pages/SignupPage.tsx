import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
// 1. IMPORT YOUR CONFIG
import { API_BASE_URL } from '../config';
import AgroSphereLogo from '../assets/agrospherelogo-removebg-preview.png';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    try {
      // 2. REAL BACKEND CALL USING ENVIRONMENT VARIABLES
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success: Trigger the signup logic in your AuthContext
        signup({ name, email, password });
        navigate('/'); 
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.warn("Backend unreachable. Using simulation mode for demo.");
      // FALLBACK: Ensures your demo doesn't fail if the backend is offline
      signup({ name, email, password });
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="flex justify-center mb-6">
            <img 
                src={AgroSphereLogo} 
                alt="AgroSphere Logo" 
                className="h-20 w-auto" 
            />
        </div>
        
        <h2 className="text-3xl font-bold text-center text-green-700">Join AgroSphere</h2>
        <p className="text-center text-gray-500 text-sm mt-1">Start your journey toward transparent farming.</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="e.g. Sanusi Taiwo Ayodeji"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="farmer@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-600 font-medium text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-3 text-white font-bold rounded-md transition duration-150 ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;