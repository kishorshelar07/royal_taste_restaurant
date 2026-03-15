import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import DishCard from '../components/DishCard';
import TestimonialSlider from '../components/TestimonialSlider';
import GalleryGrid from '../components/GalleryGrid';
import { menuAPI } from '../services/api';

const MARQUEE = ['Indian Cuisine','Chinese Delights','Fast Food','Fine Dining','Live Kitchen',
  "Pune's Finest",'Award Winning','Luxury Experience','Private Dining','Chef\'s Table'];

const OFFERS = [
  { badge:'Today',   icon:'fa-sun',   title:'Lunch Fiesta',
    desc:'Exclusive 3-course weekday lunch — soup, main course & dessert included.',
    original:'₹699', price:'₹449' },
  { badge:'Weekend', icon:'fa-moon',  title:'Royal Dinner for 2',
    desc:'Candlelight dinner for two — curated 5-course tasting menu, Fri & Sat.',
    original:'₹2499', price:'₹1599' },
  { badge:'Family',  icon:'fa-users', title:'Family Feast Pack',
    desc:'Specially curated platter for 4 — starters, mains, biryani & dessert.',
    original:'₹3499', price:'₹2199' },
];

const FEATURES = [
  { icon:'fa-medal',      title:'Award Winning',       desc:'Best Restaurant Pune 2021–23' },
  { icon:'fa-leaf',       title:'Fresh Ingredients',   desc:'Handpicked produce, daily' },
  { icon:'fa-hat-chef',   title:'Master Chefs',        desc:'22+ years combined expertise' },
  { icon:'fa-wine-glass', title:'Curated Beverages',   desc:'Craft mocktails & juices' },
];

const TABS = [
  { key:'all',         label:'All' },
  { key:'main-course', label:'Indian' },
  { key:'chinese',     label:'Chinese' },
  { key:'fastfood',    label:'Fast Food' },
  { key:'desserts',    label:'Desserts' },
  { key:'beverages',   label:'Beverages' },
];

