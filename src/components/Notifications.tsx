import React from 'react';
import { AlertCircle, Gift, Info, CheckCircle } from 'lucide-react';
import { UserData, Notification } from '../types';

interface NotificationsProps {
  userData: UserData | null;
  notifications: Notification[];
}

export const Notifications: React.FC<NotificationsProps> = ({ userData, notifications }) => {
  const getNotifications = () => {
    const dynamicNotifications = [];
    
    if (userData) {
      const totalSessions = (userData.recoveryBalance || 0) + (userData.ptBalance || 0) + (userData.teamBalance || 0);
      
      if (totalSessions === 0) {
        dynamicNotifications.push({
          id: 'no-sessions',
          type: 'warning',
          icon: AlertCircle,
          title: 'No Sessions Remaining',
          message: 'You have no sessions left. Purchase more to continue your wellness journey.',
          action: 'Purchase Sessions'
        });
      } else if (totalSessions <= 2) {
        dynamicNotifications.push({
          id: 'low-balance',
          type: 'info',
          icon: Info,
          title: 'Low Session Balance',
          message: `You have ${totalSessions} session${totalSessions !== 1 ? 's' : ''} remaining. Consider purchasing more to avoid interruptions.`,
          action: 'View Packages'
        });
      }
      
      if (userData.nextAppointment) {
      if (userData.nextSession) {
        const sessionDate = new Date(userData.nextSession);
        const today = new Date();
        const daysDiff = Math.ceil((sessionDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
        
        if (daysDiff <= 1 && daysDiff >= 0) {
          dynamicNotifications.push({
            id: 'upcoming-session',
            type: 'success',
            icon: CheckCircle,
            title: 'Upcoming Session',
            message: `Your session is ${daysDiff === 0 ? 'today' : 'tomorrow'}. Don't forget to arrive 10 minutes early.`,
            action: 'View Details'
          });
        }
      }
      }
    }
    
    // Combine dynamic notifications with sheet-based notifications
    const sheetNotifications = (notifications || []).map(notif => ({
      id: notif.id,
      type: notif.type,
      icon: getIconForType(notif.type),
      title: notif.title,
      message: notif.message,
      action: notif.action
    }));
    
    return [...dynamicNotifications, ...sheetNotifications];
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'warning':
        return AlertCircle;
      case 'info':
        return Info;
      case 'success':
        return CheckCircle;
      case 'promo':
        return Gift;
      default:
        return Info;
    }
  };

  const allNotifications = getNotifications();

  const getNotificationClasses = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-red-900/20 border-red-700 text-red-300';
      case 'info':
        return 'bg-blue-900/20 border-blue-700 text-blue-300';
      case 'success':
        return 'bg-green-900/20 border-green-700 text-green-300';
      case 'promo':
        return 'bg-[#d8ba5b]/10 border-[#d8ba5b]/30 text-[#d8ba5b]';
      default:
        return 'bg-[#2a2520] border-[#3a342f] text-gray-300';
    }
  };

  if (allNotifications.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#231f1e] rounded-xl p-6 border border-[#3a342f] shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6">Notifications & Updates</h2>
      
      <div className="space-y-4">
        {allNotifications.map((notification, index) => {
          const Icon = notification.icon;
          return (
            <div
              key={index}
              className={`border rounded-lg p-4 ${getNotificationClasses(notification.type)} transition-all duration-200`}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-current/10 rounded-lg">
                  <Icon className="w-4 h-4 flex-shrink-0" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{notification.title}</h3>
                  <p className="text-sm mb-3 opacity-90">{notification.message}</p>
                  <button className="text-sm font-medium hover:underline transition-colors">
                    {notification.action} →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};