# 🍽️ Royal Taste Restaurant — Full Stack Application v2.0

**Premium luxury restaurant website — React + Node.js + MongoDB + JWT**

---

## 📁 Project Structure

```
royal-taste-v2/
├── frontend/                        ← React (Create React App)
│   ├── public/
│   │   └── index.html               ← Bootstrap 5, FontAwesome, AOS CDN
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           ← Sticky, scroll-aware navbar
│   │   │   ├── Footer.jsx           ← 4-column footer
│   │   │   ├── Hero.jsx             ← Animated hero with counters
│   │   │   ├── DishCard.jsx         ← Menu item card with veg indicator
│   │   │   ├── TestimonialSlider.jsx← Auto-sliding testimonials
│   │   │   ├── GalleryGrid.jsx      ← Masonry grid + lightbox
│   │   │   ├── ReservationForm.jsx  ← Booking form with API
│   │   │   └── PageLoader.jsx       ← Animated loading screen
│   │   ├── context/
│   │   │   ├── AuthContext.js       ← JWT auth state
│   │   │   └── ToastContext.js      ← Global toast notifications
│   │   ├── pages/
│   │   │   ├── Home.jsx             ← Full homepage with all sections
│   │   │   ├── About.jsx            ← Story, chef, timeline
│   │   │   ├── Menu.jsx             ← Filterable menu from MongoDB
│   │   │   ├── Gallery.jsx          ← Masonry gallery + lightbox
│   │   │   ├── Reservation.jsx      ← Table booking page
│   │   │   ├── Contact.jsx          ← Contact form + Google Maps
│   │   │   └── AdminDashboard.jsx   ← Full admin panel
│   │   ├── services/
│   │   │   └── api.js               ← Axios instance + all API calls
│   │   ├── styles/
│   │   │   └── global.css           ← Complete luxury theme
│   │   ├── App.js                   ← Router + layout + AOS init
│   │   └── index.js                 ← Entry point
│   ├── .env.example
│   └── package.json
│
└── backend/                         ← Node.js + Express + MongoDB
    ├── config/
    │   └── db.js                    ← MongoDB connection
    ├── controllers/
    │   ├── authController.js        ← Login, register, getMe
    │   ├── menuController.js        ← Full CRUD + image upload
    │   ├── reservationController.js ← Booking + availability check
    │   └── contactController.js     ← Contact messages
    ├── middleware/
    │   ├── authMiddleware.js        ← JWT protect
    │   └── uploadMiddleware.js      ← Multer 5MB image upload
    ├── models/
    │   ├── Admin.js                 ← bcrypt hashed passwords
    │   ├── Menu.js                  ← Full menu schema
    │   ├── Reservation.js           ← Booking schema with status
    │   └── Contact.js               ← Contact messages schema
    ├── routes/
    │   ├── authRoutes.js
    │   ├── menuRoutes.js
    │   ├── reservationRoutes.js
    │   └── contactRoutes.js
    ├── uploads/                     ← Food images (auto-created)
    ├── server.js                    ← Main server (Helmet, CORS, Rate limit, XSS)
    ├── seed.js                      ← Populate DB with sample data
    ├── .env.example
    └── package.json
```

---

## 🚀 Quick Start (Local)

