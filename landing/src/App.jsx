import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutFlow from './components/AboutFlow';
import ApkDownload from './components/ApkDownload';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="mistriq-landing-app">
      {/* 1. Sticky Navbar */}
      <Navbar />

      <main>
        {/* 2. Hero Section with Interactive Neighbourhood Scene */}
        <Hero />

        {/* 3. Mistri_Q কী এবং কীভাবে কাজ করে? (3-Step Flow) */}
        <AboutFlow />

        {/* 4. APK Download Section (Deep Green Band + 3D Tilting Phone Mockup) */}
        <ApkDownload />
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}

