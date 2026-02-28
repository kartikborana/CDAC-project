import React from 'react';

const CategoryFilter = ({ menuCategories, activeCategory, setActiveCategory }) => (
    <div className="categories-section">
        <div className="categories-scroll">
            <button
                className={`category-chip ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCategory('all')}
            >
                All Items
            </button>
            {menuCategories.map(category => (
                <button
                    key={category.id}
                    className={`category-chip ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                >
                    {category.name}
                </button>
            ))}
        </div>
    </div>
);

export default CategoryFilter;
