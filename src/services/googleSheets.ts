// Google Sheets API integration service for HQ Recovery
// Sheet ID: 1vxCrle-dndD661Duj5LaemgDQwNRVxnqZOYZxbNc8_o

const SHEET_ID = '1vxCrle-dndD661Duj5LaemgDQwNRVxnqZOYZxbNc8_o';
const MEMBER_SHEET_NAME = 'Sheet1';
const NOTIFICATIONS_SHEET_NAME = 'Sheet2';
const APPOINTMENTS_SHEET_NAME = 'Sheet3';

interface SheetRow {
  name: string;
  phone: string;
  email: string;
  recoveryBalance: number;
  ptBalance: number;
  teamBalance: number;
}

interface NotificationRow {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
}

interface AppointmentRow {
  name: string;
  email: string;
  phone: string;
  sessionDate: string;
  sessionTime: string;
  sessionType: string;
  sessionId: string;
  sessionStatus: string;
}

export class GoogleSheetsService {
  private getMemberDataUrl() {
    return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${MEMBER_SHEET_NAME}`;
  }

  private getNotificationsUrl() {
    return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${NOTIFICATIONS_SHEET_NAME}`;
  }

  private getAppointmentsUrl() {
    return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${APPOINTMENTS_SHEET_NAME}`;
  }

  async getUserData(email: string): Promise<SheetRow | null> {
    try {
      const response = await fetch(this.getMemberDataUrl());
      if (!response.ok) {
        throw new Error(`Failed to fetch data from Google Sheets. Status: ${response.status}. Please ensure the Google Sheet is published to the web.`);
      }

      const text = await response.text();
      // Parse Google Sheets JSON response (removes the callback wrapper)
      const jsonText = text.substring(47).slice(0, -2);
      const data = JSON.parse(jsonText);
      
      if (!data.table || !data.table.rows) {
        return null;
      }

      const rows = data.table.rows;
      
      // Find user by email (Column C)
      const userRow = rows.find((row: any) => {
        const emailCell = row.c[2]; // Column C (0-indexed)
        return emailCell && emailCell.v && emailCell.v.toLowerCase() === email.toLowerCase();
      });
      
      if (!userRow || !userRow.c) {
        return null;
      }

      // Extract data from the row
      const cells = userRow.c;
      
      return {
        name: cells[0]?.v || '', // Column A: Name
        phone: cells[1]?.v || '', // Column B: Phone Number
        email: cells[2]?.v || '', // Column C: Email
        recoveryBalance: parseInt(cells[3]?.v) || 0, // Column D: Recovery Sessions
        ptBalance: parseInt(cells[4]?.v) || 0, // Column E: PT Sessions
        teamBalance: parseInt(cells[5]?.v) || 0, // Column F: Private Sessions
        membershipStatus: cells[6]?.v || 'None', // Column G: Membership Status
        joiningDate: cells[7]?.f || String(cells[7]?.v || ''), // Column H: Joining Date (formatted)
      };
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('Unable to connect to Google Sheets. Please check your internet connection and ensure the Google Sheet is published to the web.');
      }
      console.error('Error fetching user data:', error);
      throw error;
    }
  }

  async getNotifications(userEmail?: string): Promise<NotificationRow[]> {
    try {
      const response = await fetch(this.getNotificationsUrl());
      if (!response.ok) {
        console.warn('Sheet2 (notifications) not accessible. Returning empty notifications array.');
        return [];
      }

      const text = await response.text();
      
      // Check if the response contains an error (common when sheet doesn't exist)
      if (text.includes('Invalid query') || text.includes('INVALID_QUERY')) {
        console.warn('Sheet2 (notifications) does not exist or is not published. Returning empty notifications array.');
        return [];
      }
      
      const jsonText = text.substring(47).slice(0, -2);
      const data = JSON.parse(jsonText);
      
      if (!data.table || !data.table.rows) {
        return [];
      }

      const rows = data.table.rows;
      const notifications: NotificationRow[] = [];
      
      rows.forEach((row: any) => {
        if (!row.c) return;
        
        const cells = row.c;
        const notificationStatus = cells[3]?.v || '';
        const isActive = notificationStatus.toLowerCase() === 'active';
        
        // Only show active notifications
        if (!isActive) return;
        
        notifications.push({
          id: cells[0]?.v || '', // Column A: ID
          title: cells[1]?.v || '', // Column B: Title
          description: cells[2]?.v || '', // Column C: Description
          isActive: isActive // Column D: Notification Status
        });
      });
      
      return notifications;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return []; // Return empty array on error, don't break the app
    }
  }

  async getUserAppointments(email: string): Promise<AppointmentRow[]> {
    try {
      const response = await fetch(this.getAppointmentsUrl());
      if (!response.ok) {
        console.warn('Sheet3 (sessions) not accessible. Returning empty sessions array.');
        return [];
      }

      const text = await response.text();
      
      // Check if the response contains an error (common when sheet doesn't exist)
      if (text.includes('Invalid query') || text.includes('INVALID_QUERY')) {
        console.warn('Sheet3 (sessions) does not exist or is not published. Returning empty sessions array.');
        return [];
      }
      
      const jsonText = text.substring(47).slice(0, -2);
      const data = JSON.parse(jsonText);
      
      if (!data.table || !data.table.rows) {
        return [];
      }

      const rows = data.table.rows;
      const sessions: AppointmentRow[] = [];
      
      rows.forEach((row: any) => {
        if (!row.c) return;
        
        const cells = row.c;
        const sessionEmail = cells[1]?.v || '';
        
        // Filter sessions for the specific user
        if (sessionEmail.toLowerCase() !== email.toLowerCase()) {
          return;
        }
        
        sessions.push({
          name: cells[0]?.v || '', // Column A: Name
          email: cells[1]?.v || '', // Column B: Email
          phone: cells[2]?.v || '', // Column C: Phone Number
          // use the formatted strings from the sheet (e.g. "25/07/2025" & "10:00")
          sessionDate: cells[3]?.f || String(cells[3]?.v || ''), // Column D: Session Date
          sessionTime: cells[4]?.f || String(cells[4]?.v || ''), // Column E: Session Time
          sessionType: cells[5]?.v || '', // Column F: Session Type
          sessionId: cells[6]?.v || '', // Column G: Session ID
          sessionStatus: cells[7]?.v || '' // Column H: Session Status
        });
      });
      
      // Sort sessions by date (newest first)
      sessions.sort((a, b) => {
        const dateA = this.parseDDMMYYYY(a.sessionDate);
        const dateB = this.parseDDMMYYYY(b.sessionDate);
        return dateB.getTime() - dateA.getTime();
      });
      
      return sessions;
    } catch (error) {
      console.error('Error fetching sessions:', error);
      return []; // Return empty array on error, don't break the app
    }
  }

  private parseDDMMYYYY(dateString: string): Date {
    // Parse DD/MM/YYYY format from formatted sheet values
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JavaScript (July = 6)
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    return new Date(); // Fallback to current date
  }

  async updateUserData(email: string, updates: Partial<SheetRow>): Promise<boolean> {
    try {
      // For public sheets, updates would need to be handled differently
      // This could be implemented with Google Forms or Apps Script
      console.log('Update user data:', email, updates);
      return true;
    } catch (error) {
      console.error('Error updating user data:', error);
      return false;
    }
  }
}

export const googleSheetsService = new GoogleSheetsService();