### Prerequisites
- Node.js 18+ installed ([nodejs.org](https://nodejs.org))
- MongoDB Atlas account (free) OR MongoDB installed locally

---

### Step 1 — Clone / Extract

Extract the ZIP and open the folder in VS Code.

---

### Step 2 — Setup Backend

```bash
cd backend
npm install
cp .env.example .env
```

**Edit `.env`:**
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASS@cluster.mongodb.net/royaltaste_db
JWT_SECRET=any_long_random_secret_string_here
JWT_EXPIRES_IN=8h
FRONTEND_URL=http://localhost:3000
```

**Seed the database with sample data:**
```bash
node seed.js
```
✅ This creates:
- Admin user: `admin` / `admin123`
- 23 menu items across all categories

**Start backend:**
```bash
npm run dev
```
✅ API running at `http://localhost:5000`

---

### Step 3 — Setup Frontend

```bash
# New terminal
cd frontend
npm install
cp .env.example .env
```

`.env` content:
```
REACT_APP_API_URL=http://localhost:5000/api
```

**Start frontend:**
```bash
npm start
```
✅ Website opens at `http://localhost:3000`

---

## 🌐 Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, specials, menu preview, chef, gallery, testimonials, offers, CTA |
| `/about` | About | Story, vision/mission, chef, timeline |
| `/menu` | Menu | Filterable menu from MongoDB with search |
| `/gallery` | Gallery | Masonry photo grid with lightbox |
| `/reservation` | Reservation | Table booking form → saved to MongoDB |
| `/contact` | Contact | Message form + Google Map |
| `/admin` | Admin Dashboard | Protected — login required |

---

## 🔐 Admin Dashboard

**Login:** `admin` / `admin123`

| Feature | Description |
|---|---|
| Dashboard | Stats: total reservations, pending, confirmed, upcoming |
| Menu Management | Add / Edit / Delete menu items with image upload |
| Reservations | View all, update status (pending → confirmed → seated), delete |
| Messages | View contact messages, mark read, delete |

---

## 🛡️ Security Features

| Feature | Implementation |
|---|---|
| Helmet | HTTP security headers |
| Rate Limiting | 100 req/15min global, 10 req/15min for auth |
| CORS | Whitelist frontend URL only |
| MongoDB Sanitize | Prevents NoSQL injection |
| XSS Clean | Sanitizes request body |
| bcrypt | Password hashing (salt rounds: 12) |
| JWT | 8h token expiry, Bearer auth |
| Input Validation | Mongoose schema validators |
| File Upload | 5MB limit, image types only |

---

## 📡 API Endpoints

### Auth
| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/api/auth/login` | Public | Admin login |
| POST | `/api/auth/register` | Public | Create admin (one-time) |
| GET | `/api/auth/me` | Admin | Get current admin |

### Menu
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/api/menu` | Public | Get active items (filter by category/special) |
| GET | `/api/menu/:id` | Public | Get single item |
| GET | `/api/menu/admin/all` | Admin | All items including unavailable |
| POST | `/api/menu` | Admin | Create with image upload |
| PUT | `/api/menu/:id` | Admin | Update with image |
| DELETE | `/api/menu/:id` | Admin | Soft delete |

### Reservations
| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/api/reservations` | Public | Create booking |
| GET | `/api/reservations` | Admin | Get all |
| GET | `/api/reservations/stats` | Admin | Dashboard stats |
| PATCH | `/api/reservations/:id/status` | Admin | Update status |
| DELETE | `/api/reservations/:id` | Admin | Delete |

### Contact
| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/api/contact` | Public | Send message |
| GET | `/api/contact` | Admin | Get all messages |
| PATCH | `/api/contact/:id/read` | Admin | Mark as read |
| DELETE | `/api/contact/:id` | Admin | Delete |

---

## 🌍 Deploy to Production

### Frontend → Vercel (Free)
```bash
cd frontend
npm run build

# Push to GitHub, then:
# 1. vercel.com → New Project → import repo
# 2. Set environment variable: REACT_APP_API_URL=https://your-backend.onrender.com/api
# 3. Deploy
```

### Backend → Render (Free)
```bash
# 1. render.com → New Web Service
# 2. Connect GitHub repo
# 3. Root directory: backend
# 4. Build: npm install
# 5. Start: node server.js
# 6. Set environment variables (from .env)
```

### Database → MongoDB Atlas (Free)
```bash
# 1. cloud.mongodb.com → Create free cluster
# 2. Database Access → Add user
# 3. Network Access → Allow 0.0.0.0/0
# 4. Connect → Copy URI → paste in MONGO_URI
# 5. cd backend && node seed.js  (run once to seed)
```

---

## 🎨 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, Axios |
| Styling | Bootstrap 5, Custom CSS Variables, Google Fonts |
| Fonts | Cormorant Garamond, Jost, Playfair Display |
| Icons | Font Awesome 6 |
| Animations | AOS (Animate On Scroll) |
| Backend | Node.js 18, Express 4 |
| Database | MongoDB 7, Mongoose 8 |
| Auth | JWT + bcryptjs (12 rounds) |
| Security | Helmet, express-rate-limit, express-mongo-sanitize, xss-clean |
| File Upload | Multer (5MB, images only) |

---

## ✅ Features Checklist

- [x] Luxury dark gold UI theme
- [x] Animated hero with counter stats
- [x] Menu from MongoDB with category filter + search
- [x] Chef's Special section (flagged items)
- [x] Masonry gallery with lightbox
- [x] Auto-sliding testimonials
- [x] Table reservation → saved to MongoDB
- [x] Contact form → saved to MongoDB
- [x] JWT admin authentication
- [x] Admin: add/edit/delete menu with image upload
- [x] Admin: manage reservations (confirm/seat/cancel)
- [x] Admin: read/delete contact messages
- [x] Dashboard stats
- [x] WhatsApp float button
- [x] Page loader animation
- [x] AOS scroll animations
- [x] Fully responsive (mobile-first)
- [x] Rate limiting + XSS + injection protection
- [x] 404 page

---

Crafted with ♥ in Pune, India.
