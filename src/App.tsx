import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { Profile } from './components/Profile';
import { Sessions } from './components/Appointments';
import { Navigation } from './components/Navigation';
import { AuthScreen } from './components/AuthScreen';
import { useGoogleSheets } from './hooks/useGoogleSheets';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from './config/firebase';

function App() {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const { userData, notifications, loading, refreshData } = useGoogleSheets(firebaseUser?.email || null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Refresh data when user logs in
  useEffect(() => {
    if (firebaseUser?.email) {
      refreshData();
    }
  }, [firebaseUser?.email, refreshData]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setActiveTab('dashboard'); // Reset to dashboard on logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#231f1e] to-[#1a1715] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d8ba5b]"></div>
      </div>
    );
  }

  // Show auth screen if not authenticated
  if (!firebaseUser) {
    return <AuthScreen onAuthSuccess={() => {}} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard userData={userData} loading={loading} onRefresh={refreshData} notifications={notifications} />;
      case 'sessions':
        return <Sessions userData={userData} loading={loading} />;
      case 'profile':
        return <Profile userData={userData} loading={loading} />;
      default:
        return <Dashboard userData={userData} loading={loading} onRefresh={refreshData} notifications={notifications} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        userName={userData?.firstName || firebaseUser?.displayName || firebaseUser?.email?.split('@')[0] || 'Member'}
      />
      {renderContent()}
    </div>
  );
}

export default App;