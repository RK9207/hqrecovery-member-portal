export interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  recoveryBalance: number;
  ptBalance: number;
  teamBalance: number;
  membershipStatus: string;
  totalSessionsAttended: number;
  joiningDate: string;
  lastVisit: string;
  nextSession?: string;
  sessions: Session[];
}

export interface Session {
  id: string;
  date: string;
  time: string;
  serviceType: string;
  provider?: string;
  location?: string;
  notes?: string;
  status?: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
}