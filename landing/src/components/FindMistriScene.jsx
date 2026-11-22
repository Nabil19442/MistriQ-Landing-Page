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
  const viewportRef = useRef(null);
  const chipsRef = useRef(null);

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

  // When selected trade changes, close open card and reset confirmation
  const handleSelectTrade = (tradeId) => {
    setSelectedTrade(tradeId);
    setActiveWorker(null);
    setConfirmedCallWorkerId(null);
  };

  // Keyboard navigation for trade chips (Roving tabindex)
  const handleChipKeyDown = (e, index) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % TRADES.length;
      handleSelectTrade(TRADES[nextIndex].id);
      chipsRef.current?.children[nextIndex]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + TRADES.length) % TRADES.length;
      handleSelectTrade(TRADES[prevIndex].id);
      chipsRef.current?.children[prevIndex]?.focus();
    }
  };

  // Mouse / Pointer Parallax (up to ±6 degrees)
  const handlePointerMove = (e) => {
    if (reducedMotion) return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -5.5;
    const rotY = ((x - centerX) / centerX) * 6;

    setTilt({ x: rotX, y: rotY });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const currentWorkers = MOCK_WORKERS[selectedTrade] || [];

  return (
    <div className="find-mistri-wrapper" aria-label="এলাকার কারিগর খোঁজার ইন্টারঅ্যাক্টিভ ডেমো">
      {/* 1. Horizontal Scrollable Chips for 11 Trades */}
      <div 
        className="scene-trades-strip" 
        role="tablist" 
        aria-label="পেশা নির্বাচন করুন"
        ref={chipsRef}
      >
        {TRADES.map((trade, idx) => {
          const isSelected = trade.id === selectedTrade;
          return (
            <button
              key={trade.id}
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

      {/* 2. Scene Panel Container */}
      <div 
        className="scene-panel" 
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div 
          className="scene-viewport"
          ref={viewportRef}
          style={
            !reducedMotion
              ? { transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }
              : undefined
          }
        >
          {/* Isometric Neighborhood SVG Canvas */}
          <svg
            viewBox="0 0 760 540"
            className="isometric-svg"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="আইসোমেট্রিক আবাসিক এলাকা মানচিত্র"
          >
            <defs>
              {/* Soft Drop Shadow for ground */}
              <filter id="ground-shadow" x="-8%" y="-8%" width="120%" height="125%">
                <feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="#14603A" floodOpacity="0.14" />
              </filter>
            </defs>

            {/* Ground Tile 3D Thickness Side Faces */}
            <path
              d="M 60 255 L 380 440 L 700 255 L 700 274 L 380 459 L 60 274 Z"
              fill="#C2E2CE"
              stroke="#B3D9C1"
              strokeWidth="1.5"
            />
            <path
              d="M 380 440 L 700 255 L 700 274 L 380 459 Z"
              fill="#B4D8C1"
            />

            {/* Ground Tile Top Surface in Soft Mint */}
            <path
              d="M 380 70 L 700 255 L 380 440 L 60 255 Z"
              fill="#E3F4E8"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinejoin="round"
              filter="url(#ground-shadow)"
            />

            {/* Inner border line */}
            <path
              d="M 380 82 L 684 255 L 380 428 L 76 255 Z"
              fill="none"
              stroke="#D3EAD9"
              strokeWidth="1.5"
            />

            {/* ==============================================================
                Roads Network
                ============================================================== */}
            {/* Main Diagonal Road 1 (West to East) */}
            <path
              d="M 120 220 L 640 280 L 630 310 L 110 250 Z"
              fill="#D6ECDF"
            />
            {/* Main Diagonal Road 2 (North to South) */}
            <path
              d="M 360 85 L 400 95 L 400 420 L 360 410 Z"
              fill="#D6ECDF"
            />

            {/* Central Roundabout / Plaza */}
            <ellipse cx="380" cy="265" rx="36" ry="20" fill="#EBF7EF" stroke="#CFE8D7" strokeWidth="2" />
            <ellipse cx="380" cy="265" rx="14" ry="8" fill="#1B8A50" opacity="0.8" />

            {/* Road Dashed Centerlines */}
            <path
              d="M 380 100 L 380 240 M 380 290 L 380 410"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />
            <path
              d="M 140 230 L 340 255 M 420 270 L 610 295"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />

            {/* ==============================================================
                6-8 Isometric Buildings
                ============================================================== */}

            {/* --- BUILDING 1: Apartment Block (North / Top, at 380, 140) --- */}
            <g id="building-apartment">
              {/* Left Wall */}
              <path d="M 335 125 L 380 150 L 380 215 L 335 190 Z" fill="#FFFFFF" stroke="#CBDCD0" strokeWidth="1" />
              {/* Right Wall */}
              <path d="M 380 150 L 425 125 L 425 190 L 380 215 Z" fill="#D2E7D8" stroke="#CBDCD0" strokeWidth="1" />
              {/* Roof (Deep Green #14603A) */}
              <path d="M 380 100 L 425 125 L 380 150 L 335 125 Z" fill="#14603A" />
              {/* Rooftop Utility Box */}
              <path d="M 370 105 L 390 115 L 390 125 L 370 115 Z" fill="#1B8A50" />
              <path d="M 370 105 L 380 100 L 390 105 L 380 110 Z" fill="#22C55E" />
              {/* Windows on Left Face */}
              <rect x="345" y="140" width="8" height="12" rx="1" fill="#1B8A50" opacity="0.6" transform="skewY(26)" />
              <rect x="360" y="148" width="8" height="12" rx="1" fill="#1B8A50" opacity="0.6" transform="skewY(26)" />
              <rect x="345" y="160" width="8" height="12" rx="1" fill="#1B8A50" opacity="0.6" transform="skewY(26)" />
              <rect x="360" y="168" width="8" height="12" rx="1" fill="#1B8A50" opacity="0.6" transform="skewY(26)" />
              {/* Windows on Right Face */}
              <rect x="390" y="148" width="8" height="12" rx="1" fill="#14603A" opacity="0.5" transform="skewY(-26)" />
              <rect x="405" y="140" width="8" height="12" rx="1" fill="#14603A" opacity="0.5" transform="skewY(-26)" />
              <rect x="390" y="168" width="8" height="12" rx="1" fill="#14603A" opacity="0.5" transform="skewY(-26)" />
              <rect x="405" y="160" width="8" height="12" rx="1" fill="#14603A" opacity="0.5" transform="skewY(-26)" />
            </g>

            {/* --- BUILDING 2: House under Construction (West, at 195, 205) --- */}
            <g id="building-construction">
              {/* Base Floor */}
              <path d="M 160 190 L 205 215 L 205 245 L 160 220 Z" fill="#F1F5F2" stroke="#CBDCD0" strokeWidth="1" />
              <path d="M 205 215 L 240 195 L 240 225 L 205 245 Z" fill="#DDEEE3" stroke="#CBDCD0" strokeWidth="1" />
              {/* First Floor Slab */}
              <path d="M 205 185 L 240 165 L 205 150 L 160 170 Z" fill="#CBD5E1" />
              {/* Exposed Brickwork Stack on top */}
              <path d="M 175 160 L 195 170 L 195 185 L 175 175 Z" fill="#C25E42" />
              <path d="M 195 170 L 210 160 L 210 175 L 195 185 Z" fill="#A84C33" />
              <path d="M 175 160 L 190 150 L 210 160 L 195 170 Z" fill="#D97255" />
              {/* Scaffolding Lines */}
              <line x1="155" y1="165" x2="155" y2="230" stroke="#64748B" strokeWidth="1.5" />
              <line x1="210" y1="145" x2="210" y2="215" stroke="#64748B" strokeWidth="1.5" />
              <line x1="155" y1="180" x2="210" y2="160" stroke="#64748B" strokeWidth="1.2" />
              <line x1="155" y1="205" x2="210" y2="185" stroke="#64748B" strokeWidth="1.2" />
            </g>

            {/* --- BUILDING 3: Water Tank on Stilts (Far West, at 130, 220) --- */}
            <g id="utility-water-tank">
              {/* Legs / Stilts */}
              <line x1="120" y1="215" x2="120" y2="245" stroke="#55627A" strokeWidth="2" />
              <line x1="140" y1="225" x2="140" y2="255" stroke="#55627A" strokeWidth="2" />
              <line x1="130" y1="220" x2="130" y2="250" stroke="#55627A" strokeWidth="2" />
              {/* Tank Body (Cylinder) */}
              <ellipse cx="130" cy="225" rx="14" ry="7" fill="#14603A" />
              <path d="M 116 210 L 144 210 L 144 225 L 116 225 Z" fill="#1B8A50" />
              <ellipse cx="130" cy="210" rx="14" ry="7" fill="#22C55E" />
            </g>

            {/* --- BUILDING 4: Cozy Home 1 (East, at 535, 185) --- */}
            <g id="building-villa">
              {/* Walls */}
              <path d="M 500 170 L 540 190 L 540 225 L 500 205 Z" fill="#FFFFFF" stroke="#CBDCD0" strokeWidth="1" />
              <path d="M 540 190 L 575 170 L 575 205 L 540 225 Z" fill="#D8EDE0" stroke="#CBDCD0" strokeWidth="1" />
              {/* Sloped Roof (Brand Green #1B8A50) */}
              <path d="M 500 170 L 537 135 L 575 170 L 540 190 Z" fill="#1B8A50" />
              <path d="M 500 170 L 537 135 L 540 190 Z" fill="#14603A" />
              {/* Arched Door */}
              <path d="M 515 195 A 5 5 0 0 1 525 195 L 525 215 L 515 210 Z" fill="#14603A" />
              {/* Small Window */}
              <rect x="548" y="180" width="10" height="10" rx="1" fill="#1B8A50" opacity="0.6" transform="skewY(-24)" />
            </g>

            {/* --- BUILDING 5: Local Shop / Hardware Store (Center-East, at 485, 255) --- */}
            <g id="building-shop">
              {/* Shop Base Walls */}
              <path d="M 450 240 L 490 260 L 490 295 L 450 275 Z" fill="#FFFFFF" stroke="#CBDCD0" strokeWidth="1" />
              <path d="M 490 260 L 525 240 L 525 275 L 490 295 Z" fill="#D5EBDD" stroke="#CBDCD0" strokeWidth="1" />
              {/* Flat Roof */}
              <path d="M 490 220 L 525 240 L 490 260 L 450 240 Z" fill="#166534" />
              {/* Striped Storefront Awning */}
              <path d="M 446 250 L 492 272 L 492 280 L 446 258 Z" fill="#1B8A50" />
              <path d="M 454 254 L 464 259 L 464 267 L 454 262 Z" fill="#FFFFFF" />
              <path d="M 474 264 L 484 269 L 484 277 L 474 272 Z" fill="#FFFFFF" />
            </g>

            {/* --- BUILDING 6: Suburban Home 2 (South-West / Foreground, at 265, 320) --- */}
            <g id="building-home-south">
              {/* Left Wall */}
              <path d="M 225 305 L 270 330 L 270 375 L 225 350 Z" fill="#FFFFFF" stroke="#CBDCD0" strokeWidth="1" />
              {/* Right Wall */}
              <path d="M 270 330 L 310 305 L 310 350 L 270 375 Z" fill="#DBEFE2" stroke="#CBDCD0" strokeWidth="1" />
              {/* Roof Terrace */}
              <path d="M 270 280 L 310 305 L 270 330 L 225 305 Z" fill="#E8F6ED" stroke="#1B8A50" strokeWidth="1.5" />
              {/* Rooftop Potted Plant */}
              <circle cx="280" cy="300" r="5" fill="#22C55E" />
              <rect x="278" y="303" width="4" height="4" fill="#8D6E63" />
              {/* Modern Windows */}
              <rect x="238" y="322" width="16" height="14" rx="2" fill="#1B8A50" opacity="0.4" transform="skewY(26)" />
              <rect x="282" y="325" width="14" height="12" rx="2" fill="#14603A" opacity="0.4" transform="skewY(-26)" />
            </g>

            {/* --- BUILDING 7: Garden Shed / Workshop (South-East, at 540, 355) --- */}
            <g id="building-shed">
              <path d="M 520 345 L 550 360 L 550 385 L 520 370 Z" fill="#FFFFFF" />
              <path d="M 550 360 L 575 345 L 575 370 L 550 385 Z" fill="#D5EBDD" />
              <path d="M 550 330 L 575 345 L 550 360 L 520 345 Z" fill="#14603A" />
            </g>

            {/* ==============================================================
                Trees along the Neighborhood
                ============================================================== */}
            {/* Tree 1: near apartment */}
            <ellipse cx="320" cy="175" rx="10" ry="6" fill="#14603A" opacity="0.3" />
            <rect x="318" y="155" width="4" height="16" fill="#795548" />
            <circle cx="320" cy="150" r="14" fill="#14603A" />
            <circle cx="318" cy="147" r="10" fill="#1B8A50" />

            {/* Tree 2: near construction */}
            <ellipse cx="230" cy="260" rx="9" ry="5" fill="#14603A" opacity="0.3" />
            <rect x="228" y="245" width="4" height="14" fill="#795548" />
            <circle cx="230" cy="240" r="13" fill="#1B8A50" />
            <circle cx="228" cy="238" r="9" fill="#22C55E" />

            {/* Tree 3: near shop */}
            <ellipse cx="440" cy="305" rx="10" ry="6" fill="#14603A" opacity="0.3" />
            <rect x="438" y="285" width="4" height="18" fill="#795548" />
            <circle cx="440" cy="280" r="15" fill="#14603A" />
            <circle cx="438" cy="276" r="11" fill="#1B8A50" />

            {/* Tree 4: near villa */}
            <circle cx="585" cy="225" r="13" fill="#1B8A50" />
            <circle cx="583" cy="222" r="9" fill="#4ADE80" />

            {/* Tree 5: near user marker foreground */}
            <circle cx="330" cy="390" r="12" fill="#14603A" />
            <circle cx="328" cy="388" r="8" fill="#22C55E" />

            {/* ==============================================================
                User "You Are Here" GPS Location Marker (at 380, 365)
                ============================================================== */}
            <g id="user-location-marker">
              {/* Outer faint radius ring */}
              <ellipse
                cx="380"
                cy="365"
                rx="68"
                ry="36"
                fill="#0284C7"
                fillOpacity="0.08"
                stroke="#0284C7"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                opacity="0.7"
              />
              {/* Pulsing ping wave */}
              <circle
                cx="380"
                cy="365"
                r="18"
                fill="none"
                stroke="#0284C7"
                strokeWidth="2.5"
                className="user-gps-pulse"
              />
              {/* Solid blue user dot */}
              <circle
                cx="380"
                cy="365"
                r="7"
                fill="#0284C7"
                stroke="#FFFFFF"
                strokeWidth="2.5"
              />
              {/* "আপনি এখানে" Label pill */}
              <g transform="translate(380, 395)">
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
              const delayMs = i * 80;

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

                  {/* Inner Trade Icon / Avatar symbol */}
                  <text
                    x={worker.pinPos.x}
                    y={worker.pinPos.y - 26}
                    className="pin-icon-text"
                  >
                    {worker.icon}
                  </text>

                  {/* "সবচেয়ে কাছে" Pill for the nearest worker */}
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

          {/* 3. Compact Anchored Worker Card (Opens on pin tap/hover) */}
          {activeWorker && (
            <div
              className="worker-popup-card"
              role="dialog"
              aria-label={`${activeWorker.name} বিস্তারিত তথ্য`}
              style={{
                // Anchor position calculation for desktop
                top: Math.max(12, activeWorker.pinPos.y - 140),
                left: Math.min(
                  window.innerWidth > 640 ? 460 : 20,
                  Math.max(20, activeWorker.pinPos.x - 140)
                )
              }}
            >
              <button
                type="button"
                className="popup-close-btn"
                aria-label="কার্ড বন্ধ করুন"
                onClick={() => setActiveWorker(null)}
              >
                <X size={16} />
              </button>

              {confirmedCallWorkerId === activeWorker.id ? (
                /* Confirmation State after clicking "কল দিন" */
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
                /* Default Worker Card View */
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

        {/* 4. Caption under the scene */}
        <p className="scene-caption">
          <span className="scene-caption-dot" aria-hidden="true" />
          <span>একটি পেশা বেছে নিন, পিনে ট্যাপ করুন</span>
        </p>
      </div>
    </div>
  );
}
