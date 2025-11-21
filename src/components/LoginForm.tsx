import React, { useState } from 'react';
import { Mail } from 'lucide-react';

interface LoginFormProps {
  onLogin: (email: string) => Promise<void>;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await onLogin(email);
    } catch (err) {
      setError('Email not found in our system. Please contact HQ Recovery support.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#231f1e] to-[#1a1715] flex items-center justify-center px-4">
      <div className="bg-[#231f1e] rounded-2xl shadow-2xl border border-[#3a342f] p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Member's Zone</h1>
          <p className="text-gray-300">Welcome to your wellness portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-[#3a342f] rounded-lg focus:ring-2 focus:ring-[#d8ba5b] focus:border-[#d8ba5b] transition-colors text-white placeholder-gray-400 bg-[#2a2520]"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-3">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d8ba5b] text-[#231f1e] py-3 px-4 rounded-lg font-semibold hover:bg-[#c9a852] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
          >
            {loading ? 'Verifying...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-300 mb-3">
            Not a member yet?{' '}
            <a 
              href="https://link.apisystem.tech/widget/form/DNIqEPpacW3rVpReaWej" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#d8ba5b] hover:text-[#c9a852] transition-colors font-medium"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};