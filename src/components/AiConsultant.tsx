/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Sparkles, Send, X, Bot, User, CornerDownLeft } from 'lucide-react';
import { Message } from '../types';

interface AiConsultantProps {
  isOpen: boolean;
  onClose: () => void;
  goldPrice18k: number;
}

export default function AiConsultant({ isOpen, onClose, goldPrice18k }: AiConsultantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'gemini',
      text: 'درود بر شما! من مشاور هوشمند گالری گلدنو هستم. آماده‌ام تا شما را در پیدا کردن باشکوه‌ترین طلا و جواهرات بر اساس بودجه، رنگ پوست، مدل کادویی یا تصمیمات سرمایه‌گذاری راهنمایی کنم. چه مایلید بدانید؟',
      timestamp: new Date().toLocaleTimeString('fa-IR'),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Luxury quick questions
  const suggestions = [
    'برای هدیه سالگرد ازدواج تا ۷۰ میلیون پیشنهاد بده.',
    'فرمول محاسبه سود و مالیات طلا فروشی چطوره؟',
    'برای پوست گندمی، طلای زرد بهتره یا رزگلد؟',
    'سکه امامی برای سرمایه‌گذاری بهتره یا زیورآلات؟'
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: String(Date.now()),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('fa-IR'),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await response.json();
      
      const geminiMsg: Message = {
        id: String(Date.now() + 1),
        sender: 'gemini',
        text: data.text || 'متاسفانه در حال حاضر پاسخی دریافت نشد. لطفاً بعداً تلاش فرمایید.',
        timestamp: new Date().toLocaleTimeString('fa-IR'),
      };

      setMessages((prev) => [...prev, geminiMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: String(Date.now() + 2),
        sender: 'gemini',
        text: 'خطایی در شبکه رخ داده است. مشاورین حضوری گالری گلدنو همواره آماده پاسخگویی تلفنی به شما هستند.',
        timestamp: new Date().toLocaleTimeString('fa-IR'),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const speakPreset = (suggestText: string) => {
    handleSendMessage(suggestText);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Main Luxury Conversation Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full max-w-2xl rounded-2xl border border-white/[0.06] bg-[#0c0c0d] overflow-hidden shadow-2xl flex flex-col h-[550px] text-right"
      >
        {/* Decorative Gold Header Top */}
        <div className="absolute top-0 right-0 h-1 w-full bg-gradient-to-l from-amber-gold to-gold-600" />

        {/* Head Bar */}
        <div className="p-5 border-b border-white/[0.04] bg-zinc-950/40 flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-1 px-2.5 rounded-lg border border-white/[0.03] bg-zinc-900/40 text-zinc-400 hover:text-white transition-colors cursor-pointer text-xs"
          >
            بستن
          </button>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-sm font-bold text-white flex items-center gap-2 justify-end">
                مشاور گالری گلدنو
                <Sparkles className="h-4 w-4 text-amber-gold animate-pulse" />
              </span>
              <span className="text-[10px] text-emerald-400 block mt-0.5 font-sans">متصل به هوش مصنوعی زنده</span>
            </div>
            {/* Robot Emblem circular icon */}
            <div className="h-10 w-10 rounded-full border border-amber-gold/30 bg-zinc-950 text-amber-gold flex items-center justify-center shadow-inner shadow-amber-gold/5">
              <Bot className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Conversation Box */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-5 space-y-4"
        >
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 text-right max-w-[85%] ${
                  isUser ? 'mr-auto flex-row-reverse' : 'ml-auto'
                }`}
              >
                {/* Avatar */}
                <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 border ${
                  isUser 
                    ? 'bg-zinc-800 border-zinc-700 text-zinc-400' 
                    : 'bg-[#221c13] border-amber-gold/20 text-amber-gold'
                }`}>
                  {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>

                {/* Bubble message body */}
                <div className={`p-4 rounded-2xl text-xs leading-6 ${
                  isUser
                    ? 'bg-zinc-900 border border-white/[0.02] text-zinc-200 rounded-tr-none'
                    : 'bg-zinc-950/95 border border-amber-gold/5 text-zinc-300 rounded-tl-none'
                }`}>
                  {/* Rendering preformatted text perfectly to keep paragraphs and line-breaks intact without dependencies */}
                  <span className="whitespace-pre-wrap select-text">{msg.text}</span>
                  <span className="block text-[9px] text-zinc-500 mt-2 font-serif text-left">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Artificial Thinking state representation */}
          {loading && (
            <div className="flex gap-3 text-right max-w-[80%] ml-auto items-center">
              <div className="h-8 w-8 rounded-full bg-[#221c13] border border-amber-gold/10 text-amber-gold flex items-center justify-center">
                <Bot className="h-4 w-4 animate-spin" />
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-950/60 text-xs border border-white/[0.01] text-zinc-500 rounded-tl-none animate-pulse">
                درحال بررسی فاکتورها، مدل‌های مگوئی و آماده‌سازی مشاوره...
              </div>
            </div>
          )}
        </div>

        {/* Suggested presets */}
        {messages.length === 1 && (
          <div className="px-5 pb-3 pt-2 text-right">
            <span className="text-[10px] text-zinc-500 block mb-2">سوالات پیشنهادی متداول خریداران طلا:</span>
            <div className="flex flex-wrap gap-2 justify-end">
              {suggestions.map((suggest) => (
                <button
                  key={suggest}
                  onClick={() => speakPreset(suggest)}
                  className="rounded-lg border border-white/[0.04] bg-zinc-950/40 hover:bg-amber-gold/5 hover:border-amber-gold/20 px-3 py-2 text-[10px] text-zinc-400 hover:text-amber-gold transition-all text-right cursor-pointer"
                >
                  {suggest}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Input Area */}
        <div className="p-4 border-t border-white/[0.04] bg-zinc-950/40">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="flex items-center gap-3 relative"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="درخواست خود، فرمول محاسبه یا بودجه هدیه را بپرسید..."
              disabled={loading}
              className="w-full rounded-xl border border-white/[0.06] bg-zinc-900/60 pl-16 pr-4 py-3.5 text-xs text-zinc-200 text-right focus:border-amber-gold/30 focus:outline-none transition-all disabled:opacity-50"
            />
            
            <button
              type="submit"
              disabled={!inputValue.trim() || loading}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-amber-gold text-zinc-950 hover:bg-white disabled:opacity-40 disabled:hover:bg-amber-gold disabled:hover:text-zinc-950 transition-all flex items-center justify-center cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

      </motion.div>

    </div>
  );
}