export default function Home() {
  const navigate = useNavigate();
  const [specials,     setSpecials]     = useState([]);
  const [activeTab,    setActiveTab]    = useState('all');
  const [tabItems,     setTabItems]     = useState([]);
  const [loadingMenu,  setLoadingMenu]  = useState(true);

  useEffect(() => {
    menuAPI.getAll({ isSpecial: true })
      .then(r => setSpecials(r.data.items || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoadingMenu(true);
    const params = activeTab === 'all' ? {} : { category: activeTab };
    menuAPI.getAll(params)
      .then(r => setTabItems((r.data.items || []).slice(0, 8)))
      .catch(() => setTabItems([]))
      .finally(() => setLoadingMenu(false));
  }, [activeTab]);

  useEffect(() => {
    if (window.AOS) { window.AOS.init({ duration: 850, once: true, offset: 70 }); window.AOS.refresh(); }
  }, []);

  return (
    <>
      {/* ── HERO ──────────────────────────── */}
      <Hero />

      {/* ── MARQUEE ───────────────────────── */}
      <div className="marquee-strip">
        <div className="marquee-inner">
          {[...MARQUEE,...MARQUEE].map((item, i) => (
            <span className="marquee-item" key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* ── ABOUT INTRO ───────────────────── */}
      <section className="section-pad bg-dark-2">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="about-img-wrap">
                <div className="about-img-main">
                  <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=900&q=85" alt="Restaurant Interior" />
                </div>
                <div className="about-img-accent">
                  <img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80" alt="Signature Dish" />
                </div>
                <div className="about-badge">
                  <span className="num">15</span>
                  <span className="txt">Years of<br />Excellence</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <span className="section-label">Our Story</span>
              <h2>A Legacy of <em className="gold italic">Exceptional Taste</em></h2>
              <div className="divider-gold left"></div>
              <p style={{ color:'var(--text-muted)', fontSize:'0.95rem', lineHeight:1.95, marginBottom:'1.2rem' }}>
                Founded in 2009 in the heart of Pune, Royal Taste Restaurant was born from a simple
                belief: every meal is a celebration. Our chefs craft each dish with generations-old
                recipes and premium, handpicked ingredients.
              </p>
              <p style={{ color:'var(--text-muted)', fontSize:'0.95rem', lineHeight:1.95 }}>
                From aromatic Indian curries to delicate Chinese preparations and crowd-pleasing
                fast food — we serve a world of flavors in one exquisite setting.
              </p>

              <div className="row g-3 mt-4">
                {FEATURES.map(f => (
                  <div className="col-6" key={f.title}>
                    <div className="feature-item">
                      <div className="feature-icon"><i className={`fas ${f.icon}`}></i></div>
                      <div>
                        <h5>{f.title}</h5>
                        <p>{f.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="btn-royal mt-5" onClick={() => navigate('/about')}>
                <i className="fas fa-arrow-right"></i>
                <span>Our Full Story</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHEF SPECIALS ─────────────────── */}
      {specials.length > 0 && (
        <section className="section-pad" style={{ background:'var(--dark)' }}>
          <div className="container-fluid px-4">
            <div className="text-center mb-5" data-aos="fade-up">
              <span className="section-label" style={{ justifyContent:'center' }}>From Our Kitchen</span>
              <h2>Chef's <em className="gold italic">Specials</em></h2>
              <div className="ornament mt-3">
                <span>✦ Handpicked by Chef Arjun ✦</span>
              </div>
            </div>
            <div className="row g-3">
              {specials.slice(0, 4).map(item => (
                <div className="col-lg-3 col-md-6" key={item._id} data-aos="fade-up">
                  <DishCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── MENU PREVIEW ──────────────────── */}
      <section className="section-pad bg-dark-2">
        <div className="container-fluid px-4">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="section-label" style={{ justifyContent:'center' }}>Our Specialties</span>
            <h2>Featured <em className="gold italic">Dishes</em></h2>
            <div className="divider-gold"></div>
          </div>
          <div className="menu-tabs" data-aos="fade-up">
            {TABS.map(tab => (
              <button
                key={tab.key}
                className={`menu-tab${activeTab === tab.key ? ' active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >{tab.label}</button>
            ))}
          </div>
          {loadingMenu ? (
            <div className="text-center py-5" style={{ color:'var(--gold)' }}>
              <i className="fas fa-spinner fa-spin fa-2x"></i>
            </div>
          ) : (
            <div className="row g-3">
              {tabItems.map(item => (
                <div className="col-lg-3 col-md-6 col-sm-6" key={item._id} data-aos="fade-up">
                  <DishCard item={item} />
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-5" data-aos="fade-up">
            <button className="btn-royal" onClick={() => navigate('/menu')}>
              <i className="fas fa-utensils"></i>
              <span>Explore Full Menu</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── CHEF SPOTLIGHT ────────────────── */}
      <section className="section-pad" style={{ background:'var(--dark-3)', position:'relative', overflow:'hidden' }}>
        {/* Watermark */}
        <div style={{ position:'absolute', right:'-4%', top:'50%', transform:'translateY(-50%)', fontFamily:'var(--font-serif)', fontSize:'22vw', fontWeight:700, color:'rgba(201,168,76,0.025)', pointerEvents:'none', userSelect:'none' }}>CHEF</div>
        <div className="container">
          <div className="row align-items-center g-0">
            <div className="col-lg-5" data-aos="fade-right">
              <div style={{ position:'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=700&q=85"
                  alt="Head Chef Arjun Sharma"
                  style={{ width:'100%', height:'580px', objectFit:'cover', objectPosition:'top center' }}
                />
                {/* Gold frame offset */}
                <div style={{ position:'absolute', inset:'22px -22px -22px 22px', border:'1px solid rgba(201,168,76,0.25)', pointerEvents:'none', zIndex:-1 }}></div>
              </div>
            </div>
            <div className="col-lg-7" data-aos="fade-left">
              <div style={{ padding:'60px 64px 60px 80px' }}>
                <span className="section-label">Chef Spotlight</span>
                <h2>Chef <em className="gold italic">Arjun Sharma</em></h2>
                <div className="divider-gold left"></div>
                <p style={{ color:'var(--text-muted)', fontSize:'0.95rem', lineHeight:1.95, marginBottom:'1.5rem' }}>
                  With over 22 years of culinary mastery across Mumbai, Delhi and international
                  kitchens, Chef Arjun brings a harmonious blend of tradition and innovation to
                  every plate at Royal Taste. His philosophy: respect the ingredient, honour the
                  recipe, cook with your heart.
                </p>
                <blockquote style={{ fontFamily:'var(--font-serif)', fontSize:'1.4rem', fontStyle:'italic', color:'var(--text-light)', lineHeight:1.65, borderLeft:'2px solid var(--gold)', paddingLeft:'1.5rem', margin:'2rem 0' }}>
                  "Cooking is an act of love. Every spice tells a story, every flame carries a memory."
                </blockquote>
                <div className="row g-3">
                  {[{n:'22+',l:'Years Experience'},{n:'8',l:'National Awards'},{n:'3',l:'World Cuisines'}].map(s => (
                    <div className="col-4" key={s.l}>
                      <div className="text-center p-3" style={{ border:'1px solid rgba(201,168,76,0.18)', background:'rgba(201,168,76,0.03)' }}>
                        <div style={{ fontFamily:'var(--font-serif)', fontSize:'2rem', color:'var(--gold)' }}>{s.n}</div>
                        <div style={{ fontFamily:'var(--font-tenor)', fontSize:'0.58rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--text-muted)', marginTop:'4px' }}>{s.l}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ───────────────── */}
      <section className="section-pad-sm bg-dark-2">
        <div className="container-fluid px-4">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="section-label" style={{ justifyContent:'center' }}>Visual Journey</span>
            <h2>A Feast for <em className="gold italic">the Eyes</em></h2>
            <div className="divider-gold"></div>
          </div>
          <GalleryGrid limit={8} />
          <div className="text-center mt-5" data-aos="fade-up">
            <button className="btn-royal" onClick={() => navigate('/gallery')}>
              <i className="fas fa-images"></i>
              <span>View Full Gallery</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────── */}
      <TestimonialSlider />

      {/* ── SPECIAL OFFERS ────────────────── */}
      <section className="section-pad" style={{ background:'var(--dark-3)' }}>
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="section-label" style={{ justifyContent:'center' }}>Limited Time</span>
            <h2>Special <em className="gold italic">Offers</em></h2>
            <div className="divider-gold"></div>
          </div>
          <div className="row g-4">
            {OFFERS.map((o, i) => (
              <div className="col-lg-4" key={o.title} data-aos="fade-up" data-aos-delay={i*120}>
                <div className="offer-card">
                  <div className="offer-badge-tag">{o.badge}</div>
                  <div className="offer-icon"><i className={`fas ${o.icon}`}></i></div>
                  <h3 style={{ fontFamily:'var(--font-serif)', marginBottom:'0.7rem', fontSize:'1.45rem' }}>{o.title}</h3>
                  <p style={{ fontSize:'0.83rem', color:'var(--text-muted)', marginBottom:'1.8rem', lineHeight:1.75 }}>{o.desc}</p>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <span style={{ fontSize:'0.75rem', color:'var(--text-muted)', textDecoration:'line-through' }}>{o.original}</span>
                      <span style={{ fontFamily:'var(--font-serif)', fontSize:'1.85rem', color:'var(--gold)', marginLeft:'8px' }}>{o.price}</span>
                    </div>
                    <button className="btn-royal btn-royal-sm" onClick={() => navigate('/reservation')}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESERVATION CTA ───────────────── */}
      <section className="section-pad" style={{ position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:"url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=85') center/cover no-repeat" }}></div>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.75) 50%, rgba(8,8,8,0.9) 100%)' }}></div>
        <div className="container text-center" style={{ position:'relative', zIndex:2 }}>
          {/* Ornamental vertical line */}
          <div style={{ width:'1px', height:'70px', background:'linear-gradient(to bottom, transparent, rgba(201,168,76,0.5), transparent)', margin:'0 auto 2.5rem' }} data-aos="fade-up"></div>
          <span className="section-label" data-aos="fade-up" style={{ justifyContent:'center' }}>Reserve Your Evening</span>
          <h2 className="mb-3" data-aos="fade-up" data-aos-delay="100">
            An Unforgettable Dining<br /><em className="gold italic">Experience Awaits You</em>
          </h2>
          <p style={{ color:'rgba(204,204,204,0.8)', maxWidth:'500px', margin:'0 auto 3rem', fontSize:'0.95rem', lineHeight:1.9 }} data-aos="fade-up" data-aos-delay="150">
            Call us at <strong style={{ color:'var(--gold)' }}>+91 9876543210</strong> or reserve online.
            We accommodate all occasions — from intimate dinners to grand celebrations.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap" data-aos="fade-up" data-aos-delay="200">
            <button className="btn-royal btn-royal-filled" onClick={() => navigate('/reservation')}>
              <i className="fas fa-calendar-check"></i>
              <span>Book Your Table</span>
            </button>
            <a href="tel:+919876543210" className="btn-royal btn-royal-ghost">
              <i className="fas fa-phone"></i>
              <span>Call Us Now</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
