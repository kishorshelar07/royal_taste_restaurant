import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import './styles/global.css';

import { AuthProvider }  from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

import Navbar       from './components/Navbar';
import Footer       from './components/Footer';
import PageLoader   from './components/PageLoader';

import Home           from './pages/Home';
import About          from './pages/About';
import Menu           from './pages/Menu';
import Gallery        from './pages/Gallery';
import Reservation    from './pages/Reservation';
import Contact        from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';

/* WhatsApp Float */
function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919876543210?text=Hi!%20I'd%20like%20to%20reserve%20a%20table%20at%20Royal%20Taste"
      className="wa-float"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
}

/* 404 page */
function NotFound() {
  return (
    <div style={{
      minHeight: '85vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', flexDirection: 'column', gap: '1.5rem',
      textAlign: 'center', padding: '2rem',
    }}>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.78rem', letterSpacing: '0.4em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
        — Page not found —
      </div>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(5rem,15vw,12rem)', color: 'var(--gold)', lineHeight: 1, fontWeight: 300 }}>404</h1>
      <p style={{ color: 'var(--text-muted)', maxWidth: '360px', lineHeight: 1.8 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a href="/" className="btn-royal btn-royal-sm mt-2">
        <i className="fas fa-arrow-left"></i>
        <span>Return Home</span>
      </a>
    </div>
  );
}

/* Layout */
function Layout() {
  const location = useLocation();
  const isAdmin  = location.pathname.startsWith('/rt-admin');

  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({ duration: 850, once: true, offset: 70, easing: 'ease-out-cubic' });
      window.AOS.refresh();
    }
  }, [location.pathname]);

  return (
    <>
      {!isAdmin && <Navbar />}
      <main style={{ paddingTop: isAdmin ? 0 : '88px' }}>
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/about"        element={<About />} />
          <Route path="/menu"         element={<Menu />} />
          <Route path="/gallery"      element={<Gallery />} />
          <Route path="/reservation"  element={<Reservation />} />
          <Route path="/contact"      element={<Contact />} />
          {/* Admin at hidden URL — not linked anywhere in the UI */}
          <Route path="/rt-admin"     element={<AdminDashboard />} />
          <Route path="*"             element={<NotFound />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppFloat />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <PageLoader />
          <Layout />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
