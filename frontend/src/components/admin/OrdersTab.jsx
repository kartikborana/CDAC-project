import React from 'react';
import { Search } from 'lucide-react';
import { formatPrice } from '../../api-service';

const OrdersTab = ({
    ordersLoading,
    ordersError,
    orders,
    filteredOrders,
    orderStatusFilter,
    setOrderStatusFilter,
    handleUpdateOrderStatus,
}) => (
    <div className="content-section">
        <div className="section-header">
            <div className="search-bar">
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by Order ID..."
                    disabled
                    style={{ backgroundColor: '#f9fafb', cursor: 'not-allowed' }}
                />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--gray)', fontWeight: 600 }}>
                    Status:
                </label>
                <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="search-input"
                    style={{ maxWidth: '180px' }}
                >
                    <option value="ALL">All</option>
                    <option value="RECEIVED">Received</option>
                    <option value="PREPARING">Preparing</option>
                    <option value="READY">Ready</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                </select>
            </div>
        </div>

        {ordersLoading && <p>Loading orders...</p>}
        {ordersError && (
            <p style={{ color: '#EF4444', marginBottom: '1rem' }}>{ordersError}</p>
        )}

        {!ordersLoading && !orders.length && !ordersError && (
            <div className="empty-state">
                <h3>No orders found</h3>
                <p>New orders will appear here in real-time.</p>
            </div>
        )}

        {!!filteredOrders.length && (
            <div className="table-responsive">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Status</th>
                            <th>Items</th>
                            <th>Total Amount</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => {
                            const itemsCount = Array.isArray(order.items)
                                ? order.items.reduce((sum, it) => sum + (it.quantity || 0), 0)
                                : 0;
                            const createdAt = order.createdAt
                                ? new Date(order.createdAt).toLocaleString()
                                : '-';
                            const statusClass = (order.status || '').toLowerCase();
                            return (
                                <tr key={order.orderId}>
                                    <td><strong>#{order.orderId}</strong></td>
                                    <td>
                                        <span className={`status-badge ${statusClass}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>{itemsCount} items</td>
                                    <td><strong>{formatPrice(order.totalAmount || 0)}</strong></td>
                                    <td>{createdAt}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="table-action-btn edit"
                                                type="button"
                                                onClick={() => handleUpdateOrderStatus(order.orderId, 'PREPARING')}
                                                disabled={['PREPARING', 'READY', 'COMPLETED', 'CANCELLED'].includes(order.status)}
                                            >
                                                Prep
                                            </button>
                                            <button
                                                className="table-action-btn view"
                                                type="button"
                                                onClick={() => handleUpdateOrderStatus(order.orderId, 'READY')}
                                                disabled={['READY', 'COMPLETED', 'CANCELLED'].includes(order.status)}
                                            >
                                                Ready
                                            </button>
                                            <button
                                                className="table-action-btn view"
                                                type="button"
                                                onClick={() => handleUpdateOrderStatus(order.orderId, 'COMPLETED')}
                                                disabled={['COMPLETED', 'CANCELLED'].includes(order.status)}
                                            >
                                                Done
                                            </button>
                                            <button
                                                className="table-action-btn delete"
                                                type="button"
                                                onClick={() => handleUpdateOrderStatus(order.orderId, 'CANCELLED')}
                                                disabled={['COMPLETED', 'CANCELLED'].includes(order.status)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )}
    </div>
);

export default OrdersTab;
