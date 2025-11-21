import React from 'react';
import { Calendar, MessageSquare, Download, Phone, ExternalLink } from 'lucide-react';

export const QuickActions: React.FC = () => {
  const actions = [
    {
      title: 'Cancel Session',
      description: 'Cancel your current booking',
      icon: Calendar,
      link: 'https://link.apisystem.tech/widget/survey/BclWcIH3io6poSqZnHSG',
      primary: false
    },
    {
      title: 'Check Session Availability',
      description: 'View available time slots',
      icon: Calendar,
      link: 'https://api.leadconnectorhq.com/widget/booking/wBVwTDYR3QnwAR20GNYC',
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <a
              key={index}
              href={action.link}
              target={action.link.startsWith('http') ? '_blank' : '_self'}
              rel={action.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`p-4 rounded-lg transition-all duration-200 group transform hover:scale-105 ${
                action.primary 
                  ? 'bg-[#d8ba5b] text-[#231f1e] hover:bg-[#c9a852] shadow-lg' 
                  : 'bg-[#2a2520] text-gray-300 hover:bg-[#3a342f] border border-[#3a342f]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${action.primary ? 'bg-[#231f1e]/20' : 'bg-[#231f1e]'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {action.link.startsWith('http') && (
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