import React, { useState, useEffect } from 'react';
import { contactAPI } from '../services/api';
import { useToast } from '../context/ToastContext';

const INIT = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const { showToast } = useToast();
  const [form, setForm]       = useState(INIT);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.AOS) { window.AOS.init({ duration: 700, once: true }); window.AOS.refresh(); }
  }, []);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill all required fields.', 'error'); return;
    }
    setLoading(true);
    try {
      const { data } = await contactAPI.send(form);
      showToast(data.message || 'Message sent successfully!');
      setForm(INIT);
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to send message.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-hero" style={{ paddingTop: '88px' }}>
        <div className="page-hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1800&q=80')" }}></div>
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <span className="section-label">Get in Touch</span>
          <h1>Contact <em className="gold italic">Us</em></h1>
        </div>
      </div>

      <section className="section-pad" style={{ background: 'var(--dark)' }}>
        <div className="container">
          <div className="row g-5">

            {/* Info card */}
            <div className="col-lg-5" data-aos="fade-right">
              <div className="contact-info-card">
                <span className="section-label">Find Us</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: '2rem' }}>
                  Restaurant <em className="gold italic">Info</em>
                </h3>
                {[
                  { icon: 'fa-map-marker-alt', title: 'Address',       text: '123 MG Road, Koregaon Park,\nPune, Maharashtra 411001' },
                  { icon: 'fa-phone',          title: 'Phone',         text: '+91 9876543210\n+91 9876543211' },
                  { icon: 'fa-envelope',       title: 'Email',         text: 'info@royaltaste.com\nreservations@royaltaste.com' },
                  { icon: 'fa-clock',          title: 'Opening Hours', text: 'Mon–Fri: 12:00 PM – 11:00 PM\nSat–Sun: 11:00 AM – 11:30 PM' },
                ].map(item => (
                  <div className="contact-item" key={item.title}>
                    <div className="contact-icon"><i className={`fas ${item.icon}`}></i></div>
                    <div>
                      <h5>{item.title}</h5>
                      <p style={{ whiteSpace: 'pre-line' }}>{item.text}</p>
                    </div>
                  </div>
                ))}
                <div className="footer-social mt-4">
                  {[
                    { icon: 'fa-instagram', href: '#' },
                    { icon: 'fa-facebook',  href: '#' },
                    { icon: 'fa-twitter',   href: '#' },
                    { icon: 'fa-youtube',   href: '#' },
                  ].map(s => (
                    <a key={s.icon} href={s.href} target="_blank" rel="noreferrer">
                      <i className={`fab ${s.icon}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form + Map */}
            <div className="col-lg-7" data-aos="fade-left">
              <div className="form-wrap mb-4">
                <span className="section-label">Message Us</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: '2rem' }}>
                  Send a <em className="gold italic">Message</em>
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="rt-label">Your Name *</label>
                      <input className="rt-input" name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="rt-label">Email *</label>
                      <input className="rt-input" type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="col-12">
                      <label className="rt-label">Subject</label>
                      <input className="rt-input" name="subject" placeholder="How can we help?" value={form.subject} onChange={handleChange} />
                    </div>
                    <div className="col-12">
                      <label className="rt-label">Message *</label>
                      <textarea className="rt-input" name="message" rows="5" placeholder="Your message..." value={form.message} onChange={handleChange} required />
                    </div>
                    <div className="col-12 mt-1">
                      <button className="btn-royal btn-royal-filled" type="submit" disabled={loading}>
                        {loading
                          ? <><i className="fas fa-spinner fa-spin me-2"></i>Sending...</>
                          : <><i className="fas fa-paper-plane me-2"></i>Send Message</>
                        }
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Google Map */}
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.437700697576!2d73.8920563!3d18.5325033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c00a5c1f2a5f%3A0x4b40a5a5a5a5a5a5!2sKoregaon+Park%2C+Pune!5e0!3m2!1sen!2sin!4v1234567890"
                  allowFullScreen=""
                  loading="lazy"
                  title="Royal Taste Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
