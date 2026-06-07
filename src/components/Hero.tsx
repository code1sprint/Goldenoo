/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Award, ShieldCheck, Truck, RotateCcw, ArrowLeft, Sparkles, MessageCircleQuestion } from 'lucide-react';
import heroRingPath from '../assets/images/gold_ring_hero_1780257597172.png';

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  
  // Track scroll position of the page
  const { scrollY } = useScroll();

  // Create elegant parallax motions
  // The background image moves down at a slower rate (0.35x speed of scroll)
  const yBg = useTransform(scrollY, [0, 1000], [0, 350]);
  // Subtle zoom/scale deepens the 3D parallax illusion
  const scaleBg = useTransform(scrollY, [0, 1000], [1.02, 1.15]);
  // Smoothly fade out the background image as they scroll past to blend with the products showcase
  const opacityBg = useTransform(scrollY, [0, 800], [1, 0.45]);

  // Content layers scroll slightly upwards for extra depth separation
  const yTextColumn = useTransform(scrollY, [0, 1000], [0, -60]);
  const yFeatureColumn = useTransform(scrollY, [0, 1000], [0, -100]);
  
  // Real Features perfectly redesigned as luxury cards
  const features = [
    {
      title: 'طلای ۱۸ عیار ممهور',
      description: 'استاندارد عیار ۷۵۰ اتاق قانون اصناف',
      icon: <Award className="h-5 w-5 text-amber-gold" />
    },
    {
      title: 'فاکتور رسمی هولوگرام‌دار',
      description: 'تضمین مادام‌العمر اصالت و خلوص',
      icon: <ShieldCheck className="h-5 w-5 text-amber-gold" />
    },
    {
      title: 'ارسال با پوشش بیمه کامل',
      description: 'امن‌ترین شیوه پستی تا درب منزل شما',
      icon: <Truck className="h-5 w-5 text-amber-gold" />
    },
  ];

  // Stats for the bottom glass bar
  const stats = [
    { value: '۱۵ هزار+', label: 'خریدار و همراه وفادار' },
    { value: '۲,۰۰۰+', label: 'طرح فعال و مدل زنده' },
    { value: '۱۰+', label: 'سال سابقه درخشان زرگری' },
    { value: '۱۰۰٪', label: 'ضمانت و عودت کتبی وجه' },
  ];

  return (
    <section 
      ref={heroRef}
      id="hero-section" 
      className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-[#0c0c0d] pt-24 pb-16 md:pt-32 md:pb-20"
    >
      
      {/* 
        CINEMATIC FULL SCREEN PARALLAX BACKGROUND REPLICA
        The luxury ring photograph acts as a majestic backplate, 
        with sophisticated dark, amber-gold radial and linear overlays for pristine readability.
      */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        <motion.div
          style={{ y: yBg, scale: scaleBg, opacity: opacityBg }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Main image stretched full page with extreme premium grade filtering */}
          <img
            src={heroRingPath}
            alt="Goldenoo Royal Ring Background"
            className="w-full h-full object-cover object-center filter brightness-[0.25] md:brightness-[0.35] contrast-[1.12] saturate-[0.95]"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* High-end decorative overlays to ensure crisp contrast on content */}
        {/* Blackout base */}
        <div className="absolute inset-0 bg-black/30 z-1 pointer-events-none" />
        
        {/* Soft elegant top and bottom linear gradients to blend with navbar/page */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0c0c0d] to-transparent z-1 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#0c0c0d] via-[#0c0c0d]/70 to-transparent z-1 pointer-events-none" />
        
        {/* Right Gradient Mask (RTL-oriented): darkens the right side where Farsi text sits */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[60%] bg-gradient-to-l from-[#0c0c0d] via-[#0c0c0d]/85 to-transparent z-1 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-full md:w-[40%] bg-gradient-to-r from-[#0c0c0d]/20 via-transparent to-transparent z-1 pointer-events-none" />

        {/* Ambient Gold Sparkling Orbs & Micro-shimmers */}
        <div className="absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-amber-500/[0.04] blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-gold-600/[0.03] blur-[120px] pointer-events-none" />
        
        {/* Floating micro stars to match royal gem theme */}
        <div className="absolute top-24 left-1/4 h-2 w-2 rounded-full bg-amber-200/40 blur-[1px] animate-pulse" />
        <div className="absolute top-1/2 left-12 h-1.5 w-1.5 rounded-full bg-white/30 blur-[2px] animate-ping" />
        <div className="absolute bottom-1/4 right-1/3 h-2.5 w-2.5 rounded-full bg-amber-400/20 blur-[2px] animate-pulse-slow" />
      </div>

      {/* Main Luxury Content Grid - Floating above the background */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text and Actions content column - Right Side on RTL */}
          <motion.div 
            style={{ y: yTextColumn }}
            className="lg:col-span-7 text-right flex flex-col items-start justify-center"
          >
            
            <div className="space-y-6 max-w-2xl">
              {/* Premium Floating Sparkle Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-gold/30 bg-[#221c13]/70 backdrop-blur-md px-4 py-1.5 text-[11px] font-bold text-amber-gold shadow-lg shadow-amber-gold/10">
                <Sparkles className="h-3.5 w-3.5 text-amber-gold animate-spin-slow" />
                <span>کلکسیون انحصاری و شاهانه گلدنو</span>
              </div>

              {/* Headings aligned beautifully */}
              <h1 className="font-sans text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl leading-[1.25] text-white">
                درخشش خاص
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-gold via-gold-300 to-white font-extrabold mt-2 block filter drop-shadow-sm">
                  برای لحظات ماندگار زندگی
                </span>
              </h1>

              {/* Sophisticated description */}
              <p className="text-sm md:text-base leading-8 text-zinc-300 max-w-xl font-medium filter drop-shadow">
                تلفیق جسورانه هنر زرگری اصیل ایرانی با مهندسی روز دنیا. کلکسیونی باشکوه از طلاهای ۱۸ عیار و جواهراتی مزیّن به پاک‌ترین نگین‌های تمام‌برلیان شناسنامه‌دار، همراه با صدور سیستمی و شفاف فاکتور رسمی اصناف کشور.
              </p>

              {/* Action Buttons wrapped in glass style */}
              <div className="pt-6 flex flex-wrap gap-4 justify-start">
                <button
                  onClick={onExploreClick}
                  className="group relative inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-amber-gold via-gold-400 to-amber-600 px-8 py-4.5 text-sm font-black text-zinc-950 shadow-xl shadow-amber-gold/15 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <span>ورود به گالری و تماشای محصولات</span>
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </button>
                
                {/* Secondary Call-To-Action Glass button */}
                <button
                  onClick={() => {
                    const calcEl = document.getElementById('calculator-section');
                    if (calcEl) calcEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-zinc-900/40 backdrop-blur-md px-6 py-4.5 text-xs font-bold text-zinc-200 hover:border-amber-gold/30 hover:text-amber-gold transition-all duration-300 cursor-pointer"
                >
                  <span>محاسبه شفاف عیار و اجرت</span>
                </button>
              </div>
            </div>

          </motion.div>

          {/* Interactive Feature Cards - Left Side on RTL */}
          <motion.div 
            style={{ y: yFeatureColumn }}
            className="lg:col-span-5 flex flex-col gap-5 justify-center"
          >
            
            <div className="space-y-4">
              <div className="text-right mb-2">
                <span className="text-[10px] text-zinc-500 font-bold tracking-wider block mb-1">تضمین‌های خرید از گلدنو</span>
                <h3 className="text-xs font-bold text-zinc-400">امنیت، خلوص و شفافیت در هر فاکتور</h3>
              </div>

              {features.map((feat, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.04] bg-zinc-900/35 hover:bg-[#1a1712]/50 hover:border-amber-gold/20 backdrop-blur-md transition-all duration-300 shadow-lg"
                >
                  {/* Icon box representing high design */}
                  <div className="flex-shrink-0 flex items-center justify-center h-11 w-11 rounded-xl bg-amber-gold/5 border border-amber-gold/20 text-amber-gold shadow-lg shadow-amber-gold/5">
                    {feat.icon}
                  </div>
                  <div className="text-right">
                    <h4 className="font-sans text-xs font-bold text-zinc-100">{feat.title}</h4>
                    <p className="font-sans text-[11px] text-zinc-400 mt-1.5 leading-5">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>

      {/* Floating Glass Statistics Bar - Very bottom of the full screen view */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 mt-12 md:mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="rounded-2xl border border-white/[0.04] bg-zinc-950/45 backdrop-blur-lg p-6 shadow-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {stats.map((st, idx) => (
              <div 
                key={idx}
                className="text-center md:border-l md:last:border-l-0 border-white/[0.05] px-4"
              >
                <div className="font-serif text-2xl md:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-gold to-gold-300 filter drop-shadow">
                  {st.value}
                </div>
                <div className="mt-1.5 text-[10px] font-bold tracking-wide text-zinc-400 font-sans">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
}
