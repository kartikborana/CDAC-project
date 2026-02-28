import React from 'react';
import { Search } from 'lucide-react';

const MenuSearch = ({ searchQuery, setSearchQuery }) => (
    <div className="search-section">
        <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
                type="text"
                className="search-input"
                placeholder="Search for dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    </div>
);

export default MenuSearch;
