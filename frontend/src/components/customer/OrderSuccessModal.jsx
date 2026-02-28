import React from 'react';
import { Check } from 'lucide-react';

const OrderSuccessModal = ({ showOrderSuccess, setShowOrderSuccess, orderNumber }) => {
    if (!showOrderSuccess) return null;

    return (
        <div className="order-success-modal" onClick={() => setShowOrderSuccess(false)}>
            <div className="success-content" onClick={(e) => e.stopPropagation()}>
                <div className="success-icon">
                    <Check size={40} />
                </div>
                <h2>Order Placed!</h2>
                <div className="order-number">#{orderNumber}</div>
                <p>Your order has been sent to the kitchen. We'll notify you when it's ready!</p>
                <button className="continue-btn" onClick={() => setShowOrderSuccess(false)}>
                    Continue Ordering
                </button>
            </div>
        </div>
    );
};

export default OrderSuccessModal;
