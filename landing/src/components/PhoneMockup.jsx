import React, { useState, useRef } from 'react';
import { Search, Phone, ShieldCheck, Star, MapPin } from 'lucide-react';

export default function PhoneMockup() {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 5, y: -8 });

  const handlePointerMove = (e) => {
    // Only apply tilt on fine pointers (mouse), not touch to avoid jarring jumps
    if (e.pointerType === 'touch') return;
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 5, y: -8 });
  };

  const workers = [
    {
      name: 'মাহমুদুল হাসান',
      trade: 'ইলেকট্রিশিয়ান',
      exp: '১০ বছর',
      rating: '৪.৯',
      avatar: '⚡',
      distance: '০.৮ কি.মি.'
    },
    {
      name: 'মোঃ সেলিম রেজা',
      trade: 'প্লাম্বার ও স্যানিটারি',
      exp: '৭ বছর',
      rating: '৪.৯৫',
      avatar: '🔧',
      distance: '১.২ কি.মি.'
    },
    {
      name: 'রফিকুল ইসলাম',
      trade: 'ফার্নিচার কাঠমিস্ত্রি',
      exp: '৯ বছর',
      rating: '৪.৮',
      avatar: '🪚',
      distance: '১.৫ কি.মি.'
    },
    {
      name: 'আব্দুল করিম',
      trade: 'সিনিয়র রাজমিস্ত্রি',
      exp: '১২ বছর',
      rating: '৪.৯',
      avatar: '🧱',
      distance: '২.১ কি.মি.'
    }
  ];

  return (
    <div 
      className="phone-mockup-wrapper"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div 
        ref={cardRef}
        className="phone-mockup-card"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
        }}
        aria-label="Mistri_Q অ্যাপ প্রিভিউ মকআপ"
      >
        {/* Notch */}
        <div className="phone-notch" aria-hidden="true" />

        {/* Floating Badges with 3D Depth */}
        <div className="floating-badge badge-depth-1" aria-hidden="true">
          <ShieldCheck size={15} color="var(--color-brand-green)" />
          <span>✓ ১০০% যাচাইকৃত</span>
        </div>

        <div className="floating-badge badge-depth-2" aria-hidden="true">
          <MapPin size={15} color="var(--color-deep-green)" />
          <span>📍 কাছের কারিগর</span>
        </div>

        {/* Phone Screen Contents */}
        <div className="phone-screen">
          {/* App Header */}
          <div className="phone-top-bar">
            <div className="phone-app-header">
              <div className="phone-app-name">
                Mistri<span>_Q</span>
              </div>
              <span className="phone-location-pill">ঢাকা • অনলাইন</span>
            </div>

            <div className="phone-search-box">
              <Search size={13} />
              <span>কারিগর ও মিস্ত্রি খুঁজুন...</span>
            </div>
          </div>

          {/* Worker list inside app */}
          <div className="phone-workers-list">
            {workers.map((w, idx) => (
              <div key={idx} className="mini-worker-card">
                <div className="mini-worker-left">
                  <div className="mini-worker-avatar" aria-hidden="true">
                    {w.avatar}
                  </div>
                  <div className="mini-worker-info">
                    <h6>{w.name}</h6>
                    <p>{w.trade} • {w.exp}</p>
                    <div className="mini-worker-subrow">
                      <span className="mini-worker-rating">★ {w.rating}</span>
                      <span className="mini-worker-dist">• {w.distance}</span>
                    </div>
                  </div>
                </div>

                <a 
                  href="#apk-download" 
                  className="mini-call-btn" 
                  aria-label={`${w.name}-কে কল দিন`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('apk-download')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Phone size={11} />
                  <span>কল</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
