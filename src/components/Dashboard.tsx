import React from 'react';
import { RefreshCw, Calendar, CreditCard, Zap, Shield } from 'lucide-react';
import { SessionBalance } from './SessionBalance';
import { QuickActions } from './QuickActions';
import { Notifications } from './Notifications';
import { UserData } from '../types';

interface DashboardProps {
  userData: UserData | null;
  loading: boolean;
  onRefresh: () => void;
  notifications: any[];
}

export const Dashboard: React.FC<DashboardProps> = ({ userData, loading, onRefresh, notifications }) => {
  const [showTokenError, setShowTokenError] = React.useState(false);

  const handleBookSession = (e: React.MouseEvent) => {
    const recoveryBalance = userData?.recoveryBalance || 0;
    const teamBalance = userData?.teamBalance || 0;
    
    if (recoveryBalance === 0 && teamBalance === 0) {
      e.preventDefault();
      setShowTokenError(true);
      setTimeout(() => setShowTokenError(false), 5000); // Hide after 5 seconds
      return;
    }
    
    // If user has tokens, proceed with normal booking
    window.open('https://link.apisystem.tech/widget/survey/RbAQ3IK1JAYihuWJZjKw', '_blank');
  };

  const getMembershipStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'text-green-300 bg-green-900/20 border-green-700';
      case 'expired':
        return 'text-red-300 bg-red-900/20 border-red-700';
      case 'none':
      default:
        return 'text-gray-300 bg-gray-800/20 border-gray-600';
    }
  };

  const getMembershipStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return '✅';
      case 'expired':
        return '❌';
      case 'none':
      default:
        return '⚪';
    }
  };

  const getMotivationalMessage = () => {
    if (!userData) return '';
    
    const totalSessions = (userData.recoveryBalance || 0) + (userData.ptBalance || 0) + (userData.teamBalance || 0);
    
    if (totalSessions === 0) {
      return "Ready to begin your wellness journey? Purchase sessions to get started!";
    } else if (totalSessions <= 2) {
      return "You're making great progress! Consider booking your next session.";
    } else {
      return "You're one session closer to full recovery! Keep up the amazing work.";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#231f1e] to-[#1a1715]">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {userData?.firstName || 'Member'}!
              </h1>
              <div className="space-y-1">
                <p className="text-gray-300 max-w-2xl">{getMotivationalMessage()}</p>
                <p className="text-[#d8ba5b] text-sm font-medium">
                  💡 Refresh to see the latest data
                </p>
              </div>
            </div>
            <button
              onClick={onRefresh}
              disabled={loading}
              className="bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-lg font-medium hover:bg-white/20 disabled:opacity-50 transition-all duration-200 flex items-center space-x-2 border border-white/20"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          {/* Membership Status */}
          <div className="bg-[#231f1e] rounded-xl p-6 border border-[#3a342f] shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                <div className="bg-[#2a2520] rounded-lg p-2 border border-[#3a342f]">
                  <Shield className="w-5 h-5 text-gray-300" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Membership Status</h2>
                  <p className="text-gray-300 text-sm">Your current membership level</p>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-lg border font-semibold flex items-center space-x-2 w-full sm:w-auto justify-center sm:justify-start ${getMembershipStatusColor(userData?.membershipStatus || 'None')}`}>
                <span className="text-lg">{getMembershipStatusIcon(userData?.membershipStatus || 'None')}</span>
                <span className="capitalize">{userData?.membershipStatus || 'None'}</span>
              </div>
            </div>
          </div>

          {/* Highlighted Corner Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <button
              onClick={handleBookSession}
              className="bg-[#d8ba5b] text-[#231f1e] px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-[#c9a852] transition-all duration-200 flex items-center justify-center space-x-2 sm:space-x-3 transform hover:scale-105 shadow-xl text-base sm:text-lg"
            >
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Book a Session</span>
            </button>
            
            <a
              href="https://link.apisystem.tech/widget/survey/hA4CVbI02UAADyL19KjZ"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#231f1e] text-[#d8ba5b] border-2 border-[#d8ba5b] px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold hover:bg-[#d8ba5b] hover:text-[#231f1e] transition-all duration-200 flex items-center justify-center space-x-2 sm:space-x-3 transform hover:scale-105 shadow-xl text-base sm:text-lg"
            >
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Purchase Sessions</span>
            </a>
          </div>

          {/* Token Error Message */}
          {showTokenError && (
            <div className="bg-red-900/20 border border-red-700 rounded-xl p-4 animate-pulse">
              <p className="text-red-300 text-center font-medium">
                ❌ <strong>You need to have tokens to book sessions.</strong> Please purchase sessions first.
              </p>
            </div>
          )}

          {/* Booking Instructions */}
          <div className="bg-[#d8ba5b]/10 border border-[#d8ba5b]/30 rounded-xl p-4">
            <p className="text-[#d8ba5b] text-center font-medium">
              📱 <strong>Please note:</strong> After booking your session, please check your WhatsApp or email. Your session details are sent there.
            </p>
          </div>

          {/* Update Instructions */}
          <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4">
            <p className="text-blue-300 text-center font-medium">
              ⏱️ After booking or purchasing sessions, please click on refresh to see updates in the dashboard.
            </p>
          </div>

          {/* Session Balances */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SessionBalance
              title="Tokens"
              balance={userData?.recoveryBalance || 0}
              icon={Zap}
              loading={loading}
            />
            <SessionBalance
              title="Private Sessions"
              balance={userData?.teamBalance || 0}
              icon={CreditCard}
              loading={loading}
            />
          </div>

          {/* Quick Actions */}
          <QuickActions userData={userData} />

          {/* Latest Notifications & Updates */}
          {notifications && notifications.filter(n => n.isActive !== false).length > 0 && (
            <div className="bg-[#231f1e] rounded-xl p-6 border border-[#3a342f] shadow-lg">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <div className="bg-[#d8ba5b] rounded-lg p-2 mr-3">
                  <svg className="w-5 h-5 text-[#231f1e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-8h5l-5-5-5 5h5v8z" />
                  </svg>
                </div>
                Latest Notifications & Updates
              </h2>
              
              <div className="space-y-4">
                {notifications.filter(n => n.isActive !== false).slice(0, 3).map((notification, index) => {
                  return (
                    <div
                      key={notification.id || index}
                      className="border rounded-lg p-4 bg-[#2a2520] border-[#3a342f] text-gray-300 transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl flex-shrink-0 mt-1">
                          📢
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-lg">{notification.title}</h3>
                            <span className="text-xs text-gray-400 bg-[#3a342f] px-2 py-1 rounded">ID: {notification.id}</span>
                          </div>
                          <p className="text-sm opacity-90 leading-relaxed">{notification.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {notifications.filter(n => n.isActive !== false).length > 3 && (
                <div className="mt-6 text-center">
                  <button className="text-[#d8ba5b] hover:text-[#c9a852] font-medium transition-colors">
                    View All Notifications ({notifications.filter(n => n.isActive !== false).length})
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Notifications */}
          {(!notifications || notifications.filter(n => n.isActive !== false).length === 0) && (
            <div className="bg-[#231f1e] rounded-xl p-6 border border-[#3a342f] shadow-lg">
              <h2 className="text-xl font-bold text-white mb-4">Latest Notifications & Updates</h2>
              <div className="text-center py-8">
                <div className="bg-[#2a2520] rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-[#3a342f]">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-8h5l-5-5-5 5h5v8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No New Updates</h3>
                <p className="text-gray-300">Check back later for the latest news and announcements.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};