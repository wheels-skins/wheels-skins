import React from 'react';
import { Sparkles } from 'lucide-react';

export default function BlackFridayBar() {
  return (
    <div className="w-full py-6 flex justify-center items-center z-20">
      <span className="inline-flex items-center gap-2.5 px-7 py-2.5 rounded-full text-base sm:text-xl font-black uppercase tracking-wider bg-[#E3211C] text-white shadow-[0_0_25px_rgba(227,33,28,0.85)] animate-pulse border border-white/20">
        <Sparkles size={20} className="fill-white" />
        Black Friday Offer
      </span>
    </div>
  );
}