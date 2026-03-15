import React from 'react';
import { useToast } from '../context/ToastContext';

const API_BASE = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';

const CATEGORY_LABEL = {
  'starters':   'Starters',
  'main-course':'Main Course',
  'chinese':    'Chinese',
  'fastfood':   'Fast Food',
  'desserts':   'Desserts',
  'beverages':  'Beverages',
};

export default function DishCard({ item }) {
  const { showToast } = useToast();

  const imgSrc = item.image?.startsWith('http')
    ? item.image
    : item.image
      ? `${API_BASE}${item.image}`
      : 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80';

  const handleOrder = () => {
    showToast(`${item.name} added! Call +91 9876543210 to confirm your order.`);
  };

  return (
    <div className="dish-card">
      <div className="dish-card-img">
        <img
          src={imgSrc}
          alt={item.name}
          loading="lazy"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80'; }}
        />
        {item.isSpecial && <div className="dish-badge">Chef's Special</div>}
        <div className={`veg-indicator ${item.isVeg ? 'veg' : 'nonveg'}`}>
          <div className="dot"></div>
        </div>
      </div>
      <div className="dish-card-body">
        <div className="dish-category">{CATEGORY_LABEL[item.category] || item.category}</div>
        <h4>{item.name}</h4>
        <p>{item.description}</p>
        <div className="dish-card-footer">
          <div className="dish-price"><sup>₹</sup>{item.price}</div>
          <button className="btn-royal btn-royal-sm" onClick={handleOrder}>
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
