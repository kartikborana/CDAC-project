import React from 'react';
import { Clock, ChefHat, Bell, CheckCircle, X, Check } from 'lucide-react';

const OrderTracker = ({ activeOrder, showOrderTracker, setShowOrderTracker, setActiveOrder }) => {
    if (!activeOrder) return null;

    return (
        <>
            {/* Floating Badge */}
            {showOrderTracker && showOrderTracker !== 'modal' && (
                <div
                    className="order-tracker-float"
                    onClick={() => setShowOrderTracker('modal')}
                >
                    <div className={`tracker-icon ${(activeOrder.status || 'PENDING').toLowerCase()}`}>
                        {activeOrder.status === 'PENDING' && <Clock size={20} />}
                        {activeOrder.status === 'PREPARING' && <ChefHat size={20} />}
                        {activeOrder.status === 'READY' && <Bell size={20} />}
                        {activeOrder.status === 'COMPLETED' && <CheckCircle size={20} />}
                        {activeOrder.status === 'CANCELLED' && <X size={20} />}
                        {!activeOrder.status && <Clock size={20} />}
                    </div>
                    <div className="tracker-info">
                        <div className="tracker-order-id">Order #{activeOrder.orderId}</div>
                        <div className="tracker-status">
                            {activeOrder.status === 'PENDING' && 'Waiting...'}
                            {activeOrder.status === 'PREPARING' && 'Being Prepared'}
                            {activeOrder.status === 'READY' && 'Ready for Pickup!'}
                            {activeOrder.status === 'COMPLETED' && 'Completed'}
                            {activeOrder.status === 'CANCELLED' && 'Cancelled'}
                            {!activeOrder.status && 'Waiting...'}
                        </div>
                    </div>
                </div>
            )}

            {/* Tracker Modal */}
            {showOrderTracker === 'modal' && (
                <>
                    <div className="cart-overlay" onClick={() => setShowOrderTracker(true)} />
                    <div className="tracker-modal">
                        <div className="tracker-header">
                            <h2 className="tracker-title">Order #{activeOrder.orderId}</h2>
                            <button className="close-cart" onClick={() => setShowOrderTracker(true)}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="tracker-content">
                            {/* Status Timeline */}
                            <div className="status-timeline">
                                {[
                                    { key: 'PENDING', label: 'Order Received', desc: 'Your order has been received', icon: Clock },
                                    { key: 'PREPARING', label: 'Preparing', desc: 'The kitchen is preparing your food', icon: ChefHat },
                                    { key: 'READY', label: 'Ready', desc: 'Your order is ready for pickup!', icon: Bell },
                                    { key: 'COMPLETED', label: 'Completed', desc: 'Order has been delivered', icon: CheckCircle },
                                ].map((step) => {
                                    const statusOrder = ['PENDING', 'PREPARING', 'READY', 'COMPLETED'];
                                    const currentIndex = statusOrder.indexOf(activeOrder.status || 'PENDING');
                                    const stepIndex = statusOrder.indexOf(step.key);
                                    const isCompleted = stepIndex < currentIndex;
                                    const isActive = stepIndex === currentIndex;
                                    const Icon = step.icon;

                                    return (
                                        <div
                                            key={step.key}
                                            className={`status-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                                        >
                                            <div className="step-icon">
                                                {isCompleted ? <Check size={18} /> : <Icon size={18} />}
                                            </div>
                                            <div className="step-content">
                                                <h4>{step.label}</h4>
                                                <p>{step.desc}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Order Items */}
                            {activeOrder.items && activeOrder.items.length > 0 && (
                                <div className="tracker-order-details">
                                    <h4>Order Items</h4>
                                    {activeOrder.items.map((item, idx) => (
                                        <div key={idx} className="tracker-item">
                                            <span>{item.foodName || item.name} × {item.quantity}</span>
                                            <span>₹{(item.subTotal || item.price * item.quantity || 0).toLocaleString()}</span>
                                        </div>
                                    ))}
                                    <div className="tracker-item" style={{ fontWeight: 700, marginTop: '0.5rem' }}>
                                        <span>Total</span>
                                        <span>₹{(activeOrder.totalAmount || 0).toLocaleString()}</span>
                                    </div>
                                </div>
                            )}

                            {/* Dismiss Button */}
                            {(activeOrder.status === 'COMPLETED' || activeOrder.status === 'CANCELLED') && (
                                <button
                                    className="dismiss-btn"
                                    onClick={() => {
                                        setActiveOrder(null);
                                        setShowOrderTracker(false);
                                    }}
                                >
                                    Dismiss
                                </button>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default OrderTracker;
