import React from 'react';
import { Clock, ChefHat, CheckCircle } from 'lucide-react';

const OrderCard = ({ order, orderStatus, getTimeSince, updateOrderStatus }) => (
    <div className={`order-card ${orderStatus}`}>
        <div className="order-header">
            <div className="order-info">
                <div className="order-id">#{order.orderId}</div>
                <div className="order-meta">
                    <div className="meta-item">
                        <Clock size={16} />
                        {getTimeSince(order.createdAt)}
                    </div>
                </div>
            </div>
            <div className="table-number">
                T{order.tableNumber || 'N/A'}
            </div>
        </div>

        <div className="order-items">
            {order.items.map((item, index) => (
                <div key={index} className="item-row">
                    <div className="item-name">
                        <div className={`veg-badge ${item.foodName?.toLowerCase().includes('chicken') ? 'non-veg' : ''}`} />
                        {item.foodName}
                    </div>
                    <div className="item-quantity">x{item.quantity}</div>
                </div>
            ))}
        </div>

        <div className="order-footer">
            <div className="order-total">₹{order.totalAmount}</div>
            <div className="order-actions">
                {orderStatus === 'pending' && (
                    <button
                        className="action-btn primary"
                        onClick={() => updateOrderStatus(order.orderId, 'preparing')}
                    >
                        <ChefHat size={18} />
                        Start Preparing
                    </button>
                )}
                {orderStatus === 'preparing' && (
                    <button
                        className="action-btn success"
                        onClick={() => updateOrderStatus(order.orderId, 'ready')}
                    >
                        <CheckCircle size={18} />
                        Mark Ready
                    </button>
                )}
                {orderStatus === 'ready' && (
                    <button
                        className="action-btn complete"
                        onClick={() => updateOrderStatus(order.orderId, 'completed')}
                    >
                        <CheckCircle size={18} />
                        Complete
                    </button>
                )}
            </div>
        </div>
    </div>
);

export default OrderCard;
