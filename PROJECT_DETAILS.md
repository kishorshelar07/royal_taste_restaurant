# 🍽️ ROYAL TASTE RESTAURANT
## Complete Project Documentation

---

## 📋 PROJECT OVERVIEW

| Detail | Info |
|---|---|
| **Project Name** | Royal Taste Restaurant |
| **Type** | Full Stack Web Application |
| **Location** | Pune, Maharashtra, India |
| **Cuisine** | Indian, Chinese, Fast Food |
| **Phone** | +91 9876543210 |
| **Email** | info@royaltaste.com |
| **Version** | 3.0 (Final) |
| **Built With** | React + Node.js + MongoDB |

---

## 🌐 LIVE URLS

| Service | URL |
|---|---|
| 🌍 **Website** | https://royal-taste-restaurant.vercel.app |
| ⚙️ **Backend API** | https://royal-taste-restaurant.onrender.com |
| 🔐 **Admin Panel** | https://royal-taste-restaurant.vercel.app/rt-admin |
| 🗄️ **Database** | MongoDB Atlas (Cloud) |

---

## 🔐 ADMIN CREDENTIALS

```
URL      : https://royal-taste-restaurant.vercel.app/rt-admin
Username : admin
Password : admin123
```

> ⚠️ Production madhe password nakki change kara!

---

## 📁 FOLDER STRUCTURE

```
royal-taste-final/
│
├── 📁 frontend/                          ← React Application
│   ├── 📁 public/
│   │   └── index.html                    ← Bootstrap 5, FontAwesome, AOS CDN
│   │
│   ├── 📁 src/
│   │   ├── 📁 components/                ← Reusable UI Components
│   │   │   ├── Navbar.jsx                ← Sticky navbar, mobile menu, Reserve CTA
│   │   │   ├── Footer.jsx                ← 4-column footer, social links
│   │   │   ├── Hero.jsx                  ← Animated hero, live counters
│   │   │   ├── DishCard.jsx              ← Menu item card (veg indicator, badge)
│   │   │   ├── TestimonialSlider.jsx     ← Auto-sliding customer reviews
│   │   │   ├── GalleryGrid.jsx           ← Masonry grid with lightbox
│   │   │   ├── ReservationForm.jsx       ← Table booking form with API
│   │   │   └── PageLoader.jsx            ← Animated loading screen
│   │   │
│   │   ├── 📁 context/                   ← Global State Management
│   │   │   ├── AuthContext.js            ← JWT login state
│   │   │   └── ToastContext.js           ← Toast notifications
│   │   │
│   │   ├── 📁 pages/                     ← Website Pages
│   │   │   ├── Home.jsx                  ← Full homepage (9 sections)
│   │   │   ├── About.jsx                 ← Story, chef, timeline
│   │   │   ├── Menu.jsx                  ← Filterable menu from MongoDB
│   │   │   ├── Gallery.jsx               ← Photo gallery with lightbox
│   │   │   ├── Reservation.jsx           ← Table booking page
│   │   │   ├── Contact.jsx               ← Contact form + Google Map
│   │   │   └── AdminDashboard.jsx        ← Full admin panel
│   │   │
│   │   ├── 📁 services/
│   │   │   └── api.js                    ← Axios API calls (all endpoints)
│   │   │
│   │   ├── 📁 styles/
│   │   │   └── global.css                ← Complete luxury theme (965 lines)
│   │   │
│   │   ├── App.js                        ← Router, Layout, AOS init
│   │   └── index.js                      ← React entry point
│   │
│   ├── .env                              ← REACT_APP_API_URL (local)
│   ├── .env.example                      ← Template
│   └── package.json                      ← Dependencies
│
├── 📁 backend/                           ← Node.js REST API
│   ├── 📁 config/
│   │   └── db.js                         ← MongoDB connection
│   │
│   ├── 📁 controllers/                   ← Business Logic
│   │   ├── authController.js             ← Login, Register, GetMe
│   │   ├── menuController.js             ← Menu CRUD + image upload
│   │   ├── reservationController.js      ← Booking + availability check
│   │   └── contactController.js          ← Contact messages
│   │
│   ├── 📁 middleware/
│   │   ├── authMiddleware.js             ← JWT token verification
│   │   └── uploadMiddleware.js           ← Multer image upload (5MB)
│   │
│   ├── 📁 models/                        ← MongoDB Schemas
│   │   ├── Admin.js                      ← Admin user (bcrypt password)
│   │   ├── Menu.js                       ← Menu items schema
│   │   ├── Reservation.js                ← Booking schema
│   │   └── Contact.js                    ← Messages schema
│   │
│   ├── 📁 routes/                        ← API Routes
│   │   ├── authRoutes.js                 ← /api/auth
│   │   ├── menuRoutes.js                 ← /api/menu
│   │   ├── reservationRoutes.js          ← /api/reservations
│   │   └── contactRoutes.js              ← /api/contact
│   │
│   ├── 📁 uploads/                       ← Food images (auto-created)
│   ├── server.js                         ← Main server (all security)
│   ├── seed.js                           ← Database seeder
│   ├── .env                              ← Secret keys (never push!)
│   ├── .env.example                      ← Template
│   └── package.json                      ← Dependencies
│
├── .gitignore                            ← node_modules, .env ignore
└── README.md                             ← Setup instructions

Total Files: 44 files
```

