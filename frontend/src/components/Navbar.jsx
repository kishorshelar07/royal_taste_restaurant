import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const LINKS = [
  { to: '/',            label: 'Home' },
  { to: '/about',       label: 'About' },
  { to: '/menu',        label: 'Menu' },
  { to: '/gallery',     label: 'Gallery' },
  { to: '/contact',     label: 'Contact' },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`rt-navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between">

            {/* Brand */}
            <Link to="/" className="nav-brand">
              Royal<span> Taste</span>
              <span className="nav-brand-sub">✦ Pune · Est. 2009 ✦</span>
            </Link>

            {/* Desktop links */}
            <ul className="nav-links">
              {LINKS.map(({ to, label }) => (
                <li key={to}>
                  <NavLink to={to} className={({ isActive }) => isActive ? 'active' : ''}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Reserve CTA — visible on desktop */}
            <div className="d-none d-lg-flex align-items-center gap-3">
              <a href="tel:+919876543210" style={{
                fontFamily: 'var(--font-tenor)',
                fontSize: '0.62rem', letterSpacing: '0.15em',
                color: 'var(--text-muted)', textDecoration: 'none',
              }}>
                <i className="fas fa-phone me-1" style={{ color: 'var(--gold)', fontSize: '0.7rem' }}></i>
                +91 98765 43210
              </a>
              <NavLink to="/reservation" className="nav-reserve-btn">
                Reserve a Table
              </NavLink>
            </div>

            {/* Mobile toggle */}
            <button
              className={`nav-toggle${mobileOpen ? ' active' : ''}`}
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        {LINKS.map(({ to, label }) => (
          <Link key={to} to={to}>{label}</Link>
        ))}
        <Link to="/reservation" style={{ color: 'var(--gold)' }}>Reserve a Table</Link>

        <div className="mobile-menu-footer">
          Pune · +91 9876543210
        </div>
      </div>
    </>
  );
}
