/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShieldCheck, Heart, Sparkles, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { formatToman, calculateGoldProductPrice } from './ProductsList';

interface CartDrawerProps {
  isOpen: boolean;
  cartItems: CartItem[];
  goldPrice18k: number;
  onClose: () => void;
  onUpdateQuantity: (id: string, q: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  cartItems,
  goldPrice18k,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'loading' | 'success'>('cart');
  const [shippingAddress, setShippingAddress] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  if (!isOpen) return null;

  // Let's sum prices using live gold cost
  let totalRawGold = 0;
  let totalMakingFee = 0;
  let totalProfit = 0;
  let totalTax = 0;
  let totalGemstone = 0;
  let grandTotal = 0;

  cartItems.forEach((item) => {
    const pricing = calculateGoldProductPrice(
      item.product.weight,
      goldPrice18k,
      item.product.makingFeePercent,
      item.product.basePrice
    );
    totalRawGold += pricing.rawGoldPrice * item.quantity;
    totalMakingFee += pricing.makingFee * item.quantity;
    totalProfit += pricing.galleryProfit * item.quantity;
    totalTax += pricing.tax * item.quantity;
    totalGemstone += item.product.basePrice * item.quantity;
    grandTotal += pricing.totalPrice * item.quantity;
  });

  // Simulated Order Code
  const mockOrderNumber = 'G-' + Math.floor(Math.random() * 90000 + 10000);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber || !shippingAddress) {
      alert('بخش‌های مشخصات خریدار و نشانی پستی ارسالی را تکمیل فرمایید.');
      return;
    }
    setCheckoutStep('loading');
    setTimeout(() => {
      setCheckoutStep('success');
    }, 2000);
  };

  const handleCloseSuccess = () => {
    onClearCart();
    setCheckoutStep('cart');
    setFullName('');
    setPhoneNumber('');
    setShippingAddress('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans select-none">
      
      {/* Blurred overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={checkoutStep === 'success' ? handleCloseSuccess : onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Slideout body */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-screen max-w-md bg-[#0c0c0d] border-r border-white/[0.06] shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/[0.04] flex items-center justify-between text-right">
            <button
              onClick={checkoutStep === 'success' ? handleCloseSuccess : onClose}
              className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-base font-bold text-white">سبد خرید طلا و جواهرات</h2>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto p-6 text-right">
            <AnimatePresence mode="wait">
              
              {/* CART ITEMS STEP */}
              {checkoutStep === 'cart' && (
                <motion.div
                  key="cart"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {cartItems.length === 0 ? (
                    <div className="text-center py-24 flex flex-col items-center justify-center">
                      <ShoppingBag className="h-12 w-12 text-zinc-600 mb-4 animate-bounce" />
                      <p className="text-sm font-semibold text-zinc-400">سبد خرید شما موقتاً خالی است.</p>
                      <p className="text-xs text-zinc-600 mt-2 max-w-xs leading-5">
                        با مراجعه به ویترین گالری، طلا و جواهرات باارزش مورد نظر خود را پس از انتخاب سایز به سبد اضافه نمایید.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-zinc-500">اقلام انتخابی</span>
                        <button 
                          onClick={onClearCart} 
                          className="text-xs text-rose-400 hover:text-rose-300 font-medium cursor-pointer"
                        >
                          خالی کردن کل سبد
                        </button>
                      </div>

                      {/* Items loop */}
                      <div className="divide-y divide-white/[0.03]">
                        {cartItems.map((item) => {
                          const itemPricing = calculateGoldProductPrice(
                            item.product.weight,
                            goldPrice18k,
                            item.product.makingFeePercent,
                            item.product.basePrice
                          );

                          return (
                            <div key={item.id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                              <img
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                className="h-16 w-16 rounded-lg object-cover border border-white/[0.04]"
                                referrerPolicy="no-referrer"
                              />

                              <div className="flex-1 flex flex-col justify-between text-right">
                                <div>
                                  <h4 className="text-xs font-bold text-zinc-200">{item.product.name}</h4>
                                  
                                  {/* Custom specs chosen */}
                                  <div className="flex flex-wrap gap-2 mt-1.5 text-[9px] text-zinc-500">
                                    <span>وزن: {item.product.weight}g</span>
                                    {item.selectedSize && <span>सایز: {item.selectedSize}</span>}
                                    {item.engraving && (
                                      <span className="text-amber-gold border border-amber-gold/15 bg-amber-gold/5 px-1.5 py-0.5 rounded-sm">
                                        حکاکی: "{item.engraving}"
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center justify-between mt-3">
                                  {/* Amount Toggles */}
                                  <div className="flex items-center gap-2 rounded-lg bg-zinc-900 border border-white/[0.03] p-1">
                                    <button 
                                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                      className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                                    >
                                      <Plus className="h-3 w-3" />
                                    </button>
                                    <span className="font-serif text-[11px] font-bold text-white px-2">
                                      {item.quantity}
                                    </span>
                                    <button 
                                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                      className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                                    >
                                      <Minus className="h-3 w-3" />
                                    </button>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold font-serif text-amber-gold">
                                      {formatToman(itemPricing.totalPrice * item.quantity)}
                                    </span>
                                    <button 
                                      onClick={() => onRemoveItem(item.id)}
                                      className="text-zinc-600 hover:text-rose-400 cursor-pointer"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Checkout Information Form */}
                      <div className="border-t border-white/[0.04] pt-6 mt-6">
                        <h3 className="text-xs font-bold text-white mb-4">نشانی و مشخصات خریدار (شبیه‌ساز ارسالی)</h3>
                        <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                          <div>
                            <label className="block text-[10px] text-zinc-400 mb-1.5">نام و نام خانوادگی تحویل‌گیرنده</label>
                            <input
                              type="text"
                              required
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="مثال: علی سلیمانی"
                              className="w-full rounded-lg border border-white/[0.06] bg-zinc-900 px-3 py-2 text-xs text-zinc-200 text-right focus:border-amber-gold/30 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-zinc-400 mb-1.5">شماره همراه تماس</label>
                            <input
                              type="tel"
                              required
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                              className="w-full rounded-lg border border-white/[0.06] bg-zinc-900 px-3 py-2 text-xs text-zinc-200 text-right focus:border-amber-gold/30 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-zinc-400 mb-1.5">آدرس پستی جهت ارسال همراه با بیمه کالا</label>
                            <textarea
                              required
                              value={shippingAddress}
                              onChange={(e) => setShippingAddress(e.target.value)}
                              placeholder="مثال: تهران، پاسداران، کوچه بهار، پلاک ۲ واحد ۴"
                              rows={2}
                              className="w-full rounded-lg border border-white/[0.06] bg-zinc-900 px-3 py-2 text-xs text-zinc-200 text-right focus:border-amber-gold/30 focus:outline-none resize-none"
                            />
                          </div>

                          {/* Submit checkout buttons */}
                          <div className="pt-2">
                            <button
                              type="submit"
                              className="w-full rounded-xl bg-gradient-to-r from-amber-gold to-gold-400 py-3.5 text-xs font-black text-zinc-950 hover:from-white hover:to-white hover:shadow-lg hover:shadow-white/5 transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-gold/5"
                            >
                              <ShieldCheck className="h-4 w-4" />
                              <span>پرداخت امن و ثبت نهایی سفارش طلا</span>
                            </button>
                          </div>
                        </form>
                      </div>

                    </div>
                  )}
                </motion.div>
              )}

              {/* LOADING STEP */}
              {checkoutStep === 'loading' && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-36 text-center"
                >
                  <div className="relative h-14 w-14 animate-spin rounded-full border-4 border-zinc-800 border-t-amber-gold" />
                  <p className="text-sm font-semibold text-zinc-300 mt-6">درحال صدور فاکتور و تخصیص قطعات ممهور...</p>
                  <p className="text-xs text-zinc-500 mt-2">سند اصالت طلای ۱۸ عیار از صنف دریافت و بسته‌بندی پستی بیمه‌شده آغاز می‌شود.</p>
                </motion.div>
              )}

              {/* SUCCESS ANIMATION STEP */}
              {checkoutStep === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-16"
                >
                  {/* Rotating Medal decoration */}
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-amber-gold/10 border border-amber-gold animate-bounce">
                    <Sparkles className="h-10 w-10 text-amber-gold" />
                  </div>

                  <h3 className="text-lg font-black text-white mt-6">فاکتور صادر و سفارش ثبت شد!</h3>
                  <p className="text-xs text-emerald-500 font-bold mt-2">شماره ارجاع رسمی: {mockOrderNumber}</p>

                  <div className="mt-8 p-5 rounded-xl bg-zinc-900/60 border border-white/[0.04] text-xs text-right space-y-3.5 w-full">
                    <div className="flex justify-between border-b border-white/[0.03] pb-2 text-zinc-400">
                      <span>خریدار محترم:</span>
                      <span className="text-white font-bold">{fullName}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/[0.03] pb-2 text-zinc-400">
                      <span>تلفن تماس:</span>
                      <span className="text-white font-serif">{phoneNumber}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/[0.03] pb-2 text-zinc-400">
                      <span>مبلغ کل پرداختی:</span>
                      <span className="text-amber-gold font-bold font-serif">{formatToman(grandTotal)}</span>
                    </div>

                    <div className="text-zinc-500 text-[10px] leading-5">
                      <span>آدرس مقصد: {shippingAddress}</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-zinc-500 leading-5 mt-6 px-4">
                    بسته‌بندی ویژه و مهر و موم فلزی، تحویل پست پیشتاز گردیده و ظرف ۲ الی ۳ روز کاری همراه با کارت واگذاری بیمه‌نامه کارآفرین به نشانی ارسال می‌گردد. از انتخاب گلدنو سپاسگزاریم.
                  </p>

                  <button
                    onClick={handleCloseSuccess}
                    className="mt-8 w-full rounded-xl bg-zinc-100 py-3 text-xs font-bold text-zinc-950 hover:bg-amber-gold transition-colors cursor-pointer"
                  >
                    بستن فاکتور و بازگشت به گالری
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Checkout Footer Breakdown summary (only shown in Cart step) */}
          {checkoutStep === 'cart' && cartItems.length > 0 && (
            <div className="p-6 border-t border-white/[0.04] bg-zinc-950/60 text-right space-y-3 text-xs select-none">
              <div className="flex justify-between text-zinc-500">
                <span>پایه طلای خام (قیمت گرم روز):</span>
                <span className="font-serif text-white">{formatToman(totalRawGold)}</span>
              </div>
              
              <div className="flex justify-between text-zinc-500">
                <span>کمییسیون و سود گالری:</span>
                <span className="font-serif text-white">{formatToman(totalProfit)}</span>
              </div>

              {totalGemstone > 0 && (
                <div className="flex justify-between text-cyan-400">
                  <span>سهم سنگ‌های گرانبها / برلیان:</span>
                  <span className="font-serif">{formatToman(totalGemstone)}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-amber-gold pt-3 border-t border-white/[0.04] text-sm font-bold">
                <span>جمع کل پرداختی فاکتور:</span>
                <span className="font-serif text-base text-transparent bg-clip-text bg-gradient-to-l from-amber-gold to-white">{formatToman(grandTotal)}</span>
              </div>
            </div>
          )}

        </motion.div>
      </div>

    </div>
  );
}
