import React from 'react';
import { Bell, Calendar, Download, Menu } from 'lucide-react';

const topBarLabels = {
    dashboard: 'Dashboard',
    orders: 'Orders',
    menu: 'Menu Management',
    staff: 'Staff Management',
    customers: 'Customers',
};

const TopBar = ({ activeTab }) => {
    const toggleSidebar = () => {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
    };

    return (
        <div className="top-bar">
            <h1 className="page-title">{topBarLabels[activeTab] || ''}</h1>
            <div className="top-bar-actions">
                <button className="icon-button mobile-menu-btn" onClick={toggleSidebar}>
                    <Menu size={20} />
                </button>
                <button className="icon-button">
                    <Bell size={20} />
                    <span className="notification-badge">3</span>
                </button>
                <button className="icon-button">
                    <Calendar size={20} />
                </button>
                <button className="icon-button">
                    <Download size={20} />
                </button>
            </div>
        </div>
    );
};

export default TopBar;
