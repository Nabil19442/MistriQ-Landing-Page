import React from 'react';
import { Search, ShieldCheck, PhoneCall, Check } from 'lucide-react';

export default function AboutFlow() {
  const steps = [
    {
      num: '১',
      title: 'খুঁজুন',
      desc: 'আপনার প্রয়োজনীয় পেশা নির্বাচন করুন এবং আপনার এলাকার অবস্থান শেয়ার করুন।',
      bullets: [
        '১১টি বিশেষ ক্যাটাগরি থেকে পছন্দ',
        'জিপিএস দ্বারা নিকটস্থ কারিগর প্রথমে',
        'তাৎক্ষণিক সার্চ রেজাল্ট'
      ],
      icon: Search
    },
    {
      num: '২',
      title: 'যাচাই করুন',
      desc: 'প্রোফাইল থেকে রেটিং, অভিজ্ঞতা ও ভেরিফিকেশন স্ট্যাটাস দেখে সেরা জন বেছে নিন।',
      bullets: [
        'গ্রাহকদের দেওয়া বাস্তব রেটিং ও রিভিউ',
        'অভিজ্ঞতা ও পূর্ববর্তী কাজের বিবরণ',
        '১০০% অ্যাডমিন ভেরিফাইড ব্যাজ'
      ],
      icon: ShieldCheck
    },
    {
      num: '৩',
      title: 'কল দিন',
      desc: 'কাজের সুবিধাজনক তারিখ ও শিফট নির্বাচন করে সরাসরি মিস্ত্রিকে কল দিন।',
      bullets: [
        'ফুল ডে, সকাল বা বিকাল শিফট নির্বাচন',
        'এক ট্যাপে সরাসরি মোবাইল ডায়ালার',
        'কোনো মধ্যস্বত্বভোগী বা বাড়তি কমিশন নেই'
      ],
      icon: PhoneCall
    }
  ];

  return (
    <section id="how-it-works" className="about-section" aria-label="Mistri_Q কী এবং কাজের নিয়মাবলী">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">সহজ ৩ ধাপ</span>
          <h2 className="section-title">Mistri_Q কী এবং কীভাবে কাজ করে?</h2>
          <p className="section-desc">
            বাংলাদেশের সাধারণ মানুষের জন্য ঝামেলামুক্ত, দ্রুত ও নির্ভরযোগ্য কারিগর সেবার এক বিশ্বস্ত ডিজিটাল ঠিকানা।
          </p>
        </div>

        {/* Q = Quality intro banner */}
        <div className="q-banner-card">
          <div className="q-badge-large" aria-hidden="true">Q</div>
          <div className="q-banner-content">
            <h3>Q মানেই Quality (কোয়ালিটি কারিগর)</h3>
            <p>
              নামে নয়, কাজেই পরিচয়। Mistri_Q-এর প্রতিটি কারিগরের পরিচয়পত্র ও অভিজ্ঞতা কঠোরভাবে যাচাইকৃত। 
              কোনো থার্ড-পার্টির হস্তক্ষেপ ছাড়া গ্রাহক ও কারিগরের মধ্যে সরাসরি সংযোগ স্থাপন করাই আমাদের উদ্দেশ্য।
            </p>
          </div>
        </div>

        {/* 3 Step Grid */}
        <div className="steps-grid">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="step-card">
                <div className="step-num-badge">
                  <span>{step.num}</span>
                </div>
                <h4>{step.num}. {step.title}</h4>
                <p>{step.desc}</p>

                <ul className="step-bullet-list">
                  {step.bullets.map((b, idx) => (
                    <li key={idx} className="step-bullet-item">
                      <span className="step-bullet-check">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

