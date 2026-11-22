import React from 'react';
import { Navigation, Star, ShieldCheck, PhoneCall, CalendarClock, History } from 'lucide-react';

export default function Features() {
  const featureList = [
    {
      title: 'কাছের কারিগর আগে (GPS)',
      desc: 'ডিভাইসের লাইভ জিপিএস লোকেশন ও Haversine অ্যালগরিদম ব্যবহার করে আপনার নিকটস্থ মিস্ত্রিদের সবার প্রথমে তালিকাভুক্ত করা হয়।',
      icon: Navigation
    },
    {
      title: 'রেটিং ও অভিজ্ঞতা সর্ট',
      desc: 'সর্বোচ্চ কাস্টমার রেটিং এবং দীর্ঘ বছরের কর্মদক্ষতাসম্পন্ন কারিগরদের কার্ড স্বয়ংক্রিয়ভাবে প্রথমে অগ্রাধিকার পায়।',
      icon: Star
    },
    {
      title: '১০০% যাচাইকৃত কারিগর',
      desc: 'প্রতিটি মিস্ত্রি ও শ্রমিকের জাতীয় পরিচয়পত্র (NID), ট্রেড দক্ষতা ও অতীত রেকর্ড অ্যাডমিন টিম দ্বারা পুঙ্খানুপুঙ্খভাবে পরীক্ষিত।',
      icon: ShieldCheck
    },
    {
      title: 'সরাসরি কল (০% কমিশন)',
      desc: 'কোনো তৃতীয় পক্ষ বা লুকানো কমিশন নেই। বুকিং কনফার্ম করে সরাসরি কারিগরের ব্যক্তিগত নম্বরে কল করে কথা বলুন।',
      icon: PhoneCall
    },
    {
      title: 'শিফট বেছে নিন',
      desc: 'আপনার সুবিধাজনক সময়ে কাজ করান—ফুল ডে (সকাল ৮টা–বিকাল ৫টা), সকালের শিফট অথবা বিকালের হাফ ডে শিফট।',
      icon: CalendarClock
    },
    {
      title: 'বুকিং হিস্ট্রি ও ট্র্যাকিং',
      desc: 'কখন কোন কারিগরকে হায়ার করেছেন, কাজের সময়সূচি ও স্ট্যাটাস সবকিছুই আপনার ব্যক্তিগত প্রোফাইলে সংরক্ষিত থাকে।',
      icon: History
    }
  ];

  return (
    <section id="features" className="features-section" aria-label="Mistri_Q প্ল্যাটফর্মের মূল ফিচারসমূহ">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">কেন Mistri_Q সেরা</span>
          <h2 className="section-title">স্মার্ট ও শক্তিশালী ফিচারসমূহ</h2>
          <p className="section-desc">
            কারিগরের সন্ধান থেকে কাজ সম্পন্ন হওয়া পর্যন্ত—সবকিছুই সহজ, স্বচ্ছ এবং সম্পূর্ণ আপনার নিয়ন্ত্রণে।
          </p>
        </div>

        {/* 6 Ruled Columns (Clean editorial layout) */}
        <div className="features-ruled-grid">
          {featureList.map((f, index) => {
            const Icon = f.icon;
            return (
              <div key={index} className="feature-col">
                <div className="feature-icon-wrapper" aria-hidden="true">
                  <Icon size={24} />
                </div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

