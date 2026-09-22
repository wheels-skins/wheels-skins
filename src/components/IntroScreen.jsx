import React, { useState } from 'react';

export default function IntroScreen({ onFinish }) {
  const [fade, setFade] = useState(false);

  const handleEnd = () => {
    setFade(true);
    setTimeout(() => {
      onFinish();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* مشغل فيديو الموبايل فقط (يظهر على الشاشات الصغيرة ويختفي في الكمبيوتر) */}
      <video
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleEnd}
        className="w-full h-full object-cover block md:hidden pointer-events-none"
      >
        <source src={`${process.env.PUBLIC_URL || ''}/intro-mobile.mp4`} type="video/mp4" />
      </video>

      {/* مشغل فيديو الكمبيوتر واللابتوب فقط (يظهر من مقاس md فما فوق) */}
      <video
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleEnd}
        className="w-full h-full object-cover hidden md:block pointer-events-none"
      >
        <source src={`${process.env.PUBLIC_URL || ''}/intro-pc.mp4`} type="video/mp4" />
      </video>

      {/* زر التخطي Skip */}
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