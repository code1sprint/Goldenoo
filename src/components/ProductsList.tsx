/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Eye, Star, Info, Calculator, Box } from 'lucide-react';
import { Product } from '../types';
import Jewellery3DViewer from './Jewellery3DViewer';

interface ProductsListProps {
  products: Product[];
  selectedCategory: string;
  goldPrice18k: number;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isLoading?: boolean;
}

// Global pricing helper based on active gold prices
export function calculateGoldProductPrice(
  weight: number,
  goldPricePerGram: number,
  makingFeePercent: number,
  basePrice: number = 0
) {
  // Raw gold base cost
  const rawGoldPrice = weight * goldPricePerGram;
  
  // Production wage / fee
  const makingFee = rawGoldPrice * (makingFeePercent / 100);
  
  // 7% classic gallery commission
  const galleryProfit = (rawGoldPrice + makingFee) * 0.07;
  
  // Modern Iranian gold law: 9% VAT is only calculated on wage + commission, gold bullion is exempt!
  const tax = (makingFee + galleryProfit) * 0.09;
  
  const total = rawGoldPrice + makingFee + galleryProfit + tax + basePrice;

  return {
    rawGoldPrice: Math.round(rawGoldPrice),
    makingFee: Math.round(makingFee),
    galleryProfit: Math.round(galleryProfit),
    tax: Math.round(tax),
    totalPrice: Math.round(total)
  };
}

// Price formatter for elegant Iranian Tomans format
export function formatToman(value: number): string {
  return new Intl.NumberFormat('fa-IR').format(value) + ' تومان';
}

export function formatGram(value: number): string {
  return new Intl.NumberFormat('fa-IR').format(value) + ' گرم';
}

