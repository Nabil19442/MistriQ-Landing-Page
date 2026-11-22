import React, { useState, useEffect } from 'react';
import { Download, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`navbar-wrap ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <nav className="navbar" aria-label="মূল নেভিগেশন">
          <a href="#" className="nav-brand" aria-label="Mistri_Q হোমপেজ" onClick={closeMenu}>
            <img 
              src="/logo.png" 
              alt="Mistri_Q লোগো" 
              className="nav-logo-img" 
              width="38" 
              height="38" 
            />
            <span className="brand-wordmark nav-brand-text">
              <span className="word-mistri">Mistri</span>
              <span className="word-q">_Q</span>
            </span>
            <span className="nav-tagline">সারাদেশে কোয়ালিটি কারিগর</span>
          </a>

          {/* Desktop Links */}
          <ul className="nav-links">
            <li>
              <a href="#how-it-works" className="nav-link">কীভাবে কাজ করে</a>
            </li>
            <li>
              <a href="#apk-download" className="nav-link">অ্যাপ নামান</a>
            </li>
          </ul>

          <div className="nav-actions">
            {/* Desktop CTA */}
            <a href="#apk-download" className="btn btn-white btn-sm nav-cta-desktop">
              <Download size={16} aria-hidden="true" />
              <span>অ্যাপ নামান</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="mobile-menu-toggle"
              aria-label={mobileMenuOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="মোবাইল নেভিগেশন মেনু">
          <div className="container mobile-drawer-inner">
            <ul className="mobile-drawer-links">
              <li>
                <a href="#how-it-works" className="mobile-drawer-link" onClick={closeMenu}>
                  কীভাবে কাজ করে
                </a>
              </li>
              <li>
                <a href="#apk-download" className="mobile-drawer-link" onClick={closeMenu}>
                  অ্যাপ নামান (APK)
                </a>
              </li>
            </ul>

            <div className="mobile-drawer-cta">
              <a href="#apk-download" className="btn btn-white btn-full" onClick={closeMenu}>
                <Download size={18} aria-hidden="true" />
                <span>Android অ্যাপ (APK) নামান</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
