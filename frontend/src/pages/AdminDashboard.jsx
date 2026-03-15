import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { menuAPI, reservationAPI, contactAPI } from '../services/api';

/* ═══════════════════════════════════════════
   ADMIN LOGIN PANEL
═══════════════════════════════════════════ */
function AdminLogin() {
  const { login, loading } = useAuth();
  const { showToast } = useToast();
  const [creds, setCreds] = useState({ username: '', password: '' });

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await login(creds.username, creds.password);
    if (!result.success) showToast(result.error, 'error');
  };

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <div className="text-center mb-4">
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--gold)', marginBottom: '0.3rem' }}>Royal Taste</div>
          <span className="section-label" style={{ justifyContent: 'center', display: 'block' }}>Admin Panel</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="rt-label">Username</label>
            <input className="rt-input" placeholder="Username" value={creds.username} onChange={e => setCreds(p => ({ ...p, username: e.target.value }))} required />
          </div>
          <div className="mb-3">
            <label className="rt-label">Password</label>
            <input className="rt-input" type="password" placeholder="••••••••" value={creds.password} onChange={e => setCreds(p => ({ ...p, password: e.target.value }))} required />
          </div>
          <button className="btn-royal btn-royal-filled w-100 mt-2" type="submit" disabled={loading} style={{ padding: '14px', justifyContent: 'center' }}>
            {loading ? <><i className="fas fa-spinner fa-spin me-2"></i>Signing in...</> : <><i className="fas fa-lock me-2"></i>Sign In</>}
          </button>
        </form>
        <p style={{ textAlign: 'center', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '1.5rem' }}>
          Default: admin / admin123
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   DASHBOARD OVERVIEW
═══════════════════════════════════════════ */
function DashboardOverview({ stats, recentRes }) {
  return (
    <>
      <div className="row g-3 mb-4">
        {[
          { num: stats.total,     label: 'Total Reservations', icon: 'fa-calendar-check', color: 'var(--gold)' },
          { num: stats.today,     label: 'Upcoming',           icon: 'fa-clock',          color: '#3498db' },
          { num: stats.pending,   label: 'Pending',            icon: 'fa-hourglass-half', color: '#f39c12' },
          { num: stats.confirmed, label: 'Confirmed',          icon: 'fa-check-circle',   color: '#2ecc71' },
        ].map(s => (
          <div className="col-md-3 col-6" key={s.label}>
            <div className="stats-card">
              <i className={`fas ${s.icon}`} style={{ fontSize: '1.5rem', color: s.color, marginBottom: '0.8rem' }}></i>
              <div className="num" style={{ color: s.color }}>{s.num ?? '—'}</div>
              <div className="lbl">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <h5 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)', marginBottom: '1.2rem' }}>Recent Reservations</h5>
        {!recentRes.length
          ? <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No reservations yet.</p>
          : <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead><tr><th>Name</th><th>Guests</th><th>Date</th><th>Time</th><th>Status</th></tr></thead>
                <tbody>
                  {recentRes.slice(0, 6).map(r => (
                    <tr key={r._id}>
                      <td>{r.name}</td>
                      <td>{r.guests}</td>
                      <td>{new Date(r.date).toLocaleDateString('en-IN')}</td>
                      <td>{r.time}</td>
                      <td><span className={`badge-status badge-${r.status}`}>{r.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        }
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   MENU MANAGEMENT
═══════════════════════════════════════════ */
function MenuManagement({ showToast }) {
  const [items, setItems]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [showForm, setShowForm]     = useState(false);
  const [editItem, setEditItem]     = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview]       = useState('');
  const fileRef = useRef();

  const INIT_FORM = { name: '', category: 'main-course', description: '', price: '', isVeg: 'true', isSpecial: 'false', spiceLevel: 'medium', tags: '' };
  const [form, setForm] = useState(INIT_FORM);

  const load = () => {
    setLoading(true);
    menuAPI.adminAll()
      .then(r => setItems(r.data.items || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditItem(null); setForm(INIT_FORM); setPreview(''); setShowForm(true); };
  const openEdit = item => {
    setEditItem(item);
    setForm({
      name: item.name, category: item.category, description: item.description,
      price: item.price, isVeg: String(item.isVeg), isSpecial: String(item.isSpecial),
      spiceLevel: item.spiceLevel, tags: (item.tags || []).join(', '),
    });
    setPreview(item.image || '');
    setShowForm(true);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.price || !form.description) { showToast('Name, price and description are required.', 'error'); return; }
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (fileRef.current?.files[0]) fd.append('image', fileRef.current.files[0]);

      if (editItem) {
        await menuAPI.update(editItem._id, fd);
        showToast('Menu item updated!');
      } else {
        await menuAPI.create(fd);
        showToast('Menu item added!');
      }
      setShowForm(false); load();
    } catch (err) {
      showToast(err.response?.data?.error || 'Operation failed.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this menu item?')) return;
    try { await menuAPI.delete(id); showToast('Item deleted.'); load(); }
    catch (err) { showToast(err.response?.data?.error || 'Delete failed.', 'error'); }
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const CATEGORIES = ['starters','main-course','chinese','fastfood','desserts','beverages'];
  const SPICE_LEVELS = ['none','mild','medium','hot','extra-hot'];

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h5 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)', margin: 0 }}>
          Menu Items <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({items.length})</span>
        </h5>
        <button className="btn-royal btn-royal-sm btn-royal-filled" onClick={openAdd}>
          <i className="fas fa-plus me-1"></i> Add Item
        </button>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="admin-card mb-4">
          <h5 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)', marginBottom: '1.5rem' }}>
            {editItem ? 'Edit Menu Item' : 'Add New Menu Item'}
          </h5>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="rt-label">Dish Name *</label>
                <input className="rt-input" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Butter Chicken" required />
              </div>
              <div className="col-md-6">
                <label className="rt-label">Category *</label>
                <select className="rt-input" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1).replace('-',' ')}</option>)}
                </select>
              </div>
              <div className="col-md-4">
                <label className="rt-label">Price (₹) *</label>
                <input className="rt-input" type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} placeholder="350" required />
              </div>
              <div className="col-md-4">
                <label className="rt-label">Spice Level</label>
                <select className="rt-input" value={form.spiceLevel} onChange={e => setForm(p => ({ ...p, spiceLevel: e.target.value }))}>
                  {SPICE_LEVELS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
              <div className="col-md-2">
                <label className="rt-label">Veg?</label>
                <select className="rt-input" value={form.isVeg} onChange={e => setForm(p => ({ ...p, isVeg: e.target.value }))}>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="col-md-2">
                <label className="rt-label">Special?</label>
                <select className="rt-input" value={form.isSpecial} onChange={e => setForm(p => ({ ...p, isSpecial: e.target.value }))}>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <div className="col-12">
                <label className="rt-label">Description *</label>
                <textarea className="rt-input" rows="3" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Brief dish description..." required />
              </div>
              <div className="col-md-8">
                <label className="rt-label">Tags (comma separated)</label>
                <input className="rt-input" value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} placeholder="bestseller, spicy, popular" />
              </div>
              <div className="col-md-4">
                <label className="rt-label">Food Image</label>
                <input className="rt-input" type="file" accept="image/*" ref={fileRef} onChange={handleFileChange} style={{ padding: '10px' }} />
              </div>
              {preview && (
                <div className="col-12">
                  <img src={preview} alt="Preview" style={{ height: '120px', objectFit: 'cover', border: '1px solid rgba(201,168,76,0.2)' }} />
                </div>
              )}
              <div className="col-12 d-flex gap-2">
                <button className="btn-royal btn-royal-filled btn-royal-sm" type="submit" disabled={submitting}>
                  {submitting ? <i className="fas fa-spinner fa-spin"></i> : (editItem ? 'Update Item' : 'Add Item')}
                </button>
                <button className="btn-royal btn-royal-sm" type="button" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Items Table */}
      <div className="admin-card">
        {loading
          ? <div className="text-center py-4" style={{ color: 'var(--gold)' }}><i className="fas fa-spinner fa-spin fa-2x"></i></div>
          : <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead>
                  <tr><th>#</th><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Veg</th><th>Special</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td>
                        <img
                          src={item.image?.startsWith('http') ? item.image : item.image ? `http://localhost:5000${item.image}` : 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=60&q=50'}
                          style={{ width: '44px', height: '44px', objectFit: 'cover' }}
                          alt={item.name}
                        />
                      </td>
                      <td style={{ maxWidth: '140px' }}>{item.name}</td>
                      <td><span className="badge-status" style={{ background: 'rgba(201,168,76,0.1)', color: 'var(--gold)' }}>{item.category}</span></td>
                      <td>₹{item.price}</td>
                      <td><span style={{ color: item.isVeg ? '#2ecc71' : '#e74c3c', fontSize: '1.1rem' }}>{item.isVeg ? '🟢' : '🔴'}</span></td>
                      <td>{item.isSpecial ? <span style={{ color: 'var(--gold)' }}>★</span> : '—'}</td>
                      <td>
                        <div className="d-flex gap-1">
                          <button className="btn-sm-admin btn-gold-sm" onClick={() => openEdit(item)}>Edit</button>
                          <button className="btn-sm-admin btn-danger-sm" onClick={() => handleDelete(item._id)}>Del</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        }
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   RESERVATIONS MANAGEMENT
═══════════════════════════════════════════ */
function ReservationsManagement({ showToast }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const load = () => {
    setLoading(true);
    reservationAPI.getAll()
      .then(r => setReservations(r.data.reservations || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleStatus = async (id, status) => {
    try {
      await reservationAPI.updateStatus(id, status);
      showToast(`Status updated to ${status}.`);
      load();
    } catch { showToast('Failed to update status.', 'error'); }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this reservation?')) return;
    try { await reservationAPI.delete(id); showToast('Reservation deleted.'); load(); }
    catch { showToast('Delete failed.', 'error'); }
  };

  const filtered = filter ? reservations.filter(r => r.status === filter) : reservations;

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
        <h5 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)', margin: 0 }}>
          Reservations <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({filtered.length})</span>
        </h5>
        <select className="rt-input" style={{ width: 'auto', padding: '8px 14px', fontSize: '0.8rem' }} value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">All Status</option>
          {['pending','confirmed','seated','completed','cancelled'].map(s => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="admin-card">
        {loading
          ? <div className="text-center py-4" style={{ color: 'var(--gold)' }}><i className="fas fa-spinner fa-spin fa-2x"></i></div>
          : filtered.length === 0
            ? <p style={{ color: 'var(--text-muted)', padding: '1rem 0' }}>No reservations found.</p>
            : <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr><th>#</th><th>Name</th><th>Phone</th><th>Email</th><th>Guests</th><th>Date</th><th>Time</th><th>Request</th><th>Status</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {filtered.map((r, i) => (
                      <tr key={r._id}>
                        <td>{i + 1}</td>
                        <td>{r.name}</td>
                        <td>{r.phone}</td>
                        <td style={{ fontSize: '0.78rem' }}>{r.email}</td>
                        <td>{r.guests}</td>
                        <td>{new Date(r.date).toLocaleDateString('en-IN')}</td>
                        <td>{r.time}</td>
                        <td style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.78rem' }}>{r.specialRequest || '—'}</td>
                        <td><span className={`badge-status badge-${r.status}`}>{r.status}</span></td>
                        <td>
                          <div className="d-flex gap-1 flex-wrap">
                            {r.status === 'pending' && (
                              <button className="btn-sm-admin btn-success-sm" onClick={() => handleStatus(r._id, 'confirmed')}>Confirm</button>
                            )}
                            {r.status === 'confirmed' && (
                              <button className="btn-sm-admin btn-gold-sm" onClick={() => handleStatus(r._id, 'seated')}>Seated</button>
                            )}
                            {r.status !== 'cancelled' && r.status !== 'completed' && (
                              <button className="btn-sm-admin btn-danger-sm" onClick={() => handleStatus(r._id, 'cancelled')}>Cancel</button>
                            )}
                            <button className="btn-sm-admin btn-danger-sm" onClick={() => handleDelete(r._id)}>Del</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
        }
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   MESSAGES MANAGEMENT
═══════════════════════════════════════════ */
function MessagesManagement({ showToast }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(true);

  const load = () => {
    setLoading(true);
    contactAPI.getAll()
      .then(r => setMessages(r.data.messages || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleMarkRead = async id => {
    try { await contactAPI.markRead(id); load(); }
    catch { showToast('Failed.', 'error'); }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this message?')) return;
    try { await contactAPI.delete(id); showToast('Message deleted.'); load(); }
    catch { showToast('Delete failed.', 'error'); }
  };

  return (
    <>
      <h5 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)', marginBottom: '1rem' }}>
        Messages <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({messages.length})</span>
      </h5>
      {loading
        ? <div className="text-center py-4" style={{ color: 'var(--gold)' }}><i className="fas fa-spinner fa-spin fa-2x"></i></div>
        : messages.length === 0
          ? <div className="admin-card"><p style={{ color: 'var(--text-muted)' }}>No messages yet.</p></div>
          : messages.map(msg => (
              <div key={msg._id} className="admin-card" style={{ borderLeft: msg.isRead ? '1px solid rgba(201,168,76,0.1)' : '3px solid var(--gold)', marginBottom: '1rem' }}>
                <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                  <div>
                    <div style={{ fontWeight: 500, color: msg.isRead ? 'var(--text-muted)' : 'var(--white)', marginBottom: '0.2rem' }}>
                      {msg.name} {!msg.isRead && <span style={{ fontSize: '0.6rem', background: 'var(--gold)', color: 'var(--dark)', padding: '2px 6px', marginLeft: '6px', verticalAlign: 'middle' }}>NEW</span>}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      {msg.email} · {new Date(msg.createdAt).toLocaleDateString('en-IN')}
                    </div>
                    {msg.subject && <div style={{ fontSize: '0.82rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>Re: {msg.subject}</div>}
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', margin: 0 }}>{msg.message}</p>
                  </div>
                  <div className="d-flex gap-1">
                    {!msg.isRead && (
                      <button className="btn-sm-admin btn-success-sm" onClick={() => handleMarkRead(msg._id)}>Mark Read</button>
                    )}
                    <button className="btn-sm-admin btn-danger-sm" onClick={() => handleDelete(msg._id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))
      }
    </>
  );
}

/* ═══════════════════════════════════════════
   MAIN ADMIN DASHBOARD
═══════════════════════════════════════════ */
export default function AdminDashboard() {
  const { admin, logout, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats]         = useState({});
  const [recentRes, setRecentRes] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) return;
    reservationAPI.getStats().then(r => setStats(r.data)).catch(() => {});
    reservationAPI.getAll().then(r => setRecentRes(r.data.reservations || [])).catch(() => {});
  }, [isAuthenticated]);

  if (!isAuthenticated) return <AdminLogin />;

  const TABS = [
    { id: 'dashboard',    icon: 'fa-chart-bar',      label: 'Dashboard' },
    { id: 'menu',         icon: 'fa-utensils',        label: 'Menu Items' },
    { id: 'reservations', icon: 'fa-calendar-check',  label: 'Reservations' },
    { id: 'messages',     icon: 'fa-envelope',        label: 'Messages' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)' }}>
      {/* Top Bar */}
      <div className="admin-topbar">
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--gold)' }}>
          Royal Taste <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontFamily: 'var(--font-sans)' }}>— Admin</span>
        </div>
        <div className="d-flex gap-3 align-items-center">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <i className="fas fa-user-shield me-1" style={{ color: 'var(--gold)' }}></i>
            {admin?.username}
          </span>
          <button className="btn-royal btn-royal-sm" onClick={() => navigate('/')}>
            ← Site
          </button>
          <button className="btn-royal btn-royal-sm" onClick={logout} style={{ color: '#e74c3c', borderColor: '#e74c3c' }}>
            Logout
          </button>
        </div>
      </div>

      <div className="d-flex">
        {/* Sidebar */}
        <div className="admin-sidebar">
          {TABS.map(tab => (
            <a
              key={tab.id}
              href="#!"
              className={activeTab === tab.id ? 'active' : ''}
              onClick={e => { e.preventDefault(); setActiveTab(tab.id); }}
            >
              <i className={`fas ${tab.icon}`}></i> {tab.label}
            </a>
          ))}
        </div>

        {/* Main Content */}
        <div className="admin-main">
          {activeTab === 'dashboard'    && <DashboardOverview stats={stats} recentRes={recentRes} />}
          {activeTab === 'menu'         && <MenuManagement showToast={showToast} />}
          {activeTab === 'reservations' && <ReservationsManagement showToast={showToast} />}
          {activeTab === 'messages'     && <MessagesManagement showToast={showToast} />}
        </div>
      </div>
    </div>
  );
}
