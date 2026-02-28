import React from 'react';
import { ShoppingBag, DollarSign, Users, UtensilsCrossed } from 'lucide-react';
import { formatPrice } from '../../api-service';

const DashboardTab = ({ stats, ordersLoading, recentOrders, setActiveTab }) => (
    <>
        {/* Stats Grid */}
        <div className="stats-grid">
            <div className="stat-card">
                <div className="stat-header">
                    <div>
                        <div className="stat-label">Today's Orders</div>
                        <div className="stat-value">{stats.todayOrders}</div>
                        <div className="stat-change positive">↑ 12.5%</div>
                    </div>
                    <div className="stat-icon orders">
                        <ShoppingBag size={28} />
                    </div>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-header">
                    <div>
                        <div className="stat-label">Revenue</div>
                        <div className="stat-value">₹{stats.todayRevenue.toLocaleString()}</div>
                        <div className="stat-change positive">↑ 8.2%</div>
                    </div>
                    <div className="stat-icon revenue">
                        <DollarSign size={28} />
                    </div>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-header">
                    <div>
                        <div className="stat-label">Active Users</div>
                        <div className="stat-value">{stats.activeUsers}</div>
                        <div className="stat-change positive">↑ 5.1%</div>
                    </div>
                    <div className="stat-icon users">
                        <Users size={28} />
                    </div>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-header">
                    <div>
                        <div className="stat-label">Menu Items</div>
                        <div className="stat-value">{stats.menuItems}</div>
                        <div className="stat-change positive">↑ 3</div>
                    </div>
                    <div className="stat-icon menu">
                        <UtensilsCrossed size={28} />
                    </div>
                </div>
            </div>
        </div>

        {/* Recent Orders */}
        <div className="content-section">
            <div className="section-header">
                <h2 className="section-title">Recent Orders</h2>
                <button className="action-button secondary" type="button" onClick={() => setActiveTab('orders')}>
                    View All
                </button>
            </div>

            {ordersLoading && <p>Loading recent orders...</p>}
            {!ordersLoading && !recentOrders.length && (
                <div className="empty-state" style={{ padding: '2rem 1rem' }}>
                    <h3>No recent orders</h3>
                    <p>New orders will appear here as they come in.</p>
                </div>
            )}
            {!!recentOrders.length && (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Items</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map(order => {
                            const itemsCount = Array.isArray(order.items)
                                ? order.items.reduce((sum, it) => sum + (it.quantity || 0), 0)
                                : 0;
                            const statusClass = (order.status || '').toLowerCase();
                            const createdTime = order.createdAt
                                ? new Date(order.createdAt).toLocaleTimeString()
                                : '-';
                            return (
                                <tr key={order.orderId}>
                                    <td><strong>#{order.orderId}</strong></td>
                                    <td>{itemsCount} items</td>
                                    <td><strong>{formatPrice(order.totalAmount || 0)}</strong></td>
                                    <td>
                                        <span className={`status-badge ${statusClass}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>{createdTime}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    </>
);

export default DashboardTab;
