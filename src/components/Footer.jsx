import React from 'react';

export default function Footer() {
  return (
    <footer className="relative z-10 py-8 border-t border-zinc-900 text-center text-[10px] uppercase tracking-widest text-zinc-600 font-bold">
      ©️ {new Date().getFullYear()} Wheels Skins AUTOMOTIVE. ALL RIGHTS RESERVED. BY MAESTRO OMAR FOX.
    </footer>
  );
}