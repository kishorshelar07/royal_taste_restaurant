import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('rt_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => Promise.reject(error));

// Handle 401 — token expired
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('rt_token');
      localStorage.removeItem('rt_admin');
      window.location.href = '/rt-admin';
    }
    return Promise.reject(error);
  }
);

// ── Auth ──────────────────────────────────
export const authAPI = {
  login:    (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getMe:    ()     => api.get('/auth/me'),
};

// ── Menu ──────────────────────────────────
export const menuAPI = {
  getAll:    (params) => api.get('/menu', { params }),
  getById:   (id)     => api.get(`/menu/${id}`),
  adminAll:  ()       => api.get('/menu/admin/all'),
  create:    (data)   => api.post('/menu', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update:    (id, data) => api.put(`/menu/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete:    (id)     => api.delete(`/menu/${id}`),
};

// ── Reservations ──────────────────────────
export const reservationAPI = {
  create:       (data) => api.post('/reservations', data),
  getAll:       (params) => api.get('/reservations', { params }),
  getStats:     ()     => api.get('/reservations/stats'),
  updateStatus: (id, status) => api.patch(`/reservations/${id}/status`, { status }),
  delete:       (id)   => api.delete(`/reservations/${id}`),
};

// ── Contact ───────────────────────────────
export const contactAPI = {
  send:    (data) => api.post('/contact', data),
  getAll:  ()     => api.get('/contact'),
  markRead:(id)   => api.patch(`/contact/${id}/read`),
  delete:  (id)   => api.delete(`/contact/${id}`),
};

export default api;
