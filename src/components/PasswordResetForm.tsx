import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';

interface PasswordResetFormProps {
  onBackToSignIn: () => void;
}

export const PasswordResetForm: React.FC<PasswordResetFormProps> = ({ onBackToSignIn }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    
    // Log attempt for debugging
    console.log('🔄 Attempting password reset for email:', email);
    console.log('🔧 Firebase Auth instance:', auth);
    console.log('🌐 Current domain:', window.location.origin);

    try {
      console.log('📧 Sending password reset email');
      
      await sendPasswordResetEmail(auth, email);
      
      console.log('✅ Password reset email sent successfully');
      setSuccess(true);
      setEmail(''); // Clear form after successful send
    } catch (err: any) {
      // Detailed error logging
      console.error('❌ Password reset error details:');
      console.error('Error code:', err.code);
      console.error('Error message:', err.message);
      console.error('Full error object:', err);
      
      // Log Firebase Auth state
      console.log('🔍 Firebase Auth current user:', auth.currentUser);
      console.log('🔍 Firebase Auth app:', auth.app);
      
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email address. Please check the email or sign up for a new account.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (err.code === 'auth/missing-email') {
        setError('Please enter your email address');
      } else if (err.code === 'auth/invalid-continue-uri') {
        setError('Configuration error. Please contact support with error code: invalid-continue-uri');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many reset attempts. Please try again later.');
      } else if (err.code === 'auth/unauthorized-continue-uri') {
        setError('Domain not authorized. Please contact support with error code: unauthorized-continue-uri');
      } else if (err.code === 'auth/invalid-action-code') {
        setError('Invalid action code. Please contact support.');
      } else {
        setError(`Failed to send reset email. Error: ${err.code || 'unknown'}. Please contact support if this persists.`);
      }
      
      // Additional debugging info in console
      console.log('🔧 Debugging info:');
      console.log('- Email entered:', email);
      console.log('- Current URL:', window.location.href);
      console.log('- Firebase project ID:', auth.app.options.projectId);
      console.log('- Firebase API key:', auth.app.options.apiKey ? 'Present' : 'Missing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#231f1e] to-[#1a1715] flex items-center justify-center px-4">
      <div className="bg-[#231f1e] rounded-2xl shadow-2xl border border-[#3a342f] p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-gray-300">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="reset-email" className="block text-sm font-medium text-gray-200 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="reset-email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-[#3a342f] rounded-lg focus:ring-2 focus:ring-[#d8ba5b] focus:border-[#d8ba5b] transition-colors text-white placeholder-gray-400 bg-[#2a2520]"
                placeholder="Enter your email address"
                required
                disabled={success}
              />
            </div>
          </div>

          {/* Info/Disclaimer */}
          {!success && (
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
              <p className="text-blue-300 text-sm text-center">
                📧 Password reset email sent. Also check your spam/trash folder in case if you do not see it in your inbox.
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
              <p className="text-green-300 text-sm">
                Password reset email sent! Please check your spam/trash folder if you don't see it in your inbox.
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || success}
            className="w-full bg-[#d8ba5b] text-[#231f1e] py-3 px-4 rounded-lg font-semibold hover:bg-[#c9a852] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
          >
            {loading ? 'Sending...' : success ? 'Email Sent' : 'Send Reset Link'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <button
            onClick={onBackToSignIn}
            className="flex items-center justify-center space-x-2 text-sm text-gray-300 hover:text-[#d8ba5b] transition-colors font-medium mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sign In</span>
          </button>
        </div>

      </div>
    </div>
  );
};
