/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Instantiate Gemini API server-side securely
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } else {
    console.warn('WARNING: GEMINI_API_KEY is not defined. AI Consultant will use smart presets instead.');
  }

  // Live gold prices simulation
  let cachedGoldPrice = 3485000; // standard starting price in Tomans per gram 18K gold
  let lastTick = Date.now();

  app.get('/api/gold-price', (req, res) => {
    const now = Date.now();
    // Simulate brownian drift every 15 seconds max to keep UI consistent
    if (now - lastTick > 15000) {
      const shift = (Math.random() - 0.48) * 1200; // slight positive trend
      cachedGoldPrice = Math.round(cachedGoldPrice + shift);
      lastTick = now;
    }
    res.json({
      price18k: cachedGoldPrice,
      currency: 'تومان (گرم ۱۸ عیار)',
      lastUpdated: new Date().toISOString(),
    });
  });

  // Server-side Gemini chat endpoint for AI advisor
  app.post('/api/gemini/chat', async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'پیام کاربر وارد نشده است.' });
      }

      if (!ai) {
        // Fallback responses when Gemini key is missing
        const lowerMsg = message.toLowerCase();
        let reply = "ببخشید، سیستم مشاوره طلایی گلدنو در حال مانیتورینگ است. به عنوان پاسخ خودکار: طلای ۱۸ عیار گلدنو با گارانتی اصالت کالا ارسال بیمه شده سراسری دارد. آیا به محصول خاصی علاقه دارید؟";
        
        if (lowerMsg.includes('انگشتر') || lowerMsg.includes('حلقه')) {
          reply = "انگشترهای گلدنو از جمله مدل سلطنتی الماس با برلیان VVS1 و مدل موج آرتمیس طرفدارهای زیاذی دارند! انگشترهای سلطنتی دارای ۱۸ درصد اجرت ساخت و مزیّن به نگین‌های قیمتی با فاکتور رسمی تایید شده می‌باشند.";
        } else if (lowerMsg.includes('قیمت') || lowerMsg.includes('هزینه')) {
          reply = "قیمت نهایی اقلام طلایی در گلدنو به صورت شفاف محاسبه می‌شود: (قیمت روز گرم ۱۸ عیار + اجرت ساخت) * وزن قطعه + ۷٪ سود گالری + ۹٪ مالیات ارزش افزوده. نگین هم به صورت مجزا اضافه می‌شود.";
        } else if (lowerMsg.includes('سرمایه') || lowerMsg.includes('سکه')) {
          reply = "برای سرمایه‌گذاری امن، مسکوک طلای بدون سنگ ضرب بانکی مانند سکه امامی ۲۲ عیار گلدنو بهترین گزینه است چرا که هیچ اجرت و مالیات سنگینی ندارد و نقدشوندگی بالایی دارد.";
        }
        return res.json({ text: reply });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: message,
        config: {
          systemInstruction: `شما مشاور و دستیار هوشمند، بسیار مودب، متخصص و متین گالری طلا و جواهرات لوکس "گلدنو" (Goldenoo) هستید. به زبان فارسی شیوا پاسخ دهید.
وظایف شما:
۱. مشاوره برای خرید بهترین کادو و طلا متناسب با بودجه حدودی، سلیقه و سن مشتری.
۲. فرمول محاسبه قیمت طلا در گالری ما را شفاف توضیح دهید:
   قیمت کل = [ (قیمت روز هر گرم طلای ۱۸ عیار + اجرت ساخت هر گرم) * وزن قطعه طلا ] + ۷ درصد سود گالری + ۹ درصد مالیات ارزش افزوده بر طلا و اجرت + ارزش نگین های فاکتوری.
۳. در مورد محصولات گلدنو اطلاعات جذاب بدهید (مانند انگشتر الماس سلطنتی، انگشتر آرتمیس، دستبند تنیس برلیان، دستبند زنجیری ون کلیف، آویز مدالیون الیزابت، نیم‌ست جواهر یاقوت سرخ و سکه امامی سرمایه‌گذاری).
۴. پاسخ‌های کوتاه، شیک، با ابهت و عاری از حاشیه بدهید. لحنی صمیمانه ولی کاملا لوکس و جواهری داشته باشید.`,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error('Gemini API Error on Server:', error);
      res.status(500).json({ error: 'خطایی در تولید پاسخ توسط مشاور گالری رخ داد.' });
    }
  });

  // Vite development vs production asset routing middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware integrated on Express server (Development Mode)');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Production static files serving from /dist folder');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express custom server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Express start server failure:', err);
});
