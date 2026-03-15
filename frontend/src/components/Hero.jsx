import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useCounter(target, running) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!running) return;
    let c = 0;
    const tick = () => {
      c += Math.ceil(target / 60);
      if (c >= target) { setVal(target); return; }
      setVal(c);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, running]);
  return val;
}

export default function Hero() {
  const navigate = useNavigate();
  const [counting, setCounting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setCounting(true), 2100);
    return () => clearTimeout(t);
  }, []);

  const years  = useCounter(15,  counting);
  const dishes = useCounter(120, counting);
  const rating = useCounter(98,  counting);
  const chefs  = useCounter(50,  counting);

  return (
    <section className="hero-section">
      <div className="hero-bg"></div>
      <div className="hero-overlay"></div>

      <div className="container-fluid px-5 hero-content">
        <div className="hero-eyebrow">Pune's Finest Dining Experience</div>

        <h1 className="hero-title">
          <strong>Where Every Bite</strong>
          <em>Tells a Story</em>
        </h1>

        <p className="hero-desc">
          Experience the grandeur of authentic Indian flavors, curated Chinese
          delicacies and indulgent fast food — all under one majestic roof
          in the heart of Pune.
        </p>

        <div className="hero-cta">
          <button className="btn-royal btn-royal-filled" onClick={() => navigate('/reservation')}>
            <i className="fas fa-calendar-check"></i>
            <span>Reserve a Table</span>
          </button>
          <button className="btn-royal" onClick={() => navigate('/menu')}>
            <i className="fas fa-utensils"></i>
            <span>View Our Menu</span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <div className="scroll-line"></div>
        <span>Scroll</span>
      </div>

      {/* Stats panel */}
      <div className="hero-stats">
        {[
          { num: years,  label: 'Years Serving' },
          { num: dishes, label: 'Menu Items' },
          { num: rating, label: '% Satisfaction' },
          { num: chefs,  label: '+ Expert Chefs' },
        ].map(s => (
          <div className="stat-item" key={s.label}>
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
