/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: 'ring' | 'necklace' | 'bracelet' | 'earring' | 'set' | 'coin';
  weight: number; // in grams
  gemstone: string;
  purity: string; // e.g., '۱۸ عیار (۷۵۰)'
  basePrice: number; // gemstone or additional materials fixed price (in Tomans)
  makingFeePercent: number; // percentage of gold price, e.g., 15%
  imageUrl: string;
  model3dUrl?: string;
  description: string;
  rating: number;
  reviewsCount: number;
  sizes?: string[]; // size guides (e.g., [48, 50, 52, 54, 56])
  hasChain?: boolean;
}

export interface CartItem {
  id: string; // unique ID incorporating product ID + selection parameters
  product: Product;
  quantity: number;
  selectedSize?: string;
  engraving?: string;
}

export interface GoldPrice {
  price18k: number;
  currency: string;
  lastUpdated: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'gemini';
  text: string;
  timestamp: string;
}
