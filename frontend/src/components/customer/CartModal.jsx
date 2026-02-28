import React from 'react';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';

const CartModal = ({ cart, cartTotal, gst, showCart, setShowCart, addToCart, removeFromCart, placeOrder }) => (
    <>
        {/* Floating Cart Button */}
        {cart.length > 0 && !showCart && (
            <div className="cart-float" onClick={() => setShowCart(true)}>
                <div className="cart-info">
                    <ShoppingCart size={24} />
                    <span className="cart-count">{cart.length} items</span>
                </div>
                <div className="cart-total">₹{cartTotal}</div>
            </div>
        )}

        {/* Cart Modal */}
        {showCart && (
            <>
                <div className="cart-overlay" onClick={() => setShowCart(false)} />
                <div className="cart-modal">
                    <div className="cart-header">
                        <h2 className="cart-title">Your Order</h2>
                        <button className="close-cart" onClick={() => setShowCart(false)}>
                            <X size={20} />
                        </button>
                    </div>

                    <div className="cart-items-container">
                        {cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.imageurl} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <div className="cart-item-name">{item.name}</div>
                                    <div className="cart-item-price">₹{item.price}</div>
                                    <div className="quantity-controls">
                                        <button className="qty-btn" onClick={() => removeFromCart(item.id)}>
                                            <Minus size={16} />
                                        </button>
                                        <span className="quantity">{item.quantity}</span>
                                        <button className="qty-btn" onClick={() => addToCart(item)}>
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>₹{cartTotal}</span>
                        </div>
                        <div className="summary-row">
                            <span>GST (5%)</span>
                            <span>₹{gst}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>₹{cartTotal + gst}</span>
                        </div>
                        <button className="place-order-btn" onClick={placeOrder}>
                            Place Order ₹{cartTotal + gst}
                        </button>
                    </div>
                </div>
            </>
        )}
    </>
);

export default CartModal;
