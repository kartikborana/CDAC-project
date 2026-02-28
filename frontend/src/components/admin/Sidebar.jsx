import React from 'react';
import {
    LayoutDashboard, Users, ChefHat, UtensilsCrossed, ShoppingBag, LogOut
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => (
    <div className="sidebar">
        <div className="sidebar-header">
            <div className="logo">Foodie Admin</div>
        </div>

        <div className="sidebar-nav">
            <div
                className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
            >
                <LayoutDashboard size={20} />
                Dashboard
            </div>
            <div
                className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
            >
                <ShoppingBag size={20} />
                Orders
            </div>
            <div
                className={`nav-item ${activeTab === 'menu' ? 'active' : ''}`}
                onClick={() => setActiveTab('menu')}
            >
                <UtensilsCrossed size={20} />
                Menu Management
            </div>
            <div
                className={`nav-item ${activeTab === 'staff' ? 'active' : ''}`}
                onClick={() => setActiveTab('staff')}
            >
                <ChefHat size={20} />
                Staff
            </div>
            <div
                className={`nav-item ${activeTab === 'customers' ? 'active' : ''}`}
                onClick={() => setActiveTab('customers')}
            >
                <Users size={20} />
                Customers
            </div>
        </div>

        <div className="sidebar-footer">
            <button className="logout-btn" onClick={onLogout}>
                <LogOut size={20} />
                Logout
            </button>
        </div>
    </div>
);

export default Sidebar;
