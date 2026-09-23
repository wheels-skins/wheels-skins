import React, { useState, useEffect, useRef } from 'react';

export default function IntroScreen({ onFinish }) {
  const [fade, setFade] = useState(false);
  const videoRef = useRef(null);

  // فحص الشاشة: إذا كان العرض أقل من أو يساوي 768px فهو موبايل
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // تحديد الفيديو الخاص بكل جهاز
  const videoFile = isMobile ? '/intro-mobile.mp4?v=mobile_v4' : '/intro-pc.mp4?v=pc_v4';

  const handleEnd = () => {
    setFade(true);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 600);
  };

  // إجبار الكتم برمجياً وتشغيل الفيديو تلقائياً على أجهزة الكمبيوتر والموبايل
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Desktop Autoplay prevented, retrying muted play:", err);
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    }
  }, [videoFile]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <video
        ref={videoRef}
        key={videoFile}
        src={videoFile}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleEnd}
        onLoadedMetadata={(e) => {
          e.target.muted = true;
          e.target.play().catch(() => {});
        }}
        className="w-full h-full object-cover pointer-events-none"
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