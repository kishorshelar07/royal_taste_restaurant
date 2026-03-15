import React, { useState } from 'react';

const GALLERY = [
  { id: 1, src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', alt: 'Restaurant Interior' },
  { id: 2, src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80', alt: 'Elegant Dining' },
  { id: 3, src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80', alt: 'Signature Dish' },
  { id: 4, src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', alt: 'Ambiance' },
  { id: 5, src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', alt: 'Fine Dining' },
  { id: 6, src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80', alt: 'Healthy Bowl' },
  { id: 7, src: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80', alt: 'Chef Special' },
  { id: 8, src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80', alt: 'Chef at Work' },
  { id: 9, src: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=800&q=80', alt: 'Biryani' },
  { id: 10,src: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&q=80', alt: 'Butter Chicken' },
  { id: 11,src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80', alt: 'Burger' },
  { id: 12,src: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80', alt: 'Lava Cake' },
];

export default function GalleryGrid({ limit }) {
  const [lightbox, setLightbox] = useState({ open: false, src: '' });
  const items = limit ? GALLERY.slice(0, limit) : GALLERY;

  return (
    <>
      <div className="gallery-masonry">
        {items.map(img => (
          <div key={img.id} className="gallery-item" onClick={() => setLightbox({ open: true, src: img.src })}>
            <img src={img.src} alt={img.alt} loading="lazy" />
            <div className="gallery-overlay">
              <i className="fas fa-search-plus"></i>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <div
        className={`lightbox${lightbox.open ? ' open' : ''}`}
        onClick={e => { if (e.target === e.currentTarget) setLightbox({ open: false, src: '' }); }}
      >
        <button className="lightbox-close" onClick={() => setLightbox({ open: false, src: '' })} aria-label="Close">
          <i className="fas fa-times"></i>
        </button>
        {lightbox.src && <img src={lightbox.src} alt="Gallery preview" />}
      </div>
    </>
  );
}
