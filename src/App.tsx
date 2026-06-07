/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Heart, 
  ShieldCheck, 
  Award, 
  Gift, 
  ArrowUp,
  MessageCircleQuestion,
  Gem,
  CheckCircle2
} from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ProductsList, { formatToman } from './components/ProductsList';
import GoldCalculator from './components/GoldCalculator';
import AiConsultant from './components/AiConsultant';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import AtelierSection from './components/AtelierSection';

import { products } from './data/products';
import { CartItem, Product } from './types';

export default function App() {
  const [goldPrice18k, setGoldPrice18k] = useState(3485000); // base price-tag backup
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  
  // Navigation states
  const [cartOpen, setCartOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  // Initial load simulation for stunning skeletal placeholders feedback
  useEffect(() => {
    const loaderTimer = setTimeout(() => {
      setInitialLoading(false);
    }, 1400);
    return () => clearTimeout(loaderTimer);
  }, []);

  // Live gold ticker fetch interval
  useEffect(() => {
    const fetchGoldRate = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}api/gold-price`);
        if (response.ok) {
          const data = await response.json();
          setGoldPrice18k(data.price18k);
        }
      } catch (err) {
        console.warn('Fallback gold rate generated locally.');
        setGoldPrice18k((prev) => Math.round(prev + (Math.random() - 0.48) * 900));
      }
    };

    fetchGoldRate();
    const interval = setInterval(fetchGoldRate, 14000);
    return () => clearInterval(interval);
  }, []);

  // Shopping Cart Actions
  const handleAddToCart = (product: Product, size?: string, engraving?: string) => {
    // Unique ID incorporate item specifics
    const cartItemId = `${product.id}-${size || ''}-${engraving || ''}`;
    
    setCartItems((prevItems) => {
      const existsIndex = prevItems.findIndex((item) => item.id === cartItemId);
      if (existsIndex > -1) {
        const newItems = [...prevItems];
        newItems[existsIndex].quantity += 1;
        return newItems;
      } else {
        return [...prevItems, { id: cartItemId, product, quantity: 1, selectedSize: size, engraving }];
      }
    });

    // Toggle cart drawer after item addition
    setCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, nextQty: number) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === cartItemId) {
          return { ...item, quantity: nextQty };
        }
        return item;
      });
    });
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Scroll to products action from hero explore button
  const handleExploreShow = () => {
    const productEl = document.getElementById('products-section');
    if (productEl) {
      productEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Total amount in cart computed
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Testimonials lists
  const reviews = [
    {
      name: 'مهندس سمیرا راد',
      title: 'خریدار انگشتر سلطنتی',
      comment: 'نگین الماس و ابهت این انگشتر گلدنو توی دستم برای مراسم سالگرد ازدواج عالی و خیره‌کننده بود. بسته‌بندی فلزی ضدسرقت و پلاک معتبرش فوق‌الحاده اطمینان‌بخش بود.',
      stars: 5,
    },
    {
      name: 'پیمان یزدانی',
      title: 'خریدار زنجیر کارتیر و سکه امامی',
      comment: 'واقعاً از ماشین حساب هوشمند گلدنو شگفت‌زده شدم. فرمول معافیت مالیاتی طلا و محاسبه شفاف فاکتور دقیقاً به نرخ روز گرم طلا، اعتماد من رو جلب کرد و خیلی زود هم تحویل گرفتم.',
      stars: 5,
    },
    {
      name: 'دکتر مانا خلعتبری',
      title: 'خریدار دستبند طنابی ون‌کلیف',
      comment: 'صدای مشاور هوش مصنوعی گلدنو به من برای پوست نسبتاً تیره‌ام طلای رزگلد رو پیشنهاد داد و باید بگم کاملاً درست و عالی ارزیابی کردند! بسیار لوکس و با سلیقه تولید شده.',
      stars: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0c0c0d] text-zinc-100 flex flex-col justify-between selection:bg-amber-gold selection:text-zinc-950 font-sans">
      
      {/* Dynamic Promotion Header Banner */}
      <div className="bg-gradient-to-l from-[#1f1d18] via-[#0f0e0b] to-[#1f1d18] py-2 px-6 border-b border-amber-gold/5 text-center select-none">
        <div className="mx-auto max-w-7xl flex items-center justify-between text-[11px] text-zinc-400">
          <div className="hidden sm:flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>نرخ زنده طلای ۱۸ عیار:</span>
            <span className="font-serif text-amber-gold font-bold">{formatToman(goldPrice18k)}</span>
          </div>

          <p className="font-medium text-amber-gold/90 flex items-center gap-1.5 justify-center w-full sm:w-auto">
            <Sparkles className="h-3 w-3 animate-spin-slow" />
            <span>آفر خرید اول: حکاکی رایگان لیزری متون باستانی روی طلا</span>
          </p>

          <div className="hidden lg:flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-gold" />
            <span>اتصال پستی بیمه‌شده سراسر ایران</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onCartClick={() => setCartOpen(true)}
        onAiConsultantClick={() => setAiOpen(true)}
        onCategorySelect={setSelectedCategory}
        onCalculatorClick={() => {
          const calcEl = document.getElementById('calculator-section');
          if (calcEl) calcEl.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main className="flex-1">
        {/* Real image header exact replica from user screenshot */}
        <Hero onExploreClick={handleExploreShow} />

        {/* Dynamic Interactive Categories selection */}
        <Categories
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {/* Dynamic Gold Price Interactive Calculator widget */}
        <GoldCalculator goldPrice18k={goldPrice18k} />

        {/* Core Products Grid Showcase */}
        <ProductsList
          products={products}
          selectedCategory={selectedCategory}
          goldPrice18k={goldPrice18k}
          onProductClick={setActiveProductDetail}
          onAddToCart={(product) => handleAddToCart(product)}
          isLoading={initialLoading}
        />

        {/* 3D Atelier Custom Design Workshop Craftsmanship Showcase */}
        <AtelierSection />

        {/* Exquisite Bento Craftsmen testimonial panel */}
        <section className="mx-auto max-w-7xl px-6 lg:px-8 py-16 bg-[#0c0c0d]">
          <div className="border-t border-white/[0.04] pt-16">
            
            {/* Viewport parallax reveal header */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-white">
                روایت‌های زیبایی از همراهان تالار گلدنو
              </h2>
              <p className="text-zinc-500 text-xs mt-3 leading-6">
                خریداران طلا و برلیان از ارمغان درخشان گالری گلدنو و فاکتور کتبی تضمین اصالت ما می‌گویند.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {initialLoading ? (
                [...Array(3)].map((_, index) => (
                  <div 
                    key={`review-skeleton-${index}`}
                    className="rounded-xl border border-white/[0.02] bg-zinc-950/20 p-6 flex flex-col justify-between text-right animate-pulse space-y-6"
                  >
                    <div>
                      {/* Premium rating spark stars placeholders */}
                      <div className="flex gap-1 mb-4 justify-start">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="h-2.5 w-2.5 rounded-full bg-amber-gold/10" />
                        ))}
                      </div>
                      
                      {/* Review text line blocks */}
                      <div className="space-y-2">
                        <div className="h-2.5 w-full rounded bg-zinc-900" />
                        <div className="h-2.5 w-11/12 rounded bg-zinc-900 mr-0 ml-auto" />
                        <div className="h-2.5 w-4/5 rounded bg-zinc-900 mr-0 ml-auto" />
                      </div>
                    </div>
                    
                    {/* User info row skeleton */}
                    <div className="border-t border-white/[0.03] pt-4 flex items-center justify-between">
                      <div className="text-right space-y-2">
                        <div className="h-3 w-20 rounded bg-zinc-800 mr-0 ml-auto" />
                        <div className="h-2.5 w-28 rounded bg-zinc-900 mr-0 ml-auto" />
                      </div>
                      <div className="h-8 w-8 rounded-full bg-zinc-900 flex-shrink-0" />
                    </div>
                  </div>
                ))
              ) : (
                reviews.map((rev, index) => (
                  <div 
                    key={index}
                    className="rounded-xl border border-white/[0.03] bg-zinc-950/40 p-6 flex flex-col justify-between text-right hover:bg-zinc-950/80 hover:border-amber-gold/10 transition-all duration-300"
                  >
                    <div>
                      <div className="flex gap-1 mb-4 text-amber-gold justify-start">
                        {[...Array(rev.stars)].map((_, i) => (
                          <span key={i} className="text-sm">★</span>
                        ))}
                      </div>
                      <p className="text-xs text-zinc-400 leading-7 font-sans mb-4">"{rev.comment}"</p>
                    </div>
                    
                    <div className="border-t border-white/[0.03] pt-4 flex items-center justify-between">
                      <div className="text-right">
                        <h4 className="text-xs font-bold text-zinc-100">{rev.name}</h4>
                        <p className="text-[10px] text-zinc-500 mt-1">{rev.title}</p>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-amber-gold/5 border border-amber-gold/10 flex items-center justify-center text-amber-gold text-[10px] font-bold">
                        G
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* AI Callout Banner */}
            <div className="mt-16 rounded-2xl border border-amber-gold/10 bg-gradient-to-l from-amber-gold/[0.02] via-[#0d0d0f] to-amber-gold/[0.02] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-gold/5 px-3 py-1 text-[10px] text-amber-gold font-bold mb-3 border border-amber-gold/15">
                  <Sparkles className="h-3 w-3 animate-pulse" />
                  دستیار هوشمند ۲۴ ساعته خرید طلا
                </span>
                <h3 className="text-lg font-bold text-white">تردید در انتخاب عیار یا وزن مناسب کادو دارید؟</h3>
                <p className="text-xs text-zinc-500 mt-2 leading-6 max-w-xl">
                  مشاور هوش مصنوعی گلدنو به صورت زنده، با پاسخ‌دهی به سوالات رنگ پوست، سلیقه و فرمول اصناف، همکار مطمئن شما برای یک خرید باشکوه طلا خواهد بود.
                </p>
              </div>

              <button
                onClick={() => setAiOpen(true)}
                className="mt-4 md:mt-0 px-6 py-3.5 rounded-xl border border-amber-gold bg-amber-gold text-zinc-950 text-xs font-black hover:bg-white transition-all cursor-pointer shadow-lg shadow-amber-gold/10"
              >
                مکالمه با هوش مصنوعی گلدنو
              </button>
            </div>

          </div>
        </section>
      </main>

      {/* Deluxe Footer with information elements */}
      <footer className="border-t border-white/[0.04] bg-zinc-950 py-16 text-xs text-zinc-500 font-sans select-none">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 text-right">
          
          {/* Logo brand column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-gold/40 text-amber-gold font-serif text-sm font-bold">
                G
              </div>
              <span className="font-serif text-sm font-bold tracking-[0.1em] text-white">GOLDENOO JEWELLERY</span>
            </div>
            <p className="leading-6 text-zinc-500 text-[11px] mt-2">
              گالری گلدنو به عنوان پیشرو در ارایه مدل‌های نوین جواهرات و تلفیق فناوری با هنرهای اصیل، تجربه‌ای بی‌مانند از امنیت، درخشش و شفافیت را برای خریداران رقم می‌زند.
            </p>
          </div>

          {/* Links Column */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-wide">پیوندهای گلدنو</h4>
            <ul className="space-y-2.5 text-[11px]">
              <li><button onClick={() => setSelectedCategory('all')} className="hover:text-amber-gold transition-colors block text-right">ویترین محصولات طلا</button></li>
              <li><button onClick={() => setSelectedCategory('ring')} className="hover:text-amber-gold transition-colors block text-right">حلقه‌های نامزدی و الماس</button></li>
              <li><button onClick={() => setSelectedCategory('coin')} className="hover:text-amber-gold transition-colors block text-right">سکه تمام آزادی و شمش سرمایه</button></li>
              <li><button onClick={() => setAiOpen(true)} className="hover:text-amber-gold transition-colors block text-right">مشورت آنلاین هوش مصنوعی</button></li>
            </ul>
          </div>

          {/* Guidelines info */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs">قوانین و ضمانت‌ها</h4>
            <p className="leading-6 text-zinc-500 text-[11px]">
              کلیه محموله‌های گلدنو به صورت ۱۰۰٪ بیمه‌نامه مرسولات قیمت‌های گرانبها تا سقف ارزش پستی ارسال می‌شوند. خرید کالا به صورت صدور فاکتور با گارانتی کتبی عیار ۷۵۰ صنف زرگر ثبت و تقدیم می‌گردد.
            </p>
          </div>

          {/* Contacts col */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs">ارتباط با گالری گلدنو</h4>
            <ul className="space-y-3 text-[11px]">
              <li className="flex items-center gap-2 justify-end">
                <span>تلفن گالری: ۰۲۱-۱۲۳۴۵۶۷۸</span>
                <Phone className="h-3.5 w-3.5 text-amber-gold flex-shrink-0" />
              </li>
              <li className="flex items-center gap-2 justify-end">
                <span>تهران، خیابان فرشته، پلاک ۱۸ گالری گلدنو</span>
                <MapPin className="h-3.5 w-3.5 text-amber-gold flex-shrink-0" />
              </li>
              <li className="flex items-center gap-2 justify-end">
                <span>info@goldenoo.jewelry</span>
                <Mail className="h-3.5 w-3.5 text-amber-gold flex-shrink-0" />
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright notice */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 border-t border-white/[0.04] mt-12 pt-8 text-center text-[10px] text-zinc-600 font-serif flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} GOLDENOO JEWELLERY. ALL RIGHTS RESERVED.</p>
          <p className="font-sans">طراحی انحصاری طبق استایل اصیل گلدنو با عشق و درخشش خاص.</p>
        </div>
      </footer>

      {/* Floating AI Consultant trigger for convenient access */}
      <div className="fixed bottom-6 left-6 z-40 select-none">
        <button
          onClick={() => setAiOpen(true)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-amber-gold to-gold-500 text-zinc-950 shadow-xl shadow-amber-gold/15 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          title="مشاور هوش مصنوعی گلدنو"
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            <MessageCircleQuestion className="h-6 w-6" />
          </motion.div>
        </button>
      </div>

      {/* Slideout shopping cart drawer */}
      <AnimatePresence>
        {cartOpen && (
          <CartDrawer
            isOpen={cartOpen}
            cartItems={cartItems}
            goldPrice18k={goldPrice18k}
            onClose={() => setCartOpen(false)}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
          />
        )}
      </AnimatePresence>

      {/* floating AI Consultant Conversation Modal overlay */}
      <AnimatePresence>
        {aiOpen && (
          <AiConsultant
            isOpen={aiOpen}
            onClose={() => setAiOpen(false)}
            goldPrice18k={goldPrice18k}
          />
        )}
      </AnimatePresence>

      {/* Product Detail Popup Overlay */}
      <AnimatePresence>
        {activeProductDetail && (
          <ProductDetailModal
            product={activeProductDetail}
            goldPrice18k={goldPrice18k}
            onClose={() => setActiveProductDetail(null)}
            onAddToCart={(product, size, engraving) => handleAddToCart(product, size, engraving)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
