import React from 'react';
import { X } from 'lucide-react';

const PAYMENT_METHODS = [
    { key: 'CASH', label: 'Cash at Counter' },
    { key: 'CARD', label: 'Card (POS Machine)' },
    { key: 'UPI', label: 'UPI (PhonePe / GPay / Paytm)' },
    { key: 'NET_BANKING', label: 'Net Banking' },
];

const PaymentSheet = ({
    showPaymentSheet,
    setShowPaymentSheet,
    orderNumber,
    cartTotal,
    gst,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    processingPayment,
    handleConfirmPayment,
}) => {
    if (!showPaymentSheet) return null;

    return (
        <>
            <div
                className="cart-overlay"
                onClick={() => !processingPayment && setShowPaymentSheet(false)}
            />
            <div className="cart-modal">
                <div className="cart-header">
                    <h2 className="cart-title">Choose Payment Method</h2>
                    <button
                        className="close-cart"
                        onClick={() => !processingPayment && setShowPaymentSheet(false)}
                        disabled={processingPayment}
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="cart-items-container">
                    <p style={{ marginBottom: '1rem', color: '#64748B' }}>
                        Please select how you would like to pay for order <strong>#{orderNumber}</strong>.
                    </p>
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                        {PAYMENT_METHODS.map(method => (
                            <button
                                key={method.key}
                                type="button"
                                className="place-order-btn"
                                style={{
                                    padding: '0.9rem 1rem',
                                    borderRadius: '12px',
                                    background: selectedPaymentMethod === method.key ? '#E63946' : '#F5F5F7',
                                    color: selectedPaymentMethod === method.key ? '#ffffff' : '#1D1D1F',
                                    border: selectedPaymentMethod === method.key
                                        ? '2px solid #C1121F'
                                        : '2px solid transparent',
                                }}
                                onClick={() => setSelectedPaymentMethod(method.key)}
                                disabled={processingPayment}
                            >
                                {method.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="cart-summary">
                    <div className="summary-row total">
                        <span>Total Payable</span>
                        <span>₹{cartTotal + gst}</span>
                    </div>
                    <button
                        className="place-order-btn"
                        onClick={handleConfirmPayment}
                        disabled={processingPayment}
                    >
                        {processingPayment
                            ? 'Processing...'
                            : `Confirm & Pay (${selectedPaymentMethod})`}
                    </button>
                </div>
            </div>
        </>
    );
};

export default PaymentSheet;
