# Mistri_Q Landing Page 🛠️

Marketing landing page for **Mistri_Q** ("সারাদেশে কোয়ালিটি কারিগর"), built with **React 18**, **Vite**, an interactive **Isometric SVG "Find a Mistri" Neighbourhood Demo**, and custom CSS matching the official brand identity.

---

## 🚀 স্থানীয়ভাবে চালু করা (Local Development)

```bash
# ১. ডিপেনডেন্সি ইনস্টল করুন
npm install

# ২. ডেভেলপমেন্ট সার্ভার চালু করুন
npm run dev

# ৩. প্রডাকশন বিল্ড তৈরি করুন
npm run build

# ৪. বিল্ড প্রিভিউ দেখুন
npm run preview
```

---

## 📱 কীভাবে আসল APK ফাইল প্রতিস্থাপন করবেন (How to Swap the APK File)

1. আপনার কম্পাইলকৃত অ্যান্ড্রয়েড APK ফাইলের নাম রাখুন `Mistri_Q.apk`।
2. ফাইলটি `landing/public/Mistri_Q.apk` লোকেশনে পেস্ট করুন (বিদ্যমান প্লেসহোল্ডার ফাইলটি রিপ্লেস করুন)।
3. ব্যবহারকারীরা ল্যান্ডিং পেজে "Mistri_Q APK ডাউনলোড করুন" বাটনে ক্লিক করলে সরাসরি আপনার আসল APK ফাইলটি ডাউনলোড হবে।

---

## 🌐 Vercel-এ ডিপ্লয়মেন্ট (Deploy to Vercel)

এই প্রজেক্টটি Vercel-এ স্ট্যাটিক ফ্রন্টএন্ড হিসেবে ডিপ্লয় করার জন্য প্রস্তুত:

### অপশন ১: Vercel CLI দিয়ে
```bash
npm install -g vercel
vercel
```

### অপশন ২: GitHub / Vercel ড্যাশবোর্ড দিয়ে
1. আপনার রিপোজিটরিটি GitHub-এ পুশ করুন।
2. [Vercel Dashboard](https://vercel.com)-এ গিয়ে **Add New Project** সিলেক্ট করুন।
3. রুট ডিরেক্টরি হিসেবে `landing` ফোল্ডারটি নির্বাচন করুন:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Deploy** বাটনে ক্লিক করুন। কয়েক সেকেন্ডেই পেজটি লাইভ হয়ে যাবে!

---

## 🎨 ব্র্যান্ড টোকেন (Brand Tokens)

- **Deep Green**: `#14603A` (লোগো, ডার্ক শেপস ও সেকশন ব্যান্ড)
- **Brand Green**: `#1B8A50` (অ্যাকসেন্ট, "_Q", বাটন হোভার)
- **Navy**: `#1B2438` (হেডলাইন ও মূল টেক্সট)
- **Muted Text**: `#55627A` (সাবটেক্সট ও ক্যাপশন)
- **Mint Gradient**: `#FFFFFF` → `#F3FAF5` → `#E3F4E8`
- **বর্ডার**: `#D3E5D9`
- **ফন্ট**: `Hind Siliguri` (বাংলা) এবং `Outfit` (ইংরেজি ও Wordmark)

---

**Developed by Junayed Ahmed** • [mistriq.com](https://mistriq.com)

