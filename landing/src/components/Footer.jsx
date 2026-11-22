import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="footer-logo-row" aria-label="Mistri_Q মূলপাতা">
              <img 
                src="/logo.png" 
                alt="Mistri_Q অফিশিয়াল লোগো" 
                className="footer-logo-img" 
                width="44" 
                height="44" 
              />
              <span className="brand-wordmark" style={{ fontSize: '1.65rem' }}>
                <span className="word-mistri">Mistri</span>
                <span className="word-q">_Q</span>
              </span>
            </a>
            <p className="footer-tagline">সারাদেশে কোয়ালিটি কারিগর</p>
          </div>

          <div className="footer-links-group">
            <a href="#how-it-works" className="footer-link">কীভাবে কাজ করে</a>
            <a href="#apk-download" className="footer-link">APK ডাউনলোড</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Mistri_Q. সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}

