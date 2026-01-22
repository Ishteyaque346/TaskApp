import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { authAPI } from '../api/auth.js';
import { Toast } from '../components/Toast.jsx';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const data = await authAPI.register(formData);
      login(data.user, data.token);
      setToast({ message: 'Registration successful!', type: 'success' });
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Registration failed';
      setToast({ message: errorMsg, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center p-4">
      {toast && <div className="fixed top-4 right-4"><Toast {...toast} onClose={() => setToast(null)} /></div>}
      
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold mb-2 text-center">Create Account</h1>
        <p className="text-gray-600 text-center mb-6">Join us today</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                errors.name ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                errors.email ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                errors.password ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="••••••"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="••••••"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};