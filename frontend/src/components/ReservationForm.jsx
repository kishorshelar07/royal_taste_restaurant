import React, { useState } from 'react';
import { reservationAPI } from '../services/api';
import { useToast } from '../context/ToastContext';

const TODAY = new Date().toISOString().split('T')[0];

const INIT = { name: '', phone: '', email: '', guests: '', date: '', time: '', specialRequest: '' };

export default function ReservationForm() {
  const { showToast } = useToast();
  const [form, setForm]       = useState(INIT);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, phone, email, guests, date, time } = form;
    if (!name || !phone || !email || !guests || !date || !time) {
      showToast('Please fill all required fields.', 'error'); return;
    }
    setLoading(true);
    try {
      const { data } = await reservationAPI.create(form);
      showToast(data.message || 'Reservation confirmed!');
      setForm(INIT);
    } catch (err) {
      showToast(err.response?.data?.error || 'Reservation failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrap">
      <span className="section-label">Reservation Form</span>
      <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: '2rem' }}>Table Booking</h3>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="rt-label">Full Name *</label>
            <input className="rt-input" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="rt-label">Phone *</label>
            <input className="rt-input" name="phone" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="rt-label">Email *</label>
            <input className="rt-input" type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="rt-label">Number of Guests *</label>
            <select className="rt-input" name="guests" value={form.guests} onChange={handleChange} required>
              <option value="">Select guests</option>
              {[1,2,3,4,5,6,7,8,'9+'].map(g => <option key={g} value={g}>{g} {typeof g === 'number' && g === 1 ? 'Person' : 'Persons'}</option>)}
            </select>
          </div>
          <div className="col-md-6">
            <label className="rt-label">Preferred Date *</label>
            <input className="rt-input" type="date" name="date" min={TODAY} value={form.date} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="rt-label">Preferred Time *</label>
            <select className="rt-input" name="time" value={form.time} onChange={handleChange} required>
              <option value="">Select time</option>
              {['12:00 PM','1:00 PM','2:00 PM','7:00 PM','8:00 PM','9:00 PM','10:00 PM'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="col-12">
            <label className="rt-label">Special Request</label>
            <textarea className="rt-input" name="specialRequest" rows="4" placeholder="Any special occasion, dietary restrictions..." value={form.specialRequest} onChange={handleChange} />
          </div>
          <div className="col-12 mt-2">
            <button className="btn-royal btn-royal-filled w-100" type="submit" disabled={loading} style={{ padding: '16px', justifyContent: 'center' }}>
              {loading ? <><i className="fas fa-spinner fa-spin me-2"></i>Confirming...</> : <><i className="fas fa-calendar-check me-2"></i>Confirm Reservation</>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
