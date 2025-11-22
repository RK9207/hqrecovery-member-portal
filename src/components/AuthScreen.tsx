import React, { useState } from 'react';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { PasswordResetForm } from './PasswordResetForm';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsAndConditions } from './TermsAndConditions';

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

type AuthView = 'signin' | 'signup' | 'reset' | 'privacy' | 'terms';

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const [currentView, setCurrentView] = useState<AuthView>('signin');

  const renderView = () => {
    switch (currentView) {
      case 'signup':
        return (
          <SignUpForm
            onSuccess={onAuthSuccess}
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
