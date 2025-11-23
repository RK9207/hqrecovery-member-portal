import React, { useState } from 'react';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { PasswordResetForm } from './PasswordResetForm';
import { EmailVerificationScreen } from './EmailVerificationScreen';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsAndConditions } from './TermsAndConditions';

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

type AuthView = 'signin' | 'signup' | 'reset' | 'email-verification' | 'privacy' | 'terms';

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const [currentView, setCurrentView] = useState<AuthView>('signin');
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string>('');

  const handleEmailVerificationRequired = (email: string) => {
    setPendingVerificationEmail(email);
    setCurrentView('email-verification');
  };

  const handleVerificationComplete = () => {
    // The auth state change will be handled by App.tsx
    // Just force a reload to ensure fresh auth state
    window.location.reload();
  };
  const renderView = () => {
    switch (currentView) {
      case 'signup':
        return (
          <SignUpForm
            onSuccess={onAuthSuccess}
            onEmailVerificationRequired={handleEmailVerificationRequired}
            onSwitchToSignIn={() => setCurrentView('signin')}
            onViewPrivacyPolicy={() => setCurrentView('privacy')}
            onViewTerms={() => setCurrentView('terms')}
          />
        );
      case 'reset':
        return (
          <PasswordResetForm
            onBackToSignIn={() => setCurrentView('signin')}
          />
        );
      case 'email-verification':
        return (
          <EmailVerificationScreen
            userEmail={pendingVerificationEmail}
            onVerificationComplete={handleVerificationComplete}
            onBackToSignIn={() => setCurrentView('signin')}
          />
        );
      case 'privacy':
        return (
          <PrivacyPolicy
            onBack={() => setCurrentView('signup')}
          />
        );
      case 'terms':
        return (
          <TermsAndConditions
            onBack={() => setCurrentView('signup')}
          />
        );
      case 'signin':
      default:
        return (
          <SignInForm
            onSuccess={onAuthSuccess}
            onSwitchToSignUp={() => setCurrentView('signup')}
            onForgotPassword={() => setCurrentView('reset')}
          />
        );
    }
  };

  return (
    <div className="transition-all duration-300">
      {renderView()}
    </div>
  );
};
