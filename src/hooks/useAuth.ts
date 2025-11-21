import { useState, useEffect } from 'react';
import { googleSheetsService } from '../services/googleSheets';

interface User {
  email: string;
  name: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for saved authentication state
    const savedUser = localStorage.getItem('hq-recovery-user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string) => {
    try {
      // Validate email format
      if (!email.includes('@')) {
        throw new Error('Invalid email format');
      }

      // Check if user exists in Google Sheets
      const sheetData = await googleSheetsService.getUserData(email);
      
      if (!sheetData) {
        throw new Error('Email not found in our system. Please contact HQ Recovery support.');
      }

      // If user exists in Google Sheets, log them in
      const userData = {
        email: sheetData.email,
        name: sheetData.name
      };

      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('hq-recovery-user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('hq-recovery-user');
  };

  return {
    user,
    isAuthenticated,
    login,
    logout
  };
};