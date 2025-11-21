import React, { useState, useEffect } from 'react';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';
import { Profile } from './components/Profile';
import { Sessions } from './components/Appointments';
import { Navigation } from './components/Navigation';
import { useAuth } from './hooks/useAuth';
import { useGoogleSheets } from './hooks/useGoogleSheets';

function App() {
  const { user, login, logout, isAuthenticated } = useAuth();
  const { userData, notifications, loading, refreshData } = useGoogleSheets(user?.email);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      refreshData();
    }
  }, [isAuthenticated, user?.email, refreshData]);

  if (!isAuthenticated) {
    return (
      <LoginForm onLogin={login} />
    );
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
        onLogout={logout}
        userName={userData?.firstName || user?.name || 'Member'}
      />
      {renderContent()}
    </div>
  );
}

export default App;