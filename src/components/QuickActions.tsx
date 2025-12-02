import React from 'react';
import { Calendar, MessageSquare, Download, Phone, ExternalLink, X } from 'lucide-react';

interface QuickActionsProps {
  userData?: {
    recoveryBalance?: number;
    teamBalance?: number;
  } | null;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ userData }) => {
  const [showTokenError, setShowTokenError] = React.useState(false);
  const [showCancelModal, setShowCancelModal] = React.useState(false);
  const [showSupportMessage, setShowSupportMessage] = React.useState(false);

  const handleAvailabilityCheck = (e: React.MouseEvent) => {
    const recoveryBalance = userData?.recoveryBalance || 0;
    
    if (recoveryBalance === 0) {
      e.preventDefault();
      setShowTokenError(true);
      setTimeout(() => setShowTokenError(false), 5000); // Hide after 5 seconds
      return;
    }
    
    // If user has recovery tokens, proceed with recovery session availability check
    window.open('https://api.leadconnectorhq.com/widget/booking/wBVwTDYR3QnwAR20GNYC', '_blank');
  };

  const handlePrivateSessionAvailability = (e: React.MouseEvent) => {
    const teamBalance = userData?.teamBalance || 0;
    
    if (teamBalance === 0) {
      e.preventDefault();
      setShowTokenError(true);
      setTimeout(() => setShowTokenError(false), 5000); // Hide after 5 seconds
      return;
    }
    
    // If user has private session tokens, proceed with private session availability check
    window.open('https://api.leadconnectorhq.com/widget/booking/fLRI2s7taS9cEd0sCgzF', '_blank');
  };

  const handleContactSupport = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowSupportMessage(true);
    setTimeout(() => setShowSupportMessage(false), 8000); // Hide after 8 seconds
  };

  const handleCancelSession = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowCancelModal(true);
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
      title: 'Check Recovery Session Availability',
      description: 'View available recovery session time slots',
      icon: Calendar,
      link: '#',
      onClick: handleAvailabilityCheck,
      primary: false
    },
    {
      title: 'Check Private Session Availability',
      description: 'View available private session time slots',
      icon: Calendar,
      link: '#',
      onClick: handlePrivateSessionAvailability,
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
      link: 'https://link.apisystem.tech/widget/survey/eyJsJkseRgLR5Cl5GHqe',
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

      {/* Cancel Session Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#231f1e] rounded-2xl shadow-2xl border border-[#3a342f] w-full max-w-2xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#3a342f]">
              <h2 className="text-2xl font-bold text-white">How to Cancel or Reschedule Your Session</h2>
              <button
                onClick={() => setShowCancelModal(false)}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-[#2a2520] rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 p-6">
              <div className="space-y-6 text-gray-300">
                <p className="text-lg">
                  When you book a session, you'll receive a confirmation message on WhatsApp and email. This message includes a <span className="text-[#d8ba5b] font-semibold">Cancellation Link</span>.
                </p>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">To Cancel Your Session</h3>
                  <ol className="list-decimal list-inside space-y-3 ml-4">
                    <li>Click the <span className="text-[#d8ba5b] font-semibold">Cancellation Link</span> in your confirmation message.</li>
                    <li>You'll be taken to the cancellation page.</li>
                    <li>Enter your reason for cancellation in the text box.</li>
                    <li>Click the <span className="text-[#d8ba5b] font-semibold">Cancel</span> button.</li>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Once you cancel:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Your appointment will be automatically cancelled.</li>
                    <li>Your token is instantly refunded.</li>
                    <li>You can immediately book a new date and time for your session.</li>
                  </ul>
                </div>
                  </ol>
                
                <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4 mt-8">

                  <h3 className="text-red-300 font-semibold mb-2">⚠️ Important</h3>
                  <p className="text-red-300">
                    If your session starts in less than 24 hours, the cancellation link will expire and cancellation will not be possible.
                  </p>
                </div>
              </div>
            </div>
                </div>
            {/* Footer */}
            <div className="border-t border-[#3a342f] p-6">
              <button
                onClick={() => setShowCancelModal(false)}
                className="w-full bg-[#d8ba5b] text-[#231f1e] py-3 px-4 rounded-lg font-semibold hover:bg-[#c9a852] transition-all duration-200 transform hover:scale-[1.02]"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};