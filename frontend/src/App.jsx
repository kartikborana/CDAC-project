import React, { useState, useEffect } from 'react';
import AuthPage from './auth-page';
import CustomerMenuApp from './customer-menu';
import StaffDashboard from './staff-dashboard';
import AdminDashboard from './admin-dashboard';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('auth');

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setCurrentView(getRoleView(user.role));
    }
  }, []);

  const getRoleView = (role) => {
    switch(role) {
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
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token'); // Clear JWT token
    setCurrentView('auth');
  };

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