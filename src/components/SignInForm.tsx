import React, { useState } from 'react';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

interface SignInFormProps {
  onSuccess: () => void;
  onSwitchToSignUp: () => void;
  onForgotPassword: () => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({ onSuccess, onSwitchToSignUp, onForgotPassword }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      onSuccess();
    } catch (err: any) {
      console.error('Sign in error:', err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password. Please try again.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else {
        setError('An error occurred during sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#231f1e] to-[#1a1715] flex items-center justify-center px-4">
      <div className="bg-[#231f1e] rounded-2xl shadow-2xl border border-[#3a342f] p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-300">Sign in to your HQ Recovery account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-[#3a342f] rounded-lg focus:ring-2 focus:ring-[#d8ba5b] focus:border-[#d8ba5b] transition-colors text-white placeholder-gray-400 bg-[#2a2520]"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-xs text-[#d8ba5b] hover:text-[#c9a852] transition-colors font-medium"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-[#3a342f] rounded-lg focus:ring-2 focus:ring-[#d8ba5b] focus:border-[#d8ba5b] transition-colors text-white placeholder-gray-400 bg-[#2a2520]"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d8ba5b] text-[#231f1e] py-3 px-4 rounded-lg font-semibold hover:bg-[#c9a852] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-gray-300">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignUp}
              className="text-[#d8ba5b] hover:text-[#c9a852] transition-colors font-medium"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
