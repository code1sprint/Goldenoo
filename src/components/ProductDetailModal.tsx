/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Star, Calendar, MessageCircleCode, Sparkles, Box } from 'lucide-react';
import { Product } from '../types';
import { calculateGoldProductPrice, formatToman, formatGram } from './ProductsList';
import Jewellery3DViewer from './Jewellery3DViewer';

interface ProductDetailModalProps {
  product: Product | null;
  goldPrice18k: number;
  onClose: () => void;
  onAddToCart: (product: Product, size?: string, engraving?: string) => void;
}

export default function ProductDetailModal({
  product,
  goldPrice18k,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[1] : '');
  const [engravingText, setEngravingText] = useState('');

  const pricing = calculateGoldProductPrice(
    product.weight,
    goldPrice18k,
    product.makingFeePercent,
    product.basePrice
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      
      {/* Blurred Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Deluxe Modal Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-4xl rounded-2xl border border-white/[0.06] bg-[#0c0c0d] p-6 md:p-8 shadow-2xl text-right overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-8 my-8"
      >
        
        {/* Close Button top-left in RTL */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full border border-white/[0.04] bg-zinc-900/60 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Decorative Gold Elements */}
        <div className="absolute top-0 right-0 h-1.5 w-full bg-gradient-to-l from-amber-gold to-gold-600" />

        {/* Product Image Column - Left on Farsi (RTL) but let's place on right for premium layout */}
        <div className="md:col-span-5 flex flex-col justify-between h-full order-1 md:order-2">
          <div className="rounded-xl overflow-hidden border border-white/[0.04] bg-zinc-950/40 aspect-square relative">
            {product.model3dUrl ? (
              <>
                <Jewellery3DViewer
                  modelUrl={product.model3dUrl}
                  className="h-full w-full"
                  autoRotate
                  interactive
                />
                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full border border-amber-gold/30 bg-zinc-950/80 px-2.5 py-1 text-[10px] font-bold text-amber-gold backdrop-blur-sm">
                  <Box className="h-3.5 w-3.5" />
                  <span>مدل سه‌بعدی تعاملی</span>
                </div>
              </>
            ) : (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            )}
          </div>

          {/* Quick specs box under image */}
          <div className="mt-4 p-4 rounded-xl border border-amber-gold/10 bg-amber-gold/5 text-xs text-amber-gold flex items-center gap-2">
            <Sparkles className="h-4 w-4 flex-shrink-0 animate-pulse" />
            <p className="leading-6">
              کلیه محصولات گالری گلدنو با فاکتور معتبر ممهور شده و کتباً دارای تضمین خلوص طلا ۱۸ عیار هستند.
            </p>
          </div>
        </div>

        {/* Details & Interactive Column - Left side on RTL */}
        <div className="md:col-span-7 flex flex-col justify-between order-2 md:order-1 select-none">
          <div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-amber-gold bg-[#221c13] px-3 py-1 rounded-full border border-amber-gold/10">
                {product.purity}
              </span>
              <div className="flex items-center gap-1 text-xs font-semibold text-zinc-300">
                <Star className="h-3.5 w-3.5 fill-amber-gold stroke-none" />
                <span>{product.rating}</span>
                <span className="text-zinc-500 font-sans">({product.reviewsCount} نظر)</span>
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-extrabold text-white mt-4">{product.name}</h2>
            
            <p className="text-xs text-zinc-400 leading-7 mt-3">
              {product.description}
            </p>

            {/* Specifications Details Table */}
            <h3 className="text-xs font-bold text-zinc-300 mt-6 mb-3">مشخصات فنی قطعه جواهر</h3>
            <div className="border border-white/[0.03] rounded-xl overflow-hidden text-xs">
              
              <div className="grid grid-cols-2 bg-zinc-900/40 p-3 border-b border-white/[0.02]">
                <span className="text-zinc-500">وزن دقیق طلا</span>
                <span className="font-serif text-zinc-200 font-medium">{formatGram(product.weight)}</span>
              </div>

              <div className="grid grid-cols-2 p-3 border-b border-white/[0.02]">
                <span className="text-zinc-500">نوع سنگ و مگوئی</span>
                <span className="text-zinc-200 font-semibold">{product.gemstone}</span>
              </div>

              <div className="grid grid-cols-2 bg-zinc-900/40 p-3 border-b border-white/[0.02]">
                <span className="text-zinc-500">درصد اجرت تولید</span>
                <span className="font-serif text-zinc-200 font-medium">{product.makingFeePercent} درصد</span>
              </div>

              <div className="grid grid-cols-2 p-3">
                <span className="text-zinc-500">نوع فلز پایه</span>
                <span className="text-zinc-200">طلای ۷۵۰ (بر اساس استانداردهای متالوژی ایران)</span>
              </div>

            </div>

            {/* Dynamic Options for Customization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {/* Sizing selection */}
              {product.sizes && (
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-2">سایز طلا (انگشتری)</label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.06] bg-zinc-900 px-4 py-3 text-xs text-zinc-200 focus:border-amber-gold/30 focus:outline-none transition-all"
                  >
                    {product.sizes.map(size => (
                      <option key={size} value={size}>سایز ملی {size}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Laser Engraving text option! Extravagant feature! */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-2">حکاکی اختصاصی داخل طلا (رایگان)</label>
                <input
                  type="text"
                  placeholder="مثال: تاریخ پیوند، نام همسر..."
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  maxLength={25}
                  className="w-full rounded-xl border border-white/[0.06] bg-zinc-900 px-4 py-3 text-xs text-zinc-200 placeholder-zinc-600 focus:border-amber-gold/30 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Calculation details inside Modal */}
            <div className="mt-6 border-t border-white/[0.06] pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-zinc-300 block">فاکتور تخمینی نهایی</span>
                  <span className="text-[10px] text-zinc-500 font-sans mt-1 block">شامل مالیات بر ارزش افزوده و سود اصناف</span>
                </div>
                <div className="text-left">
                  <span className="text-xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-l from-amber-gold to-white">
                    {formatToman(pricing.totalPrice)}
                  </span>
                  <span className="text-[10px] text-zinc-400 block mt-1">با احتساب قیمت گرم زنده</span>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <button
              onClick={onClose}
              className="rounded-xl border border-white/[0.04] bg-zinc-900/30 py-3.5 text-xs font-semibold text-zinc-400 hover:text-white hover:border-white/[0.15] transition-all cursor-pointer"
            >
              بازگشت به ویترین
            </button>
            <button
              onClick={() => {
                onAddToCart(product, selectedSize, engravingText);
                onClose();
              }}
              className="rounded-xl bg-amber-gold py-3.5 text-xs font-bold text-zinc-950 hover:bg-white shadow-lg shadow-amber-gold/10 transition-all cursor-pointer"
            >
              افزودن به سبد خرید
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
