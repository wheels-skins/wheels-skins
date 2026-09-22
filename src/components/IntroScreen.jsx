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
      {/* مشغل الفيديو: يعرض الفيديو كاملاً بدون قص أطراف على الموبايل والكمبيوتر */}
      <video
        src={`${process.env.PUBLIC_URL}/intro.mp4`}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleEnd}
        onError={handleEnd}
        className="max-w-full max-h-full w-auto h-auto object-contain pointer-events-none"
      />

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