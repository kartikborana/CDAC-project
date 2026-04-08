import React from 'react';
import { LogOut, User, LogIn } from 'lucide-react';

const RestaurantHeader = ({ user, restaurantData, onLogout }) => (
    <div className="restaurant-header">
        <div className="header-content">
            <div className="header-top">
                <div className="restaurant-info">
                    <img src={restaurantData.logo} alt={restaurantData.name} className="restaurant-logo" />
                    <div className="restaurant-details">
                        <h1>{restaurantData.name}</h1>
                        <p>{restaurantData.cuisine} • {restaurantData.address}</p>
                    </div>
                </div>

                <div className="header-actions">
                    {user ? (
                        <div className="user-profile">
                            <span className="user-greeting">Hi, {user.name?.split(' ')[0] || user.email?.split('@')[0] || 'Guest'}</span>
                            {onLogout && (
                                <button className="logout-btn" onClick={onLogout} title="Logout">
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            )}
                        </div>
                    ) : (
                        <button className="login-btn" onClick={() => window.location.href = '/'} title="Login">
                            <LogIn size={18} />
                            Login
                        </button>
                    )}
                </div>
            </div>
            <div className="table-badge">
                🪑 Table {restaurantData.tableNumber}
            </div>
        </div>
    </div>
);

export default RestaurantHeader;
