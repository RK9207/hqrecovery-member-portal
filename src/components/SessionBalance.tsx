import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface SessionBalanceProps {
  title: string;
  balance: number;
  icon: LucideIcon;
  loading: boolean;
}

export const SessionBalance: React.FC<SessionBalanceProps> = ({
  title,
  balance,
  icon: Icon,
  loading
}) => {
  const getProgressPercentage = () => {
    const maxSessions = 10;
    return Math.min((balance / maxSessions) * 100, 100);
  };

  return (
    <div className="bg-[#231f1e] rounded-xl p-6 border border-[#3a342f] relative shadow-lg">
      {loading && (
        <div className="absolute inset-0 bg-[#231f1e]/80 backdrop-blur-sm flex items-center justify-center rounded-xl">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#d8ba5b]"></div>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-[#2a2520] rounded-lg border border-[#3a342f]">
          <Icon className="w-5 h-5 text-gray-300" />
        </div>
        <span className="text-2xl font-bold text-white">{balance}</span>
      </div>
      
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
      
      <div className="w-full bg-[#2a2520] rounded-full h-2 mb-3">
        <div
          className="bg-[#d8ba5b] h-2 rounded-full transition-all duration-500"
          style={{ width: `${getProgressPercentage()}%` }}
        ></div>
      </div>
      
      <p className="text-sm text-gray-300">
        {balance === 0 ? (
          <span className="text-red-300 font-medium">No sessions remaining</span>
        ) : (
          `${balance} session${balance !== 1 ? 's' : ''} available`
        )}
      </p>
    </div>
  );
};