---

## 🛠️ TECH STACK

### Frontend
| Technology | Version | Use |
|---|---|---|
| React | 18.2.0 | UI Framework |
| React Router | 6.21.0 | Page Navigation |
| Axios | 1.6.2 | API Calls |
| Bootstrap 5 | 5.3.2 | Layout & Grid |
| Font Awesome | 6.5.0 | Icons |
| AOS | 2.3.1 | Scroll Animations |
| Google Fonts | — | Cormorant Garamond, Jost, Playfair Display, Tenor Sans |

### Backend
| Technology | Version | Use |
|---|---|---|
| Node.js | 22.x | Runtime |
| Express | 4.18.2 | Web Framework |
| MongoDB | 8.x | Database |
| Mongoose | 8.0.3 | ODM |
| JWT | 9.0.2 | Authentication |
| bcryptjs | 2.4.3 | Password Hashing |
| Multer | 1.4.5 | Image Upload |

### Security Packages
| Package | Use |
|---|---|
| helmet | HTTP Security Headers |
| express-rate-limit | Rate Limiting |
| cors | Cross-Origin Control |
| express-mongo-sanitize | NoSQL Injection Protection |
| xss-clean | XSS Attack Protection |
| dotenv | Environment Variables |

### Deployment
| Service | Platform | Cost |
|---|---|---|
| Frontend | Vercel | Free |
| Backend | Render | Free |
| Database | MongoDB Atlas | Free (512MB) |

---

## 📡 API ENDPOINTS

### Authentication
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/login` | Public | Admin login |
| POST | `/api/auth/register` | Public | Create admin |
| GET | `/api/auth/me` | Admin | Get current admin |

### Menu
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/menu` | Public | Get all active items |
| GET | `/api/menu/:id` | Public | Get single item |
| GET | `/api/menu/admin/all` | Admin | All items (including inactive) |
| POST | `/api/menu` | Admin | Add new dish + image |
| PUT | `/api/menu/:id` | Admin | Update dish |
| DELETE | `/api/menu/:id` | Admin | Delete dish |

### Reservations
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/reservations` | Public | Book a table |
| GET | `/api/reservations` | Admin | View all bookings |
| GET | `/api/reservations/stats` | Admin | Dashboard stats |
| PATCH | `/api/reservations/:id/status` | Admin | Update status |
| DELETE | `/api/reservations/:id` | Admin | Delete booking |

### Contact
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/contact` | Public | Send message |
| GET | `/api/contact` | Admin | View all messages |
| PATCH | `/api/contact/:id/read` | Admin | Mark as read |
| DELETE | `/api/contact/:id` | Admin | Delete message |

---

## 🔒 SECURITY FEATURES

| Feature | Implementation | Status |
|---|---|---|
| **Helmet** | HTTP security headers | ✅ |
| **Rate Limiting** | 100 req/15min global, 10/15min auth | ✅ |
| **CORS** | Whitelist frontend URL only | ✅ |
| **MongoDB Sanitize** | NoSQL injection prevention | ✅ |
| **XSS Clean** | Input sanitization | ✅ |
| **bcrypt** | Password hashing (12 rounds) | ✅ |
| **JWT** | 8h token expiry | ✅ |
| **Input Validation** | Mongoose schema validators | ✅ |
| **File Upload** | 5MB limit, images only | ✅ |
| **Hidden Admin** | `/rt-admin` — not linked in UI | ✅ |
| **Environment Variables** | All secrets in .env | ✅ |
| **gitignore** | .env never pushed to GitHub | ✅ |

