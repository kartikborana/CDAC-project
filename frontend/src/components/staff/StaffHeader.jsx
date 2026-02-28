import React from 'react';
import { ChefHat, LogOut } from 'lucide-react';

const StaffHeader = ({ useBackend, onLogout }) => (
    <div className="dashboard-header">
        <div className="header-content">
            <div>
                <div className="header-title">
                    <ChefHat size={48} />
                    <h1>Kitchen Dashboard</h1>
                </div>
                <div className="live-indicator">
                    <div className="live-dot"></div>
                    Live Orders
                </div>
                <div className="backend-indicator">
                    {useBackend ? '🟢 Connected to Backend' : '🟡 Using Mock Data'}
                </div>
            </div>
            {onLogout && (
                <button className="logout-btn" onClick={onLogout}>
                    <LogOut size={20} />
                    Logout
                </button>
            )}
        </div>
    </div>
);

export default StaffHeader;
