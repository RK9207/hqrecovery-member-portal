import React, { useState } from 'react';
import { User, Phone, Mail, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { HealthCommitmentModal } from './HealthCommitmentModal';

interface SignUpFormProps {
  onSuccess: () => void;
  onSwitchToSignIn: () => void;
  onViewPrivacyPolicy: () => void;
  onViewTerms: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess, onSwitchToSignIn, onViewPrivacyPolicy, onViewTerms }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    services: [] as string[],
    referralSource: '',
    visitedBefore: '',
    specialNotes: '',
    healthCommitmentAccepted: false,
    acknowledgement: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showHealthModal, setShowHealthModal] = useState(false);

  const serviceOptions = [
    'Recovery Sessions',
    'Team Sessions',
    'Personal Training',
    'Wellness Consultation',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox' && (e.target as HTMLInputElement).name === 'acknowledgement') {
      setFormData(prev => ({
        ...prev,
        acknowledgement: (e.target as HTMLInputElement).checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      visitedBefore: value
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!formData.healthCommitmentAccepted) {
      setError('You must read and accept the Health Commitment Statement');
      return false;
    }
    if (!formData.acknowledgement) {
      setError('You must acknowledge the terms to continue');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Step 2: Send data to webhook (excluding password)
      const webhookData = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        services: formData.services.join(', '),
        referralSource: formData.referralSource,
        visitedBefore: formData.visitedBefore,
        specialNotes: formData.specialNotes,
        healthCommitmentAccepted: formData.healthCommitmentAccepted,
        healthCommitmentAcceptedAt: new Date().toISOString(),
        acknowledgementAccepted: formData.acknowledgement,
        uid: userCredential.user.uid,
        timestamp: new Date().toISOString()
      };

      const webhookResponse = await fetch('https://hook.us2.make.com/qkxhqplk361sidrkn924ubd3dlcgowwj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
      });

      if (!webhookResponse.ok) {
        console.error('Webhook failed, but user account created');
      }

      setSuccess('Account created successfully! Redirecting...');
      setTimeout(() => {
        onSuccess();
      }, 1500);

    } catch (err: any) {
      console.error('Signup error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please sign in instead.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Please use at least 6 characters.');
      } else {
        setError('An error occurred during sign up. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#231f1e] to-[#1a1715] flex items-center justify-center px-4 py-8">
      <div className="bg-[#231f1e] rounded-2xl shadow-2xl border border-[#3a342f] p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Join HQ Recovery</h1>
          <p className="text-gray-300">Create your member account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-200 mb-2">
              Full Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-[#3a342f] rounded-lg focus:ring-2 focus:ring-[#d8ba5b] focus:border-[#d8ba5b] transition-colors text-white placeholder-gray-400 bg-[#2a2520]"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-200 mb-2">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-[#3a342f] rounded-lg focus:ring-2 focus:ring-[#d8ba5b] focus:border-[#d8ba5b] transition-colors text-white placeholder-gray-400 bg-[#2a2520]"
                placeholder="Your Phone Number (Whatsapp-Linked)"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
              Email <span className="text-red-400">*</span>
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
              Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-[#3a342f] rounded-lg focus:ring-2 focus:ring-[#d8ba5b] focus:border-[#d8ba5b] transition-colors text-white placeholder-gray-400 bg-[#2a2520]"
                placeholder="Minimum 6 characters"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-2">
              Confirm Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-[#3a342f] rounded-lg focus:ring-2 focus:ring-[#d8ba5b] focus:border-[#d8ba5b] transition-colors text-white placeholder-gray-400 bg-[#2a2520]"
                placeholder="Re-enter your password"
                required
              />
            </div>
          </div>

          {/* Services */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-3">
              Which services are you interested in?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {serviceOptions.map(service => (
                <label
                  key={service}
                  className={`flex items-center space-x-3 bg-[#2a2520] border-2 rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                    formData.services.includes(service)
                      ? 'border-[#d8ba5b] bg-[#d8ba5b]/10'
                      : 'border-[#3a342f] hover:border-[#d8ba5b]/50'
                  }`}
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={() => handleServiceToggle(service)}
                      className="w-5 h-5 rounded border-2 border-[#3a342f] bg-[#231f1e] cursor-pointer
                                 checked:bg-[#d8ba5b] checked:border-[#d8ba5b]
                                 focus:ring-2 focus:ring-[#d8ba5b] focus:ring-offset-0 focus:ring-offset-[#2a2520]
                                 transition-all duration-200"
                      style={{ accentColor: '#d8ba5b' }}
                    />
                  </div>
                  <span className="text-gray-200 text-sm font-medium">{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Referral Source */}
          <div>
            <label htmlFor="referralSource" className="block text-sm font-medium text-gray-200 mb-2">
              How did you hear about us?
            </label>
            <input
              type="text"
              id="referralSource"
              name="referralSource"
              value={formData.referralSource}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-[#3a342f] rounded-lg focus:ring-2 focus:ring-[#d8ba5b] focus:border-[#d8ba5b] transition-colors text-white placeholder-gray-400 bg-[#2a2520]"
              placeholder="Friend, social media, website, etc."
            />
          </div>

          {/* Visited Before */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-3">
              Have you visited our facility before?
            </label>
            <div className="flex space-x-4">
              <label className={`flex items-center justify-center space-x-3 bg-[#2a2520] border-2 rounded-lg p-3 cursor-pointer transition-all duration-200 flex-1 ${
                formData.visitedBefore === 'Yes'
                  ? 'border-[#d8ba5b] bg-[#d8ba5b]/10'
                  : 'border-[#3a342f] hover:border-[#d8ba5b]/50'
              }`}>
                <input
                  type="radio"
                  name="visitedBefore"
                  value="Yes"
                  checked={formData.visitedBefore === 'Yes'}
                  onChange={() => handleRadioChange('Yes')}
                  className="w-5 h-5 border-2 border-[#3a342f] bg-[#231f1e] cursor-pointer
                             checked:bg-[#d8ba5b] checked:border-[#d8ba5b]
                             focus:ring-2 focus:ring-[#d8ba5b] focus:ring-offset-0 focus:ring-offset-[#2a2520]
                             transition-all duration-200"
                  style={{ accentColor: '#d8ba5b' }}
                />
                <span className="text-gray-200 font-medium">Yes</span>
              </label>
              <label className={`flex items-center justify-center space-x-3 bg-[#2a2520] border-2 rounded-lg p-3 cursor-pointer transition-all duration-200 flex-1 ${
                formData.visitedBefore === 'No'
                  ? 'border-[#d8ba5b] bg-[#d8ba5b]/10'
                  : 'border-[#3a342f] hover:border-[#d8ba5b]/50'
              }`}>
                <input
                  type="radio"
                  name="visitedBefore"
                  value="No"
                  checked={formData.visitedBefore === 'No'}
                  onChange={() => handleRadioChange('No')}
                  className="w-5 h-5 border-2 border-[#3a342f] bg-[#231f1e] cursor-pointer
                             checked:bg-[#d8ba5b] checked:border-[#d8ba5b]
                             focus:ring-2 focus:ring-[#d8ba5b] focus:ring-offset-0 focus:ring-offset-[#2a2520]
                             transition-all duration-200"
                  style={{ accentColor: '#d8ba5b' }}
                />
                <span className="text-gray-200 font-medium">No</span>
              </label>
            </div>
          </div>

          {/* Special Notes */}
          <div>
            <label htmlFor="specialNotes" className="block text-sm font-medium text-gray-200 mb-2">
              Special Notes / Requests
            </label>
            <textarea
              id="specialNotes"
              name="specialNotes"
              value={formData.specialNotes}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-[#3a342f] rounded-lg focus:ring-2 focus:ring-[#d8ba5b] focus:border-[#d8ba5b] transition-colors text-white placeholder-gray-400 bg-[#2a2520] resize-none"
              placeholder="Any health conditions, preferences, or special requests..."
            />
          </div>

          {/* Health Commitment Statement */}
          <div className={`bg-[#2a2520] border-2 rounded-lg p-5 transition-all duration-200 ${
            formData.healthCommitmentAccepted
              ? 'border-[#d8ba5b] bg-[#d8ba5b]/5'
              : 'border-[#3a342f]'
          }`}>
            <label className="flex items-start space-x-3 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5">
                <input
                  type="checkbox"
                  name="healthCommitmentAccepted"
                  checked={formData.healthCommitmentAccepted}
                  onChange={handleInputChange}
                  className="w-6 h-6 rounded border-2 border-[#3a342f] bg-[#231f1e] cursor-pointer
                             checked:bg-[#d8ba5b] checked:border-[#d8ba5b]
                             focus:ring-2 focus:ring-[#d8ba5b] focus:ring-offset-2 focus:ring-offset-[#2a2520]
                             transition-all duration-200 flex-shrink-0"
                  style={{ accentColor: '#d8ba5b' }}
                  required
                />
              </div>
              <span className="text-gray-300 text-sm leading-relaxed">
                <span className="text-red-400 font-bold">*</span> I have read and agree to the{' '}
                <button
                  type="button"
                  onClick={() => setShowHealthModal(true)}
                  className="text-[#d8ba5b] hover:text-[#c9a852] underline font-medium transition-colors"
                >
                  Health Commitment Statement
                </button>
              </span>
            </label>
          </div>

          {/* Acknowledgement */}
          <div className={`bg-[#2a2520] border-2 rounded-lg p-5 transition-all duration-200 ${
            formData.acknowledgement
              ? 'border-[#d8ba5b] bg-[#d8ba5b]/5'
              : 'border-[#3a342f]'
          }`}>
            <label className="flex items-start space-x-3 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5">
                <input
                  type="checkbox"
                  name="acknowledgement"
                  checked={formData.acknowledgement}
                  onChange={handleInputChange}
                  className="w-6 h-6 rounded border-2 border-[#3a342f] bg-[#231f1e] cursor-pointer
                             checked:bg-[#d8ba5b] checked:border-[#d8ba5b]
                             focus:ring-2 focus:ring-[#d8ba5b] focus:ring-offset-2 focus:ring-offset-[#2a2520]
                             transition-all duration-200 flex-shrink-0"
                  style={{ accentColor: '#d8ba5b' }}
                  required
                />
              </div>
              <span className="text-gray-300 text-sm leading-relaxed">
                <span className="text-red-400 font-bold">*</span> I acknowledge that I am voluntarily participating in recovery and wellness services at HQ Recovery. I confirm that I am in good health to the best of my knowledge, and I understand it is my responsibility to consult with a healthcare provider if I have any existing medical conditions or concerns. I agree to follow all protocols and safety guidelines provided by HQ Recovery and accept full responsibility for my personal health and well-being during each session.
              </span>
            </label>
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d8ba5b] text-[#231f1e] py-3 px-4 rounded-lg font-semibold hover:bg-[#c9a852] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-gray-300">
            Already have an account?{' '}
            <button
              onClick={onSwitchToSignIn}
              className="text-[#d8ba5b] hover:text-[#c9a852] transition-colors font-medium"
            >
              Sign In
            </button>
          </p>
          <div className="text-xs text-gray-400">
            <button
              type="button"
              onClick={onViewPrivacyPolicy}
              className="hover:text-[#d8ba5b] transition-colors"
            >
              Privacy Policy
            </button>
            {' | '}
            <button
              type="button"
              onClick={onViewTerms}
              className="hover:text-[#d8ba5b] transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      {/* Health Commitment Modal */}
      <HealthCommitmentModal
        isOpen={showHealthModal}
        onClose={() => setShowHealthModal(false)}
      />
    </div>
  );
};
