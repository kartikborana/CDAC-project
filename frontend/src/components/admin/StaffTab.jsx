import React from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';

const StaffTab = ({
    staffError,
    staffSearch,
    handleStaffSearchChange,
    showAddStaffForm,
    setShowAddStaffForm,
    newStaff,
    handleNewStaffChange,
    handleAddStaff,
    filteredStaff,
    editingStaffId,
    editingStaffForm,
    handleEditingStaffChange,
    handleStartEditStaff,
    handleSaveEditStaff,
    handleCancelEditStaff,
    handleDeleteStaff,
}) => (
    <div className="content-section">
        <div className="section-header">
            <h2 className="section-title">Staff Members</h2>
            <div className="search-bar" style={{ maxWidth: '260px' }}>
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search staff..."
                    value={staffSearch}
                    onChange={handleStaffSearchChange}
                />
            </div>
            <button
                className="action-button"
                type="button"
                onClick={() => setShowAddStaffForm(prev => !prev)}
            >
                <Plus size={20} />
                {showAddStaffForm ? 'Close' : 'Add Staff'}
            </button>
        </div>

        {staffError && (
            <p style={{ color: '#EF4444', marginBottom: '1rem' }}>{staffError}</p>
        )}

        {showAddStaffForm && (
            <form
                onSubmit={handleAddStaff}
                style={{ marginBottom: '1.5rem', display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}
            >
                <input type="text" name="name" placeholder="Full name" className="search-input" value={newStaff.name} onChange={handleNewStaffChange} required />
                <input type="email" name="email" placeholder="Email" className="search-input" value={newStaff.email} onChange={handleNewStaffChange} required />
                <input type="tel" name="phone" placeholder="10-digit phone" className="search-input" value={newStaff.phone} onChange={handleNewStaffChange} required />
                <input type="password" name="password" placeholder="Password" className="search-input" value={newStaff.password} onChange={handleNewStaffChange} required />
                <button type="submit" className="action-button" style={{ alignSelf: 'center' }}>
                    Save Staff
                </button>
            </form>
        )}

        <table className="data-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Join Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredStaff.map(staff => {
                    const isEditing = editingStaffId === staff.id;
                    return (
                        <tr key={staff.id}>
                            <td>
                                {isEditing ? (
                                    <input type="text" name="name" className="search-input" value={editingStaffForm.name} onChange={handleEditingStaffChange} />
                                ) : (
                                    <strong>{staff.name}</strong>
                                )}
                            </td>
                            <td>{staff.role}</td>
                            <td>
                                {isEditing ? (
                                    <input type="email" name="email" className="search-input" value={editingStaffForm.email} onChange={handleEditingStaffChange} />
                                ) : staff.email}
                            </td>
                            <td>
                                {isEditing ? (
                                    <input type="tel" name="phone" className="search-input" value={editingStaffForm.phone} onChange={handleEditingStaffChange} />
                                ) : (staff.phone || '-')}
                            </td>
                            <td>
                                <span className={`status-badge ${staff.status}`}>{staff.status}</span>
                            </td>
                            <td>{staff.joinDate}</td>
                            <td>
                                <div className="action-buttons">
                                    {!isEditing ? (
                                        <>
                                            <button className="table-action-btn edit" type="button" onClick={() => handleStartEditStaff(staff)}>
                                                <Edit size={18} />
                                            </button>
                                            <button className="table-action-btn delete" type="button" onClick={() => handleDeleteStaff(staff.id)}>
                                                <Trash2 size={18} />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="table-action-btn view" type="button" onClick={() => handleSaveEditStaff(staff.id)}>Save</button>
                                            <button className="table-action-btn delete" type="button" onClick={handleCancelEditStaff}>Cancel</button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
);

export default StaffTab;
