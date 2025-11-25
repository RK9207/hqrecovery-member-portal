import React from 'react';
import { Calendar, MessageSquare, Download, Phone, ExternalLink } from 'lucide-react';

interface QuickActionsProps {
  userData?: {
    recoveryBalance?: number;
    teamBalance?: number;
  } | null;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ userData }) => {
  const [showTokenError, setShowTokenError] = React.useState(false);
  const [showCancelMessage, setShowCancelMessage] = React.useState(false);
  const [showSupportMessage, setShowSupportMessage] = React.useState(false);

  const handleAvailabilityCheck = (e: React.MouseEvent) => {
    const recoveryBalance = userData?.recoveryBalance || 0;
    const teamBalance = userData?.teamBalance || 0;
    
    if (recoveryBalance === 0 && teamBalance === 0) {
      e.preventDefault();
      setShowTokenError(true);
      setTimeout(() => setShowTokenError(false), 5000); // Hide after 5 seconds
      return;
    }
    
    // If user has tokens, proceed with normal availability check
    window.open('https://api.leadconnectorhq.com/widget/booking/wBVwTDYR3QnwAR20GNYC', '_blank');
  };

  const handleContactSupport = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowSupportMessage(true);
    setTimeout(() => setShowSupportMessage(false), 8000); // Hide after 8 seconds
  };

  const handleCancelSession = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowCancelMessage(true);
    setTimeout(() => setShowCancelMessage(false), 8000); // Hide after 8 seconds
  };
  const actions = [
    {
      title: 'Cancel Session',
      description: 'Cancel your current booking',
      icon: Calendar,
      link: '#',
      onClick: handleCancelSession,
      primary: false
    },
    {
      title: 'Check Session Availability',
      description: 'View available time slots',
      icon: Calendar,
      link: '#',
      onClick: handleAvailabilityCheck,
      primary: false
    },
    {
      title: 'Give Feedback',
      description: 'Share your experience',
      icon: MessageSquare,
      link: 'https://link.apisystem.tech/widget/survey/l1Q1Kh90pZvI0HyOpIOg',
      primary: false
    },
    {
      title: 'HQ Recovery Protocol',
      description: 'Get your wellness guide',
      icon: Download,
      link: 'https://docs.google.com/document/d/1ypxdNAskIAeNkk0R9OKIHpFTjKgFEFpMqmlc6auWQaQ/edit?usp=sharing',
      primary: false
    },
    {
      title: 'Contact Support',
      description: 'Get help from our team',
      icon: Phone,
      link: '#',
      onClick: handleContactSupport,
      primary: false
    }
  ];

  return (
    <div className="bg-[#231f1e] rounded-xl p-6 border border-[#3a342f] shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6">Additional Actions</h2>
      
      {/* Token Error Message */}
      {showTokenError && (
        <div className="bg-red-900/20 border border-red-700 rounded-xl p-4 mb-6 animate-pulse">
          <p className="text-red-300 text-center font-medium">
            ❌ <strong>You need to have tokens to check availability.</strong> Please purchase sessions first.
          </p>
        </div>
      )}
      
      {/* Cancel Session Message */}
      {showCancelMessage && (
        <div className="bg-blue-900/20 border border-blue-700 rounded-xl p-4 mb-6 animate-pulse">
          <p className="text-blue-300 text-center font-medium">
            📞 <strong>Please call us at +353 838203627 or email us at team@hqrecovery.com to cancel session</strong>
          </p>
        </div>
      )}
      
      {/* Contact Support Message */}
      {showSupportMessage && (
        <div className="bg-blue-900/20 border border-blue-700 rounded-xl p-4 mb-6 animate-pulse">
          <p className="text-blue-300 text-center font-medium">
            📞 <strong>Please call us at +353 838203627 or email us at team@hqrecovery.com for support</strong>
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <a
              key={index}
              href={action.onClick ? '#' : action.link}
              target={action.onClick ? '_self' : (action.link.startsWith('http') ? '_blank' : '_self')}
              rel={action.onClick ? undefined : (action.link.startsWith('http') ? 'noopener noreferrer' : undefined)}
              className={`p-4 rounded-lg transition-all duration-200 group transform hover:scale-105 ${
                action.primary 
                  ? 'bg-[#d8ba5b] text-[#231f1e] hover:bg-[#c9a852] shadow-lg' 
                  : 'bg-[#2a2520] text-gray-300 hover:bg-[#3a342f] border border-[#3a342f]'
              }`}
              onClick={action.onClick}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${action.primary ? 'bg-[#231f1e]/20' : 'bg-[#231f1e]'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {!action.onClick && action.link.startsWith('http') && (
                  <ExternalLink className="w-4 h-4 opacity-60" />
                )}
              </div>
              <h3 className="font-semibold mb-1">{action.title}</h3>
              <p className="text-sm opacity-80">{action.description}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
};