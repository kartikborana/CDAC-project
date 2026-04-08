import React from 'react';
import {
    LayoutDashboard, Users, ChefHat, UtensilsCrossed, ShoppingBag, LogOut, X
} from 'lucide-react';

const closeSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.remove('open');
    }
};

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => (
    <div className="sidebar">
        <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="logo">Foodie Admin</div>
            <button className="icon-button mobile-close-btn" onClick={closeSidebar} style={{ background: 'transparent', color: 'white' }}>
                <X size={24} />
            </button>
        </div>

        <div className="sidebar-nav">
            <div
                className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => { setActiveTab('dashboard'); closeSidebar(); }}
            >
                <LayoutDashboard size={20} />
                Dashboard
            </div>
            <div
                className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => { setActiveTab('orders'); closeSidebar(); }}
            >
                <ShoppingBag size={20} />
                Orders
            </div>
            <div
                className={`nav-item ${activeTab === 'menu' ? 'active' : ''}`}
                onClick={() => { setActiveTab('menu'); closeSidebar(); }}
            >
                <UtensilsCrossed size={20} />
                Menu Management
            </div>
            <div
                className={`nav-item ${activeTab === 'staff' ? 'active' : ''}`}
                onClick={() => { setActiveTab('staff'); closeSidebar(); }}
            >
                <ChefHat size={20} />
                Staff
            </div>
            <div
                className={`nav-item ${activeTab === 'customers' ? 'active' : ''}`}
                onClick={() => { setActiveTab('customers'); closeSidebar(); }}
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
