import React, { useState } from 'react';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { PasswordResetForm } from './PasswordResetForm';

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

type AuthView = 'signin' | 'signup' | 'reset';

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const [currentView, setCurrentView] = useState<AuthView>('signin');

  const renderView = () => {
    switch (currentView) {
      case 'signup':
        return (
          <SignUpForm
            onSuccess={onAuthSuccess}
            onSwitchToSignIn={() => setCurrentView('signin')}
          />
        );
      case 'reset':
        return (
          <PasswordResetForm
            onBackToSignIn={() => setCurrentView('signin')}
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
