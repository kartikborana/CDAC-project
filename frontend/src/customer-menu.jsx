import React, { useState, useEffect, useCallback } from 'react';
import { restaurantData, mockCategories, mockMenuItems } from './components/customer/mockData';
import customerStyles from './components/customer/CustomerStyles';
import RestaurantHeader from './components/customer/RestaurantHeader';
import MenuSearch from './components/customer/MenuSearch';
import CategoryFilter from './components/customer/CategoryFilter';
import MenuItemCard from './components/customer/MenuItemCard';
import CartModal from './components/customer/CartModal';
import PaymentSheet from './components/customer/PaymentSheet';
import OrderSuccessModal from './components/customer/OrderSuccessModal';
import OrderTracker from './components/customer/OrderTracker';

const CustomerMenuApp = ({ user, onLogout }) => {
  const [menuCategories, setMenuCategories] = useState(mockCategories);
  const [menuItems, setMenuItems] = useState(mockMenuItems);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showPaymentSheet, setShowPaymentSheet] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('CASH');
  const [processingPayment, setProcessingPayment] = useState(false);

  const [activeOrder, setActiveOrder] = useState(null);
  const [showOrderTracker, setShowOrderTracker] = useState(false);

  const fetchOrderStatus = useCallback(async () => {
    if (!activeOrder || !activeOrder.orderId) return;

    try {
      const apiService = await import('./api-service.js').catch(() => null);
      if (apiService && apiService.orderAPI) {
        const orderData = await apiService.orderAPI.getById(activeOrder.orderId);
        if (orderData) {
          setActiveOrder(orderData);
          if (orderData.status === 'COMPLETED' || orderData.status === 'CANCELLED') {
            setTimeout(() => {
              setShowOrderTracker(false);
            }, 10000);
          }
        }
      }
    } catch (err) {
      console.log('Failed to fetch order status:', err);
    }
  }, [activeOrder]);

  useEffect(() => {
    if (!activeOrder || activeOrder.status === 'COMPLETED' || activeOrder.status === 'CANCELLED') {
      return;
    }
    const interval = setInterval(fetchOrderStatus, 5000);
    return () => clearInterval(interval);
  }, [activeOrder, fetchOrderStatus]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const apiService = await import('./api-service.js').catch(() => null);

        if (apiService) {
          setLoading(true);
          const categories = await apiService.categoryAPI.getAll();
          setMenuCategories(categories.filter(cat => cat.isActive || cat.active));
          const items = await apiService.foodItemAPI.getAll();
          setMenuItems(items.filter(item => item.isAvailable || item.available));
          setLoading(false);
        }
      } catch (err) {
        console.log('Using mock data - backend not available');
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    if (existingItem.quantity > 1) {
      setCart(cart.map(cartItem =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    } else {
      setCart(cart.filter(cartItem => cartItem.id !== itemId));
    }
  };

  const placeOrder = async () => {
    try {
      const apiService = await import('./api-service.js').catch(() => null);

      if (apiService) {
        const orderResponse = await apiService.orderAPI.create({
          userId: user?.id || 1,
          tableNumber: restaurantData.tableNumber,
          orderType: 'DINE_IN',
          items: cart
        });
        setOrderNumber(orderResponse.orderId);
        setShowPaymentSheet(true);
      } else {
        const orderId = 'ORD' + Date.now().toString().slice(-6);
        setOrderNumber(orderId);
        setShowPaymentSheet(true);
      }

      setShowCart(false);
    } catch (err) {
      const orderId = 'ORD' + Date.now().toString().slice(-6);
      setOrderNumber(orderId);
      setShowPaymentSheet(true);
      setShowCart(false);
    }
  };

  const handleConfirmPayment = async () => {
    try {
      setProcessingPayment(true);
      const apiService = await import('./api-service.js').catch(() => null);

      if (apiService && apiService.orderAPI && apiService.paymentAPI) {
        await apiService.paymentAPI.makePayment({
          orderId: orderNumber,
          paymentMethod: selectedPaymentMethod,
        });
      } else if (apiService && apiService.orderAPI) {
        const token = localStorage.getItem('token');
        await fetch('http://3.27.157.241:8080/api/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            orderId: orderNumber,
            paymentMethod: selectedPaymentMethod,
          }),
        }).catch(() => { });
      }

      setShowPaymentSheet(false);
      setShowOrderSuccess(true);

      setActiveOrder({
        orderId: orderNumber,
        status: 'PENDING',
        items: cart,
        totalAmount: cartTotal + gst,
        createdAt: new Date().toISOString(),
      });
      setShowOrderTracker(true);

      setTimeout(() => {
        setCart([]);
        setOrderPlaced(true);
      }, 1500);
    } catch (e) {
      setError('Failed to process payment. Please try again or pay at counter.');
      setShowPaymentSheet(false);
      setShowOrderSuccess(true);

      setActiveOrder({
        orderId: orderNumber,
        status: 'PENDING',
        items: cart,
        totalAmount: cartTotal + gst,
        createdAt: new Date().toISOString(),
      });
      setShowOrderTracker(true);
    } finally {
      setProcessingPayment(false);
    }
  };

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.categoryId === activeCategory || item.category === activeCategory;
    const safeName = item.name || '';
    const safeDesc = item.description || '';
    const matchesSearch = safeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      safeDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const gst = Math.round(cartTotal * 0.05);

  return (
    <div className="customer-app">
      <style>{customerStyles}</style>

      <RestaurantHeader restaurantData={restaurantData} onLogout={onLogout} />

      <MenuSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <CategoryFilter
        menuCategories={menuCategories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Menu Items */}
      <div className="menu-section">
        {loading ? (
          <div className="empty-state"><h3>Loading menu...</h3></div>
        ) : error ? (
          <div className="empty-state"><h3>Error loading menu</h3><p>{error}</p></div>
        ) : filteredItems.length === 0 ? (
          <div className="empty-state"><h3>No items found</h3><p>Try searching for something else</p></div>
        ) : (
          <div className="menu-grid">
            {filteredItems.map(item => (
              <MenuItemCard key={item.id} item={item} addToCart={addToCart} />
            ))}
          </div>
        )}
      </div>

      <CartModal
        cart={cart}
        cartTotal={cartTotal}
        gst={gst}
        showCart={showCart}
        setShowCart={setShowCart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        placeOrder={placeOrder}
      />

      <PaymentSheet
        showPaymentSheet={showPaymentSheet}
        setShowPaymentSheet={setShowPaymentSheet}
        orderNumber={orderNumber}
        cartTotal={cartTotal}
        gst={gst}
        selectedPaymentMethod={selectedPaymentMethod}
        setSelectedPaymentMethod={setSelectedPaymentMethod}
        processingPayment={processingPayment}
        handleConfirmPayment={handleConfirmPayment}
      />

      <OrderSuccessModal
        showOrderSuccess={showOrderSuccess}
        setShowOrderSuccess={setShowOrderSuccess}
        orderNumber={orderNumber}
      />

      {!showCart && !showPaymentSheet && !showOrderSuccess && (
        <OrderTracker
          activeOrder={activeOrder}
          showOrderTracker={showOrderTracker}
          setShowOrderTracker={setShowOrderTracker}
          setActiveOrder={setActiveOrder}
        />
      )}
    </div>
  );
};

export default CustomerMenuApp;