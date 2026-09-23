import React from 'react';
import { Zap, Crosshair, Phone } from 'lucide-react';
import logo from '../logo.png';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-zinc-950/60 backdrop-blur-xl border-b border-zinc-800/80 px-4 sm:px-8 py-3 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-3 relative group cursor-pointer">
        <div className="h-10 w-10 rounded-lg overflow-hidden flex items-center justify-center bg-black border border-zinc-700 group-hover:border-[#E3211C] transition-colors shadow-[0_0_10px_rgba(227,33,28,0.2)]">
          <img src={logo} alt="Wheels Skins" className="h-full w-full object-contain" />
        </div>
        <div className="text-right leading-tight">
          <div className="text-white font-bold text-lg tracking-wider flex items-center gap-1 uppercase">
            WheelSkins <Zap className="text-[#E3211C] w-4 h-4 drop-shadow-[0_0_8px_rgba(227,33,28,1)]" />
          </div>
          <div className="text-[10px] text-zinc-500 font-medium tracking-widest uppercase flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            System Online
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
        <a href="#hero" className="text-[#E3211C] hover:text-[#E3211C] transition drop-shadow-[0_0_8px_rgba(227,33,28,0.5)]">Home</a>
        <a href="#pricing" className="hover:text-white transition">Price list</a>
        <a href="#configurator" className="hover:text-white transition">Cockpit Setup</a>
        <a href="#branches" className="hover:text-white transition">Locations</a>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2">
          {/* أيقونة الهاتف المضافة */}
          <a 
            href="tel:01202738020" 
            title="اتصل بنا: 01202738020"
            className="w-8 h-8 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#25D366] hover:border-[#25D366] transition-all"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* فيسبوك */}
          <a href="https://www.facebook.com/share/1Dm5aEEjec/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" 
             className="w-8 h-8 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#1877F2] hover:border-[#1877F2] transition-all">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>

          {/* إنستجرام */}
          <a href="https://www.instagram.com/wheels_skins?stkn=cTNnMnV0dWc3ZXc=" target="_blank" rel="noopener noreferrer" 
             className="w-8 h-8 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#E1306C] hover:border-[#E1306C] transition-all">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/></svg>
          </a>
        </div>

        <a 
          href="#booking" 
          style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
          className="bg-[#E3211C] hover:bg-red-700 text-white px-4 py-2 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(227,33,28,0.4)]"
        >
          <Crosshair className="w-3.5 h-3.5" /> Book now
        </a>
      </div>
    </nav>
  );
}