import React from 'react';
import { Search, Eye, Edit } from 'lucide-react';
import { formatPrice } from '../../api-service';

const CustomersTab = ({
    customersError,
    customersLoading,
    customerSearch,
    setCustomerSearch,
    filteredCustomers,
    getCustomerStat,
}) => (
    <div className="content-section">
        <div className="section-header">
            <h2 className="section-title">Customer List</h2>
            <div className="search-bar">
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search customers..."
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                />
            </div>
        </div>

        {customersError && (
            <p style={{ color: '#EF4444', marginBottom: '1rem' }}>{customersError}</p>
        )}
        {customersLoading && <p>Loading customers...</p>}

        {!customersLoading && !filteredCustomers.length && !customersError && (
            <div className="empty-state" style={{ padding: '2rem 1rem' }}>
                <h3>No customers found</h3>
                <p>Registered customers will appear here.</p>
            </div>
        )}

        {!!filteredCustomers.length && (
            <div className="table-responsive">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Total Orders</th>
                            <th>Total Spent</th>
                            <th>Last Order</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map(customer => {
                            const statsForCustomer = getCustomerStat(customer.id);
                            const lastOrderLabel = statsForCustomer.lastOrderDate
                                ? statsForCustomer.lastOrderDate.toLocaleDateString()
                                : '-';
                            return (
                                <tr key={customer.id}>
                                    <td><strong>{customer.name}</strong></td>
                                    <td>{customer.email}</td>
                                    <td>{statsForCustomer.totalOrders}</td>
                                    <td><strong>{formatPrice(statsForCustomer.totalSpent || 0)}</strong></td>
                                    <td>{lastOrderLabel}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="table-action-btn view" type="button">
                                                <Eye size={18} />
                                            </button>
                                            <button className="table-action-btn edit" type="button">
                                                <Edit size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )}
    </div>
);

export default CustomersTab;
