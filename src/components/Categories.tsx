/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Circle, Link as LinkIcon, Gift, HelpCircle, Sparkles, Coins, Layers } from 'lucide-react';

interface CategoriesProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export default function Categories({ selectedCategory, onCategorySelect }: CategoriesProps) {
  
  // Categories matching the image bar perfectly in structure
  const categoryItems = [
    { id: 'all', label: 'همه محصولات', icon: <Layers className="h-5 w-5" /> },
    { id: 'ring', label: 'انگشتر', icon: <Circle className="h-5 w-5" /> },
    { id: 'bracelet', label: 'دستبند', icon: <LinkIcon className="h-5 w-5" /> },
    { id: 'necklace', label: 'گردنبند', icon: <Gift className="h-5 w-5" /> },
    { id: 'earring', label: 'گوشواره', icon: <Sparkles className="h-5 w-5" /> },
    { id: 'set', label: 'ست ها', icon: <Layers className="h-5 w-5" /> },
    { id: 'coin', label: 'سکه و شمش', icon: <Coins className="h-5 w-5" /> },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 35, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 45 }}
      className="mx-auto max-w-7xl px-6 lg:px-8 mt-12 mb-16"
    >
      {/* Floating Category Slider Container resembling the image bottom panel */}
      <div className="rounded-2xl border border-white/[0.05] bg-zinc-950/60 p-4 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-md">
        
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {categoryItems.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategorySelect(cat.id)}
                className={`group flex items-center gap-3 rounded-xl px-5 py-3.5 text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-amber-gold text-zinc-950 shadow-[0_0_20px_rgba(223,183,108,0.25)]'
                    : 'bg-zinc-900/40 text-zinc-400 border border-white/[0.02] hover:bg-zinc-900/80 hover:text-white hover:border-amber-gold/20'
                }`}
              >
                {/* Micro animation wrapper for icons */}
                <div className={`transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? 'text-zinc-950' : 'text-amber-gold'
                }`}>
                  {cat.icon}
                </div>
                <span className="font-sans font-medium">{cat.label}</span>
              </button>
            );
          })}
        </div>
        
      </div>
    </motion.div>
  );
}
