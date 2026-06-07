/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, Sparkles, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onAiConsultantClick: () => void;
  onCategorySelect: (category: string) => void;
  onCalculatorClick: () => void;
}

export default function Navbar({
  cartCount,
  onCartClick,
  onAiConsultantClick,
  onCategorySelect,
  onCalculatorClick,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Scroll to section helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'صفحه اصلی', id: 'hero-section', action: () => scrollToSection('hero-section') },
    { label: 'محصولات', id: 'products-section', action: () => scrollToSection('products-section') },
    { label: 'انگشتر', category: 'ring', action: () => { onCategorySelect('ring'); scrollToSection('products-section'); } },
    { label: 'گردنبند', category: 'necklace', action: () => { onCategorySelect('necklace'); scrollToSection('products-section'); } },
    { label: 'گوشواره', category: 'earring', action: () => { onCategorySelect('earring'); scrollToSection('products-section'); } },
    { label: 'ماشین حساب طلا', id: 'calculator-section', action: onCalculatorClick },
    { label: 'مشاور همراه', id: 'ai-section', action: onAiConsultantClick },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#0c0c0d]/80 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* Left Side: Brand Logo */}
        <div 
          onClick={() => scrollToSection('hero-section')} 
          className="flex cursor-pointer items-center gap-3"
          id="branding-logo"
        >
          {/* Hexagonal Gold Crown Icon */}
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-amber-gold/40 bg-zinc-950/80 shadow-[0_0_15px_rgba(223,183,108,0.15)]">
            <span className="text-amber-gold font-serif text-lg font-bold">G</span>
            <div className="absolute inset-0 rounded-full border border-dotted border-amber-gold/20 animate-spin-slow" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serif text-lg font-bold tracking-[0.15em] text-white select-none">
              GOLDENOO
            </span>
            <span className="font-sans text-[8px] tracking-[0.4em] text-amber-gold/80 -mt-1 uppercase">
              Jewellery
            </span>
          </div>
        </div>

        {/* Center: Farsi Desktop Links */}
        <nav className="hidden lg:flex items-center gap-x-8">
          {navLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={link.action}
              className="font-sans text-[13px] font-medium text-zinc-400 hover:text-amber-gold transition-colors duration-200 relative py-1 cursor-pointer"
            >
              {link.label}
              {link.label === 'صفحه اصلی' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-gold rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Right Side: Action Icons */}
        <div className="flex items-center gap-4">
          {/* Live Price Calculator Quick Link */}
          <button 
            onClick={onCalculatorClick}
            className="hidden md:flex items-center gap-2 rounded-full border border-white/[0.06] bg-zinc-900/60 px-4 py-2 text-xs font-semibold text-zinc-300 hover:border-amber-gold/30 hover:text-amber-gold transition-all duration-200 cursor-pointer"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>محاسبه زنده قیمت طلا</span>
          </button>

          {/* AI Helper Quick Link */}
          <button 
            onClick={onAiConsultantClick}
            className="flex items-center justify-center p-2.5 rounded-full border border-white/[0.06] bg-zinc-900/40 text-amber-gold/90 hover:bg-amber-gold/10 hover:text-white transition-all cursor-pointer"
            title="مشاور هوش مصنوعی"
          >
            <Sparkles className="h-4 w-4 animate-pulse" />
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={onCartClick}
            className="relative flex items-center justify-center p-2.5 rounded-full text-zinc-300 hover:text-amber-gold transition-colors cursor-pointer"
            id="shopping-bag-icon"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-gold text-[10px] font-bold text-zinc-950 font-serif shadow-lg shadow-amber-gold/20">
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger Menu on Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden items-center justify-center p-2.5 text-zinc-300 hover:text-amber-gold cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dynamic Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-white/[0.06] bg-[#0c0c0d] overflow-hidden"
          >
            <div className="space-y-1.5 px-6 py-5 text-right flex flex-col">
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={link.action}
                  className="block w-full py-2.5 text-sm font-medium text-zinc-400 hover:text-amber-gold text-right border-b border-white/[0.03] transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => { onCalculatorClick(); setMobileMenuOpen(false); }}
                className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-amber-gold px-4 py-3 text-sm font-bold text-zinc-950 hover:bg-white"
              >
                <span>ماشین حساب و قیمت لحظه‌ای طلا</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
