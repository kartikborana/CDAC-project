import React, { useState, useEffect } from 'react';
import { mockOrders } from './components/staff/mockOrders';
import staffStyles from './components/staff/StaffStyles';
import StaffHeader from './components/staff/StaffHeader';
import StatsGrid from './components/staff/StatsGrid';
import FilterTabs from './components/staff/FilterTabs';
import OrderCard from './components/staff/OrderCard';
import { CheckCircle } from 'lucide-react';

const StaffDashboard = ({ user, onLogout }) => {
  const [orders, setOrders] = useState(mockOrders);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useBackend, setUseBackend] = useState(false);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const apiModule = await import('./api-service.js').catch(() => null);

      if (apiModule && apiModule.orderAPI) {
        const backendOrders = await apiModule.orderAPI.getAll();
        setOrders(backendOrders);
        setUseBackend(true);
        setError(null);
      } else {
        console.log('API service not available, using mock data');
        setUseBackend(false);
      }
    } catch (err) {
      console.log('Using mock data - backend not available', err);
      setUseBackend(false);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const apiService = await import('./api-service.js').catch(() => null);

      if (apiService && apiService.orderAPI && useBackend) {
        await apiService.orderAPI.updateStatus(orderId, newStatus.toUpperCase());
      }

      setOrders(orders.map(order =>
        order.orderId === orderId ? { ...order, status: newStatus.toUpperCase() } : order
      ));

      console.log(`Order ${orderId} status updated to ${newStatus}`);
    } catch (err) {
      setOrders(orders.map(order =>
        order.orderId === orderId ? { ...order, status: newStatus.toUpperCase() } : order
      ));
      console.log('Updated locally - backend not available');
    }
  };

  const getTimeSince = (timestamp) => {
    const date = new Date(timestamp);
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 min ago';
    return `${minutes} mins ago`;
  };

  const mapOrderStatus = (status) => {
    const statusMap = {
      'PENDING': 'pending',
      'PREPARING': 'preparing',
      'READY': 'ready',
      'COMPLETED': 'completed',
      'CANCELLED': 'cancelled'
    };
    return statusMap[status] || 'pending';
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(order => mapOrderStatus(order.status) === filterStatus);

  const stats = {
    pending: orders.filter(o => mapOrderStatus(o.status) === 'pending').length,
    preparing: orders.filter(o => mapOrderStatus(o.status) === 'preparing').length,
    ready: orders.filter(o => mapOrderStatus(o.status) === 'ready').length,
    completed: orders.filter(o => mapOrderStatus(o.status) === 'completed').length
  };

  return (
    <div className="staff-dashboard">
      <style>{staffStyles}</style>

      <StaffHeader useBackend={useBackend} onLogout={onLogout} />

      <StatsGrid stats={stats} />

      <FilterTabs
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        orders={orders}
        stats={stats}
      />

      <div className="orders-section">
        <h2>
          {filterStatus === 'all' ? 'All Orders' :
            filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1) + ' Orders'}
        </h2>

        {loading ? (
          <div className="empty-state">
            <h3>Loading orders...</h3>
          </div>
        ) : error ? (
          <div className="empty-state">
            <h3>Error loading orders</h3>
            <p>{error}</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="empty-state">
            <CheckCircle size={64} />
            <h3>No {filterStatus === 'all' ? '' : filterStatus} orders</h3>
            <p>All caught up! 🎉</p>
          </div>
        ) : (
          <div className="orders-grid">
            {filteredOrders.map(order => {
              const orderStatus = mapOrderStatus(order.status);
              return (
                <OrderCard
                  key={order.orderId}
                  order={order}
                  orderStatus={orderStatus}
                  getTimeSince={getTimeSince}
                  updateOrderStatus={updateOrderStatus}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;