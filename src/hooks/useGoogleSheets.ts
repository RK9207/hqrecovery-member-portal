import { useState, useCallback } from 'react';
import { UserData, Notification } from '../types';
import { googleSheetsService } from '../services/googleSheets';

export const useGoogleSheets = (userEmail?: string) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshData = useCallback(async () => {
    if (!userEmail) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch user data, notifications, and sessions in parallel
      const [sheetData, notificationData, sessionData] = await Promise.all([
        googleSheetsService.getUserData(userEmail),
        googleSheetsService.getNotifications(userEmail),
        googleSheetsService.getUserAppointments(userEmail)
      ]);
      
      if (!sheetData) {
        setError('User not found in the system. Please contact support.');
        setUserData(null);
        setNotifications([]);
        setSessions([]);
        return;
      }

      // Parse the name field to get first and last name
      const nameParts = sheetData.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Transform session data
      const transformedSessions = sessionData.map(session => ({
        id: session.sessionId,
        date: session.sessionDate, // Keep as string from sheet (DD/MM/YYYY)
        time: session.sessionTime, // Keep as string from sheet (HH:MM)
        serviceType: session.sessionType,
        status: session.sessionStatus,
        provider: '', // Not available in current sheet structure
        location: 'HQ Recovery Center', // Default location
        notes: `Session ID: ${session.sessionId}`
      }));

      // Calculate total sessions used (sessions with status "showed")
      const totalSessionsAttended = transformedSessions.filter(session => 
        session.status && session.status.toLowerCase() === 'showed'
      ).length;

      // Calculate last visit date (most recent session with "showed" status)
      const showedSessions = transformedSessions.filter(session => 
        session.status && session.status.toLowerCase() === 'showed'
      );
      
      let lastVisit = 'N/A';
      if (showedSessions.length > 0) {
        // Sort by date to get the most recent
        const sortedShowedSessions = showedSessions.sort((a, b) => {
          const getDateValue = (dateString: string) => {
            const dateMatch = dateString.match(/Date\((\d{4})\/(\d{2})\/(\d{2})\)/);
            if (dateMatch) {
              const year = parseInt(dateMatch[1], 10);
              const month = parseInt(dateMatch[2], 10) - 1;
              const day = parseInt(dateMatch[3], 10);
              return new Date(year, month, day).getTime();
            }
            
            const parts = dateString.split('/');
            if (parts.length === 3) {
              const day = parseInt(parts[0], 10);
              const month = parseInt(parts[1], 10) - 1;
              const year = parseInt(parts[2], 10);
              return new Date(year, month, day).getTime();
            }
            return new Date(dateString).getTime();
          };
          
          return getDateValue(b.date) - getDateValue(a.date); // Most recent first
        });
        
        // Format the most recent session date
        const mostRecentSession = sortedShowedSessions[0];
        const dateMatch = mostRecentSession.date.match(/Date\((\d{4})\/(\d{2})\/(\d{2})\)/);
        if (dateMatch) {
          const year = parseInt(dateMatch[1], 10);
          const month = parseInt(dateMatch[2], 10) - 1;
          const day = parseInt(dateMatch[3], 10);
          const date = new Date(year, month, day);
          lastVisit = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}, ${date.getFullYear()}`;
        } else {
          const parts = mostRecentSession.date.split('/');
          if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const year = parseInt(parts[2], 10);
            const date = new Date(year, month, day);
            lastVisit = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}, ${date.getFullYear()}`;
          }
        }
      }

      // Transform sheet data to UserData format
      const transformedData: UserData = {
        email: sheetData.email,
        firstName,
        lastName,
        phone: sheetData.phone,
        recoveryBalance: sheetData.recoveryBalance,
        ptBalance: sheetData.ptBalance,
        teamBalance: sheetData.teamBalance,
        membershipStatus: sheetData.membershipStatus,
        totalSessionsAttended: totalSessionsAttended,
        joiningDate: sheetData.joiningDate || 'N/A',
        lastVisit: lastVisit,
        sessions: transformedSessions
      };

      setUserData(transformedData);
      
      // Transform notifications data
      const transformedNotifications: Notification[] = notificationData.map(notif => ({
        id: notif.id,
        title: notif.title,
        description: notif.description,
        isActive: notif.isActive
      }));
      
      setNotifications(transformedNotifications);
      setSessions(transformedSessions);
    } catch (err) {
      setError('Failed to load user data. Please check your internet connection and try again.');
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  return {
    userData,
    notifications,
    sessions,
    loading,
    error,
    refreshData
  };
};