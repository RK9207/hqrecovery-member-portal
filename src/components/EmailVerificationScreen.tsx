import React, { useState } from 'react';
import { Mail, RefreshCw, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { sendEmailVerification, reload } from 'firebase/auth';
import { auth } from '../config/firebase';

interface EmailVerificationScreenProps {
  userEmail: string;
  onVerificationComplete: () => void;
  onBackToSignIn: () => void;
}

export const EmailVerificationScreen: React.FC<EmailVerificationScreenProps> = ({ 
  userEmail, 
  onVerificationComplete, 
  onBackToSignIn 
}) => {
  const [loading, setLoading] = useState(false);
  const [checkingVerification, setCheckingVerification] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleResendVerification = async () => {
    if (!auth.currentUser) {
      setError('No user found. Please sign up again.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await sendEmailVerification(auth.currentUser);
      setSuccess('Verification email sent! Please check your inbox and spam folder.');
    } catch (err: any) {
      console.error('Error sending verification email:', err);
      if (err.code === 'auth/too-many-requests') {
        setError('Too many requests. Please wait a few minutes before requesting another verification email.');
      } else {
        setError('Failed to send verification email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCheckVerification = async () => {
    if (!auth.currentUser) {
      setError('No user found. Please sign up again.');
      return;
    }

    setCheckingVerification(true);
    setError('');

    try {
      // Reload the user to get the latest emailVerified status
      await reload(auth.currentUser);
      
      if (auth.currentUser.emailVerified) {
        setSuccess('Email verified successfully! Redirecting...');
        setTimeout(() => {
          onVerificationComplete();
        }, 1500);
      } else {
        setError('Email not yet verified. Please check your email and click the verification link.');
      }
    } catch (err: any) {
      console.error('Error checking verification:', err);
      setError('Failed to check verification status. Please try again.');
    } finally {
      setCheckingVerification(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#231f1e] to-[#1a1715] flex items-center justify-center px-4">
      <div className="bg-[#231f1e] rounded-2xl shadow-2xl border border-[#3a342f] p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-[#d8ba5b]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-[#d8ba5b]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Verify Your Email</h1>
          <p className="text-gray-300">
            We've sent a verification link to <span className="text-[#d8ba5b] font-medium">{userEmail}</span>
          </p>
        </div>

        <div className="space-y-6">
          {/* Instructions */}
          <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
            <h3 className="text-blue-300 font-semibold mb-2">Next Steps:</h3>
            <ol className="text-blue-300 text-sm space-y-1 list-decimal list-inside">
              <li>Check your email inbox for a verification message from Firebase</li>
              <li>Click the verification link in the email</li>
              <li>Return here and click "I've Verified My Email"</li>
            </ol>
            <p className="text-blue-300 text-xs mt-3">
              💡 Don't forget to check your spam/junk folder if you don't see the email.
            </p>
          </div>

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
              <p className="text-green-300 text-sm">{success}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleCheckVerification}
              disabled={checkingVerification}
              className="w-full bg-[#d8ba5b] text-[#231f1e] py-3 px-4 rounded-lg font-semibold hover:bg-[#c9a852] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
            >
              {checkingVerification ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Checking...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>I've Verified My Email</span>
                </>
              )}
            </button>

            <button
              onClick={handleResendVerification}
              disabled={loading}
              className="w-full bg-[#2a2520] text-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-[#3a342f] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-[#3a342f] flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  <span>Resend Verification Email</span>
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-[#3a342f]">
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
    </div>
  );
};