import React from 'react';
import { AlertCircle, Clock, CheckCircle, TrendingUp } from 'lucide-react';

const StatsGrid = ({ stats }) => (
    <div className="stats-grid">
        <div className="stat-card pending">
            <div className="stat-header">
                <div className="stat-icon">
                    <AlertCircle size={24} />
                </div>
            </div>
            <div className="stat-label">Pending</div>
            <div className="stat-value">{stats.pending}</div>
        </div>

        <div className="stat-card preparing">
            <div className="stat-header">
                <div className="stat-icon">
                    <Clock size={24} />
                </div>
            </div>
            <div className="stat-label">Preparing</div>
            <div className="stat-value">{stats.preparing}</div>
        </div>

        <div className="stat-card ready">
            <div className="stat-header">
                <div className="stat-icon">
                    <CheckCircle size={24} />
                </div>
            </div>
            <div className="stat-label">Ready</div>
            <div className="stat-value">{stats.ready}</div>
        </div>

        <div className="stat-card completed">
            <div className="stat-header">
                <div className="stat-icon">
                    <TrendingUp size={24} />
                </div>
            </div>
            <div className="stat-label">Completed</div>
            <div className="stat-value">{stats.completed}</div>
        </div>
    </div>
);

export default StatsGrid;