export default function ProductsList({
  products,
  selectedCategory,
  goldPrice18k,
  onProductClick,
  onAddToCart,
  isLoading = false,
}: ProductsListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtering products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.includes(searchTerm) || p.description.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="products-section" className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
      
      {/* Title & Searching Controls */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/[0.04] pb-8 mb-12 gap-6">
        <div className="text-right">
          <h2 className="font-sans text-2xl font-bold tracking-tight text-white sm:text-3xl">
            ویتراین طلای گالری گلدنو
          </h2>
          <p className="font-sans text-xs text-zinc-500 mt-2">
            قیمت کلیه جواهرات به صورت کاملاً زنده بر اساس نرخ جهانی طلا محاسبه می‌شود.
          </p>
        </div>

        {/* Dynamic Search Bar */}
        <div className="relative max-w-sm w-full">
          <input
            type="text"
            placeholder="جستجوی مدل، نوع سنگ، کادو..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-white/[0.06] bg-zinc-950/80 px-4 py-3 text-sm text-zinc-200 placeholder-zinc-500 text-right focus:border-amber-gold/40 focus:outline-none transition-all"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.03] bg-zinc-950/25 p-0 shadow-lg animate-pulse"
            >
              {/* Image Placeholder */}
              <div className="aspect-[4/3] w-full bg-zinc-900/60 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-gold/5 via-transparent to-transparent opacity-40" />
                <div className="absolute top-3 right-3 h-4 w-12 rounded-full bg-zinc-800" />
              </div>

              {/* Text, Description, and Tags */}
              <div className="p-6 text-right space-y-4">
                <div className="flex justify-between items-center">
                  <div className="h-3 w-16 rounded bg-zinc-850" />
                  <div className="h-3 w-8 rounded bg-zinc-850" />
                </div>

                <div className="h-4 w-3/4 rounded bg-zinc-800 mr-0 ml-auto" />

                {/* Tags loading */}
                <div className="flex gap-2 justify-end">
                  <div className="h-5 w-16 rounded bg-zinc-900" />
                  <div className="h-5 w-14 rounded bg-zinc-900" />
                </div>

                <div className="space-y-2 pt-2">
                  <div className="h-2.5 w-full rounded bg-zinc-900" />
                  <div className="h-2.5 w-5/6 rounded bg-zinc-900 mr-0 ml-auto" />
                </div>

                {/* Price block */}
                <div className="border-t border-white/[0.03] pt-4 mt-2">
                  <div className="flex justify-between items-center">
                    <div className="h-4.5 w-24 rounded bg-gradient-to-l from-amber-gold/20 to-zinc-850" />
                    <div className="h-3 w-16 rounded bg-zinc-850" />
                  </div>
                  <div className="h-2.5 w-28 rounded bg-zinc-900 mt-2 mr-0 ml-auto" />

                  {/* Buttons line */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="h-9 rounded bg-zinc-900" />
                    <div className="h-9 rounded bg-[#221c13]/40 border border-amber-gold/5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/[0.04] rounded-2xl bg-zinc-950/20">
          <p className="text-zinc-500 text-sm">هیچ جواهری منطبق با معیارهای بارگذاری یافته یافت نشد.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, idx) => {
            const pricing = calculateGoldProductPrice(
              product.weight,
              goldPrice18k,
              product.makingFeePercent,
              product.basePrice
            );

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: Math.min(idx * 0.05, 0.45) }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.04] bg-zinc-950/40 hover:border-amber-gold/15 hover:bg-zinc-950/90 transition-all duration-300 shadow-xl"
              >
                {/* Visual Label Banner for Featured Item */}
                {product.id === 'ring-hero' && (
                  <div className="absolute top-3 right-3 z-20 rounded-full bg-amber-gold px-3 py-1 text-[9px] font-bold text-zinc-950 shadow-md">
                    محبوب‌ترین
                  </div>
                )}
                {product.model3dUrl && (
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-1 rounded-full border border-amber-gold/30 bg-zinc-950/80 px-2.5 py-1 text-[9px] font-bold text-amber-gold backdrop-blur-sm">
                    <Box className="h-3 w-3" />
                    <span>نمایش ۳D</span>
                  </div>
                )}

                {/* Card Top: Image Presentation */}
                <div 
                  onClick={() => onProductClick(product)}
                  className="aspect-[4/3] w-full overflow-hidden bg-zinc-900/40 relative cursor-pointer group-hover:opacity-90 transition-opacity"
                >
                  {product.model3dUrl ? (
                    <Jewellery3DViewer
                      modelUrl={product.model3dUrl}
                      className="h-full w-full"
                      autoRotate
                      interactive
                    />
                  ) : (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  {/* Action overlays on hover */}
                  <div className={`absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity ${product.model3dUrl ? 'pointer-events-none' : ''}`}>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onProductClick(product); }}
                      className="p-3 rounded-full bg-zinc-900 text-amber-gold hover:bg-amber-gold hover:text-zinc-950 transition-all cursor-pointer"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                      className="p-3 rounded-full bg-zinc-900 text-amber-gold hover:bg-amber-gold hover:text-zinc-950 transition-all cursor-pointer"
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Card Middle: Text Description & Spec tags */}
                <div className="p-6 text-right flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] text-amber-gold font-semibold uppercase tracking-wider">
                        {product.purity}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-gold stroke-none" />
                        <span className="text-[11px] font-semibold text-zinc-300 font-serif">{product.rating}</span>
                      </div>
                    </div>

                    <h3 
                      onClick={() => onProductClick(product)}
                      className="text-base font-bold text-zinc-100 mt-2 hover:text-amber-gold transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>

                    {/* Brief specifications tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <span className="text-[10px] text-zinc-400 bg-zinc-900/60 rounded-md px-2.5 py-1">
                        وزن: {formatGram(product.weight)}
                      </span>
                      <span className="text-[10px] text-zinc-400 bg-zinc-900/60 rounded-md px-2.5 py-1">
                        اجرت: {product.makingFeePercent}٪
                      </span>
                      {product.basePrice > 0 && (
                        <span className="text-[10px] text-cyan-400 bg-cyan-950/20 rounded-md px-2.5 py-1">
                          دارای سنگ نفیس
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-zinc-400 line-clamp-2 leading-6 mt-4">
                      {product.description}
                    </p>
                  </div>

                  {/* Pricing Box & Footer Actions */}
                  <div className="border-t border-white/[0.03] pt-4 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium text-zinc-500">قیمت تخمینی کل</span>
                      <span className="text-base font-extrabold text-amber-gold tracking-tight">
                        {formatToman(pricing.totalPrice)}
                      </span>
                    </div>

                    <p className="text-[9px] text-zinc-500 mt-1 text-left">
                      فاکتور طلا با ضمانت عیار ۷۵۰
                    </p>

                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <button
                        onClick={() => onProductClick(product)}
                        className="flex items-center justify-center gap-2 rounded-lg border border-white/[0.04] bg-zinc-900/30 px-3 py-2 text-xs font-semibold text-zinc-300 hover:text-white hover:border-amber-gold/25 transition-all duration-200 cursor-pointer"
                      >
                        <Info className="h-3.5 w-3.5" />
                        <span>مشخصات فنی</span>
                      </button>
                      <button
                        onClick={() => onAddToCart(product)}
                        className="flex items-center justify-center gap-2 rounded-lg bg-amber-gold/10 border border-amber-gold/20 text-amber-gold px-3 py-2 text-xs font-bold hover:bg-amber-gold hover:text-zinc-950 transition-all duration-300 cursor-pointer"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        <span>افزودن به سبد</span>
                      </button>
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
