import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container">
          <div className="row g-5">

            {/* Brand col */}
            <div className="col-lg-4">
              <div className="footer-brand">Royal Taste</div>
              <span className="footer-brand-sub">Luxury Dining · Pune · Est. 2009</span>
              <p className="footer-desc">
                A celebration of Indian, Chinese &amp; Fast Food cuisine in the
                heart of Pune. Every plate a story. Every visit, a memory you'll
                cherish forever.
              </p>
              <div className="footer-social">
                {[
                  { icon: 'fa-instagram', href: '#',                              label: 'Instagram' },
                  { icon: 'fa-facebook',  href: '#',                              label: 'Facebook'  },
                  { icon: 'fa-twitter',   href: '#',                              label: 'Twitter'   },
                  { icon: 'fa-youtube',   href: '#',                              label: 'YouTube'   },
                  { icon: 'fa-whatsapp',  href: 'https://wa.me/919876543210',     label: 'WhatsApp'  },
                ].map(s => (
                  <a key={s.icon} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                    <i className={`fab ${s.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Links col */}
            <div className="col-lg-2 col-md-4">
              <div className="footer-heading">Quick Links</div>
              <ul className="footer-links">
                {[
                  ['/', 'Home'],
                  ['/about', 'About Us'],
                  ['/menu', 'Our Menu'],
                  ['/gallery', 'Gallery'],
                  ['/reservation', 'Reserve a Table'],
                  ['/contact', 'Contact'],
                ].map(([to, label]) => (
                  <li key={to}><Link to={to}>{label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Hours col */}
            <div className="col-lg-3 col-md-4">
              <div className="footer-heading">Opening Hours</div>
              <div className="footer-hours">
                Monday – Friday<br />
                <span style={{ color: 'var(--gold)' }}>12:00 PM – 11:00 PM</span>
                <br /><br />
                Saturday – Sunday<br />
                <span style={{ color: 'var(--gold)' }}>11:00 AM – 11:30 PM</span>
                <br /><br />
                Public Holidays<br />
                <span style={{ color: 'var(--gold)' }}>11:00 AM – 12:00 AM</span>
              </div>
            </div>

            {/* Contact col */}
            <div className="col-lg-3 col-md-4">
              <div className="footer-heading">Get in Touch</div>
              <ul className="footer-links">
                <li><a href="tel:+919876543210">+91 9876543210</a></li>
                <li><a href="mailto:info@royaltaste.com">info@royaltaste.com</a></li>
                <li><span style={{color:'var(--text-muted)', fontSize:'0.83rem', display:'flex', alignItems:'center', gap:'0.6rem'}}><span style={{color:'rgba(201,168,76,0.4)', fontSize:'0.55rem'}}>—</span>123 MG Road, Koregaon Park</span></li>
                <li><span style={{color:'var(--text-muted)', fontSize:'0.83rem', display:'flex', alignItems:'center', gap:'0.6rem'}}><span style={{color:'rgba(201,168,76,0.4)', fontSize:'0.55rem'}}>—</span>Pune, Maharashtra 411001</span></li>
              </ul>
              <Link to="/reservation" className="btn-royal btn-royal-sm mt-4 d-inline-flex">
                <i className="fas fa-calendar-check"></i>
                <span>Book a Table</span>
              </Link>
            </div>

          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container d-flex justify-content-between align-items-center flex-wrap gap-3">
          <p>© {new Date().getFullYear()} Royal Taste Restaurant · All rights reserved</p>
          <p>Crafted with <span style={{ color: 'var(--gold)' }}>♥</span> in Pune, India</p>
        </div>
      </div>
    </footer>
  );
}
