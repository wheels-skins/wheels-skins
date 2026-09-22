import React, { useState } from 'react';

export default function IntroScreen({ onFinish }) {
  const [fade, setFade] = useState(false);

  const handleEnd = () => {
    setFade(true);
    setTimeout(() => {
      onFinish();
    }, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <video
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleEnd}
        onError={handleEnd}
        className="w-full h-full object-cover pointer-events-none"
      >
        {/* نسخة الموبايل للشاشات الرأسية والأصغر من 768px */}
        <source src="/intro-mobile.mp4?v=2" media="(max-width: 768px)" type="video/mp4" />
        {/* نسخة أجهزة الكمبيوتر للشاشات الأكبر */}
        <source src="/intro-pc.mp4?v=2" type="video/mp4" />
      </video>

      {/* زر التخطي */}
      <button
        type="button"
        onClick={handleEnd}
        className="absolute top-6 right-6 z-20 px-4 py-1.5 text-xs font-semibold text-white/80 hover:text-white border border-white/20 hover:border-white rounded-full bg-black/40 backdrop-blur-md transition-all uppercase tracking-wider cursor-pointer"
      >
        Skip
      </button>
    </div>
  );
}