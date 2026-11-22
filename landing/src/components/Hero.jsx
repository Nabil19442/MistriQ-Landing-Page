import React from 'react';
import { Download, ChevronRight, ShieldCheck, MapPin, PhoneCall } from 'lucide-react';
import FindMistriScene from './FindMistriScene';

export default function Hero() {
  return (
    <section className="hero-section" aria-label="হিরো সেকশন">
      {/* Decorative corner shape matching official cover image */}
      <div className="hero-corner-decor" aria-hidden="true" />
      <div className="cover-dot-grid" style={{ top: 20, right: 30 }} aria-hidden="true" />

      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Headlines & CTAs */}
          <div className="hero-content">
            <div className="hero-badge-row">
              <span className="hero-pill">
                <span className="hero-pill-dot" />
                <span>সারাদেশে কোয়ালিটি কারিগর</span>
              </span>
            </div>

            <h1 className="hero-title">
              আপনার এলাকায় বিশ্বস্ত কারিগর ও মিস্ত্রি খুঁজুন
            </h1>

            <p className="hero-subtext">
              রাজমিস্ত্রি, ইলেকট্রিশিয়ান, প্লাম্বার থেকে কাজের বুয়া পর্যন্ত যাচাইকৃত কারিগর। 
              কোনো মধ্যস্বত্বভোগী ছাড়াই সরাসরি ফোন করে হায়ার করুন।
            </p>

            <div className="hero-cta-group">
              <a href="#apk-download" className="btn btn-primary">
                <Download size={19} aria-hidden="true" />
                <span>Android অ্যাপ (APK) নামান</span>
              </a>

              <a href="#how-it-works" className="btn btn-secondary">
                <span>কীভাবে কাজ করে</span>
                <ChevronRight size={18} aria-hidden="true" />
              </a>
            </div>

            <div className="hero-trust-row">
              <div className="trust-item">
                <div className="trust-icon-box">
                  <ShieldCheck size={14} aria-hidden="true" />
                </div>
                <span>১০০% যাচাইকৃত</span>
              </div>

              <div className="trust-item">
                <div className="trust-icon-box">
                  <MapPin size={14} aria-hidden="true" />
                </div>
                <span>সমগ্র বাংলাদেশ</span>
              </div>

              <div className="trust-item">
                <div className="trust-icon-box">
                  <PhoneCall size={14} aria-hidden="true" />
                </div>
                <span>সরাসরি কল</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Isometric "Find a Mistri" Neighbourhood Demo */}
          <div className="hero-visual">
            <FindMistriScene />
          </div>
        </div>
      </div>
    </section>
  );
}
