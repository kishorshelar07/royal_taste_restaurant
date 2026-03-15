import React, { useEffect } from 'react';

const TIMELINE = [
  { year: '2009', title: 'The Beginning', text: 'Opened our first 30-seat restaurant in Koregaon Park, Pune.' },
  { year: '2012', title: 'Chinese Wing Added', text: 'Expanded with an authentic Chinese section earning rave reviews.' },
  { year: '2015', title: 'First Renovation', text: 'Grew to 80 seats with a new private dining area for events.' },
  { year: '2019', title: 'Fast Food Lounge', text: 'Launched our trendy lounge — burgers, wraps and loaded fries.' },
  { year: '2023', title: 'Luxury Makeover', text: '150 seats, banquet hall, live kitchen and online booking launched.' },
];

export default function About() {
  useEffect(() => { if (window.AOS) { window.AOS.init({ duration: 800, once: true }); window.AOS.refresh(); } }, []);
  return (
    <>
      <div className="page-hero" style={{ paddingTop: '88px' }}>
        <div className="page-hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=80')" }}></div>
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <span className="section-label">Who We Are</span>
          <h1>About <em className="gold italic">Royal Taste</em></h1>
        </div>
      </div>

      {/* Story */}
      <section className="section-pad bg-dark-2">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <span className="section-label">Our Story</span>
              <h2>Born from <em className="gold italic">Passion & Heritage</em></h2>
              <div className="divider-gold left"></div>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: '1.2rem' }}>
                Royal Taste Restaurant was founded in 2009 by Mr. Rajesh & Priya Sharma — a couple who believed that food was more than sustenance; it was art, culture, and love. Starting from a 30-seat eatery in Koregaon Park, we have grown into one of Pune's most celebrated dining destinations.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: '1.2rem' }}>
                Today, with over 150 seats, a world-class kitchen, and a team of 50+ passionate culinary artists, we continue to push the boundaries of flavour while honoring our roots.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.9 }}>
                We are proud winners of the Maharashtra Restaurant Excellence Award (2021, 2022, 2023) and Zomato's "Best Indian Restaurant in Pune" for 4 consecutive years.
              </p>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80" style={{ width: '100%', height: '460px', objectFit: 'cover' }} alt="Restaurant" />
            </div>
          </div>
        </div>
      </section>

      {/* Vision / Mission / Values */}
      <section className="section-pad-sm" style={{ background: 'var(--dark-3)' }}>
        <div className="container">
          <div className="row g-4">
            {[
              { icon: 'fa-eye',     title: 'Our Vision',  text: 'To be the most beloved dining destination in Pune — a place where every visit feels like a celebration.', highlight: false },
              { icon: 'fa-bullseye',title: 'Our Mission', text: 'To serve authentic, premium quality food with warmth and consistency that turns first-time guests into lifelong family.', highlight: true },
              { icon: 'fa-heart',   title: 'Our Values',  text: 'Quality without compromise. Hospitality from the heart. Respect for tradition with space for innovation.', highlight: false },
            ].map(card => (
              <div className="col-md-4" key={card.title} data-aos="fade-up">
                <div style={{ padding: '2.5rem', background: card.highlight ? 'var(--gold)' : 'transparent', border: card.highlight ? 'none' : '1px solid rgba(201,168,76,0.15)', height: '100%' }}>
                  <div style={{ fontSize: '2.5rem', color: card.highlight ? 'var(--dark)' : 'var(--gold)', marginBottom: '1rem' }}>
                    <i className={`fas ${card.icon}`}></i>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', color: card.highlight ? 'var(--dark)' : 'var(--white)', marginBottom: '1rem' }}>{card.title}</h3>
                  <p style={{ color: card.highlight ? 'rgba(10,10,10,0.75)' : 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.8 }}>{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chef */}
      <section className="section-pad bg-dark-2">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5" data-aos="fade-right">
              <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=700&q=80" style={{ width: '100%', height: '500px', objectFit: 'cover', objectPosition: 'top' }} alt="Chef" />
            </div>
            <div className="col-lg-7" data-aos="fade-left">
              <span className="section-label">Meet the Chef</span>
              <h2>Chef <em className="gold italic">Arjun Sharma</em></h2>
              <div className="divider-gold left"></div>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: '1.2rem' }}>
                With 22+ years of culinary mastery across Mumbai, Delhi, and international kitchens, Chef Arjun is the creative force behind Royal Taste's legendary menu. His philosophy is simple: use the finest ingredients, honor traditional recipes, and cook with heart.
              </p>
              <blockquote style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontStyle: 'italic', color: 'var(--text-light)', borderLeft: '2px solid var(--gold)', paddingLeft: '1.5rem', margin: '1.5rem 0' }}>
                "Cooking is an act of love. Every spice tells a story."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad" style={{ background: 'var(--dark-3)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-label">Our Journey</span>
            <h2>Our <em className="gold italic">Milestones</em></h2>
            <div className="divider-gold"></div>
          </div>
          <div className="row"><div className="col-lg-8 offset-lg-2">
            <div className="timeline">
              {TIMELINE.map(item => (
                <div className="timeline-item" key={item.year} data-aos="fade-up">
                  <div className="timeline-dot"></div>
                  <div className="timeline-year">{item.year}</div>
                  <h5 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--white)', marginBottom: '0.3rem' }}>{item.title}</h5>
                  <p className="timeline-text">{item.text}</p>
                </div>
              ))}
            </div>
          </div></div>
        </div>
      </section>
    </>
  );
}