---

## 🗄️ DATABASE SCHEMAS

### Menu Item
```javascript
{
  name:        String (required, max 100)
  category:    String (starters/main-course/chinese/fastfood/desserts/beverages)
  description: String (required, max 500)
  price:       Number (required, min 0)
  image:       String (URL or upload path)
  isVeg:       Boolean (default: true)
  isSpecial:   Boolean (default: false) ← Home page par disal
  isAvailable: Boolean (default: true)
  spiceLevel:  String (none/mild/medium/hot/extra-hot)
  rating:      Number (0-5)
  tags:        [String]
  createdAt:   Date
}
```

### Reservation
```javascript
{
  name:           String (required)
  phone:          String (required)
  email:          String (required)
  guests:         Number (1-20)
  date:           Date (required)
  time:           String (required)
  specialRequest: String (max 500)
  status:         String (pending/confirmed/seated/completed/cancelled)
  createdAt:      Date
}
```

### Admin
```javascript
{
  username:  String (unique, min 3)
  email:     String (unique)
  password:  String (bcrypt hashed, never returned)
  role:      String (admin/superadmin)
  createdAt: Date
}
```

---

## 🎨 DESIGN SYSTEM

### Colors
```css
--gold:       #c9a84c   ← Primary accent
--gold-light: #e8c96e   ← Hover states
--gold-dark:  #9e7a2a   ← Active states
--dark:       #080808   ← Background
--dark-2:     #0e0e0e   ← Cards
--dark-3:     #151515   ← Sections
--white:      #ffffff   ← Text
--text-muted: #777777   ← Secondary text
```

### Typography
```
Cormorant Garamond ← Headings (luxury serif)
Playfair Display   ← Display text
Tenor Sans         ← Labels, buttons (editorial)
Jost               ← Body text (clean sans)
```

### Animations
- Ken Burns hero background
- Staggered hero text reveal
- AOS scroll animations
- Dish card hover effects
- Gold line reveal on cards
- Auto-sliding testimonials
- Masonry gallery with lightbox
- Page loader animation
- WhatsApp pulse animation

---

## 💰 WEBSITE VALUE & COST ESTIMATE

### Development Cost (Market Rate)
| Work | Hours | Rate (₹/hr) | Cost |
|---|---|---|---|
| UI/UX Design | 20 hrs | ₹1500 | ₹30,000 |
| Frontend Development | 40 hrs | ₹1500 | ₹60,000 |
| Backend Development | 30 hrs | ₹1500 | ₹45,000 |
| Database Design | 10 hrs | ₹1500 | ₹15,000 |
| Admin Dashboard | 20 hrs | ₹1500 | ₹30,000 |
| Testing & Deployment | 10 hrs | ₹1500 | ₹15,000 |
| **Total** | **130 hrs** | — | **₹1,95,000** |

### International Market Rate
| Work | Cost (USD) |
|---|---|
| UI/UX Design | $500 |
| Frontend (React) | $1,200 |
| Backend (Node.js) | $1,000 |
| Database + API | $600 |
| Admin Dashboard | $800 |
| Deployment + Setup | $400 |
| **Total** | **$4,500 — $5,500** |

### Monthly Running Cost (Current)
| Service | Cost |
|---|---|
| Vercel (Frontend) | Free |
| Render (Backend) | Free |
| MongoDB Atlas | Free |
| Domain (.com) | ₹800/year |
| **Total Monthly** | **~₹67/month** |

### Paid Plan (Production Recommended)
| Service | Cost/month |
|---|---|
| Render Starter | $7 |
| MongoDB Atlas M2 | $9 |
| Vercel Pro | $20 |
| **Total** | **~₹3,000/month** |

---

## 🚀 FUTURE IMPROVEMENTS

### Phase 2 — Core Features (Priority High)
| Feature | Description | Estimated Cost |
|---|---|---|
| **Online Payment** | Razorpay/Stripe integration | ₹15,000 |
| **Email Notifications** | Booking confirmation emails (Nodemailer) | ₹8,000 |
| **SMS Alerts** | Twilio SMS for reservations | ₹10,000 |
| **Food Ordering** | Online order system with cart | ₹25,000 |
| **Order Tracking** | Live order status tracking | ₹20,000 |
| **Review System** | Customer ratings and reviews | ₹12,000 |

