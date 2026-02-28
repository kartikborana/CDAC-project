import React from 'react';

const MenuItemCard = ({ item, addToCart }) => (
    <div className="menu-item">
        <div className="menu-item-image-container">
            <img src={item.imageurl} alt={item.name} className="menu-item-image" />
        </div>
        <div className="menu-item-content">
            <div className="item-header">
                <div className={`veg-indicator ${!item.isVeg ? 'non-veg' : ''}`} />
                <div>
                    <div className="item-name">{item.name}</div>
                </div>
            </div>
            <div className="item-description">{item.description}</div>
            <div className="item-footer">
                <div>
                    <div className="item-price">₹{item.price}</div>
                </div>
                <button className="add-button" onClick={() => addToCart(item)}>
                    ADD +
                </button>
            </div>
        </div>
    </div>
);

export default MenuItemCard;
