import React, { useState, useEffect } from 'react';
import AuthPage from './auth-page';
import CustomerMenuApp from './customer-menu';
import StaffDashboard from './staff-dashboard';
import AdminDashboard from './admin-dashboard';
import OAuthCallback from './OAuthCallback';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('auth');

  // Check if this is the OAuth2 callback redirect from backend
  const isOAuthCallback = window.location.pathname === '/oauth2/success';

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    if (isOAuthCallback) return; // Let OAuthCallback handle this
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setCurrentView(getRoleView(user.role));
    }
  }, []);

  const getRoleView = (role) => {
    switch (role) {
      case 'customer':
        return 'customer-menu';
      case 'staff':
        return 'staff-dashboard';
      case 'admin':
        return 'admin-dashboard';
      default:
        return 'auth';
    }
  };

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setCurrentView(getRoleView(userData.role));
    // Clear OAuth params from URL if present
    if (window.location.search) {
      window.history.replaceState({}, document.title, '/');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    setCurrentView('auth');
  };

  // If browser landed on /oauth2/success, show the OAuth callback page
  if (isOAuthCallback) {
    return <OAuthCallback onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      {currentView === 'auth' && (
        <AuthPage onLogin={handleLogin} />
      )}

      {currentView === 'customer-menu' && (
        <CustomerMenuApp onLogout={handleLogout} user={currentUser} />
      )}

      {currentView === 'staff-dashboard' && (
        <StaffDashboard onLogout={handleLogout} user={currentUser} />
      )}

      {currentView === 'admin-dashboard' && (
        <AdminDashboard onLogout={handleLogout} user={currentUser} />
      )}
    </div>
  );
};

export default App;