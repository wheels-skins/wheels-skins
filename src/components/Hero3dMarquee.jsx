import React, { useState } from 'react';
import { Award, ShieldCheck, Sparkles, CheckCircle2, X } from 'lucide-react';

export default function Hero3DMarquee({ images = [] }) {
  const displayImages = images && images.length > 0 ? images : [];
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="relative w-full py-12 bg-[#0B0B0B] overflow-hidden border-y border-zinc-800/80">
      {/* حركة لا نهائية مستمرة وثابتة مع اتجاه LTR */}
      <style>{`
        @keyframes scrollLTR {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 0.625rem));
          }
        }
        .marquee-viewport {
          direction: ltr !important;
          display: flex;
          overflow: hidden;
          user-select: none;
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
        .marquee-track-infinite {
          display: flex;
          width: max-content;
          gap: 1.25rem;
          animation: scrollLTR 40s linear infinite;
        }
        .marquee-viewport:hover .marquee-track-infinite {
          animation-play-state: paused;
        }
      `}</style>

      {/* إضاءة خلفية خفيفة */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#E3211C]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* الجانب الأيمن: الإحصائيات ومعلومات الشغل */}
          <div className="lg:col-span-4 space-y-5 text-right z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3211C]/10 border border-[#E3211C]/30 text-[#E3211C] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>معرض أعمال WheelSkins</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
             <span className="text-[#E3211C]">Wheels Skins</span> 
             المكان الوحيد المتخصص في كسوه الطاره 
            </h2>

            <p className="text-zinc-400 text-sm leading-relaxed">
"على مدار 10 سنوات من الخبرة، تخصصنا في تقديم أعلى مستوى لكسوة وتجديد طارات السيارات. نعتمد على أجود خامات الجلد الألماني وتفصيل يدوي متقن يجمع بين الفخامة، المتانة، وملمس القيادة المريح."
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <div className="flex items-center gap-1.5 text-[#E3211C] mb-1">
                  <Award className="w-4 h-4" />
                  <span className="text-xs font-bold text-white">+10 سنوات</span>
                </div>
                <p className="text-[11px] text-zinc-400">خبرة متخصصة في الكسوة </p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <div className="flex items-center gap-1.5 text-[#E3211C] mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-bold text-white">ضمان عام كامل</span>
                </div>
                <p className="text-[11px] text-zinc-400">على ثبات الجلد وجودة </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-zinc-400 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#E3211C]" />
                <span>التركيب في 30 دقيقه</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#E3211C]" />
                <span>خياطة يدوي بدون فك او لزق</span>
              </div>
            </div>
          </div>

          {/* الجانب الأيسر: شريط الصور اللانهائي المتصل القابل للضغط */}
          <div className="lg:col-span-8 overflow-hidden py-4">
            <div className="transform -rotate-2 scale-95 sm:scale-100">
              <div className="marquee-viewport">
                <div className="marquee-track-infinite">
                  {[...displayImages, ...displayImages].map((imgItem, idx) => {
                    const imgSrc = imgItem?.default || imgItem;

                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setSelectedImage(imgSrc)}
                        className="relative shrink-0 w-[220px] sm:w-[260px] h-[320px] sm:h-[380px] rounded-2xl overflow-hidden border border-zinc-800 bg-[#121212] shadow-2xl transition-all duration-300 hover:border-[#E3211C] hover:scale-105 flex items-center justify-center p-2 cursor-pointer focus:outline-none"
                      >
                        {/* عرض الصورة كاملة بدون قص أبعادها */}
                        <img
                          src={imgSrc}
                          alt={`Wheel Showcase ${idx + 1}`}
                          className="w-full h-full object-contain block pointer-events-none rounded-xl"
                          loading="lazy"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* نافذة التكبير المنبثقة عند الضغط على أي صورة */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] flex items-center justify-center">
            {/* زر الإغلاق */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-zinc-800/80 hover:bg-[#E3211C] rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage}
              alt="صورة مكبرة"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-zinc-800 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}