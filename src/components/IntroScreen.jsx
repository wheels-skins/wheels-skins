import React, { useState } from 'react';

export default function IntroScreen({ onFinish }) {
  const [fade, setFade] = useState(false);

  const handleEnd = () => {
    setFade(true);
    setTimeout(() => {
      onFinish();
    }, 800); // وقت التلاشي السلس
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-800 ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <video
        src="/intro.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleEnd}
        className="w-full h-full object-cover"
      />
      
      {/* زر تخطي أنيق للزائر المستعجل */}
      <button
        onClick={handleEnd}
        className="absolute top-8 right-8 z-10 px-4 py-1.5 text-xs font-semibold text-white/70 hover:text-white border border-white/20 hover:border-white rounded-full backdrop-blur-md transition-all uppercase tracking-wider"
      >
        Skip
      </button>
    </div>
  );
}