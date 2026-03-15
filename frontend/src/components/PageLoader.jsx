import React, { useState, useEffect } from 'react';

export default function PageLoader() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 2000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`page-loader${hidden ? ' hidden' : ''}`}>
      <div className="loader-logo">Royal Taste</div>
      <div className="loader-tagline">Luxury Dining · Pune</div>
      <div className="loader-bar"></div>
    </div>
  );
}
