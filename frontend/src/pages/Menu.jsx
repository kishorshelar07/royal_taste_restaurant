import React, { useState, useEffect } from 'react';
import DishCard from '../components/DishCard';
import { menuAPI } from '../services/api';

const TABS = [
  { key: 'all',        label: 'All' },
  { key: 'starters',   label: 'Starters' },
  { key: 'main-course',label: 'Main Course' },
  { key: 'chinese',    label: 'Chinese' },
  { key: 'fastfood',   label: 'Fast Food' },
  { key: 'desserts',   label: 'Desserts' },
  { key: 'beverages',  label: 'Beverages' },
];

export default function Menu() {
  const [activeTab, setActiveTab] = useState('all');
  const [items, setItems]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');

  useEffect(() => {
    setLoading(true);
    const params = activeTab === 'all' ? {} : { category: activeTab };
    menuAPI.getAll(params)
      .then(r => setItems(r.data.items || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [activeTab]);

  useEffect(() => { if (window.AOS) { window.AOS.init({ duration: 700, once: true }); window.AOS.refresh(); } }, []);

  const filtered = search.trim()
    ? items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase()))
    : items;

  return (
    <>
      <div className="page-hero" style={{ paddingTop: '88px' }}>
        <div className="page-hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1800&q=80')" }}></div>
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <span className="section-label">Royal Taste</span>
          <h1>Our <em className="gold italic">Menu</em></h1>
        </div>
      </div>

      <section className="section-pad" style={{ background: 'var(--dark)' }}>
        <div className="container-fluid px-4">

          {/* Search */}
          <div className="row justify-content-center mb-4" data-aos="fade-up">
            <div className="col-lg-5">
              <div style={{ position: 'relative' }}>
                <input
                  className="rt-input"
                  placeholder="Search dishes..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ paddingLeft: '3rem' }}
                />
                <i className="fas fa-search" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold)' }}></i>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="menu-tabs mb-4 mx-auto" style={{ maxWidth: '900px' }} data-aos="fade-up">
            {TABS.map(tab => (
              <button
                key={tab.key}
                className={`menu-tab${activeTab === tab.key ? ' active' : ''}`}
                onClick={() => { setActiveTab(tab.key); setSearch(''); }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Veg legend */}
          <div className="d-flex align-items-center gap-4 mb-4" data-aos="fade-up">
            <div className="d-flex align-items-center gap-2" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <div style={{ width: '16px', height: '16px', border: '2px solid #2ecc71', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2ecc71' }}></div>
              </div>
              Vegetarian
            </div>
            <div className="d-flex align-items-center gap-2" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <div style={{ width: '16px', height: '16px', border: '2px solid #e74c3c', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e74c3c' }}></div>
              </div>
              Non-Vegetarian
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5" style={{ color: 'var(--gold)' }}>
              <i className="fas fa-spinner fa-spin fa-3x"></i>
              <p className="mt-3" style={{ color: 'var(--text-muted)' }}>Loading menu...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-5">
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No dishes found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="row g-3">
              {filtered.map(item => (
                <div className="col-lg-3 col-md-6 col-sm-6" key={item._id} data-aos="fade-up">
                  <DishCard item={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
