import React, { useState, useEffect } from 'react';

const TESTIMONIALS = [
  { id:1, text:"The Hyderabadi Biryani at Royal Taste is the finest I've had outside Hyderabad. The ambiance is breathtaking — a perfect place for a very special evening.", name:'Priya Mehta', role:'Food Blogger, Pune', avatar:'https://randomuser.me/api/portraits/women/44.jpg' },
  { id:2, text:"Brought clients here for a business dinner and left thoroughly impressed. The service is impeccable, the food divine. Royal Taste is now our go-to for all corporate dining.", name:'Rahul Kapoor', role:'Business Executive', avatar:'https://randomuser.me/api/portraits/men/32.jpg' },
  { id:3, text:"Celebrated our anniversary here — the candlelight setup, the tasting menu, the attentiveness of every staff member. Absolutely magical. Already booked for next year!", name:'Ananya Sharma', role:'Pune Resident', avatar:'https://randomuser.me/api/portraits/women/68.jpg' },
  { id:4, text:"As someone who travels specifically for food, Royal Taste is a genuine hidden gem. The Butter Chicken alone is worth the journey to Pune. I'll be back on every visit!", name:'Siddharth Nair', role:'Culinary Traveller', avatar:'https://randomuser.me/api/portraits/men/55.jpg' },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const total = TESTIMONIALS.length;

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c+1) % total), 5500);
    return () => clearInterval(t);
  }, [total]);

  return (
    <section className="section-pad" style={{ background:'var(--dark)' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4" data-aos="fade-right">
            <span className="section-label">Guest Reviews</span>
            <h2>What Our Guests <em className="gold italic">Say</em></h2>
            <div className="divider-gold left"></div>
            <p style={{ color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:1.85 }}>
              Over 5,000+ happy diners and counting. Join the Royal Taste family and experience
              dining as it was meant to be.
            </p>
            <div className="d-flex gap-2 mt-4">
              <button className="slider-btn" onClick={() => setCurrent(c => (c-1+total)%total)} aria-label="Previous">
                <i className="fas fa-arrow-left"></i>
              </button>
              <button className="slider-btn" onClick={() => setCurrent(c => (c+1)%total)} aria-label="Next">
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            {/* Dots */}
            <div className="d-flex gap-2 mt-3">
              {TESTIMONIALS.map((_,i) => (
                <div key={i} onClick={() => setCurrent(i)} style={{
                  width: i===current ? '28px':'8px', height:'2px',
                  background: i===current ? 'var(--gold)':'var(--dark-5)',
                  cursor:'pointer', transition:'all 0.35s ease',
                }} />
              ))}
            </div>
          </div>

          <div className="col-lg-8 mt-5 mt-lg-0" data-aos="fade-left">
            {/* Large decorative quote mark */}
            <div style={{ fontFamily:'var(--font-serif)', fontSize:'8rem', color:'rgba(201,168,76,0.08)', lineHeight:0.8, marginBottom:'1rem', userSelect:'none' }}>"</div>
            <div className="testimonial-slider">
              <div className="testimonial-track" style={{ transform:`translateX(-${current*100}%)` }}>
                {TESTIMONIALS.map(t => (
                  <div className="testimonial-card" key={t.id}>
                    <div className="testimonial-stars">★★★★★</div>
                    <div className="testimonial-text">{t.text}</div>
                    <div className="testimonial-author">
                      <img src={t.avatar} className="testimonial-avatar" alt={t.name} />
                      <div>
                        <div className="testimonial-name">{t.name}</div>
                        <div className="testimonial-role">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
