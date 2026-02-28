import React, { useState, useEffect } from 'react';
import apiService, { authAPI, handleAPIError, orderAPI } from './api-service';
import { initialMenuItems, initialStaffMembers } from './components/admin/mockData';
import adminStyles from './components/admin/AdminStyles';
import Sidebar from './components/admin/Sidebar';
import TopBar from './components/admin/TopBar';
import DashboardTab from './components/admin/DashboardTab';
import OrdersTab from './components/admin/OrdersTab';
import MenuTab from './components/admin/MenuTab';
import StaffTab from './components/admin/StaffTab';
import CustomersTab from './components/admin/CustomersTab';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [menuError, setMenuError] = useState('');

  const [staffMembers, setStaffMembers] = useState([]);
  const [staffError, setStaffError] = useState('');
  const [staffSearch, setStaffSearch] = useState('');
  const [editingStaffId, setEditingStaffId] = useState(null);
  const [editingStaffForm, setEditingStaffForm] = useState({ name: '', email: '', phone: '' });

  const [allUsers, setAllUsers] = useState([]);

  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [showAddStaffForm, setShowAddStaffForm] = useState(false);

  const [menuSearch, setMenuSearch] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('ALL');

  const [customersLoading, setCustomersLoading] = useState(false);
  const [customersError, setCustomersError] = useState('');
  const [customerStats, setCustomerStats] = useState([]);

  const [isEditingItem, setIsEditingItem] = useState(false);
  const [editItemForm, setEditItemForm] = useState(null);

  const [stats, setStats] = useState({
    todayOrders: 0, todayRevenue: 0, activeUsers: 0,
    menuItems: 0, avgOrderValue: 0, completionRate: 0
  });

  const [newItem, setNewItem] = useState({
    name: '', description: '', price: '', categoryId: '', isVeg: true, imageurl: '', isAvailable: true,
  });

  const [newStaff, setNewStaff] = useState({ name: '', email: '', phone: '', password: '' });

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingMenu(true);
        const [cats, items] = await Promise.all([
          apiService.categoryAPI.getAll(),
          apiService.foodItemAPI.getAll(),
        ]);
        setCategories(cats);
        setMenuItems(items);
        setMenuError('');
      } catch (err) {
        console.error('Failed to load menu data', err);
        setMenuError(handleAPIError(err));
        setCategories([]);
        setMenuItems(initialMenuItems);
      } finally {
        setLoadingMenu(false);
      }

      try {
        const usersFromApi = await authAPI.getAllUsers();
        setAllUsers(Array.isArray(usersFromApi) ? usersFromApi : []);
        const staff = (Array.isArray(usersFromApi) ? usersFromApi : [])
          .filter(u => u.role === 'STAFF')
          .map(u => ({
            id: u.id, name: u.name, role: 'Kitchen Staff', email: u.email,
            status: 'active', joinDate: new Date().toISOString().slice(0, 10),
          }));
        setStaffMembers(staff.length ? staff : initialStaffMembers);
        setStaffError('');
      } catch (err) {
        console.error('Failed to load staff data', err);
        setStaffError(handleAPIError(err));
        setStaffMembers(initialStaffMembers);
      }
    };
    loadData();
  }, []);

  // Load orders when on dashboard or orders tab
  useEffect(() => {
    if (activeTab !== 'orders' && activeTab !== 'dashboard') return;
    const loadOrders = async () => {
      try {
        setOrdersLoading(true);
        const data = await orderAPI.getAll();
        setOrders(data || []);
        setOrdersError('');
      } catch (err) {
        console.error('Failed to load orders', err);
        setOrdersError(handleAPIError(err));
      } finally {
        setOrdersLoading(false);
      }
    };
    loadOrders();
  }, [activeTab]);

  // Recalculate stats
  useEffect(() => {
    const todayDateStr = new Date().toISOString().slice(0, 10);
    const todaysOrders = orders.filter(o => {
      if (!o.createdAt) return false;
      return new Date(o.createdAt).toISOString().slice(0, 10) === todayDateStr;
    });
    const totals = orders.reduce(
      (acc, o) => ({ sum: acc.sum + (o.totalAmount || 0), count: acc.count + 1 }), { sum: 0, count: 0 }
    );
    const completedCount = orders.filter(o => o.status === 'COMPLETED').length;
    setStats({
      todayOrders: todaysOrders.length,
      todayRevenue: todaysOrders.reduce((s, o) => s + (o.totalAmount || 0), 0),
      activeUsers: (Array.isArray(allUsers) ? allUsers : []).filter(u => u.role === 'CUSTOMER').length,
      menuItems: menuItems.length,
      avgOrderValue: totals.count > 0 ? Math.round(totals.sum / totals.count) : 0,
      completionRate: totals.count > 0 ? Math.round((completedCount / totals.count) * 100) : 0,
    });
  }, [orders, menuItems, allUsers]);

  // Load customer stats
  useEffect(() => {
    if (activeTab !== 'customers') return;
    const loadCustomerStats = async () => {
      try {
        setCustomersLoading(true);
        const customersOnly = (Array.isArray(allUsers) ? allUsers : []).filter(u => u.role === 'CUSTOMER');
        const statsPromises = customersOnly.map(async (u) => {
          try {
            const userOrders = await orderAPI.getByUser(u.id);
            const latestTime = userOrders.reduce((max, o) => {
              if (!o.createdAt) return max;
              const t = new Date(o.createdAt).getTime();
              return t > max ? t : max;
            }, 0);
            return {
              userId: u.id,
              totalOrders: userOrders.length,
              totalSpent: userOrders.reduce((s, o) => s + (o.totalAmount || 0), 0),
              lastOrderDate: latestTime ? new Date(latestTime) : null,
            };
          } catch {
            return { userId: u.id, totalOrders: 0, totalSpent: 0, lastOrderDate: null };
          }
        });
        setCustomerStats(await Promise.all(statsPromises));
        setCustomersError('');
      } catch (err) {
        setCustomersError(handleAPIError(err));
      } finally {
        setCustomersLoading(false);
      }
    };
    loadCustomerStats();
  }, [activeTab, allUsers]);

  // --- Menu handlers ---
  const handleNewItemChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewItem(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    try {
      const created = await apiService.foodItemAPI.create({
        name: newItem.name, description: newItem.description,
        price: parseFloat(newItem.price), isVeg: newItem.isVeg,
        isAvailable: newItem.isAvailable, imageurl: newItem.imageurl,
        categoryId: Number(newItem.categoryId),
      });
      setMenuItems(prev => [...prev, created]);
      setShowAddItemForm(false);
      setNewItem({ name: '', description: '', price: '', categoryId: '', isVeg: true, imageurl: '', isAvailable: true });
      setMenuError('');
    } catch (err) { setMenuError(handleAPIError(err)); }
  };

  const handleDeleteMenuItem = async (id) => {
    try {
      await apiService.foodItemAPI.delete(id);
      setMenuItems(prev => prev.filter(item => item.id !== id));
    } catch (err) { setMenuError(handleAPIError(err)); }
  };

  const handleToggleAvailability = async (item) => {
    const currentAvailable = item.isAvailable ?? item.available ?? false;
    if (!item.categoryId) {
      setMenuItems(prev => prev.map(it =>
        it.id === item.id ? { ...it, isAvailable: !currentAvailable, available: !currentAvailable } : it
      ));
      return;
    }
    try {
      const updated = await apiService.foodItemAPI.update(item.id, {
        name: item.name, description: item.description, price: item.price,
        isVeg: item.isVeg, isAvailable: !currentAvailable, imageurl: item.imageurl, categoryId: item.categoryId,
      });
      setMenuItems(prev => prev.map(it => (it.id === item.id ? updated : it)));
      setMenuError('');
    } catch (err) { setMenuError(handleAPIError(err)); }
  };

  const handleMenuSearchChange = e => setMenuSearch(e.target.value);
  const handleViewMenuItem = (item) => { setSelectedMenuItem(item); setIsEditingItem(false); setEditItemForm(null); };
  const handleStartEditItem = (item) => {
    setSelectedMenuItem(item); setIsEditingItem(true);
    setEditItemForm({
      name: item.name || '', description: item.description || '', price: item.price || '',
      imageurl: item.imageurl || '', isVeg: item.isVeg ?? true, isAvailable: item.isAvailable ?? item.available ?? true, categoryId: item.categoryId || ''
    });
  };
  const handleEditItemChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditItemForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleSaveEditItem = async (e) => {
    e.preventDefault();
    if (!selectedMenuItem || !editItemForm) return;
    const categoryId = Number(editItemForm.categoryId || selectedMenuItem.categoryId);
    if (!categoryId) { setMenuError('Category is required to update the item.'); return; }
    try {
      const updated = await apiService.foodItemAPI.update(selectedMenuItem.id, {
        name: editItemForm.name, description: editItemForm.description,
        price: parseFloat(editItemForm.price), isVeg: editItemForm.isVeg,
        isAvailable: editItemForm.isAvailable, imageurl: editItemForm.imageurl, categoryId,
      });
      setMenuItems(prev => prev.map(it => (it.id === selectedMenuItem.id ? updated : it)));
      setSelectedMenuItem(null); setIsEditingItem(false); setEditItemForm(null); setMenuError('');
    } catch (err) { setMenuError(handleAPIError(err)); }
  };
  const handleCloseItemDetails = () => { setSelectedMenuItem(null); setIsEditingItem(false); setEditItemForm(null); };

  // --- Order handlers ---
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const updated = await orderAPI.updateStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => (o.orderId === orderId ? updated : o)));
      setOrdersError('');
    } catch (err) { setOrdersError(handleAPIError(err)); }
  };

  // --- Staff handlers ---
  const handleNewStaffChange = (e) => {
    const { name, value } = e.target;
    setNewStaff(prev => ({ ...prev, [name]: value }));
  };
  const handleAddStaff = async (e) => {
    e.preventDefault();
    try {
      const user = await authAPI.registerStaff({ name: newStaff.name, email: newStaff.email, phone: newStaff.phone, password: newStaff.password });
      setStaffMembers(prev => [...prev, { id: user.id, name: user.name, role: 'Kitchen Staff', email: user.email, status: 'active', joinDate: new Date().toISOString().slice(0, 10) }]);
      setShowAddStaffForm(false);
      setNewStaff({ name: '', email: '', phone: '', password: '' });
      setStaffError('');
    } catch (err) { setStaffError(handleAPIError(err)); }
  };
  const handleStaffSearchChange = e => setStaffSearch(e.target.value);
  const handleStartEditStaff = (staff) => {
    setEditingStaffId(staff.id);
    setEditingStaffForm({ name: staff.name || '', email: staff.email || '', phone: staff.phone || '' });
  };
  const handleEditingStaffChange = (e) => {
    const { name, value } = e.target;
    setEditingStaffForm(prev => ({ ...prev, [name]: value }));
  };
  const handleCancelEditStaff = () => { setEditingStaffId(null); setEditingStaffForm({ name: '', email: '', phone: '' }); };
  const handleSaveEditStaff = async (id) => {
    try {
      setStaffMembers(prev => prev.map(s =>
        s.id === id ? { ...s, name: editingStaffForm.name, email: editingStaffForm.email, phone: editingStaffForm.phone } : s
      ));
      setEditingStaffId(null); setEditingStaffForm({ name: '', email: '', phone: '' }); setStaffError('');
    } catch (err) { setStaffError(handleAPIError(err)); }
  };
  const handleDeleteStaff = async (id) => {
    try { setStaffMembers(prev => prev.filter(s => s.id !== id)); setStaffError(''); }
    catch (err) { setStaffError(handleAPIError(err)); }
  };

  // --- Derived data ---
  const recentOrders = [...orders].filter(o => o && o.orderId)
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).slice(0, 5);

  const filteredMenuItems = menuItems.filter(item => {
    const q = menuSearch.trim().toLowerCase();
    if (!q) return true;
    const cat = categories.find(c => c.id === item.categoryId);
    const catName = (cat ? cat.name : item.category || '').toLowerCase();
    return (item.name || '').toLowerCase().includes(q) || catName.includes(q);
  });

  const filteredOrders = orderStatusFilter === 'ALL'
    ? orders
    : orders.filter(o => (o.status || '').toUpperCase() === orderStatusFilter);

  const customerUsers = (Array.isArray(allUsers) ? allUsers : []).filter(u => u.role === 'CUSTOMER');
  const filteredCustomers = customerUsers.filter(c => {
    const q = customerSearch.trim().toLowerCase();
    if (!q) return true;
    return (c.name || '').toLowerCase().includes(q) || (c.email || '').toLowerCase().includes(q);
  });

  const filteredStaff = staffMembers.filter(s => {
    const q = staffSearch.trim().toLowerCase();
    if (!q) return true;
    return (s.name || '').toLowerCase().includes(q) || (s.email || '').toLowerCase().includes(q);
  });

  const getCustomerStat = (userId) =>
    customerStats.find(cs => cs.userId === userId) || { totalOrders: 0, totalSpent: 0, lastOrderDate: null };

  return (
    <div className="admin-dashboard">
      <style>{adminStyles}</style>

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />

      <div className="main-content">
        <TopBar activeTab={activeTab} />

        {activeTab === 'dashboard' && (
          <DashboardTab
            stats={stats}
            ordersLoading={ordersLoading}
            recentOrders={recentOrders}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'menu' && (
          <MenuTab
            menuSearch={menuSearch}
            handleMenuSearchChange={handleMenuSearchChange}
            showAddItemForm={showAddItemForm}
            setShowAddItemForm={setShowAddItemForm}
            loadingMenu={loadingMenu}
            menuError={menuError}
            newItem={newItem}
            handleNewItemChange={handleNewItemChange}
            handleAddMenuItem={handleAddMenuItem}
            categories={categories}
            filteredMenuItems={filteredMenuItems}
            handleToggleAvailability={handleToggleAvailability}
            handleViewMenuItem={handleViewMenuItem}
            handleStartEditItem={handleStartEditItem}
            handleDeleteMenuItem={handleDeleteMenuItem}
            selectedMenuItem={selectedMenuItem}
            isEditingItem={isEditingItem}
            editItemForm={editItemForm}
            handleEditItemChange={handleEditItemChange}
            handleSaveEditItem={handleSaveEditItem}
            handleCloseItemDetails={handleCloseItemDetails}
          />
        )}

        {activeTab === 'staff' && (
          <StaffTab
            staffError={staffError}
            staffSearch={staffSearch}
            handleStaffSearchChange={handleStaffSearchChange}
            showAddStaffForm={showAddStaffForm}
            setShowAddStaffForm={setShowAddStaffForm}
            newStaff={newStaff}
            handleNewStaffChange={handleNewStaffChange}
            handleAddStaff={handleAddStaff}
            filteredStaff={filteredStaff}
            editingStaffId={editingStaffId}
            editingStaffForm={editingStaffForm}
            handleEditingStaffChange={handleEditingStaffChange}
            handleStartEditStaff={handleStartEditStaff}
            handleSaveEditStaff={handleSaveEditStaff}
            handleCancelEditStaff={handleCancelEditStaff}
            handleDeleteStaff={handleDeleteStaff}
          />
        )}

        {activeTab === 'customers' && (
          <CustomersTab
            customersError={customersError}
            customersLoading={customersLoading}
            customerSearch={customerSearch}
            setCustomerSearch={setCustomerSearch}
            filteredCustomers={filteredCustomers}
            getCustomerStat={getCustomerStat}
          />
        )}

        {activeTab === 'orders' && (
          <OrdersTab
            ordersLoading={ordersLoading}
            ordersError={ordersError}
            orders={orders}
            filteredOrders={filteredOrders}
            orderStatusFilter={orderStatusFilter}
            setOrderStatusFilter={setOrderStatusFilter}
            handleUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;