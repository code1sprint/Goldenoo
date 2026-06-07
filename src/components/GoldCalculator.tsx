/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calculator, TrendingUp, Info, HelpCircle } from 'lucide-react';
import { calculateGoldProductPrice, formatToman, formatGram } from './ProductsList';

interface GoldCalculatorProps {
  goldPrice18k: number;
}

export default function GoldCalculator({ goldPrice18k }: GoldCalculatorProps) {
  const [weightInput, setWeightInput] = useState('3.5');
  const [makingFeeInput, setMakingFeeInput] = useState('15');
  const [gemstoneInput, setGemstoneInput] = useState('0');
  
  // Historical chart data representing Gold price ticks in Iranian Markets over the last 6 days
  const points = [
    { label: 'شنبه', price: goldPrice18k - 35000 },
    { label: 'یکشنبه', price: goldPrice18k - 20000 },
    { label: 'دوشنبه', price: goldPrice18k - 10000 },
    { label: 'سه‌شنبه', price: goldPrice18k - 40000 },
    { label: 'چهارشنبه', price: goldPrice18k - 5000 },
    { label: 'پنج‌شنبه', price: goldPrice18k },
  ];

  const weight = parseFloat(weightInput) || 0;
  const makingFee = parseFloat(makingFeeInput) || 0;
  const gemstonePrice = parseFloat(gemstoneInput) || 0;

  const calculations = calculateGoldProductPrice(
    weight,
    goldPrice18k,
    makingFee,
    gemstonePrice
  );

  return (
    <motion.section 
      id="calculator-section" 
      initial={{ opacity: 0, y: 55, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, type: 'spring', stiffness: 35, damping: 20 }}
      className="mx-auto max-w-7xl px-6 lg:px-8 py-16 scroll-mt-24"
    >
      <div className="rounded-2xl border border-white/[0.04] bg-zinc-950/80 p-8 md:p-12 shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Calculation Form - Left block in RTL */}
          <div className="lg:col-span-7 text-right flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 justify-start mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-gold/5 border border-amber-gold/20 text-amber-gold">
                  <Calculator className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">ماشین حساب هوشمند طلا</h3>
                  <p className="text-xs text-zinc-500 mt-1">محاسبه شفاف و دقیق فاکتور قیمت بر اساس صنف طلا و جواهر کشور</p>
                </div>
              </div>

              {/* Input grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-2">وزن طلا (گرم)</label>
                  <input
                    type="number"
                    value={weightInput}
                    onChange={(e) => setWeightInput(e.target.value)}
                    min="0"
                    step="0.01"
                    className="w-full rounded-xl border border-white/[0.06] bg-zinc-900/60 px-4 py-3 text-sm text-zinc-200 text-center font-serif focus:border-amber-gold/30 focus:outline-none focus:bg-zinc-900 transition-all"
                  />
                  <p className="text-[10px] text-zinc-500 mt-1.5 text-center">مثال: ۳.۵ گرم</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-2">درصد اجرت ساخت (٪)</label>
                  <input
                    type="number"
                    value={makingFeeInput}
                    onChange={(e) => setMakingFeeInput(e.target.value)}
                    min="0"
                    max="100"
                    className="w-full rounded-xl border border-white/[0.06] bg-zinc-900/60 px-4 py-3 text-sm text-zinc-200 text-center font-serif focus:border-amber-gold/30 focus:outline-none focus:bg-zinc-900 transition-all"
                  />
                  <p className="text-[10px] text-zinc-500 mt-1.5 text-center">مثال: ۱۵ درصد</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-2">ارزش نگین و مخارج (تومان)</label>
                  <input
                    type="number"
                    value={gemstoneInput}
                    onChange={(e) => setGemstoneInput(e.target.value)}
                    min="0"
                    step="10000"
                    className="w-full rounded-xl border border-white/[0.06] bg-zinc-900/60 px-4 py-3 text-sm text-zinc-200 text-center font-serif focus:border-amber-gold/30 focus:outline-none focus:bg-zinc-900 transition-all"
                  />
                  <p className="text-[10px] text-zinc-500 mt-1.5 text-center">مثال: سنگ اتمی یا الماس مجزا</p>
                </div>
              </div>

              {/* Elegant Breakdown Card */}
              <div className="mt-8 rounded-xl bg-zinc-900/40 border border-white/[0.02] p-6 space-y-4 text-xs">
                
                <div className="flex justify-between items-center text-zinc-400">
                  <span>۱. طلای خام ۱۸ عیار ({formatGram(weight)})</span>
                  <span className="font-serif text-white font-medium">{formatToman(calculations.rawGoldPrice)}</span>
                </div>

                <div className="flex justify-between items-center text-zinc-400">
                  <span>۲. اجرت ساخت ({makingFeeInput}٪ بر روی طلای خام)</span>
                  <span className="font-serif text-white font-medium">{formatToman(calculations.makingFee)}</span>
                </div>

                <div className="flex justify-between items-center text-zinc-400">
                  <span>۳. سود متعارف گالری (۷٪ کل طلا و اجرت)</span>
                  <span className="font-serif text-white font-medium">{formatToman(calculations.galleryProfit)}</span>
                </div>

                <div className="flex justify-between items-center text-zinc-400">
                  <span>۴. مالیات بر ارزش افزوده (۹٪ بر اجرت و سود طلا)</span>
                  <span className="font-serif text-white font-medium">{formatToman(calculations.tax)}</span>
                </div>

                {gemstonePrice > 0 && (
                  <div className="flex justify-between items-center text-cyan-400 border-t border-white/[0.03] pt-3">
                    <span>۵. ارزش سنگ های قیمتی و متعلقات</span>
                    <span className="font-serif font-medium">{formatToman(gemstonePrice)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-amber-gold border-t border-white/[0.06] pt-4 text-sm font-bold">
                  <span>قیمت نهایی فاکتور طلا</span>
                  <span className="font-serif text-lg text-transparent bg-clip-text bg-gradient-to-l from-amber-gold to-white">{formatToman(calculations.totalPrice)}</span>
                </div>
              </div>
            </div>

            {/* Micro message explaining law */}
            <div className="mt-6 flex items-start gap-2 bg-amber-gold/5 p-3.5 rounded-lg border border-amber-gold/10 text-[10px] text-zinc-400 leading-5">
              <Info className="h-4 w-4 text-amber-gold flex-shrink-0 mt-0.5" />
              <p>
                بر اساس آخرین قانون اصلاح الحاقیه‌های صنف طلا در سال ۱۴۰۱، اصل ارزش طلای خام ۱۸ عیار از شمول پرداخت ۹٪ مالیات ارزش افزوده معاف گردیده و مالیات صرفاً بر روی حاصل جمع (اجرت ساخت + ۷٪ سود گالری) محاسبه و اخذ می‌گردد. گالری گلدنو این مصوبه را به صورت سیستمی و شفاف اعمال می‌نماید.
              </p>
            </div>
          </div>

          {/* Historical Market Tick - Right block in RTL */}
          <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-r border-white/[0.04] pt-8 lg:pt-0 lg:pr-12">
            
            <div className="flex items-center gap-2 justify-start mb-6">
              <TrendingUp className="h-4 w-4 text-emerald-500 animate-pulse" />
              <span className="text-sm font-semibold text-zinc-300">نرخ زنده و روندهای طلای ۱۸ عیار</span>
            </div>

            <div className="rounded-xl border border-white/[0.04] bg-zinc-900/10 p-5 text-right">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">مظنه پایه بازار (گرم ۱۸ عیار)</span>
                <span className="rounded-full bg-emerald-500/10 text-emerald-400 px-2 py-0.5 text-[10px] font-bold">زنده / زرد</span>
              </div>
              <div className="text-2xl font-black text-amber-gold font-serif mt-3">
                {formatToman(goldPrice18k)}
              </div>
              <p className="text-[10px] text-zinc-500 mt-1">
                تغییرات قیمت طلا به صورت خودکار با ثانیه‌شماری بازار بورس طلا هماهنگ است.
              </p>
            </div>

            {/* Custom Bar Graph represented cleanly via pure Tailwind and CSS */}
            <div className="mt-8">
              <span className="text-xs font-semibold text-zinc-400 block mb-4">نوسانات قیمتی اخیر در گالری گلدنو</span>
              
              <div className="h-40 flex items-end justify-between gap-2 pt-6 pb-2 px-2 rounded-xl bg-zinc-900/10 border border-white/[0.02]">
                {points.map((pt, idx) => {
                  // Determine height scale
                  const prices = points.map(p => p.price);
                  const min = Math.min(...prices);
                  const max = Math.max(...prices);
                  const delta = max - min || 1;
                  const ratio = ((pt.price - min) / delta) * 70 + 20; // 20% to 90% range

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                      {/* Tooltip on Hover */}
                      <div className="absolute -top-6 opacity-0 group-hover:opacity-100 bg-zinc-950 text-white rounded-md px-1.5 py-0.5 text-[9px] pointer-events-none transition-opacity duration-200 z-10 whitespace-nowrap">
                        {formatToman(pt.price)}
                      </div>
                      
                      {/* Bar */}
                      <div 
                        style={{ height: `${ratio}%` }} 
                        className={`w-4 sm:w-6 rounded-t-sm transition-all duration-500 ${
                          idx === points.length - 1 
                            ? 'bg-gradient-to-t from-amber-gold to-gold-300 shadow-[0_0_12px_rgba(223,183,108,0.3)]' 
                            : 'bg-zinc-800 hover:bg-zinc-700'
                        }`} 
                      />
                      
                      <span className="text-[10px] text-zinc-500 mt-2 font-sans">{pt.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </motion.section>
  );
}
