import React from 'react';
import { UserCircle, ChefHat, Shield } from 'lucide-react';

const BrandPanel = () => (
    <div className="brand-panel">
        <div className="brand-content">
            <div className="brand-logo">Foodie</div>
            <p className="brand-tagline">Digital Menu &amp; Order Management</p>

            <div className="brand-features">
                <div className="feature-item">
                    <div className="feature-icon">
                        <UserCircle size={24} />
                    </div>
                    <div className="feature-text">
                        <h3>QR Code Ordering</h3>
                        <p>Scan &amp; order from your table instantly</p>
                    </div>
                </div>

                <div className="feature-item">
                    <div className="feature-icon">
                        <ChefHat size={24} />
                    </div>
                    <div className="feature-text">
                        <h3>Kitchen Management</h3>
                        <p>Real-time order tracking for staff</p>
                    </div>
                </div>

                <div className="feature-item">
                    <div className="feature-icon">
                        <Shield size={24} />
                    </div>
                    <div className="feature-text">
                        <h3>Admin Dashboard</h3>
                        <p>Complete control over your restaurant</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default BrandPanel;