### Phase 3 — Advanced Features (Priority Medium)
| Feature | Description | Estimated Cost |
|---|---|---|
| **Mobile App** | React Native iOS + Android | ₹80,000 |
| **Loyalty Program** | Points system for customers | ₹20,000 |
| **Table QR Code** | QR menu for each table | ₹10,000 |
| **Kitchen Display** | Real-time order screen for kitchen | ₹15,000 |
| **Analytics Dashboard** | Revenue, orders, traffic charts | ₹18,000 |
| **Multi-language** | Marathi, Hindi, English | ₹12,000 |
| **WhatsApp Bot** | Auto-reply for bookings | ₹15,000 |

### Phase 4 — Premium Features (Priority Low)
| Feature | Description | Estimated Cost |
|---|---|---|
| **AI Recommendations** | Personalized dish suggestions | ₹30,000 |
| **Live Chat** | Customer support chat | ₹10,000 |
| **Virtual Tour** | 360° restaurant view | ₹20,000 |
| **Catering Module** | Event catering booking | ₹18,000 |
| **Franchise System** | Multiple branch management | ₹50,000 |
| **POS Integration** | Point of Sale system | ₹40,000 |

---

## 🔧 LOCAL SETUP

```bash
# 1. Backend
cd backend
npm install
cp .env.example .env     ← MongoDB URI bhara
node seed.js             ← Database seed kara
npm run dev              ← http://localhost:5000

# 2. Frontend (navi terminal)
cd frontend
npm install
npm start                ← http://localhost:3000
```

---

## 🌍 DEPLOYMENT

| Platform | Service | Steps |
|---|---|---|
| **Vercel** | Frontend | GitHub connect → Root: frontend → Deploy |
| **Render** | Backend | GitHub connect → Root: backend → node server.js |
| **MongoDB Atlas** | Database | Free cluster → Network: 0.0.0.0/0 |

---

## 📱 WEBSITE PAGES

| Page | URL | Features |
|---|---|---|
| Home | `/` | Hero, specials, menu preview, chef, gallery, testimonials, offers, CTA |
| About | `/about` | Story, vision/mission, chef intro, timeline |
| Menu | `/menu` | Filter by category, search, veg indicator |
| Gallery | `/gallery` | Masonry grid, lightbox preview |
| Reservation | `/reservation` | Table booking → MongoDB save |
| Contact | `/contact` | Form + Google Maps embed |
| Admin | `/rt-admin` | Hidden — login required |

---

## ✅ FEATURES CHECKLIST

### Frontend
- [x] Luxury dark gold UI theme
- [x] Animated hero with Ken Burns effect
- [x] Live counter stats animation
- [x] Sticky responsive navbar
- [x] Mobile hamburger menu
- [x] "Reserve a Table" CTA button
- [x] Menu from MongoDB with category filter
- [x] Menu search functionality
- [x] Veg/Non-veg indicators
- [x] Chef's Special highlighted dishes
- [x] Masonry gallery with lightbox
- [x] Auto-sliding testimonials
- [x] Table reservation form
- [x] Contact form
- [x] Google Maps embed
- [x] WhatsApp float button
- [x] Page loader animation
- [x] AOS scroll animations
- [x] Toast notifications
- [x] Fully responsive (mobile-first)
- [x] 404 custom page

### Backend
- [x] JWT authentication
- [x] bcrypt password hashing
- [x] Helmet security headers
- [x] Rate limiting
- [x] CORS configuration
- [x] MongoDB injection protection
- [x] XSS protection
- [x] Image upload (Multer)
- [x] Reservation availability check
- [x] Admin CRUD for menu
- [x] Reservation management
- [x] Contact message management
- [x] Dashboard statistics API
- [x] Database seeder

---

## 📞 SUPPORT & MAINTENANCE

### Common Issues & Fixes

| Problem | Fix |
|---|---|
| Menu disat nahi | `node seed.js` run kara |
| Admin login fail | `node resetAdmin.js` run kara |
| CORS error | Render madhe FRONTEND_URL check kara |
| Backend sleep (Render free) | Pehla request la 30-40 sec wait kara |
| MongoDB connection error | Atlas Network Access → 0.0.0.0/0 allow kara |

---

*Royal Taste Restaurant — Crafted with ♥ in Pune, India*
*Documentation Version: 3.0 | Last Updated: 2024*
