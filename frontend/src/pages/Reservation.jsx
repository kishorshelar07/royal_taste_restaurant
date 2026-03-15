import React, { useEffect } from 'react';
import ReservationForm from '../components/ReservationForm';

export default function Reservation() {
  useEffect(() => { if (window.AOS) { window.AOS.init({ duration: 700, once: true }); window.AOS.refresh(); } }, []);
  return (
    <>
      <div className="page-hero" style={{ paddingTop: '88px' }}>
        <div className="page-hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=80')" }}></div>
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <span className="section-label">Reserve</span>
          <h1>Book Your <em className="gold italic">Table</em></h1>
        </div>
      </div>

      <section className="section-pad" style={{ background: 'var(--dark)' }}>
        <div className="container">
          <div className="row g-5">
            {/* Info */}
            <div className="col-lg-4" data-aos="fade-right">
              <span className="section-label">Contact & Hours</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: '1.5rem' }}>
                Reserve Your <em className="gold italic">Experience</em>
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                For parties larger than 10, please call us directly. We accommodate corporate events, birthdays, and weddings.
              </p>
              {[
                { icon: 'fa-phone',          title: 'Phone',         text: '+91 9876543210' },
                { icon: 'fa-clock',          title: 'Hours',         text: 'Mon–Fri: 12PM–11PM\nSat–Sun: 11AM–11:30PM' },
                { icon: 'fa-map-marker-alt', title: 'Location',      text: '123 MG Road, Koregaon Park\nPune 411001' },
                { icon: 'fa-envelope',       title: 'Email',         text: 'info@royaltaste.com' },
              ].map(item => (
                <div className="contact-item" key={item.title}>
                  <div className="contact-icon"><i className={`fas ${item.icon}`}></i></div>
                  <div>
                    <h5>{item.title}</h5>
                    <p style={{ whiteSpace: 'pre-line' }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="col-lg-8" data-aos="fade-left">
              <ReservationForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
