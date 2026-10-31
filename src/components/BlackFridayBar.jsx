import React from 'react';
import { Sparkles } from 'lucide-react';

export default function BlackFridayBar() {
  return (
    <div className="relative w-full bg-[#060606] border-y border-white/10 py-6 overflow-hidden z-20 flex justify-center items-center shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
      
      {/* خطوط إضاءة سينمائية حمراء في الحواف */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#E3211C]/70 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#E3211C]/40 to-transparent" />

      {/* كلمة Black Friday في المنتصف بحجم واضح وتنبض بالإضاءة */}
      <span className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full text-base sm:text-xl font-black uppercase tracking-widest bg-[#E3211C] text-white shadow-[0_0_25px_rgba(227,33,28,0.8)] animate-pulse">
        <Sparkles size={20} className="fill-white" />
        Black Friday
      </span>

    </div>
  );
}