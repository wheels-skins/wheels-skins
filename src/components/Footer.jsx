import React, { useState, useEffect, useRef } from "react";

/* ── SVG Icons ── */
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.523 3.659 1.435 5.163L2 22l4.918-1.41A9.962 9.962 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.962 7.962 0 01-4.065-1.11l-.291-.174-3.018.866.874-3.121-.19-.302A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
  </svg>
);

const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M24 12.073C24 5.404 18.627 0 12 0 5.372 0 0 5.404 0 12.073c0 6.027 4.388 11.024 10.125 11.927v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796v8.437C19.612 23.097 24 18.1 24 12.073z"/>
  </svg>
);

const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

/* ── StoryLink ── */
function StoryLink({ children, href = "#", delay = 0 }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-block cursor-pointer focus:outline-none mx-1"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span
        className="absolute inset-x-0 inset-y-0 rounded pointer-events-none transition-opacity duration-300"
        style={{
          background: "rgba(227,33,28,0.08)",
          opacity: hovered ? 1 : 0,
          filter: "blur(6px)",
        }}
      />
      <span
        className="relative z-10 font-black transition-all duration-300"
        style={{
          color: hovered ? "#E3211C" : "#e5e7eb",
          textShadow: hovered
            ? "0 0 10px rgba(227,33,28,0.65), 0 0 28px rgba(227,33,28,0.35)"
            : "none",
          paddingBottom: "2px",
        }}
      >
        {children}
      </span>
      <span
        className="absolute bottom-0 right-0 h-[2px] rounded-full transition-all duration-500"
        style={{
          width: hovered ? "100%" : "0%",
          left: 0,
          background:
            "linear-gradient(90deg, transparent 0%, #E3211C 40%, #ff5a55 60%, #E3211C 80%, transparent 100%)",
          boxShadow: hovered ? "0 0 8px 2px rgba(227,33,28,0.55)" : "none",
        }}
      />
    </a>
  );
}

/* ── Social Button ── */
function SocialBtn({ icon, label, href, accentColor }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300"
      style={{
        borderColor: hovered ? accentColor : "rgba(255,255,255,0.12)",
        color: hovered ? accentColor : "rgba(255,255,255,0.35)",
        boxShadow: hovered ? `0 0 16px 3px ${accentColor}44` : "none",
        transform: hovered ? "translateY(-3px) scale(1.1)" : "translateY(0) scale(1)",
        background: hovered ? `${accentColor}14` : "transparent",
      }}
    >
      {icon}
    </a>
  );
}

/* ── Particles ── */
const particleData = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: (i * 53 + 7) % 100,
  y: (i * 37 + 13) % 100,
  size: ((i * 17) % 3) + 1,
  opacity: ((i * 11) % 35) / 100 + 0.04,
  duration: ((i * 7) % 4) + 3,
  delay: (i * 0.4) % 6,
}));

function AmbientParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {particleData.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.id % 3 === 0 ? "#E3211C" : "rgba(255,255,255,0.6)",
            opacity: p.opacity,
            animation: `ws-pulse ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ── تأثير الآلة الكاتبة المخصص للقصة ── */
function StoryTypewriter({ visible }) {
  const storyArray = [
    "في", <StoryLink key="l1" href="#home">WheelSkins</StoryLink>, "،", "بنتعامل", "مع", "طارة", "عربيتك", "كأهم", "جزء", "بتلمسه", "طول", "طريقك.",
    <br key="br1" className="hidden sm:block mt-2" />,
    "عشان", "كده", "طوّرنا", "طريقتنا", "على", "مدار", "10", "سنين", "عشان", "نقدملك", "تجربة", "مختلفة", "تماماً:",
    <StoryLink key="l2" href="#materials">جلد ألماني فاخر</StoryLink>, "،", <StoryLink key="l3" href="#features">خياطة يدوية بالكامل</StoryLink>, "،", "وفي", "خلال", "30", "دقيقة", "فقط.",
    <br key="br2" className="hidden sm:block mt-2" />,
    "الأهم", "من", "كده،", "إننا", "بنضمنلك", "أمان", "عربيتك", "بالكامل—بدون", "فك", "أي", "قطعة", "في", "الطارة", "وبدون", "استخدام", "أي", "لزق.",
    <br key="br3" className="hidden sm:block mt-2" />,
    "النتيجة؟", "مظهر", "فخم،", "قبضة", "مريحة،", "وفينش", "يليق", "بعربيتك.",
    <br key="br4" className="block mt-6" />,
    <span key="bold1" className="font-bold text-white text-lg sm:text-2xl drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">جاهز ترجع طارتك جديدة أو تحميها في 30 دقيقة بس؟</span>,
    <br key="br5" className="block mt-5" />,
    <a 
      key="cta" 
      href="tel:01202738020" 
      className="inline-flex items-center gap-3 px-8 py-3.5 mt-2 bg-gradient-to-r from-[#E3211C] to-[#9b0e0a] text-white rounded-full font-black text-lg shadow-[0_0_20px_rgba(227,33,28,0.5)] hover:shadow-[0_0_35px_rgba(227,33,28,0.8)] hover:scale-105 transition-all duration-300"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
      احجز ميعادك دلوقتي
    </a>
  ];

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setCount(i);
      if (i >= storyArray.length) {
        clearInterval(timer);
      }
    }, 120); 

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <div
      className="text-center transition-all duration-700 delay-300 z-10 relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
      }}
    >
      <p
        className="text-base sm:text-lg md:text-xl leading-loose sm:leading-[2.5rem]"
        style={{ color: "rgba(255,255,255,0.9)", textShadow: "0 2px 6px rgba(0,0,0,0.9)" }}
      >
        {storyArray.slice(0, count).map((item, index) => (
          <React.Fragment key={index}>
            {item}
            {item.type !== 'br' && item.type !== 'a' && " "}
          </React.Fragment>
        ))}
        {count < storyArray.length && (
          <span 
            className="inline-block w-1.5 h-5 ml-1 align-middle animate-pulse" 
            style={{ background: "#E3211C", boxShadow: "0 0 8px #E3211C" }}
          ></span>
        )}
      </p>
    </div>
  );
}

/* ── MAIN FOOTER COMPONENT ── */
export default function Footer() {
  const year = new Date().getFullYear();
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ background: "#080808" }}
      dir="rtl"
    >
      <style>{`
        @keyframes ws-pulse {
          0%, 100% { opacity: var(--op, 0.08); transform: scale(1); }
          50% { opacity: calc(var(--op, 0.08) * 4); transform: scale(1.7); }
        }
        @keyframes ws-breathe {
          0%, 100% { opacity: 0.07; }
          50% { opacity: 0.13; }
        }
      `}</style>

      {/* ── Background Video Layer ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40" 
        >
          <source src={require('./footer-video.mp4')} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 75% 55% at 50% 25%, rgba(227,33,28,0.09) 0%, rgba(8,8,8,0) 70%)",
          animation: "ws-breathe 6s ease-in-out infinite",
        }}
      />

      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none z-10"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(227,33,28,0.3) 20%, rgba(227,33,28,1) 50%, rgba(227,33,28,0.3) 80%, transparent 100%)",
          boxShadow: "0 0 16px 2px rgba(227,33,28,0.45)",
        }}
      />

      <AmbientParticles />

      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-10 pt-16 sm:pt-20 pb-12 flex flex-col items-center">
        
        <div
          className="flex flex-col items-center mb-8 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-20px)",
          }}
        >
          <div className="relative inline-flex items-start justify-center">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-widest text-white inline-flex items-center"
              style={{ letterSpacing: "0.22em", textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
            >
              Wheel
              <span style={{ color: "#E3211C", textShadow: "0 0 18px rgba(227,33,28,0.6)" }}>
                Skins
              </span>
            </h2>
            <span
              className="text-xs sm:text-sm font-bold text-[#E3211C] mr-1.5 -mt-1 select-none"
              style={{ textShadow: "0 0 8px rgba(227,33,28,0.5)" }}
              title="علامة تجارية مسجلة"
            >
              ®️
            </span>
          </div>

          <p
            className="mt-3 text-xs sm:text-sm tracking-widest text-center"
            style={{ color: "rgba(227,33,28,0.9)", textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
          >
            المكان الوحيد المتخصص في كسوة الطارة · خبرة +10 سنوات
          </p>
        </div>

        <div
          className="w-24 h-px mb-10 transition-all duration-700 delay-200"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(227,33,28,0.6), transparent)",
            opacity: visible ? 1 : 0,
            transform: visible ? "scaleX(1)" : "scaleX(0)",
          }}
        />

        {/* ── دمج تأثير الآلة الكاتبة هنا ── */}
        <StoryTypewriter visible={visible} />

      </div>

      <div
        className="relative z-10"
        style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
      >
        <div
          className="absolute top-0 inset-x-0 h-px pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(227,33,28,0.25) 50%, transparent 100%)",
          }}
        />

        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs order-2 sm:order-1 text-center sm:text-right"
            style={{ color: "rgba(255,255,255,0.5)", textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
          >
            ©️ {year} <span style={{ color: "#E3211C" }}>WheelSkins</span>  by:Omar Fox · جميع الحقوق محفوظة 
          </p>

          <div className="flex items-center gap-3 order-1 sm:order-2">
            <SocialBtn icon={<IconPhone />} label="اتصال هاتفي" href="tel:01202738020" accentColor="#3b82f6" />
            <SocialBtn icon={<IconInstagram />} label="إنستغرام" href="https://www.instagram.com/wheels_skins?stkn=cTNnMnV0dWc3ZXc=" accentColor="#E1306C" />
            <SocialBtn icon={<IconWhatsApp />} label="واتساب" href="https://wa.me/201202738020" accentColor="#25D366" />
            <SocialBtn icon={<IconFacebook />} label="فيسبوك" href="https://www.facebook.com/share/1Dm5aEEjec/?mibextid=wwXIfr" accentColor="#1877F2" />
          </div>

          <p
            className="text-xs order-3 text-center sm:text-left hidden sm:block"
            style={{ color: "rgba(255,255,255,0.5)", textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
          >
            صنع بشغف بأيدي مصرية 🇪🇬
          </p>
        </div>
      </div>
    </footer>
  );
}