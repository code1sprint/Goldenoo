/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, Hammer, Paintbrush, Compass, Award, Sparkles } from 'lucide-react';

export default function AtelierSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'اتود دستی و ایده پردازی',
      subTitle: 'آغاز خلق شاهکار با خطوط قلم‌مو و ذهن‌های خلاق',
      description: 'هر اثر در گالری گلدنو با یک ایده خام روی کاغذ آغاز می‌شود. طراحان بین‌المللی ما با بررسی نقوش اساطیری، باستانی و مینیاتوری ایران در کنار روندهای لوکس مدرن پاریس و میلان، اولین خطوط روح‌بخش را برای قطعه طلا رسم می‌کنند.',
      icon: <Paintbrush className="h-5 w-5" />,
      detail: 'مرحله ترسیم با مداد گرافیت سخت طراحی و شستشوی جوهر چینی روی کاغذ کتان ۲۲۰ گرمی صورت می‌پذیرد تا نهایت جزئیات فرمی ثبت شود.',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop',
    },
    {
      title: 'مدل‌سازی دقیق سه‌بعدی',
      subTitle: 'محاسبه ارگونومیک، حجم‌سنجی و تقسیم وزن فلز',
      description: 'در این مرحله، اتودهای برگزیده وارد محیط شبیه‌ساز مهندسی جواهرات و نرم‌افزارهای ماتریکس و راینوگلد می‌شوند. مهندسان ما ضخامت دیواره‌ها، استحکام چنگ کارتها و تلاقی شکست‌های نوری سنگ‌های برلیان را به صورت میکرومتری تنظیم می‌کنند.',
      icon: <Compass className="h-5 w-5" />,
      detail: 'محاسبه دقیق توزیع جرم طلا به ما این امکان را می‌دهد که با حفظ حداکثر نمای بصری شکوه طلایی، وزن نهایی بهینه، سبک و ارگونومیک برای انگشت و گردن حاصل شود.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop',
    },
    {
      title: 'ریخته‌گری گریز از مرکز طلا',
      subTitle: 'ذوب دقیق طلای شمش ۷۵۰ آلمانی در اتمسفر گاز بی اثر',
      description: 'پس از پرینت سه‌بعدی رزین‌های گالوانیزه موم‌خورده، ساخت قالب‌های سرامیکی نسوز و عملیات ریخته‌گری خلاء مجهز به القای مغناطیسی آغاز می‌شود. طلای ۱۸ عیار از ترکیب دقیق شمش ۲۴ عیار سوئیسی با دوزینگ مس و نقره مرغوب با خلوصی کاملاً ممهور متولد می‌گردد.',
      icon: <Hammer className="h-5 w-5" />,
      detail: 'استفاده از گاز محافظ آرگون در زمان ذوب، مانع از ورود کمترین اکسیژن به بافت فلز گشته و محصول نهایی کاملا بدون حباب، براق و پر چگال به دست می‌آید.',
      image: 'https://images.unsplash.com/photo-1536882240095-0379873feb4e?q=80&w=600&auto=format&fit=crop',
    },
    {
      title: 'مخراج‌کاری و پولیش نهایی',
      subTitle: 'نشاندن نگین‌های شناسنامه‌دار ریزبینانه زیر میکروسکوپ غول آسا',
      description: 'درخشش نهایی منوط به هنر مخراج‌کاران زبردست است. تک به تک نگین‌های برلیان پاک (VVS1) و سنگ‌های گرانبهای یاقوت با چنگک‌های ظریف و زیر قوی‌ترین لنزهای نوری با دست بر روی طلا کاشته شده و در نهایت با غلتک‌های پنبه‌ای و پودر اکسید کروم جلا داده می‌شود.',
      icon: <Eye className="h-5 w-5" />,
      detail: 'میکروپینینگ نگین‌ها تضمین می‌کند که حتی در طول سالیان طولانی استفاده روزمره، هیچ سنگی خرد یا از پایه طلا جدا نخواهد شد.',
      image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=600&auto=format&fit=crop',
    }
  ];

  return (
    <section className="relative overflow-hidden bg-[#0a0a0b] py-24 border-t border-white/[0.04] text-right font-sans select-none">
      
      {/* Visual background parallax decorations */}
      <div className="absolute top-1/2 left-0 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-amber-gold/[0.015] blur-[150px] pointer-events-none" />
      <div className="absolute top-10 right-10 h-[300px] w-[300px] rounded-full bg-gold-600/[0.01] blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* Title Group with Viewport Slide Parallax */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-gold/5 border border-amber-gold/15 px-4.5 py-1 text-[11px] font-bold text-amber-gold mb-3">
            <Sparkles className="h-3 w-3 animate-pulse" />
            اصالت کارگاهی طلای دست‌ساز
          </span>
          <h2 className="text-2xl md:text-3.5xl font-black text-white tracking-tight lead-[1.3]">
            آتلیه طراحی و فرآیند پدیدآوری گلدنو
          </h2>
          <p className="text-zinc-500 text-xs md:text-sm leading-7 mt-3 max-w-xl mx-auto">
            پشت هر فاکتور ممهور گلدنو، زنجیره‌ای خیره‌کننده از هنر موروثی و مهندسی میکرومتری در جریان است. تماشا کنید طلاهای شما چگونه خلق می‌شوند.
          </p>
        </motion.div>

        {/* Parallax Content Grid Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Timeline and indicators - Right side (RTL) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            
            <div className="space-y-3">
              {steps.map((st, index) => {
                const isActive = activeStep === index;
                return (
                  <motion.button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`w-full text-right p-5 rounded-xl border transition-all duration-300 flex items-center gap-4 relative overflow-hidden cursor-pointer ${
                      isActive 
                        ? 'bg-zinc-900 border-amber-gold/30 shadow-lg shadow-amber-gold/[0.02]' 
                        : 'bg-zinc-950/20 border-white/[0.03] hover:bg-zinc-900/60 hover:border-white/[0.06]'
                    }`}
                    whileHover={{ x: -4 }}
                  >
                    {/* Glowing vertical slider effect */}
                    {isActive && (
                      <motion.div 
                        layoutId="active-atelier-indicator"
                        className="absolute right-0 top-0 bottom-0 w-1 bg-amber-gold"
                      />
                    )}

                    {/* Stage Badge Circle */}
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center border transition-colors ${
                      isActive 
                        ? 'bg-[#221c13] border-amber-gold/20 text-amber-gold' 
                        : 'bg-zinc-950 border-white/[0.04] text-zinc-500'
                    }`}>
                      {st.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                          {st.title}
                        </span>
                        <span className="text-[10px] text-zinc-600 font-serif">۰{index + 1}</span>
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1.5 truncate max-w-[210px]">
                        {st.subTitle}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Micro details assurance footer */}
            <div className="p-5 rounded-xl border border-white/[0.03] bg-zinc-950/20 text-xs text-zinc-500 space-y-3">
              <div className="flex justify-between border-b border-white/[0.02] pb-2 font-medium">
                <span>تضمین اصالت کارگاهی:</span>
                <span className="text-zinc-400">کتبی و با مهر رسمی</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>دستگاه مخراج‌کاری:</span>
                <span className="text-zinc-400">میکروسکوپی لایکا سوئیس</span>
              </div>
            </div>

          </div>

          {/* Visual stage display & interactive description - Left side */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-white/[0.04] bg-zinc-900/15 p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center h-full justify-between"
            >
              
              {/* Description column - Right inside details */}
              <div className="flex-1 flex flex-col justify-between text-right h-full py-2">
                <div>
                  <span className="text-[10px] text-amber-gold font-bold uppercase tracking-wider block font-serif">
                    مرحله ۰{activeStep + 1} / آتلیه زرگری گلدنو
                  </span>
                  
                  <h3 className="text-lg md:text-xl font-bold text-white mt-2">
                    {steps[activeStep].title}
                  </h3>
                  
                  <h5 className="text-xs text-zinc-400 font-semibold mt-1 leading-5">
                    {steps[activeStep].subTitle}
                  </h5>

                  <p className="text-xs text-zinc-400 leading-7 mt-5 font-sans">
                    {steps[activeStep].description}
                  </p>

                  <div className="mt-6 p-4 rounded-xl border border-white/[0.03] bg-zinc-950/40 text-xs text-zinc-500 leading-6 relative overflow-hidden">
                    <span className="font-bold text-zinc-400 block mb-1">مکانیزم فنی اصیل:</span>
                    {steps[activeStep].detail}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.03] flex items-center justify-between text-[11px] text-zinc-500">
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-amber-gold" />
                    <span>ممهور به استاندارد صنف</span>
                  </div>
                  <span>تولید اختصاصی گالری گلدنو</span>
                </div>
              </div>

              {/* Dynamic Image column - Left inside details with gentle zoom effect */}
              <div className="w-full md:w-[45%] h-64 md:h-full rounded-xl overflow-hidden border border-white/[0.04] bg-zinc-950/60 relative">
                <motion.img
                  initial={{ scale: 1.1, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2 }}
                  src={steps[activeStep].image}
                  alt={steps[activeStep].title}
                  className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Gold vignette gradient rim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              </div>

            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
