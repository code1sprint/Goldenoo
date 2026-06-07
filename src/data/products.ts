/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '../types';
import heroRingPath from '../assets/images/gold_ring_hero_1780257597172.png';
import ring3dModel from '../assets/3D/Copilot3D-95672f46-9b0e-4244-b513-ada7e683c846.glb';

export const products: Product[] = [
  {
    id: 'ring-hero',
    name: 'انگشتر الماس گلدنو مدل سلطنتی (ویژه)',
    category: 'ring',
    weight: 6.85,
    gemstone: 'تک نگین الماس برلیان تراش پرنسس ۱.۲ قیراطی پاک (VVS1)',
    purity: '۱۸ عیار (۷۵۰ زرد)',
    basePrice: 145000000, // gemstone cost
    makingFeePercent: 18,
    imageUrl: heroRingPath,
    description: 'جواهر گرانبهای گلدنو با طراحی خیره‌کننده سلطنتی. این انگشتر که نگین الماس پرنسس آن با دقت بی‌نظیری مخراج‌کاری شده، سمبل شکوه و درخشندگی خاص در لحظات به‌یادماندنی پیوند تان خواهد بود. پایه طلا با الگوی دوردیفه ظریف تزیین شده است.',
    rating: 4.9,
    reviewsCount: 42,
    sizes: ['۵۲', '۵۴', '۵۶', '۵۸', '۶۰']
  },
  {
    id: 'ring-3d-copilot',
    name: 'انگشتر طلای گلدنو مدل سه‌بعدی انحصاری',
    category: 'ring',
    weight: 5.2,
    gemstone: 'نگین برلیان تراش گرد درجه یک (VVS2)',
    purity: '۱۸ عیار (۷۵۰ زرد)',
    basePrice: 68000000,
    makingFeePercent: 16,
    imageUrl: heroRingPath,
    model3dUrl: ring3dModel,
    description: 'انگشتر لوکس گلدنو با مدل‌سازی سه‌بعدی دقیق و قابلیت مشاهده تعاملی ۳۶۰ درجه. طراحی ارگونومیک با پایه طلای ۱۸ عیار و نگین برلیان درخشان، مناسب برای هدیه‌ای ماندگار و خاص.',
    rating: 5.0,
    reviewsCount: 18,
    sizes: ['۵۰', '۵۲', '۵۴', '۵۶', '۵۸']
  },
  {
    id: 'ring-artemis',
    name: 'انگشتر طلای رزگلد طرح موج آرتمیس',
    category: 'ring',
    weight: 3.42,
    gemstone: 'نگین‌های برلیان میکرو درجه یک',
    purity: '۱۸ عیار (۷۵۰ رزگلد)',
    basePrice: 8500000,
    makingFeePercent: 12,
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600',
    description: 'پیچ و تاب هنرمندانه شبیه به امواج اقیانوس، مزین به انبوهی از نگین‌های درخشان سوییسی. ایده‌آل برای ست روزانه لوکس یا هدیه‌ای رمانتیک برای فردی بسیار خاص.',
    rating: 4.8,
    reviewsCount: 28,
    sizes: ['۵۰', '۵۲', '۵۴', '۵۶', '۵۸']
  },
  {
    id: 'ring-minimal',
    name: 'انگشتر طلا مینیمال مدل فلورانس',
    category: 'ring',
    weight: 1.95,
    gemstone: 'فاقد سنگ',
    purity: '۱۸ عیار (۷۵۰ زرد مات)',
    basePrice: 0,
    makingFeePercent: 8,
    imageUrl: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=600',
    description: 'ظرافت در کمال سادگی. این طرح مینیمال از طلای زرد با پولیش مات مرغوب تولید شده و برای علاقه‌مندان به سبک‌های مدرن و استایل‌های لایه‌ای، انتخابی ماندگار است.',
    rating: 4.7,
    reviewsCount: 15,
    sizes: ['۴۸', '۵۰', '۵۲', '۵۴', '۵۶']
  },
  {
    id: 'necklace-elizabeth',
    name: 'آویز گردنبند طلا مدل مدالیون الیزابت',
    category: 'necklace',
    weight: 5.12,
    gemstone: 'سنگ یاقوت کبود طبیعی ۰.۴ قیراط',
    purity: '۱۸ عیار (۷۵۰ زرد)',
    basePrice: 18400000,
    makingFeePercent: 15,
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600',
    description: 'آویز اصیل با حاشیه تراش خورده اسلیمی گلدنو و به همراه یک نگین یاقوت کبود اصیل افریقایی در قلب کار. جلوه‌ای از وقار شاهانه تاریخی.',
    rating: 4.9,
    reviewsCount: 33,
    hasChain: true
  },
  {
    id: 'necklace-cartier',
    name: 'زنجیر طلای پهن طرح کارتیر کلاسیک',
    category: 'necklace',
    weight: 12.8,
    gemstone: 'بدون سنگ',
    purity: '۱۸ عیار (۷۵۰ زرد براق)',
    basePrice: 0,
    makingFeePercent: 10,
    imageUrl: 'https://images.unsplash.com/photo-1611085583191-a3b1a30a8a3a?auto=format&fit=crop&q=80&w=600',
    description: 'زنجیر پرابهت و ضخیم کارتیر که هر حلقه‌اش با سلیقه بی‌همتایی صیقل داده شده است. مناسب برای هم آقایان و هم خانم‌های جسور و مد روز.',
    rating: 5.0,
    reviewsCount: 19,
    hasChain: false
  },
  {
    id: 'earring-venus',
    name: 'گوشواره آویز مروارید و طلای ونوس',
    category: 'earring',
    weight: 4.25,
    gemstone: 'دو عدد مروارید غلتان طبیعی جنوب آب‌های آزاد',
    purity: '۱۸ عیار (۷۵۰ سفید)',
    basePrice: 22000000,
    makingFeePercent: 14,
    imageUrl: 'https://images.unsplash.com/photo-1635767790038-345a77ddb494?auto=format&fit=crop&q=80&w=600',
    description: 'ترکیب بی‌نظیری از مرواریدهای درخشان طبیعی و طلای سفید که به نرمی بر روی شانه‌هایتان تاب می‌خورد. برآورده‌کننده ناب‌ترین معیارهای زیبایی مدرن.',
    rating: 4.8,
    reviewsCount: 22
  },
  {
    id: 'earring-hoop',
    name: 'گوشواره حلقه‌ای آینه‌ای گلد بکس',
    category: 'earring',
    weight: 2.8,
    gemstone: 'بدون سنگ',
    purity: '۱۸ عیار (۷۵۰ زرد)',
    basePrice: 0,
    makingFeePercent: 9,
    imageUrl: 'https://images.unsplash.com/photo-1630012419266-a2468307d88c?auto=format&fit=crop&q=80&w=600',
    description: 'گوشواره حلقه‌ای کلاسیک با پولیش آینه‌ای فوق‌العاده. بازتاب خیره‌کننده نور در تمام زوایا، مناسب برای کادو دادن و یا استفاده روزمره سبک.',
    rating: 4.6,
    reviewsCount: 12
  },
  {
    id: 'bracelet-tennis',
    name: 'دستبند تنیس با الماس‌های تمام‌برلیان',
    category: 'bracelet',
    weight: 8.5,
    gemstone: '۷۲ عدد الماس گرد برلیان تراش ایده‌آل (مجموعا ۳ قیراط)',
    purity: '۱۸ عیار (۷۵۰ سفید)',
    basePrice: 320000000, // Highly exclusive diamond tennis bracelet
    makingFeePercent: 20,
    imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600',
    description: 'شاهکاری ابدی بر روی دستانتان. یک ردیف متصل و زنده از برلیان‌های پاک با درخشندگی ارگانیک خیره‌کننده. قفل مخفی بسیار ایمن طراحی شده است.',
    rating: 5.0,
    reviewsCount: 8
  },
  {
    id: 'bracelet-van-cleef',
    name: 'دستبند زنجیری طلای طرح ون کلیف',
    category: 'bracelet',
    weight: 4.65,
    gemstone: 'سنگ صدف سفید طبیعی تراش خورده ون‌کلیف',
    purity: '۱۸ عیار (۷۵۰ زرد)',
    basePrice: 11200000,
    makingFeePercent: 13,
    imageUrl: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=600',
    description: 'نماد خوش‌شانسی چهاربرگ کلاسیک با نگین صدف طبیعی دریایی. استایل رمانتیک و زنانه برای دورهمی‌های عصرانه و جشن‌های خانوادگی لوکس.',
    rating: 4.9,
    reviewsCount: 47
  },
  {
    id: 'set-bridal',
    name: 'نیم‌ست جواهر مجلسی طرح یاقوت و برلیان',
    category: 'set',
    weight: 18.2,
    gemstone: 'یاقوت قرمز ماداگاسکار درجه یک و ۳.۵ قیراط برلیان',
    purity: '۱۸ عیار (۷۵۰ سفید)',
    basePrice: 580000000,
    makingFeePercent: 22,
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600',
    description: 'سرویس لاکچری شامل گردنبند و گوشواره هماهنگ مجلل. نگین‌های یاقوت سرخ بیضوی شکل با قاب چند ردیفه برلیان درهم آمیخته شدند تا شما ملکه بلامنازع مجلس باشید.',
    rating: 5.0,
    reviewsCount: 5
  },
  {
    id: 'coin-emami',
    name: 'سکه تمام بهار آزادی طرح جدید (امامی)',
    category: 'coin',
    weight: 8.133,
    gemstone: 'مسکوک طلای بدون سنگ ضرب بانکی',
    purity: '۲۲ عیار (۹۰۰)',
    basePrice: 0,
    makingFeePercent: 2, // very small fee
    imageUrl: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&q=80&w=600',
    description: 'سکه تمام بهار آزادی ضرب رسمی بانک مرکزی ایران سال ۱۳۸۶. ایده‌آل برای سرمایه‌گذاری امن بلندمدت و حفظ ارزش دارایی یا هدیه ارزشمند روز پدر و اعیاد باستانی.',
    rating: 4.9,
    reviewsCount: 114
  }
];
