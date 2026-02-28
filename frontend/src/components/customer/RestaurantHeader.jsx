import React from 'react';
import { LogOut } from 'lucide-react';

const RestaurantHeader = ({ restaurantData, onLogout }) => (
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
                {onLogout && (
                    <button className="logout-btn" onClick={onLogout}>
                        <LogOut size={18} />
                        Logout
                    </button>
                )}
            </div>
            <div className="table-badge">
                🪑 Table {restaurantData.tableNumber}
            </div>
        </div>
    </div>
);

export default RestaurantHeader;
