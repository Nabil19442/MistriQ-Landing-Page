import React, { useState } from 'react';
import { CheckCircle2, Phone, Star, ShieldCheck, Sparkles } from 'lucide-react';

export default function Categories() {
  const categories = [
    {
      id: 'mason',
      name: 'রাজমিস্ত্রি',
      englishName: 'Mason',
      icon: '🧱',
      desc: 'ইট গাঁথুনি, প্লাস্টার, আরসিসি ঢালাই, বাউন্ডারি ওয়াল ও যেকোনো ধরণের বিল্ডিং সংস্কার কাজের অভিজ্ঞ কারিগর।',
      tags: ['ইট গাঁথুনি', 'প্লাস্টার', 'আরসিসি ঢালাই', 'বাউন্ডারি ওয়াল', 'বিল্ডিং সংস্কার'],
      sampleWorker: {
        name: 'আব্দুল করিম',
        trade: 'সিনিয়র রাজমিস্ত্রি',
        exp: '১২ বছর',
        rating: '৪.৯',
        reviews: '১২৪',
        location: 'মিরপুর, ঢাকা'
      }
    },
    {
      id: 'carpenter',
      name: 'কাঠমিস্ত্রি',
      englishName: 'Carpenter',
      icon: '🪚',
      desc: 'দরজা-জানালা ফিটিং, আধুনিক কিচেন ক্যাবিনেট তৈরি, কাঠ ও বোর্ডের ফার্নিচার মেরামত এবং বার্নিশ ও পলিশ।',
      tags: ['দরজা-জানালা ফিটিং', 'কিচেন ক্যাবিনেট', 'ফার্নিচার মেরামত', 'কাঠের পলিশ'],
      sampleWorker: {
        name: 'রফিকুল ইসলাম',
        trade: 'ফার্নিচার কাঠমিস্ত্রি',
        exp: '৯ বছর',
        rating: '৪.৮',
        reviews: '৯৮',
        location: 'উত্তরা, ঢাকা'
      }
    },
    {
      id: 'plumber',
      name: 'প্লাম্বার',
      englishName: 'Plumber',
      icon: '🔧',
      desc: 'পানি পাম্প বসানো, স্যানিটারি লিকেজ মেরামত, বাথরুম ফিটিংস, কমোড ও বেসিন স্থাপন এবং ড্রেনেজ লাইন সংস্কার।',
      tags: ['পানি পাম্প', 'স্যানিটারি লিকেজ', 'বাথরুম ফিটিংস', 'পাইপলাইন'],
      sampleWorker: {
        name: 'মোঃ সেলিম রেজা',
        trade: 'স্যানিটারি ও পাইপ মিস্ত্রি',
        exp: '৭ বছর',
        rating: '৪.৯৫',
        reviews: '১৫২',
        location: 'ধানমন্ডি, ঢাকা'
      }
    },
    {
      id: 'electrician',
      name: 'ইলেকট্রিশিয়ান',
      englishName: 'Electrician',
      icon: '⚡',
      desc: 'হাউজ ওয়্যারিং, ডিবি বোর্ড মেরামত, শর্ট সার্কিট ট্রাবলশুটিং, আইপিএস লাইন সংযোগ ও ফ্যান-লাইট ফিটিং।',
      tags: ['হাউজ ওয়্যারিং', 'ডিবি বোর্ড', 'শর্ট সার্কিট', 'আইপিএস লাইন', 'সার্কিট ব্রেকার'],
      sampleWorker: {
        name: 'মাহমুদুল হাসান',
        trade: 'সার্টিফাইড ইলেকট্রিশিয়ান',
        exp: '১০ বছর',
        rating: '৪.৯',
        reviews: '২১০',
        location: 'মোহাম্মদপুর, ঢাকা'
      }
    },
    {
      id: 'mechanic',
      name: 'গাড়ি মেকানিক',
      englishName: 'Car Mechanic',
      icon: '🚗',
      desc: 'ইঞ্জিন টিউন-আপ, সাসপেনশন চেক, ব্রেক সিস্টেম রিপেয়ার এবং রাস্তায় ইমার্জেন্সি ব্রেকডাউন সার্ভিস।',
      tags: ['ইঞ্জিন টিউন-আপ', 'সাসপেনশন', 'ব্রেক সিস্টেম', 'ইমার্জেন্সি ব্রেকডাউন'],
      sampleWorker: {
        name: 'তানভীর আহমেদ',
        trade: 'অটো মেকানিক বিশেষজ্ঞ',
        exp: '৮ বছর',
        rating: '৪.৮৫',
        reviews: '৮৭',
        location: 'তেজগাঁও, ঢাকা'
      }
    },
    {
      id: 'ac',
      name: 'এসি টেকনিশিয়ান',
      englishName: 'AC Technician',
      icon: '❄️',
      desc: 'এসি মাস্টার ওয়াশ, পরিবেশবান্ধব ফ্রিয়ন গ্যাস রিফিল, পাইপ লিকেজ সমাধান ও কম্প্রেশার রিপেয়ার সার্ভিস।',
      tags: ['এসি মাস্টার ওয়াশ', 'ফ্রিয়ন গ্যাস রিফিল', 'পাইপ লিকেজ', 'কম্প্রেশার রিপেয়ার'],
      sampleWorker: {
        name: 'শাকিল হোসেন',
        trade: 'এইচভিএসি ও এসি টেকনিশিয়ান',
        exp: '৬ বছর',
        rating: '৪.৯২',
        reviews: '১৭৫',
        location: 'গুলশান, ঢাকা'
      }
    },
    {
      id: 'labour',
      name: 'দিনমজুর',
      englishName: 'Day Labour',
      icon: '⛏️',
      desc: 'ভারী মালামাল লোডিং ও আনলোডিং, বাসা বদলের হেল্পার, মাটি কাটা এবং নির্মাণ কাজের সহযোগী কর্মী।',
      tags: ['মালামাল লোডিং/আনলোডিং', 'বাসা বদল হেল্পার', 'মাটি কাটা', 'কন্সট্রাকশন হেল্পার'],
      sampleWorker: {
        name: 'মোবারক আলী',
        trade: 'নির্মাণ সহযোগী ও দিনমজুর',
        exp: '৫ বছর',
        rating: '৪.৭৫',
        reviews: '৬৪',
        location: 'যাত্রাবাড়ী, ঢাকা'
      }
    },
    {
      id: 'tiles',
      name: 'টাইলস ও মার্বেল',
      englishName: 'Tiles & Marble',
      icon: '📐',
      desc: 'ফ্লোর ও ওয়ালের নিখুঁত লেভেলিং, সিরামিক টাইলস ফিটিং, মার্বেল কাটিং ও গ্রানাইট পলিশিং সার্ভিস।',
      tags: ['টাইলস ফিটিং', 'মার্বেল কাটিং', 'ফ্লোর লেভেলিং', 'গ্রানাইট পলিশ'],
      sampleWorker: {
        name: 'সুজন চৌধুরী',
        trade: 'টাইলস ও মার্বেল বিশেষজ্ঞ',
        exp: '১১ বছর',
        rating: '৪.৮৮',
        reviews: '১৩৩',
        location: 'বাড্ডা, ঢাকা'
      }
    },
    {
      id: 'painter',
      name: 'রংমিস্ত্রি',
      englishName: 'Painter',
      icon: '🎨',
      desc: 'ঘরের অভ্যন্তরীণ ও বাহ্যিক ওয়েদার কোট, ডিসটেম্পার, নিখুঁত ওয়াল পুটি ও আকর্ষণীয় কালার পেইন্টিং।',
      tags: ['ওয়েদার কোট', 'ডিসটেম্পার', 'ওয়াল পুটি', 'কালার পেইন্টিং', 'টেক্সচার পেইন্ট'],
      sampleWorker: {
        name: 'নুরুজ্জামান শেখ',
        trade: 'প্রফেশনাল রংমিস্ত্রি',
        exp: '১৩ বছর',
        rating: '৪.৯',
        reviews: '১৪১',
        location: 'বনশ্রী, ঢাকা'
      }
    },
    {
      id: 'welder',
      name: 'ওয়েল্ডার ও গ্রিল',
      englishName: 'Welder & Grill',
      icon: '⚙️',
      desc: 'বারান্দা ও জানালার মজবুত গ্রিল, কলাপসিবল মেইন গেট, এসএস পাইপ ও মেটাল স্ট্রাকচার ওয়েল্ডিং।',
      tags: ['বারান্দার গ্রিল', 'কলাপসিবল গেট', 'এসএস ওয়ার্ক', 'মেটাল স্ট্রাকচার'],
      sampleWorker: {
        name: 'জাহিদুল ইসলাম',
        trade: 'এসএস ও গ্রিল ওয়েল্ডার',
        exp: '৯ বছর',
        rating: '৪.৮২',
        reviews: '৯২',
        location: 'কমলাপুর, ঢাকা'
      }
    },
    {
      id: 'maid',
      name: 'কাজের বুয়া',
      englishName: 'Housemaid',
      icon: '🧹',
      desc: 'রান্না, ঘর মোছা, বাসন ও কাপড় ধোয়া এবং খণ্ডকালীন বা পূর্ণকালীন নির্ভরযোগ্য পারিবারিক গৃহস্থালি সাহায্য।',
      tags: ['রান্নাবান্না', 'ঘর ঝাড়ু ও মোছা', 'বাসন ও কাপড় ধোয়া', 'খণ্ডকালীন/পূর্ণকালীন'],
      sampleWorker: {
        name: 'মমতা বেগম',
        trade: 'অভিজ্ঞ গৃহকর্মী ও রাঁধুনি',
        exp: '৬ বছর',
        rating: '৪.৯৪',
        reviews: '১৮০',
        location: 'পল্টন, ঢাকা'
      }
    }
  ];

  const [activeId, setActiveId] = useState(categories[0].id);
  const activeCat = categories.find((c) => c.id === activeId) || categories[0];

  return (
    <section id="categories" className="categories-section" aria-label="১১ ধরনের কারিগর ক্যাটাগরি">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">এক অ্যাপে সব সেবা</span>
          <h2 className="section-title">১১ ধরনের কারিগর, এক অ্যাপে</h2>
          <p className="section-desc">
            গৃহস্থালি সংস্কার থেকে নির্মাণ কাজ—আপনার প্রয়োজন অনুযায়ী যেকোনো পেশার দক্ষ ও পরীক্ষিত কারিগর পেয়ে যান নিমিষেই।
          </p>
        </div>

        {/* Chips selector */}
        <div className="cat-chips-scroll" role="tablist" aria-label="কারিগর পেশা নির্বাচন">
          {categories.map((cat) => {
            const isActive = cat.id === activeId;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${cat.id}`}
                id={`tab-${cat.id}`}
                className={`cat-chip ${isActive ? 'active' : ''}`}
                onClick={() => setActiveId(cat.id)}
              >
                <span className="cat-chip-icon" aria-hidden="true">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Mint Detail Panel */}
        <div
          id={`panel-${activeCat.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeCat.id}`}
          className="cat-detail-panel"
        >
          <div className="cat-detail-decor" aria-hidden="true" />

          {/* Left: Trade info and services */}
          <div className="cat-detail-info">
            <h3>
              <span>{activeCat.icon}</span>
              <span>{activeCat.name}</span>
              <span className="cat-englishSub">({activeCat.englishName})</span>
            </h3>

            <p className="cat-detail-desc">{activeCat.desc}</p>

            <div className="cat-services-box">
              <h4 className="cat-services-title">সাধারণ সার্ভিসসমূহ:</h4>
              <div className="cat-services-tags">
                {activeCat.tags.map((tag, idx) => (
                  <span key={idx} className="cat-service-tag">
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            <a href="#apk-download" className="btn btn-primary btn-sm">
              <Phone size={16} aria-hidden="true" />
              <span>{activeCat.name} হায়ার করতে অ্যাপ নামান</span>
            </a>
          </div>

          {/* Right: Realistic worker profile preview */}
          <div className="cat-preview-card">
            <div>
              <div className="preview-worker-head">
                <div className="preview-avatar" aria-hidden="true">
                  {activeCat.icon}
                </div>
                <div className="preview-worker-meta">
                  <h5>
                    <span>{activeCat.sampleWorker.name}</span>
                    <ShieldCheck className="verified-tick-icon" aria-label="যাচাইকৃত কারিগর" />
                  </h5>
                  <p>{activeCat.sampleWorker.trade}</p>
                </div>
              </div>

              <div className="preview-stats-row">
                <div className="preview-stat-item">
                  <div className="val">{activeCat.sampleWorker.rating} ★</div>
                  <div className="lbl">{activeCat.sampleWorker.reviews} রিভিউ</div>
                </div>
                <div className="preview-stat-item">
                  <div className="val">{activeCat.sampleWorker.exp}</div>
                  <div className="lbl">অভিজ্ঞতা</div>
                </div>
                <div className="preview-stat-item">
                  <div className="val">১০০%</div>
                  <div className="lbl">ভেরিফাইড</div>
                </div>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '1rem' }}>
                📍 {activeCat.sampleWorker.location} (নিকটতম কারিগর)
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-deep-green)' }}>
                শিফট: ফুল ডে / সকাল / বিকাল
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

