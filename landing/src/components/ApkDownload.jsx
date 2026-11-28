import React from 'react';
import { Download, CheckCircle, ShieldCheck, Smartphone, AlertCircle } from 'lucide-react';
import PhoneMockup from './PhoneMockup';

export default function ApkDownload() {
  return (
    <section id="apk-download" className="apk-section" aria-label="Mistri_Q Android APK ডাউনলোড">
      {/* Decorative organic shapes matching official cover */}
      <div className="apk-band-decor-left" aria-hidden="true" />
      <div className="apk-band-decor-right" aria-hidden="true" />

      <div className="container">
        <div className="apk-grid">
          {/* Left Column: Download action & Install Guide */}
          <div className="apk-info">
            <span className="apk-tag">Android APK সংস্করণ ১.০</span>
            
            <h2 className="apk-title">Mistri_Q অ্যাপ নামান</h2>
            
            <p className="apk-desc">
              এখনই বিনামূল্যে ডাউনলোড করুন Mistri_Q Android অ্যাপ। 
              কোনো নিবন্ধন ফি ছাড়াই সরাসরি আপনার এলাকায় দক্ষ কারিগর খুঁজুন ও ফোনে হায়ার করুন।
            </p>

            <div className="apk-download-cta">
              <a 
                href="/Mistri_Q.apk" 
                download="Mistri_Q_v1.0.apk" 
                className="btn btn-white"
                id="download-apk-btn"
                aria-label="Mistri_Q APK ডাউনলোড করুন"
              >
                <Download size={22} color="var(--color-deep-green)" aria-hidden="true" />
                <span>Mistri_Q APK ডাউনলোড করুন (ফ্রি)</span>
              </a>

              <div className="apk-file-meta">
                <Smartphone size={14} aria-hidden="true" />
                <span>Android 6.0+ সমর্থিত • নিরাপদ ও সুরক্ষিত • ফাইল সাইজ: ~৭২ MB</span>
              </div>
            </div>

            {/* 3 Step Installation instructions */}
            <div className="apk-steps-box">
              <h3 className="apk-steps-title">সহজ ৩ ধাপে ইনস্টল নির্দেশিকা:</h3>
              <ul className="apk-steps-list">
                <li className="apk-step-item">
                  <span className="apk-step-num">১</span>
                  <p>
                    <strong>ডাউনলোড করুন:</strong> উপরের বাটনে ক্লিক করে APK ফাইলটি নামিয়ে নিন।
                  </p>
                </li>
                <li className="apk-step-item">
                  <span className="apk-step-num">২</span>
                  <p>
                    <strong>"অজানা উৎস থেকে ইনস্টল" অনুমতি দিন:</strong> ফোনে বার্তা এলে সেটিংস থেকে <em>"Allow from this source"</em> বা <em>"Install unknown apps"</em> অন করে দিন।
                  </p>
                </li>
                <li className="apk-step-item">
                  <span className="apk-step-num">৩</span>
                  <p>
                    <strong>ইনস্টল করে অ্যাপ খুলুন:</strong> সরাসরি অ্যাপ চালু করুন এবং যেকোনো সময় এক ক্লিকে কারিগর হায়ার করুন।
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: 3D Interactive Tilting Phone Mockup */}
          <div className="apk-visual">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

