import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutFlow from './components/AboutFlow';
import Categories from './components/Categories';
import Features from './components/Features';
import ApkDownload from './components/ApkDownload';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="mistriq-landing-app">
      {/* 1. Sticky Navbar */}
      <Navbar />

      <main>
        {/* 2. Hero Section with 3D Logo Scene */}
        <Hero />

        {/* 3. Mistri_Q কী? (3-Step Flow) */}
        <AboutFlow />

        {/* 4. ১১ ধরনের কারিগর, এক অ্যাপে (Interactive Tabs & Mint Panel) */}
        <Categories />

        {/* 5. Features (6 Ruled Editorial Columns) */}
        <Features />

        {/* 6. APK Download Section (Deep Green Band + 3D Tilting Phone Mockup) */}
        <ApkDownload />
      </main>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}

