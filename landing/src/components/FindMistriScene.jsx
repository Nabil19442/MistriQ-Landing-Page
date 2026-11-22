import React, { useState, useRef, useEffect } from 'react';
import { TRADES, MOCK_WORKERS } from '../data/mockWorkers';
import { ShieldCheck, Phone, X, Download, Star } from 'lucide-react';
import './FindMistriScene.css';

export default function FindMistriScene() {
  const [selectedTrade, setSelectedTrade] = useState('electrician');
  const [activeWorker, setActiveWorker] = useState(null);
  const [confirmedCallWorkerId, setConfirmedCallWorkerId] = useState(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  const containerRef = useRef(null);
  const stripRef = useRef(null);
  const chipRefs = useRef({});

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Close worker card on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveWorker(null);
        setConfirmedCallWorkerId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-scroll selected chip into view
  const scrollChipIntoView = (tradeId) => {
    const el = chipRefs.current[tradeId];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const handleSelectTrade = (tradeId) => {
    setSelectedTrade(tradeId);
    setActiveWorker(null);
    setConfirmedCallWorkerId(null);
    scrollChipIntoView(tradeId);
  };

  // Keyboard navigation for trade chips (Roving tabindex)
  const handleChipKeyDown = (e, index) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % TRADES.length;
      handleSelectTrade(TRADES[nextIndex].id);
      chipRefs.current[TRADES[nextIndex].id]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + TRADES.length) % TRADES.length;
      handleSelectTrade(TRADES[prevIndex].id);
      chipRefs.current[TRADES[prevIndex].id]?.focus();
    }
  };

  // Pointer Parallax (up to ±6 degrees)
  const handlePointerMove = (e) => {
    if (reducedMotion) return;
    if (e.pointerType === 'touch') return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -5;
    const rotY = ((x - centerX) / centerX) * 5.5;

    setTilt({ x: rotX, y: rotY });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const currentWorkers = MOCK_WORKERS[selectedTrade] || [];

  return (
    <div className="find-mistri-wrapper" aria-label="এলাকার কারিগর খোঁজার ডেমো">
      {/* Scene Panel Container (Fixed aspect-ratio, min-width: 0, chips inside at top) */}
      <div 
        className="scene-panel" 
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {/* 1. Trades Chip Selector Strip with Right Fade (Inside Panel at Top) */}
        <div className="scene-chips-container">
          <div 
            className="scene-trades-strip" 
            role="tablist" 
            aria-label="পেশা নির্বাচন করুন"
            ref={stripRef}
          >
            {TRADES.map((trade, idx) => {
              const isSelected = trade.id === selectedTrade;
              return (
                <button
                  key={trade.id}
                  ref={(el) => { chipRefs.current[trade.id] = el; }}
                  role="tab"
                  aria-selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  className={`trade-pill-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => handleSelectTrade(trade.id)}
                  onKeyDown={(e) => handleChipKeyDown(e, idx)}
                >
                  <span className="trade-pill-icon" aria-hidden="true">{trade.icon}</span>
                  <span>{trade.name}</span>
                </button>
              );
            })}
          </div>
          <div className="scene-chips-fade" aria-hidden="true" />
        </div>

        {/* 2. Scene Viewport with 3D Tilt */}
        <div 
          className="scene-viewport"
          style={
            !reducedMotion
              ? { transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }
              : undefined
          }
        >
          {/* Isometric Neighborhood SVG Canvas (800x560 with ~8% margins on all sides) */}
          <svg
            viewBox="0 0 800 560"
            className="isometric-svg"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="আইসোমেট্রিক আবাসিক এলাকা মানচিত্র"
          >
            <defs>
              <filter id="ground-shadow" x="-8%" y="-8%" width="120%" height="125%">
                <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#14603A" floodOpacity="0.12" />
              </filter>
            </defs>

            {/* Base Tile 3D Thickness Side Faces */}
            <path
              d="M 80 290 L 400 470 L 720 290 L 720 308 L 400 488 L 80 308 Z"
              fill="#C2E2CE"
              stroke="#B3D9C1"
              strokeWidth="1.5"
            />
            <path
              d="M 400 470 L 720 290 L 720 308 L 400 488 Z"
              fill="#B4D8C1"
            />

            {/* Ground Tile Top Surface in Soft Mint (#E3F4E8) */}
            <path
              d="M 400 110 L 720 290 L 400 470 L 80 290 Z"
              fill="#E3F4E8"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinejoin="round"
              filter="url(#ground-shadow)"
            />

            {/* Inner subtle border line */}
            <path
              d="M 400 122 L 704 290 L 400 458 L 96 290 Z"
              fill="none"
              stroke="#D3EAD9"
              strokeWidth="1.5"
            />

            {/* ==============================================================
                Roads Network
                ============================================================== */}
            {/* Main Diagonal Road 1 (West to East) */}
            <path
              d="M 140 255 L 660 315 L 650 345 L 130 285 Z"
              fill="#D6ECDF"
            />
            {/* Main Diagonal Road 2 (North to South) */}
            <path
              d="M 380 125 L 420 135 L 420 450 L 380 440 Z"
              fill="#D6ECDF"
            />

            {/* Central Roundabout Plaza */}
            <ellipse cx="400" cy="300" rx="36" ry="20" fill="#EBF7EF" stroke="#CFE8D7" strokeWidth="2" />
            <ellipse cx="400" cy="300" rx="14" ry="8" fill="#1B8A50" opacity="0.8" />

            {/* Road Dashed Centerlines */}
            <path
              d="M 400 140 L 400 275 M 400 325 L 400 440"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />
            <path
              d="M 160 265 L 360 290 M 440 305 L 630 330"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />

            {/* ==============================================================
                6-8 Isometric Buildings (Flat-colored, exact polygon windows)
                ============================================================== */}

            {/* --- BUILDING 1: Apartment Block (North / Top, at 400, 160) --- */}
            <g id="building-apartment">
              {/* Left Wall */}
              <polygon points="355,155 400,180 400,245 355,220" fill="#FFFFFF" stroke="#CBDCD0" strokeWidth="1" />
              {/* Right Wall */}
              <polygon points="400,180 445,155 445,220 400,245" fill="#D2E7D8" stroke="#CBDCD0" strokeWidth="1" />
              {/* Deep Green Roof (#14603A) */}
              <polygon points="400,130 445,155 400,180 355,155" fill="#14603A" />
              {/* Rooftop Utility Box */}
              <polygon points="388,135 408,146 408,158 388,147" fill="#1B8A50" />
              <polygon points="388,135 398,129 408,135 398,141" fill="#22C55E" />
              
              {/* Windows on Left Face (Exact isometric polygon coordinates, NO skew) */}
              <polygon points="364,170 374,176 374,188 364,182" fill="#1B8A50" opacity="0.65" />
              <polygon points="381,180 391,186 391,198 381,192" fill="#1B8A50" opacity="0.65" />
              <polygon points="364,192 374,198 374,210 364,204" fill="#1B8A50" opacity="0.65" />
              <polygon points="381,202 391,208 391,220 381,214" fill="#1B8A50" opacity="0.65" />

              {/* Windows on Right Face */}
              <polygon points="409,186 419,180 419,192 409,198" fill="#14603A" opacity="0.5" />
              <polygon points="426,176 436,170 436,182 426,188" fill="#14603A" opacity="0.5" />
              <polygon points="409,208 419,202 419,214 409,220" fill="#14603A" opacity="0.5" />
              <polygon points="426,198 436,192 436,204 426,210" fill="#14603A" opacity="0.5" />
            </g>

            {/* --- BUILDING 2: House under Construction (West, at 225, 225) --- */}
            <g id="building-construction">
              {/* Base Floor */}
              <polygon points="180,210 225,235 225,265 180,240" fill="#F1F5F2" stroke="#CBDCD0" strokeWidth="1" />
              <polygon points="225,235 260,215 260,245 225,265" fill="#DDEEE3" stroke="#CBDCD0" strokeWidth="1" />
              {/* Concrete Slab */}
              <polygon points="225,205 260,185 225,170 180,190" fill="#CBD5E1" />
              {/* Exposed Brick Stack */}
              <polygon points="195,180 215,191 215,205 195,194" fill="#C25E42" />
              <polygon points="215,191 230,182 230,196 215,205" fill="#A84C33" />
              <polygon points="195,180 210,171 230,182 215,191" fill="#D97255" />
              {/* Steel Scaffolding Lines */}
              <line x1="175" y1="185" x2="175" y2="250" stroke="#64748B" strokeWidth="1.5" />
              <line x1="230" y1="165" x2="230" y2="235" stroke="#64748B" strokeWidth="1.5" />
              <line x1="175" y1="200" x2="230" y2="180" stroke="#64748B" strokeWidth="1.2" />
              <line x1="175" y1="225" x2="230" y2="205" stroke="#64748B" strokeWidth="1.2" />
            </g>

            {/* --- BUILDING 3: Water Tank on Stilts (Far West, at 150, 245) --- */}
            <g id="utility-water-tank">
              <line x1="140" y1="240" x2="140" y2="270" stroke="#55627A" strokeWidth="2" />
              <line x1="160" y1="250" x2="160" y2="280" stroke="#55627A" strokeWidth="2" />
              <line x1="150" y1="245" x2="150" y2="275" stroke="#55627A" strokeWidth="2" />
              <ellipse cx="150" cy="250" rx="14" ry="7" fill="#14603A" />
              <rect x="136" y="235" width="28" height="15" fill="#1B8A50" />
              <ellipse cx="150" cy="235" rx="14" ry="7" fill="#22C55E" />
            </g>

            {/* --- BUILDING 4: Cozy Villa 1 (East, at 550, 205) --- */}
            <g id="building-villa">
              <polygon points="515,190 555,210 555,245 515,225" fill="#FFFFFF" stroke="#CBDCD0" strokeWidth="1" />
              <polygon points="555,210 590,190 590,225 555,245" fill="#D8EDE0" stroke="#CBDCD0" strokeWidth="1" />
              {/* Brand Green Sloped Roof (#1B8A50) */}
              <polygon points="515,190 552,155 555,210" fill="#14603A" />
              <polygon points="555,210 552,155 590,190" fill="#1B8A50" />
              {/* Arched Door */}
              <polygon points="530,215 540,220 540,235 530,230" fill="#14603A" />
              {/* Window */}
              <polygon points="563,200 573,194 573,206 563,212" fill="#1B8A50" opacity="0.6" />
            </g>

            {/* --- BUILDING 5: Local Shop / Store (Center-East, at 505, 275) --- */}
            <g id="building-shop">
              <polygon points="465,260 505,280 505,315 465,295" fill="#FFFFFF" stroke="#CBDCD0" strokeWidth="1" />
              <polygon points="505,280 540,260 540,295 505,315" fill="#D5EBDD" stroke="#CBDCD0" strokeWidth="1" />
              <polygon points="505,240 540,260 505,280 465,260" fill="#166534" />
              {/* Striped Awning */}
              <polygon points="461,270 507,292 507,300 461,278" fill="#1B8A50" />
              <polygon points="469,274 479,279 479,287 469,282" fill="#FFFFFF" />
              <polygon points="489,284 499,289 499,297 489,292" fill="#FFFFFF" />
            </g>

            {/* --- BUILDING 6: Suburban Home 2 (South-West / Foreground, at 285, 340) --- */}
            <g id="building-home-south">
              <polygon points="245,325 290,350 290,395 245,370" fill="#FFFFFF" stroke="#CBDCD0" strokeWidth="1" />
              <polygon points="290,350 330,325 330,370 290,395" fill="#DBEFE2" stroke="#CBDCD0" strokeWidth="1" />
              {/* Roof Terrace */}
              <polygon points="290,300 330,325 290,350 245,325" fill="#E8F6ED" stroke="#1B8A50" strokeWidth="1.5" />
              {/* Potted Plant */}
              <circle cx="300" cy="320" r="5" fill="#22C55E" />
              <rect x="298" y="323" width="4" height="4" fill="#8D6E63" />
              {/* Windows */}
              <polygon points="257,342 271,350 271,364 257,356" fill="#1B8A50" opacity="0.4" />
              <polygon points="302,345 316,337 316,351 302,359" fill="#14603A" opacity="0.4" />
            </g>

            {/* --- BUILDING 7: Small Garage / Utility (South-East, at 560, 375) --- */}
            <g id="building-garage">
              <polygon points="540,365 570,380 570,405 540,390" fill="#FFFFFF" />
              <polygon points="570,380 595,365 595,390 570,405" fill="#D5EBDD" />
              <polygon points="570,350 595,365 570,380 540,365" fill="#14603A" />
            </g>

            {/* ==============================================================
                Trees along the Neighborhood
                ============================================================== */}
            <circle cx="340" cy="170" r="14" fill="#14603A" />
            <circle cx="338" cy="167" r="10" fill="#1B8A50" />

            <circle cx="250" cy="260" r="13" fill="#1B8A50" />
            <circle cx="248" cy="258" r="9" fill="#22C55E" />

            <circle cx="460" cy="300" r="15" fill="#14603A" />
            <circle cx="458" cy="296" r="11" fill="#1B8A50" />

            <circle cx="605" cy="245" r="13" fill="#1B8A50" />
            <circle cx="603" cy="242" r="9" fill="#4ADE80" />

            <circle cx="350" cy="410" r="12" fill="#14603A" />
            <circle cx="348" cy="408" r="8" fill="#22C55E" />

            {/* ==============================================================
                User "You Are Here" GPS Location Marker (at 400, 395)
                ============================================================== */}
            <g id="user-location-marker">
              {/* Outer faint radius ring representing nearby GPS */}
              <ellipse
                cx="400"
                cy="395"
                rx="72"
                ry="38"
                fill="#0284C7"
                fillOpacity="0.08"
                stroke="#0284C7"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                opacity="0.7"
              />
              {/* Pulsing wave */}
              <circle
                cx="400"
                cy="395"
                r="18"
                fill="none"
                stroke="#0284C7"
                strokeWidth="2.5"
                className="user-gps-pulse"
              />
              {/* User location dot */}
              <circle
                cx="400"
                cy="395"
                r="7"
                fill="#0284C7"
                stroke="#FFFFFF"
                strokeWidth="2.5"
              />
              {/* "আপনি এখানে" Label pill */}
              <g transform="translate(400, 425)">
                <rect x="-42" y="-11" width="84" height="22" rx="11" fill="#FFFFFF" stroke="#D3E5D9" strokeWidth="1.2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.08))" />
                <circle cx="-28" cy="0" r="3.5" fill="#0284C7" />
                <text x="6" y="3.5" fill="#1B2438" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--font-bengali)">
                  আপনি এখানে
                </text>
              </g>
            </g>

            {/* ==============================================================
                Worker Pins for Selected Trade
                ============================================================== */}
            {currentWorkers.map((worker, i) => {
              const isSelected = activeWorker?.id === worker.id;
              const delayMs = i * 70;

              return (
                <g
                  key={worker.id}
                  tabIndex="0"
                  role="button"
                  aria-label={`${worker.name}, ${worker.trade}, রেটিং ${worker.rating}, দূরত্ব ${worker.distance}`}
                  className={`worker-pin-group worker-pin-enter ${worker.isNearest ? 'worker-pin-nearest' : ''} ${isSelected ? 'active' : ''}`}
                  style={{
                    animationDelay: `${delayMs}ms`,
                    transformOrigin: `${worker.pinPos.x}px ${worker.pinPos.y}px`
                  }}
                  onClick={() => {
                    setActiveWorker(worker);
                    setConfirmedCallWorkerId(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveWorker(worker);
                      setConfirmedCallWorkerId(null);
                    }
                  }}
                >
                  {/* Pin drop shadow */}
                  <ellipse
                    cx={worker.pinPos.x}
                    cy={worker.pinPos.y}
                    rx="8"
                    ry="4"
                    fill="#14603A"
                    opacity="0.3"
                  />

                  {/* Teardrop Pin Shape */}
                  <path
                    d={`
                      M ${worker.pinPos.x} ${worker.pinPos.y}
                      C ${worker.pinPos.x - 4} ${worker.pinPos.y - 10},
                        ${worker.pinPos.x - 14} ${worker.pinPos.y - 18},
                        ${worker.pinPos.x - 14} ${worker.pinPos.y - 26}
                      A 14 14 0 1 1 ${worker.pinPos.x + 14} ${worker.pinPos.y - 26}
                      C ${worker.pinPos.x + 14} ${worker.pinPos.y - 18},
                        ${worker.pinPos.x + 4} ${worker.pinPos.y - 10},
                        ${worker.pinPos.x} ${worker.pinPos.y}
                      Z
                    `}
                    className="pin-body"
                  />

                  {/* Inner Trade Icon */}
                  <text
                    x={worker.pinPos.x}
                    y={worker.pinPos.y - 26}
                    className="pin-icon-text"
                  >
                    {worker.icon}
                  </text>

                  {/* "সবচেয়ে কাছে" Badge for Nearest Worker */}
                  {worker.isNearest && (
                    <g
                      className="nearest-tag-group"
                      transform={`translate(${worker.pinPos.x}, ${worker.pinPos.y - 48})`}
                    >
                      <rect
                        x="-34"
                        y="-10"
                        width="68"
                        height="20"
                        className="nearest-tag-rect"
                        filter="drop-shadow(0 2px 4px rgba(27,138,80,0.3))"
                      />
                      <text x="0" y="4" className="nearest-tag-text">
                        সবচেয়ে কাছে
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* 3. Compact Anchored Worker Card (Smart Flip / Bottom Sheet) */}
          {activeWorker && (
            <div
              className={`worker-popup-card ${activeWorker.pinPos.x > 420 ? 'flip-left' : 'flip-right'} ${activeWorker.pinPos.y < 220 ? 'flip-down' : 'flip-up'}`}
              role="dialog"
              aria-label={`${activeWorker.name} বিস্তারিত তথ্য`}
              style={{
                // Anchor percentage coordinates within panel
                left: `${(activeWorker.pinPos.x / 800) * 100}%`,
                top: `${(activeWorker.pinPos.y / 560) * 100}%`
              }}
            >
              <button
                type="button"
                className="popup-close-btn"
                aria-label="কার্ড বন্ধ করুন"
                onClick={() => setActiveWorker(null)}
              >
                <X size={15} />
              </button>

              {confirmedCallWorkerId === activeWorker.id ? (
                <div className="popup-confirm-state">
                  <p>✓ সরাসরি ফোন নম্বর পেতে Mistri_Q অ্যাপ নামান</p>
                  <a
                    href="#apk-download"
                    className="popup-apk-cta"
                    onClick={() => {
                      setActiveWorker(null);
                      document.getElementById('apk-download')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <Download size={14} />
                    <span>Android APK নামান</span>
                  </a>
                </div>
              ) : (
                <>
                  <div className="popup-header">
                    <div className="popup-avatar" aria-hidden="true">
                      {activeWorker.icon}
                    </div>
                    <div className="popup-name-col">
                      <h5>
                        <span>{activeWorker.name}</span>
                        <ShieldCheck size={15} color="var(--color-brand-green)" aria-label="যাচাইকৃত" />
                      </h5>
                      <p>{activeWorker.trade} • {activeWorker.exp} অভিজ্ঞতা</p>
                    </div>
                  </div>

                  <div className="popup-stats-row">
                    <span className="popup-rating">
                      <Star size={13} fill="#D97706" color="#D97706" />
                      <span>{activeWorker.rating}</span>
                      <span style={{ color: 'var(--color-muted)', fontWeight: 400 }}>
                        ({activeWorker.reviews})
                      </span>
                    </span>
                    <span className="popup-dist">📍 {activeWorker.distance} দূরে</span>
                  </div>

                  <button
                    type="button"
                    className="popup-call-btn"
                    onClick={() => setConfirmedCallWorkerId(activeWorker.id)}
                  >
                    <Phone size={14} />
                    <span>সরাসরি কল দিন</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* 4. Scene Caption at the bottom */}
        <p className="scene-caption">
          <span className="scene-caption-dot" aria-hidden="true" />
          <span>একটি পেশা বেছে নিন, পিনে ট্যাপ করুন</span>
        </p>
      </div>
    </div>
  );
}
