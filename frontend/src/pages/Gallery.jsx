// ── GALLERY PAGE ──────────────────────────────────────────
import React, { useEffect } from 'react';
import GalleryGrid from '../components/GalleryGrid';

export default function Gallery() {
  useEffect(() => { if (window.AOS) { window.AOS.init({ duration: 700, once: true }); window.AOS.refresh(); } }, []);
  return (
    <>
      <div className="page-hero" style={{ paddingTop: '88px' }}>
        <div className="page-hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1800&q=80')" }}></div>
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <span className="section-label">Visual Story</span>
          <h1>Our <em className="gold italic">Gallery</em></h1>
        </div>
      </div>
      <section className="section-pad bg-dark-2">
        <div className="container-fluid px-4">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="section-label">Moments & Memories</span>
            <h2>A Feast for <em className="gold italic">the Eyes</em></h2>
            <div className="divider-gold"></div>
            <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '1rem auto 0', fontSize: '0.9rem' }}>
              A curated collection of our finest dishes, elegant interiors, and unforgettable dining moments.
            </p>
          </div>
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
