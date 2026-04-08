import React from 'react';
import { Search, Plus, Eye, Edit, Trash2 } from 'lucide-react';

const MenuTab = ({
    menuSearch,
    handleMenuSearchChange,
    showAddItemForm,
    setShowAddItemForm,
    loadingMenu,
    menuError,
    newItem,
    handleNewItemChange,
    handleAddMenuItem,
    categories,
    filteredMenuItems,
    handleToggleAvailability,
    handleViewMenuItem,
    handleStartEditItem,
    handleDeleteMenuItem,
    selectedMenuItem,
    isEditingItem,
    editItemForm,
    handleEditItemChange,
    handleSaveEditItem,
    handleCloseItemDetails,
}) => (
    <div className="content-section">
        <div className="section-header">
            <div className="search-bar">
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search menu items..."
                    value={menuSearch}
                    onChange={handleMenuSearchChange}
                />
            </div>
            <button
                className="action-button"
                type="button"
                onClick={() => setShowAddItemForm(prev => !prev)}
            >
                <Plus size={20} />
                {showAddItemForm ? 'Close' : 'Add New Item'}
            </button>
        </div>

        {loadingMenu && <p>Loading menu...</p>}
        {menuError && (
            <p style={{ color: '#EF4444', marginBottom: '1rem' }}>{menuError}</p>
        )}

        {showAddItemForm && (
            <form
                onSubmit={handleAddMenuItem}
                style={{
                    marginBottom: '1.5rem',
                    display: 'grid',
                    gap: '0.75rem',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                }}
            >
                <input type="text" name="name" placeholder="Item name" className="search-input" value={newItem.name} onChange={handleNewItemChange} required />
                <input type="text" name="description" placeholder="Description" className="search-input" value={newItem.description} onChange={handleNewItemChange} required />
                <input type="number" name="price" placeholder="Price" className="search-input" value={newItem.price} onChange={handleNewItemChange} min="1" step="1" required />
                <select name="categoryId" className="search-input" value={newItem.categoryId} onChange={handleNewItemChange} required>
                    <option value="">Select Category</option>
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
                <input type="text" name="imageurl" placeholder="Image URL" className="search-input" value={newItem.imageurl} onChange={handleNewItemChange} required />
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" name="isVeg" checked={newItem.isVeg} onChange={handleNewItemChange} />
                    Veg item
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" name="isAvailable" checked={newItem.isAvailable} onChange={handleNewItemChange} />
                    Available
                </label>
                <button type="submit" className="action-button" style={{ alignSelf: 'center' }}>
                    Save Item
                </button>
            </form>
        )}

        <div className="table-responsive">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Type</th>
                        <th>Orders</th>
                        <th>Available</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMenuItems.map(item => {
                        const category = categories.find(c => c.id === item.categoryId) || null;
                        return (
                            <tr key={item.id}>
                                <td><strong>{item.name}</strong></td>
                                <td>{category ? category.name : (item.category || '-')}</td>
                                <td><strong>₹{item.price}</strong></td>
                                <td>
                                    <span style={{ color: (item.isVeg ?? item.veg) ? '#10B981' : '#EF4444', fontWeight: 600 }}>
                                        {(item.isVeg ?? item.veg) ? '🟢 Veg' : '🔴 Non-Veg'}
                                    </span>
                                </td>
                                <td>{item.orders ?? '-'}{item.orders ? ' orders' : ''}</td>
                                <td>
                                    <div
                                        className={`availability-toggle ${item.isAvailable ?? item.available ? 'active' : ''}`}
                                        onClick={() => handleToggleAvailability(item)}
                                    />
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="table-action-btn view" type="button" onClick={() => handleViewMenuItem(item)}>
                                            <Eye size={18} />
                                        </button>
                                        <button className="table-action-btn edit" type="button" onClick={() => handleStartEditItem(item)}>
                                            <Edit size={18} />
                                        </button>
                                        <button className="table-action-btn delete" type="button" onClick={() => handleDeleteMenuItem(item.id)}>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>

        {/* View Details */}
        {selectedMenuItem && !isEditingItem && (
            <div style={{ marginTop: '1.5rem', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Item Details</h3>
                    <button type="button" className="action-button secondary" style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }} onClick={handleCloseItemDetails}>
                        Close
                    </button>
                </div>
                <p><strong>Name:</strong> {selectedMenuItem.name}</p>
                <p><strong>Description:</strong> {selectedMenuItem.description}</p>
                <p><strong>Price:</strong> ₹{selectedMenuItem.price}</p>
                <p><strong>Type:</strong> {(selectedMenuItem.isVeg ?? selectedMenuItem.veg) ? 'Veg' : 'Non-Veg'}</p>
                <p><strong>Available:</strong> {(selectedMenuItem.isAvailable ?? selectedMenuItem.available) ? 'Yes' : 'No'}</p>
            </div>
        )}

        {/* Edit Form */}
        {selectedMenuItem && isEditingItem && editItemForm && (
            <form
                onSubmit={handleSaveEditItem}
                style={{ marginTop: '1.5rem', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--light)', display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}
            >
                <input type="text" name="name" placeholder="Item name" className="search-input" value={editItemForm.name} onChange={handleEditItemChange} required />
                <input type="text" name="description" placeholder="Description" className="search-input" value={editItemForm.description} onChange={handleEditItemChange} required />
                <input type="number" name="price" placeholder="Price" className="search-input" value={editItemForm.price} onChange={handleEditItemChange} min="1" step="1" required />
                <select name="categoryId" className="search-input" value={editItemForm.categoryId} onChange={handleEditItemChange} required>
                    <option value="">Select Category</option>
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
                <input type="text" name="imageurl" placeholder="Image URL" className="search-input" value={editItemForm.imageurl} onChange={handleEditItemChange} required />
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" name="isVeg" checked={editItemForm.isVeg} onChange={handleEditItemChange} />
                    Veg item
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" name="isAvailable" checked={editItemForm.isAvailable} onChange={handleEditItemChange} />
                    Available
                </label>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <button type="submit" className="action-button">Save Changes</button>
                    <button type="button" className="action-button secondary" onClick={handleCloseItemDetails}>Cancel</button>
                </div>
            </form>
        )}
    </div>
);

export default MenuTab;
