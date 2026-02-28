import React from 'react';

const FilterTabs = ({ filterStatus, setFilterStatus, orders, stats }) => (
    <div className="filter-tabs">
        <button
            className={`filter-tab ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
        >
            All Orders
            <span className="badge">{orders.length}</span>
        </button>
        <button
            className={`filter-tab ${filterStatus === 'pending' ? 'active' : ''}`}
            onClick={() => setFilterStatus('pending')}
        >
            Pending
            <span className="badge">{stats.pending}</span>
        </button>
        <button
            className={`filter-tab ${filterStatus === 'preparing' ? 'active' : ''}`}
            onClick={() => setFilterStatus('preparing')}
        >
            Preparing
            <span className="badge">{stats.preparing}</span>
        </button>
        <button
            className={`filter-tab ${filterStatus === 'ready' ? 'active' : ''}`}
            onClick={() => setFilterStatus('ready')}
        >
            Ready
            <span className="badge">{stats.ready}</span>
        </button>
        <button
            className={`filter-tab ${filterStatus === 'completed' ? 'active' : ''}`}
            onClick={() => setFilterStatus('completed')}
        >
            Completed
            <span className="badge">{stats.completed}</span>
        </button>
    </div>
);

export default FilterTabs;
