import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Calendar, ChevronLeft, ChevronRight, MapPin, AlertTriangle, X, ZoomIn, 
  Search, Check, ExternalLink, Clock, ShieldCheck, CalendarDays,
  ChevronDown
} from 'lucide-react';

import IntroScreen from './components/IntroScreen';

// استدعاء قاعدة بيانات السيارات من الملف المستقل
import { CAR_DATABASE } from './carDate';
import { Analytics } from '@vercel/analytics/react';
// استدعاء اللوجو وخلفية الهيدر الاحتياطية
import logo from './logo.png';


// استدعاء صور الطارات المنفردة
import wheelPlain from './wheel-plain.png';
import wheelDotted from './wheel-dotted.png';
import wheelCarbon from './wheel-carbon.png';
import wheelForged from './wheel-forged.png';
import wheelAlcantara from './wheel-alcantara.png';

// استدعاء صور الميكسات
import wheelCarbonPlain from './wheel-carbon-plain.png';
import wheelPlainDotted from './wheel-plain-dotted.png';
import wheelCarbonAlcantara from './wheel-carbon-alcantara.png';
import wheelCarbonDotted from './wheel-carbon-dotted.png';
import wheelAlcantaraDotted from './wheel-alcantara-dotted.png';
import wheelAlcantaraForged from './wheel-alcantara-forged.png';
import wheelForgedPlain from './wheel-forged-plain.png';
import wheelForgedDotted from './wheel-forged-dotted.png';

// استدعاء صور مقبض الفتيس والهاند بريك
import gearDotted from './gear-dotted.png';
import handbrakeCover from './handbrake.png';

// بيانات الفروع مع روابط اللوكيشن الرسمية لخرائط جوجل
const BRANCHES_DATA = [
  {
    id: 'tagamoa',
    name: 'فرع التجمع الأول',
    address: 'التجمع الأول - القاهرة الجديدة',
    mapUrl: 'https://maps.app.goo.gl/A2C3nhtRV2G4wzrV6',
    hours: 'مواعيد العمل: يومياً من 12 ظهراً حتى 10 مساءً'
  },
  {
    id: 'zayed',
    name: 'فرع الشيخ زايد',
    address: 'الشيخ زايد - الجيزة',
    mapUrl: 'https://maps.app.goo.gl/Fhuvy5cCjKJtLxwz8',
    hours: 'مواعيد العمل: يومياً من 12 ظهراً حتى 10 مساءً'
  },
  {
    id: 'nasr_city',
    name: 'فرع مدينة نصر',
    address: 'مدينة نصر - القاهرة',
    mapUrl: 'https://maps.app.goo.gl/Kp2SejydEA8aDt5Q6',
    hours: 'مواعيد العمل: يومياً من 12 ظهراً حتى 10 مساءً'
  }
];

// قائمة المواعيد كل نصف ساعة من 12 ظهراً حتى 10 مساءً
const TIME_SLOTS = [
  '12:00 م', '12:30 م',
  '01:00 م', '01:30 م',
  '02:00 م', '02:30 م',
  '03:00 م', '03:30 م',
  '04:00 م', '04:30 م',
  '05:00 م', '05:30 م',
  '06:00 م', '06:30 م',
  '07:00 م', '07:30 م',
  '08:00 م', '08:30 م',
  '09:00 م', '09:30 م',
  '10:00 م'
];

// مكون 3D سينمائي مع إضاءة ثابتة مستمرة وتفاعل ثلاثي الأبعاد
const Card3D = ({ children, className = "", delay = 0, glowColor = "rgba(227,33,28,0.25)" }) => {
  const [rotate, setRotate] = React.useState({ x: 0, y: 0 });
  const [glare, setGlare] = React.useState({ x: 50, y: 50, opacity: 0.15 });
  const [isVisible, setIsVisible] = React.useState(false);
  const cardRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (window.matchMedia("(hover: none)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotate({
      x: ((y - centerY) / centerY) * -8,
      y: ((x - centerX) / centerX) * 8,
    });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0.15 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isVisible
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(0)`
          : "perspective(1000px) rotateX(15deg) translateY(60px)",
        opacity: isVisible ? 1 : 0,
        transition: `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity 0.8s ease-out ${delay}ms`,
      }}
      className={`relative rounded-2xl overflow-hidden will-change-transform transform-gpu active:scale-[0.98] touch-manipulation ${className}`}
    >
      <div 
        className="pointer-events-none absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[55px] z-10"
        style={{ background: glowColor }}
      />
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-20"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.3) 0%, transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
};

export default function WheelsSkinsApp() {
  const [heroScroll, setHeroScroll] = React.useState(0);
  const [showIntro, setShowIntro] = useState(true);
  React.useEffect(() => {
  // إذا كان الجهاز موبايل (الشاشة أقل من 768px)، لا تحسب السكرول لمنع الرعشة نهائياً
  if (window.innerWidth <= 768) return;

  const handleScroll = () => {
    // استخدام requestAnimationFrame لجعل حركة السكرول ناعمة جداً وبدون تقطيع
    window.requestAnimationFrame(() => {
      setHeroScroll(window.scrollY);
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  const publicUrl = process.env.PUBLIC_URL || '';

  // قائمة عينات خامات وألوان الجلد لسلايدر الـ 3D Coverflow مع المسارات المباشرة من public/textures
  const leatherTextures = [
    { title: 'جلد كاربون فايبر', desc: 'شكل عصري فخم ومقاومة عالية للحرارة', image: `${publicUrl}/textures/carbon.jpg`, fallback: wheelCarbon, colorHex: '#09090B' },
    { title: 'جلد سادة ', desc: 'ملمس ناعم كلاسيكي  ', image: `${publicUrl}/textures/plain.jpg`, fallback: wheelPlain, colorHex: '#18181B' },
    { title: 'جلد منقط ', desc: 'مسامي يمنع التعرق و ثبات قبض اليد', image: `${publicUrl}/textures/dotted.jpg`, fallback: wheelDotted, colorHex: '#27272A' },
    { title: 'جلد فورجيد ', desc: 'نمط عصري يمنح الطارة هوية فريدة', image: `${publicUrl}/textures/forged.jpg`, fallback: wheelForged, colorHex: '#3F3F46' },
    { title: 'شامواه / ألكنتارا ', desc: 'أعلى درجات الراحة والعزل الحراري', image: `${publicUrl}/textures/alcantara.jpg`, fallback: wheelAlcantara, colorHex: '#52525B' },
    { title: 'جلد أحمر ', desc: 'طابع رياضي جريء عالي المقاومة', image: `${publicUrl}/textures/red.jpg`, fallback: wheelPlain, colorHex: '#DC2626' },
    { title: 'جلد أزرق ', desc: 'لمسه أنيقة وثبات عالي للون', image: `${publicUrl}/textures/blue.jpg`, fallback: wheelPlain, colorHex: '#2563EB' },
    { title: 'جلد أبيض ', desc: 'فخامة بمقاومة فائقة للحرارة', image: `${publicUrl}/textures/white.jpg`, fallback: wheelPlain, colorHex: '#F8FAFC' },
    { title: 'جلد رمادي ', desc: 'لون حيادي عصري', image: `${publicUrl}/textures/gray.jpg`, fallback: wheelPlain, colorHex: '#64748B' },
    { title: 'جلد بيج ', desc: ' فخم مع الدواخل والفرش البيج', image: `${publicUrl}/textures/beige.jpg`, fallback: wheelPlain, colorHex: '#D4B996' },
    { title: 'جلد جملي ', desc: 'درجة الجملي الكلاسيكية الفاخرة للسيارات الفارهة', image: `${publicUrl}/textures/camel.jpg`, fallback: wheelPlain, colorHex: '#C19A6B' },
    { title: 'جلد لبني ', desc: 'درجة ملكية داكنة فخمة  ', image: `${publicUrl}/textures/navy.jpg`, fallback: wheelPlain, colorHex: '#1E3A8A' },
    { title: 'جلد بني ', desc: 'مظهر جلدي دافئ وفخم  ', image: `${publicUrl}/textures/brown.jpg`, fallback: wheelPlain, colorHex: '#78350F' },
    { title: 'جلد فسفوري ', desc: 'مظهر رياضي مشع وجريء', image: `${publicUrl}/textures/green.jpg`, fallback: wheelPlain, colorHex: '#39FF14' },
    { title: 'جلد وردي (بينك)', desc: 'لمسة عصرية مميزة وجذابة', image: `${publicUrl}/textures/pink.jpg`, fallback: wheelPlain, colorHex: '#FF10F0' },
    { title: 'جلد أصفر ', desc: 'إطلالة رياضية حماسية ساطعة', image: `${publicUrl}/textures/yellow.jpg`, fallback: wheelPlain, colorHex: '#CCFF00' }
  ];


  const [activeTextureIndex, setActiveTextureIndex] = useState(0);

  const handlePrevTexture = () => {
    setActiveTextureIndex((prev) => (prev === 0 ? leatherTextures.length - 1 : prev - 1));
  };

  const handleNextTexture = () => {
    setActiveTextureIndex((prev) => (prev === leatherTextures.length - 1 ? 0 : prev + 1));
  };
const [touchStartX, setTouchStartX] = React.useState(null);

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    // مسافة حركة الإصبع
    if (diff > 45) {
      handleNextTexture(); // سحب لليسار: ينتقل للشكل التالي
    } else if (diff < -45) {
      handlePrevTexture(); // سحب لليمين: يرجع للشكل السابق
    }
    setTouchStartX(null);
  }; 
  const wheelOptions = [
    { id: 'plain', name: 'طارة: جلد سادة', price: 400, priceText: '400 ج.م', image: wheelPlain },
    { id: 'dotted', name: 'طارة: جلد منقط', price: 400, priceText: '400 ج.م', image: wheelDotted },
    { id: 'carbon', name: 'طارة: جلد كاربون', price: 400, priceText: '400 ج.م', image: wheelCarbon },
    { id: 'forged', name: 'طارة: جلد فورجيد', price: 400, priceText: '400 ج.م', image: wheelForged },
    { id: 'alcantara', name: 'طارة: جلد الكنتارا', price: 450, priceText: '450 ج.م', note: 'بدون ضمان', image: wheelAlcantara },
    { id: 'carbon_plain', name: 'ميكس: (كاربون + سادة)', price: 400, priceText: '400 ج.م', image: wheelCarbonPlain },
    { id: 'plain_dotted', name: 'ميكس: (سادة + منقط)', price: 400, priceText: '400 ج.م', image: wheelPlainDotted },
    { id: 'carbon_alcantara', name: 'ميكس: (كاربون + الكنتارا)', price: 450, priceText: '450 ج.م', image: wheelCarbonAlcantara },
    { id: 'carbon_dotted', name: 'ميكس: (كاربون + منقط)', price: 400, priceText: '400 ج.م', image: wheelCarbonDotted },
    { id: 'alcantara_dotted', name: 'ميكس: (الكنتارا + منقط)', price: 450, priceText: '450 ج.م', image: wheelAlcantaraDotted },
    { id: 'alcantara_forged', name: 'ميكس: (الكنتارا + فورجيد)', price: 450, priceText: '450 ج.م', image: wheelAlcantaraForged },
    { id: 'forged_plain', name: 'ميكس: (فورجيد + سادة)', price: 400, priceText: '400 ج.م', image: wheelForgedPlain },
    { id: 'forged_dotted', name: 'ميكس: (فورجيد + منقط)', price: 400, priceText: '400 ج.م', image: wheelForgedDotted },
    { 
      id: 'special_colors', 
      name: 'طارة: ألوان اسبيشيال', 
      price: 400, 
      priceText: '400 ج.م', 
      image: '/special-cover.png',
      isSpecial: true,
      videoSrc: `${process.env.PUBLIC_URL || ''}/special-video.mp4`,
      gallery: [wheelCarbon, wheelForged, wheelAlcantara]
    },
  ];

  const threadColors = [
    { name: 'أحمر', hex: '#E3211C' },
    { name: 'أزرق', hex: '#1D4ED8' },
    { name: 'أسود', hex: '#18181B' },
    { name: 'جملي', hex: '#C19A6B' },
    { name: 'بيج', hex: '#D4B996' },
    { name: 'لبني', hex: '#38BDF8' },
    { name: 'أصفر', hex: '#EAB308' },
    { name: 'أخضر', hex: '#16A34A' },
    { name: 'رمادي', hex: '#9CA3AF' },
    { name: 'بني', hex: '#78350F' }
  ];

  const [selectedWheel, setSelectedWheel] = useState(wheelOptions[0]);
  const [selectedThread, setSelectedThread] = useState(threadColors[0]);
  
  const [selectedGear, setSelectedGear] = useState('none');
  const [selectedHandbrake, setSelectedHandbrake] = useState('none');

  const totalPrice = useMemo(() => {
    let sum = selectedWheel.price;
    if (selectedGear === 'gear') sum += 250;
    if (selectedHandbrake === 'handbrake') sum += 150;
    return sum;
  }, [selectedWheel, selectedGear, selectedHandbrake]);

  const [modalMedia, setModalMedia] = useState(null);
  const [specialImgIndex, setSpecialImgIndex] = useState(0);

  useEffect(() => {
    let timer;
    if (modalMedia && modalMedia.gallery && modalMedia.gallery.length > 1 && !modalMedia.videoSrc) {
      timer = setInterval(() => {
        setSpecialImgIndex((prev) => (prev + 1) % modalMedia.gallery.length);
      }, 1500);
    }
    return () => clearInterval(timer);
  }, [modalMedia]);

  const dateInputRef = useRef(null);

  const todayStr = useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  const [selectedBranch, setSelectedBranch] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState(todayStr);
  const [appointmentTime, setAppointmentTime] = useState(TIME_SLOTS[0]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const [brandSearch, setBrandSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);

  const [modelSearch, setModelSearch] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [customModelInput, setCustomModelInput] = useState('');

  const filteredBrands = useMemo(() => {
    if (!CAR_DATABASE) return [];
    if (!brandSearch.trim()) return CAR_DATABASE;
    return CAR_DATABASE.filter(c => 
      c.brand.toLowerCase().includes(brandSearch.toLowerCase())
    );
  }, [brandSearch]);

  const currentBrandModels = useMemo(() => {
    if (!selectedBrand || !CAR_DATABASE) return [];
    const brandData = CAR_DATABASE.find(b => b.brand === selectedBrand);
    if (!brandData) return [];
    if (!modelSearch.trim()) return brandData.models;
    return brandData.models.filter(m => 
      m.toLowerCase().includes(modelSearch.toLowerCase())
    );
  }, [selectedBrand, modelSearch]);

  const triggerDatePicker = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === 'function') {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!selectedBranch) {
      alert('من فضلك اختر الفرع أولاً.');
      return;
    }
    if (!appointmentDate || !appointmentTime) {
      alert('من فضلك حدد ميعاد وساعة التركيب.');
      return;
    }
    const finalModel = selectedModel === 'other' ? customModelInput : selectedModel;
    if (!customerName || !customerPhone || !selectedBrand || !finalModel) {
      alert('من فضلك أكمل جميع بيانات السيارة والاتصال.');
      return;
    }

    const gearText = selectedGear === 'gear' ? 'مقبض فتيس (+250 ج.م)' : 'بدون فتيس';
    const handbrakeText = selectedHandbrake === 'handbrake' ? 'كسوة هاند بريك (+150 ج.م)' : 'بدون هاند بريك';

    const message = `*طلب حجز موعد جديد - WheelsSkins*%0A` +
      `--------------------------------%0A` +
      `*الفرع :* ${encodeURIComponent(selectedBranch)}%0A` +
      `*التاريخ :* ${encodeURIComponent(appointmentDate)}%0A` +
      `*الساعة:* ${encodeURIComponent(appointmentTime)}%0A` +
      `--------------------------------%0A` +
      `*الاسم:* ${encodeURIComponent(customerName)}%0A` +
      `*رقم الهاتف:* ${encodeURIComponent(customerPhone)}%0A` +
      `*السيارة:* ${encodeURIComponent(selectedBrand)} - ${encodeURIComponent(finalModel)}%0A` +
      `--------------------------------%0A` +
      `*كسوة الطارة:* ${encodeURIComponent(selectedWheel.name)}%0A` +
      `*الفتيس:* ${encodeURIComponent(gearText)}%0A` +
      `*الهاند بريك:* ${encodeURIComponent(handbrakeText)}%0A` +
      `--------------------------------%0A` +
      `*إجمالي المبلغ:* ${totalPrice} ج.م`;

    window.open(`https://wa.me/201202738020?text=${message}`, '_blank');
  };

  const scrollStepDown = () => {
    window.scrollBy({
      top: window.innerHeight * 0.85,
      behavior: 'smooth'
    });
  };

  const showcaseImages = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => `${publicUrl}/gallery/work${i + 1}.jpg`);
  }, [publicUrl]);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white font-['Cairo'] antialiased selection:bg-[#E3211C] selection:text-white" dir="rtl">
      {showIntro && <IntroScreen onFinish={() => setShowIntro(false)} />}
      {/* 1. Header Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/75 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded overflow-hidden flex items-center justify-center bg-black border border-zinc-800">
            <img src={logo} alt="Wheels Skins" className="h-full w-full object-contain" loading='lazy' />
          </div>
          <div className="text-right leading-tight">
            <div className="text-white font-bold text-lg tracking-wider flex items-center gap-1">
              WheelSkins <span className="text-[#E3211C] font-black">/</span>
            </div>
            <div className="text-xs text-zinc-400 font-medium">Wheels Skins</div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-300">
          <a href="#hero" className="text-[#E3211C] font-bold transition">Home</a>
          <a href="#textures" className="hover:text-white transition">Leather Textures</a>
          <a href="#pricing" className="hover:text-white transition">Materials and Prices</a>
          <a href="#configurator" className="hover:text-white transition">Configure Your Wheel</a>
          <a href="#branches" className="hover:text-white transition">Our Branches</a>
          <a href="#booking" className="hover:text-white transition">Book Your Appointment</a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a 
            href="https://www.facebook.com/share/1Dm5aEEjec/?mibextid=wwXIfr" 
            target="_blank" 
            rel="noopener noreferrer" 
            title="فيسبوك"
            className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>

          <a 
            href="https://www.instagram.com/wheels_skins?stkn=cTNnMnV0dWc3ZXc=" 
            target="_blank" 
            rel="noopener noreferrer" 
            title="إنستغرام"
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>

          <a 
            href="https://wa.me/201202738020" 
            target="_blank" 
            rel="noopener noreferrer" 
            title="واتساب"
            className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.944.558 3.766 1.523 5.309L2.094 22l4.82-1.406a9.98 9.98 0 0 0 5.117 1.437h.004c5.536 0 10.031-4.495 10.031-10.031C22.066 6.495 17.571 2 12.031 2zm0 18.234h-.003a8.196 8.196 0 0 1-4.172-1.141l-.3-.178-3.109.906.836-3.023-.195-.312A8.17 8.17 0 0 1 3.844 12.03c0-4.516 3.672-8.188 8.188-8.188 4.516 0 8.188 3.672 8.188 8.188 0 4.516-3.672 8.203-8.189 8.203zm4.492-6.133c-.246-.125-1.461-.723-1.688-.805-.227-.082-.391-.125-.555.125s-.641.805-.785.969-.289.184-.535.063c-.246-.125-1.043-.387-1.988-1.23-.734-.656-1.23-1.465-1.375-1.711-.145-.246-.016-.379.109-.504.109-.109.246-.289.367-.434.125-.145.164-.246.246-.41.082-.164.043-.309-.02-.434-.063-.125-.555-1.336-.762-1.832-.2-.48-.406-.418-.555-.426-.145-.008-.309-.008-.473-.008s-.434.063-.66.309c-.227.246-.867.848-.867 2.07 0 1.223.891 2.406 1.012 2.57.125.164 1.754 2.676 4.246 3.754.594.258 1.059.41 1.422.527.598.191 1.141.164 1.57.102.48-.07 1.461-.598 1.668-1.176.207-.578.207-1.074.145-1.176-.063-.102-.227-.164-.473-.285z"/>
            </svg>
          </a>

          <a 
            href="#booking" 
            className="bg-[#E3211C] hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded font-bold text-xs sm:text-sm transition flex items-center gap-1.5 mr-1"
          >
            <Calendar className="w-3.5 h-3.5" />Book now 
          </a>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover brightness-105 contrast-105"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        <div className="relative z-20 max-w-4xl mx-auto px-4 flex flex-col items-center">
          <div 
            className="relative z-10 text-center select-none"
            style={{ perspective: '1000px' }}
          >
            <h1 
              className="text-5xl sm:text-7xl md:text-8xl font-black tracking-wider transition-transform duration-75 ease-out opacity-85 hover:opacity-100"
              style={{
                transform: `translate3d(0, ${heroScroll * 0.4}px, ${heroScroll * 0.2}px) rotateX(${Math.min(heroScroll * 0.04, 15)}deg) scale(${Math.max(1 - heroScroll * 0.0008, 0.85)})`,
                opacity: Math.max((1 - heroScroll / 450) * 0.85, 0),
                textShadow: '0 10px 25px rgba(0,0,0,0.6), 0 0 20px rgba(227,49,28,0.25)'
              }}
            >
           <span className="text-white/80">Wheels </span>
           <span className="text-[#E3211C]/85">Skins</span>
           <span className="sr-only"> - تفصيل وكسوة طارات السيارات هاند ميد وتجليد دركسيون جلد طبيعي</span>
            </h1>
          </div>
        </div>
      </section>

      {/* 3. شريط الصور المتحرك اللانهائي الحقيقي - بدون أي فراغات */}
      <div className="relative w-full overflow-hidden bg-black/60 py-6 border-y border-zinc-900 select-none" dir="ltr">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scrollSeamless {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-infinite-marquee {
            display: flex;
            width: max-content;
            animation: scrollSeamless 35s linear infinite;
          }
          .animate-infinite-marquee:hover {
            animation-play-state: paused;
          }
        `}} />
        
        <div className="animate-infinite-marquee flex items-center gap-5">
          {[...showcaseImages, ...showcaseImages].map((imgSrc, idx) => (
            <div 
              key={idx} 
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex-shrink-0 flex items-center justify-center p-2.5 shadow-lg hover:border-[#E3211C] hover:scale-105 transition duration-300 cursor-pointer"
              onClick={() => setModalMedia({ src: imgSrc, title: `معاينة لقطة عمل #${(idx % 20) + 1}`, price: 'جودة 4K' })}
            >
              <img 
                src={imgSrc} 
                alt="Showcase" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = wheelPlain;
                }}
                className="w-full h-full object-cover rounded-xl filter drop-shadow pointer-events-none" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* 3.5 معرض خامات الجلد ثلاثي الأبعاد (Coverflow Slider) مع سهمين للتنقل */}
      <section id="textures" className="py-14 bg-gradient-to-b from-black via-zinc-950 to-[#0B0B0B] border-b border-zinc-900 overflow-hidden select-none">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 mb-3 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#E3211C] animate-pulse" />
            <span className="font-bold tracking-widest uppercase">LEATHER COLLECTION</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">كتالوج خامات وألوان الجلد المتاحة</h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-xl mx-auto">
            تصفح شكل وملمس الجلد الطبيعي والصناعي والرياضي المتاح للتفصيل الفوري
          </p>

          {/* حاوية الـ 3D Coverflow */}
          <div className="relative h-[340px] sm:h-[400px] flex items-center justify-center mt-6">
            {leatherTextures.map((item, index) => {
              const count = leatherTextures.length;
              let offset = (index - activeTextureIndex + count) % count;
              if (offset > count / 2) offset -= count;

              const isCenter = offset === 0;
              const isAdjacent = Math.abs(offset) === 1;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              return (
                <div
                  key={index}
                  onClick={() => setActiveTextureIndex(index)}
                  className="absolute cursor-pointer transition-all duration-500 ease-out will-change-transform"
                  style={{
                    transform: `translateX(${offset * 140}px) scale(${isCenter ? 1.12 : isAdjacent ? 0.85 : 0.65})`,
                    zIndex: 25 - Math.abs(offset),
                    opacity: isCenter ? 1 : isAdjacent ? 0.7 : 0.25,
                    filter: isCenter ? 'none' : 'blur(1px) brightness(0.6)'
                  }}
                >
                  <div className={`w-44 h-64 sm:w-56 sm:h-80 rounded-2xl p-3.5 flex flex-col items-center justify-between border-2 transition-all duration-300 ${
                    isCenter 
                      ? 'bg-zinc-900/95 border-[#E3211C] shadow-[0_0_40px_rgba(227,33,28,0.35)] ring-1 ring-red-500/50' 
                      : 'bg-zinc-950/80 border-zinc-800 shadow-xl'
                  }`}>
                    <div className="w-full h-40 sm:h-52 rounded-xl overflow-hidden bg-black/60 border border-zinc-800/80 flex items-center justify-center p-3 relative group">
                      <div 
                        className="w-full h-full rounded-lg flex items-center justify-center relative overflow-hidden"
                        style={{ backgroundColor: `${item.colorHex}20` }}
                      >
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = item.fallback;
                          }}
                          className="max-w-full max-h-full object-cover rounded-md filter drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                        />
                        <div 
                          className="absolute bottom-2 right-2 w-4 h-4 rounded-full border border-white/40 shadow-sm"
                          style={{ backgroundColor: item.colorHex }}
                          title={item.title}
                        />
                      </div>
                    </div>
                    <div className="text-center w-full py-1">
                      <h4 className="text-sm sm:text-base font-black text-white truncate">{item.title}</h4>
                      <p className="text-[10px] sm:text-xs text-zinc-400 truncate mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* أزرار الأسهم التفاعلية للتنقل بين خامات الجلد */}
<div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} className="flex items-center justify-center relative touch-pan-y select-none">            
            <button
             onClick={handleNextTexture}
              title="الخامة السابقة"
              className="w-11 h-11 rounded-full bg-zinc-900 border border-zinc-700 hover:border-[#E3211C] text-white hover:text-[#E3211C] flex items-center justify-center shadow-lg transition-all active:scale-90 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-1.5 overflow-hidden max-w-xs px-2">
              {leatherTextures.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeTextureIndex ? 'w-6 bg-[#E3211C]' : 'w-1.5 bg-zinc-700'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handlePrevTexture}
              title="الخامة التالية"
              className="w-11 h-11 rounded-full bg-zinc-900 border border-zinc-700 hover:border-[#E3211C] text-white hover:text-[#E3211C] flex items-center justify-center shadow-lg transition-all active:scale-90 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. سكشن الأسعار والخامات بإضاءة 4K ثلاثية الأبعاد ثابتة ومستمرة */}
      <section id="pricing" className="relative py-28 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E3211C]/20 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[250px] bg-red-950/25 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative z-10 text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 backdrop-blur-md mb-4 shadow-[0_0_25px_rgba(227,33,28,0.3)]">
            <span className="w-2 h-2 rounded-full bg-[#E3211C] animate-pulse" />
            <span className="text-xs font-black text-red-400 uppercase tracking-[0.25em]">
              MASTER CRAFTSMANSHIP
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            Premium Materials... Exceptional Quality.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-4 max-w-2xl mx-auto font-light leading-relaxed">
            تفصيل يدوي بدقة يجمع بين متانة الجلد وملمس الطاره المريح
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">

          <Card3D 
            delay={100} 
            glowColor="rgba(227,33,28,0.35)" 
            className="bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border border-red-500/40 hover:border-red-500 shadow-[0_0_30px_rgba(227,33,28,0.2)] hover:shadow-[0_0_45px_rgba(227,33,28,0.4)] p-7 flex flex-col justify-between group transition-all duration-300"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] font-black text-red-500 uppercase tracking-wider bg-red-950/60 border border-red-800/60 px-2.5 py-0.5 rounded-md shadow-sm">
                  Most Popular
                </span>
                <span className="text-xs text-zinc-500 font-mono">#01</span>
              </div>
              <h3 className="text-xl font-black text-white group-hover:text-red-400 transition-colors">
                كسوة الطارة والميكس
              </h3>
              <p className="text-xs text-zinc-400 mt-2 mb-6 leading-relaxed">
                (سادة • منقط • كاربون • فورجيد)
                </p>
              
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-black text-white tracking-tight group-hover:text-[#E3211C] transition-colors">400</span>
                <span className="text-xs font-bold text-zinc-400">ج.م</span>
                <span className="text-sm sm:text-base font-bold text-zinc-400 line-through decoration-red-500/80 decoration-2 mr-3">450 ج.م</span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 text-xs text-emerald-400 font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>ضمان معتمد لمدة سنة كاملة</span>
            </div>
          </Card3D>

          <Card3D 
            delay={200} 
            glowColor="rgba(245,158,11,0.35)" 
            className="bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border border-amber-500/50 hover:border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:shadow-[0_0_45px_rgba(245,158,11,0.4)] p-7 flex flex-col justify-between group transition-all duration-300"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider bg-amber-950/60 border border-amber-800/60 px-2.5 py-0.5 rounded-md shadow-sm">
                  SUPERCAR ED.
                </span>
                <span className="text-xs text-zinc-500 font-mono">#02</span>
              </div>
              <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
                ألكنتارا الماني فاخر
              </h3>
              <p className="text-xs text-zinc-400 mt-2 mb-6 leading-relaxed">
                ملمس عازل للحرارة والعرق مع إحكام خياطه الجلد لمنع أي فراغات
              </p>
              
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-black text-white tracking-tight group-hover:text-amber-400 transition-colors">450</span>
                <span className="text-xs font-bold text-zinc-400">ج.م</span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 text-xs text-amber-400 font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>خامة الكنتارا فاخره</span>
            </div>
          </Card3D>

          <Card3D 
            delay={300} 
            glowColor="rgba(227,33,28,0.3)" 
            className="bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border border-red-500/40 hover:border-red-500 shadow-[0_0_30px_rgba(227,33,28,0.2)] hover:shadow-[0_0_45px_rgba(227,33,28,0.4)] p-7 flex flex-col justify-between group transition-all duration-300"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] font-black text-zinc-300 uppercase tracking-wider bg-zinc-800/80 border border-zinc-700 px-2.5 py-0.5 rounded-md shadow-sm">
                  complementary touch
                </span>
                <span className="text-xs text-zinc-500 font-mono">#03</span>
              </div>
              <h3 className="text-xl font-black text-white group-hover:text-red-400 transition-colors">
                مقبض الفتيس
              </h3>
              <p className="text-xs text-zinc-400 mt-2 mb-6 leading-relaxed">
                تفصيل جلدي مخصص مع خياطة يدوي متطابقة مع الطارة
              </p>
              
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-black text-white tracking-tight group-hover:text-[#E3211C] transition-colors">250</span>
                <span className="text-xs font-bold text-zinc-400">ج.م</span>
                <span className="text-sm sm:text-base font-bold text-zinc-400 line-through decoration-red-500/80 decoration-2 mr-3">300 ج.م</span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 text-xs text-emerald-400 font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>ضمان معتمد لمدة سنة كاملة</span>
            </div>
          </Card3D>

          <Card3D 
            delay={400} 
            glowColor="rgba(227,33,28,0.3)" 
            className="bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border border-red-500/40 hover:border-red-500 shadow-[0_0_30px_rgba(227,33,28,0.2)] hover:shadow-[0_0_45px_rgba(227,33,28,0.4)] p-7 flex flex-col justify-between group transition-all duration-300"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] font-black text-zinc-300 uppercase tracking-wider bg-zinc-800/80 border border-zinc-700 px-2.5 py-0.5 rounded-md shadow-sm">
                  complementary touch
                </span>
                <span className="text-xs text-zinc-500 font-mono">#04</span>
              </div>
              <h3 className="text-xl font-black text-white group-hover:text-red-400 transition-colors">
                كسوة الهاند بريك
              </h3>
              <p className="text-xs text-zinc-400 mt-2 mb-6 leading-relaxed">
                إحكام شد الجلد لمنع أي فراغات وإعطاء مظهر لائق
              </p>
              
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-black text-white tracking-tight group-hover:text-[#E3211C] transition-colors">150</span>
                <span className="text-xs font-bold text-zinc-400">ج.م</span>
                <span className="text-sm sm:text-base font-bold text-zinc-400 line-through decoration-red-500/80 decoration-2 mr-3">200 ج.م</span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 text-xs text-emerald-400 font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>ضمان معتمد لمدة سنة كاملة</span>
            </div>
          </Card3D>

        </div>
      </section>

      {/* 5. Configurator Section */}
      <section id="configurator" className="py-20 px-6 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">Design your luxury cover and see the add-ons instantly.</h2>
          <p className="text-zinc-400 text-sm sm:text-base">اختر الطارة ثم حدد مقبض الفتيس أو الهاند بريك يمكن تغير الشكل في الفرع ايضا </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-zinc-950/80 p-6 sm:p-10 rounded-2xl border border-zinc-800">
          
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-2 space-y-6">
            <div 
              className="relative group w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full overflow-hidden border-2 bg-zinc-900/60 flex items-center justify-center p-6 shadow-2xl transition-all duration-300 cursor-pointer"
              style={{ borderColor: selectedThread.hex, boxShadow: `0 0 35px ${selectedThread.hex}33` }}
              onClick={() => setModalMedia({ 
                src: selectedWheel.image, 
                title: selectedWheel.name, 
                price: selectedWheel.priceText,
                videoSrc: selectedWheel.videoSrc,
                gallery: selectedWheel.gallery,
                isSpecial: selectedWheel.isSpecial
              })}
              title="اضغط لتكبير الطارة أو معاينة الفيديو"
            >
              <img 
                key={selectedWheel.id}
                src={selectedWheel.image} 
                alt={selectedWheel.name} 
                className="w-full h-full object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.95)] transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute top-4 right-4 bg-black/70 p-2 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4 text-white" />
              </div>
              
              <div className="absolute bottom-4 bg-black/90 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-700 flex items-center gap-2 text-xs">
                <span className="font-bold text-white">{selectedWheel.name}</span>
                <span className="text-[#E3211C] font-black">({selectedWheel.priceText})</span>
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-400">الخياطة:</span>
                <span className="w-3 h-3 rounded-full border border-white/40 inline-block" style={{ backgroundColor: selectedThread.hex }}></span>
                <span className="font-bold text-white">{selectedThread.name}</span>
              </div>
            </div>

            {(selectedGear === 'gear' || selectedHandbrake !== 'none') && (
              <div className="w-full max-w-sm grid grid-cols-2 gap-3 animate-in fade-in duration-300">
                {selectedGear === 'gear' && (
                  <div 
                    onClick={() => setModalMedia({
                      src: gearDotted,
                      title: 'مقبض فتيس تفصيل يدوي',
                      price: '250 ج.م'
                    })}
                    className="bg-zinc-900 border border-zinc-700 hover:border-[#E3211C] p-3 rounded-xl flex flex-col items-center text-center cursor-pointer transition shadow-md group"
                  >
                    <span className="text-[10px] text-zinc-400 block mb-1">الفتيس المختار:</span>
                    <div className="w-20 h-20 overflow-hidden flex items-center justify-center p-1">
                      <img 
                        src={gearDotted} 
                        alt="الفتيس" 
                        className="max-w-full max-h-full object-contain filter drop-shadow group-hover:scale-105 transition"
                      />
                    </div>
                    <span className="text-xs font-bold text-white mt-1">فتيس</span>
                    <span className="text-[10px] text-[#E3211C] font-semibold">250 ج.م (اضغط للتكبير)</span>
                  </div>
                )}

                {selectedHandbrake === 'handbrake' && (
                  <div 
                    onClick={() => setModalMedia({
                      src: handbrakeCover,
                      title: 'كسوة هاند بريك هاند ميد',
                      price: '150 ج.م'
                    })}
                    className="bg-zinc-900 border border-zinc-700 hover:border-[#E3211C] p-3 rounded-xl flex flex-col items-center text-center cursor-pointer transition shadow-md group"
                  >
                    <span className="text-[10px] text-zinc-400 block mb-1">الهاند بريك المختار:</span>
                    <div className="w-20 h-20 overflow-hidden flex items-center justify-center p-1">
                      <img 
                        src={handbrakeCover} 
                        alt="الهاند بريك" 
                        className="max-w-full max-h-full object-contain filter drop-shadow group-hover:scale-105 transition"
                      />
                    </div>
                    <span className="text-xs font-bold text-white mt-1">كسوة هاند بريك</span>
                    <span className="text-[10px] text-[#E3211C] font-semibold">150 ج.م (اضغط للتكبير)</span>
                  </div>
                )}
              </div>
            )}

            <p className="text-xs text-zinc-500 flex items-center gap-1">
              <ZoomIn className="w-3.5 h-3.5" /> يمكنك الضغط على أي قطعة لمشاهدتها بالحجم الكامل
            </p>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2.5">
          <label className="text-sm font-bold text-zinc-200 flex items-center gap-1.5 flex-wrap">
          <span>1. خامة وميكس الطارة (إجباري):</span>
          <span className="text-[11px] text-amber-400 font-normal bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
            (يمكنك تغيير اختيار الجلد في الفرع أيضاً)
          </span>
          </label>                <span className="text-xs font-bold text-[#E3211C]">{selectedWheel.priceText}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                {wheelOptions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedWheel(item)}
                    className={`py-2 px-3 text-xs font-bold rounded-lg border text-right transition flex items-center justify-between ${
                      selectedWheel.id === item.id 
                        ? 'border-[#E3211C] bg-[#E3211C]/20 text-white shadow-sm' 
                        : 'border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <span className="truncate">{item.name}</span>
                    {selectedWheel.id === item.id && <span className="w-2 h-2 rounded-full bg-[#E3211C] shrink-0 mr-1"></span>}
                  </button>
                ))}
              </div>

              {selectedWheel.note && (
                <div className="mt-2 text-xs text-amber-400 flex items-center gap-1 font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5" /> {selectedWheel.note}
                </div>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-sm font-bold text-zinc-200">2. لون خياطة الطارة:</label>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                  {selectedThread.name}
                </span>
              </div>
              
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {threadColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedThread(color)}
                    className={`h-8 w-8 rounded-full transition-transform flex items-center justify-center border-2 ${
                      selectedThread.name === color.name 
                        ? 'scale-110 border-white shadow-[0_0_12px_rgba(255,255,255,0.5)]' 
                        : 'border-zinc-700 opacity-80 hover:opacity-100 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="bg-zinc-900/70 p-4 rounded-xl border border-zinc-800 space-y-4">
              <label className="text-xs font-extrabold text-zinc-200 uppercase tracking-wider block">
                3. إضافات تفصيل اختياري (تظهر صورها مباشرة عند الاختيار):
              </label>

              <div>
                <span className="text-xs text-zinc-400 block mb-1.5 font-semibold">مقبض الفتيس:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedGear('none')}
                    className={`py-2.5 px-2 text-xs font-bold rounded-lg border transition ${
                      selectedGear === 'none' 
                        ? 'bg-zinc-800 text-white border-zinc-600' 
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    بدون فتيس
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedGear('gear')}
                    className={`py-2.5 px-2 text-xs font-bold rounded-lg border transition ${
                      selectedGear === 'gear' 
                        ? 'bg-[#E3211C] text-white border-[#E3211C] shadow-md shadow-red-900/40' 
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    فتيس (+250)
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800/80">
                <span className="text-xs text-zinc-400 block mb-1.5 font-semibold">كسوة الهاند بريك:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedHandbrake('none')}
                    className={`py-2.5 px-2 text-xs font-bold rounded-lg border transition ${
                      selectedHandbrake === 'none' 
                        ? 'bg-zinc-800 text-white border-zinc-600' 
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    بدون هاند بريك
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedHandbrake('handbrake')}
                    className={`py-2.5 px-2 text-xs font-bold rounded-lg border transition ${
                      selectedHandbrake === 'handbrake' 
                        ? 'bg-[#E3211C] text-white border-[#E3211C] shadow-md shadow-red-900/40' 
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    كسوة هاند بريك (+150)
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-black/60 p-3.5 rounded-xl border border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400 block">الإجمالي التقديري:</span>
                <span className="text-xl font-black text-[#E3211C]">{totalPrice} ج.م</span>
              </div>
              <a
                href="#booking"
                className="py-2.5 px-5 bg-[#E3211C] hover:bg-red-700 text-white font-bold rounded-lg flex items-center gap-2 text-xs transition transform active:scale-95 shadow-lg shadow-red-900/30"
              >
                <span>متابعة الحجز</span>
                <ChevronLeft className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Branches Section */}
      <section id="branches" className="py-16 px-6 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">Our Branches and Live Location</h2>
          <p className="text-zinc-400 text-sm">Click on any branch to open its live location on Google Maps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BRANCHES_DATA.map((branch) => (
            <div 
              key={branch.id} 
              className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 flex flex-col justify-between hover:border-zinc-700 transition shadow-lg"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-lg bg-[#E3211C]/10 text-[#E3211C] border border-[#E3211C]/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{branch.name}</h3>
                    <span className="text-xs text-zinc-400">{branch.address}</span>
                  </div>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed mb-6">{branch.hours}</p>
              </div>

              <a
                href={branch.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-zinc-900 hover:bg-[#E3211C] text-zinc-300 hover:text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 border border-zinc-800 hover:border-[#E3211C]"
              >
                <span>فتح اللوكيشن على الخريطة</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Booking Section */}
      <section id="booking" className="py-16 px-6 max-w-3xl mx-auto border-t border-zinc-900 text-center">
        <h2 className="text-2xl sm:text-3xl font-black mb-3">Book Your Appointment Now</h2>
        <p className="text-zinc-400 text-sm mb-8">Choose a branch, select an appropriate time, and you will be redirected immediately to confirm your booking via WhatsApp</p>

        <form className="space-y-6 text-right bg-zinc-950 p-6 sm:p-8 rounded-2xl border border-zinc-800" onSubmit={handleBookingSubmit}>
          
          <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/80">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-[#E3211C] text-white flex items-center justify-center text-xs font-black">1</span>
              <label className="text-sm font-bold text-white">اختر الفرع أولاً (إجباري) *</label>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {BRANCHES_DATA.map((b) => (
                <button
                  type="button"
                  key={b.id}
                  onClick={() => setSelectedBranch(b.name)}
                  className={`p-3 text-xs font-bold rounded-xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${
                    selectedBranch === b.name 
                      ? 'bg-[#E3211C] text-white border-[#E3211C] shadow-lg shadow-red-900/30' 
                      : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>{b.name}</span>
                </button>
              ))}
            </div>

            {selectedBranch && (
              <div className="mt-4 p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-4 animate-in fade-in duration-300">
                
                <div className="flex items-center justify-between text-xs font-bold text-white border-b border-zinc-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#E3211C]" />
                    <span>ميعاد وساعة التركيب في {selectedBranch} *</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                    محدد اليوم تلقائياً
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-zinc-300 mb-1.5 font-semibold">
                      تاريخ يوم التركيب (اضغط لتغييره):
                    </label>
                    
                    <div 
                      onClick={triggerDatePicker}
                      className="relative w-full bg-zinc-900 hover:bg-zinc-850 border-2 border-zinc-700 hover:border-[#E3211C] rounded-xl p-3 flex items-center justify-between cursor-pointer transition shadow-md group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-[#E3211C]/15 text-[#E3211C] group-hover:bg-[#E3211C] group-hover:text-white transition">
                          <CalendarDays className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs font-extrabold text-white block">
                            {appointmentDate === todayStr ? `اليوم (${appointmentDate})` : appointmentDate}
                          </span>
                          <span className="text-[10px] text-zinc-400">
                            {appointmentDate === todayStr ? 'الموعد المبدئي اليوم' : 'تم اختيار يوم آخر'}
                          </span>
                        </div>
                      </div>

                      <span className="text-[11px] font-bold text-white bg-[#E3211C] group-hover:bg-red-700 px-3 py-1.5 rounded-lg shadow transition flex items-center gap-1">
                        <span>تغيير اليوم</span>
                        <Calendar className="w-3.5 h-3.5" />
                      </span>

                      <input
                        ref={dateInputRef}
                        type="date"
                        value={appointmentDate}
                        min={todayStr}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-zinc-300 mb-1.5 font-semibold">
                      الساعة المناسبة (كل نصف ساعة) *
                    </label>
                    <div className="relative">
                      <select
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        className="w-full bg-zinc-900 border-2 border-zinc-700 hover:border-[#E3211C] rounded-xl p-3.5 text-xs text-white font-bold outline-none focus:border-[#E3211C] transition cursor-pointer [color-scheme:dark]"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>

          <div className={`space-y-4 transition-all duration-300 ${!selectedBranch ? 'opacity-40 pointer-events-none select-none' : 'opacity-100'}`}>
            
            <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
              <span className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center text-xs font-black">2</span>
              <span className="text-sm font-bold text-white">بيانات السيارة والعميل</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">الاسم بالكامل *</label>
                <input 
                  type="text" 
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm text-white focus:border-[#E3211C] outline-none" 
                  placeholder="اكتب اسمك..." 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">رقم الهاتف / واتساب *</label>
                <input 
                  type="tel" 
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm text-white focus:border-[#E3211C] outline-none" 
                  placeholder="01xxxxxxxxx" 
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">ماركة السيارة (ابحث أو اختر) *</label>
              <div 
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm text-white flex items-center justify-between cursor-pointer hover:border-zinc-500"
                onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}
              >
                <span className={selectedBrand ? 'text-white font-bold' : 'text-zinc-500'}>
                  {selectedBrand ? selectedBrand : 'اختر ماركة العربية من هنا...'}
                </span>
                <ChevronLeft className={`w-4 h-4 text-zinc-400 transition-transform ${isBrandDropdownOpen ? '-rotate-90' : ''}`} />
              </div>

              {isBrandDropdownOpen && (
                <div className="absolute z-30 top-full mt-2 w-full bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-2 max-h-60 flex flex-col">
                  <div className="relative mb-2">
                    <input
                      type="text"
                      value={brandSearch}
                      onChange={(e) => setBrandSearch(e.target.value)}
                      placeholder="ابحث بالاسم (مثلاً: BMW, تويوتا, هيونداي)..."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-3 pr-8 text-xs text-white outline-none focus:border-[#E3211C]"
                      autoFocus
                    />
                    <Search className="w-3.5 h-3.5 text-zinc-500 absolute right-2.5 top-3" />
                  </div>

                  <div className="overflow-y-auto space-y-1 pr-1">
                    {filteredBrands.map((item) => (
                      <div
                        key={item.brand}
                        onClick={() => {
                          setSelectedBrand(item.brand);
                          setSelectedModel('');
                          setCustomModelInput('');
                          setIsBrandDropdownOpen(false);
                        }}
                        className="px-3 py-2 text-xs rounded hover:bg-[#E3211C]/20 hover:text-white cursor-pointer flex items-center justify-between text-zinc-300 transition"
                      >
                        <span>{item.brand}</span>
                        {selectedBrand === item.brand && <Check className="w-3.5 h-3.5 text-[#E3211C]" />}
                      </div>
                    ))}
                    {filteredBrands.length === 0 && (
                      <div className="p-3 text-center text-xs text-zinc-500">لا توجد ماركة مطابقة</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {selectedBrand && (
              <div className="relative animate-in fade-in duration-200">
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  موديل سيارة {selectedBrand} المحدد *
                </label>

                <div 
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm text-white flex items-center justify-between cursor-pointer hover:border-zinc-500"
                  onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                >
                  <span className={selectedModel ? 'text-white font-bold' : 'text-zinc-500'}>
                    {selectedModel === 'other' 
                      ? 'موديل آخر (كتابة يدوية)' 
                      : (selectedModel || 'اختر الموديل المحدد من هنا...')}
                  </span>
                  <ChevronLeft className={`w-4 h-4 text-zinc-400 transition-transform ${isModelDropdownOpen ? '-rotate-90' : ''}`} />
                </div>

                {isModelDropdownOpen && (
                  <div className="absolute z-20 top-full mt-2 w-full bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-2 max-h-56 flex flex-col">
                    <div className="relative mb-2">
                      <input
                        type="text"
                        value={modelSearch}
                        onChange={(e) => setModelSearch(e.target.value)}
                        placeholder="ابحث عن الموديل (مثلاً: RB, CN7, Golf 7)..."
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-3 pr-8 text-xs text-white outline-none focus:border-[#E3211C]"
                        autoFocus
                      />
                      <Search className="w-3.5 h-3.5 text-zinc-500 absolute right-2.5 top-3" />
                    </div>git commit -m "Add 3D leather textures coverflow slider and images"

                    <div className="overflow-y-auto space-y-1 pr-1">
                      {currentBrandModels.map((model) => (
                        <div
                          key={model}
                          onClick={() => {
                            setSelectedModel(model);
                            setIsModelDropdownOpen(false);
                          }}
                          className="px-3 py-2 text-xs rounded hover:bg-[#E3211C]/20 hover:text-white cursor-pointer flex items-center justify-between text-zinc-300 transition"
                        >
                          <span>{model}</span>
                          {selectedModel === model && <Check className="w-3.5 h-3.5 text-[#E3211C]" />}
                        </div>
                      ))}

                      <div
                        onClick={() => {
                          setSelectedModel('other');
                          setIsModelDropdownOpen(false);
                        }}
                        className="px-3 py-2 text-xs rounded hover:bg-zinc-800 text-amber-400 cursor-pointer font-bold border-t border-zinc-800 mt-1"
                      >
                        + موديل آخر مش موجود بالقائمة
                      </div>
                    </div>
                  </div>
                )}

                {selectedModel === 'other' && (
                  <div className="mt-2">
                    <input
                      type="text"
                      required
                      value={customModelInput}
                      onChange={(e) => setCustomModelInput(e.target.value)}
                      placeholder="اكتب اسم وموديل وسنة سيارتك هنا..."
                      className="w-full bg-zinc-900 border border-amber-500/50 rounded-lg p-3 text-xs text-white outline-none focus:border-amber-400"
                    />
                  </div>
                )}
              </div>
            )}

            <div className="bg-zinc-900/80 p-4 rounded-xl border border-zinc-800 text-xs space-y-1.5 text-zinc-300">
              <div className="flex justify-between font-bold">
                <span>الطارة: {selectedWheel.name} ({selectedThread.name})</span>
                <span className="text-white">{selectedWheel.priceText}</span>
              </div>
              {selectedGear === 'gear' && (
                <div className="flex justify-between text-zinc-400">
                  <span>الفتيس: مقبض فتيس</span>
                  <span>+250 ج.م</span>
                </div>
              )}
              {selectedHandbrake === 'handbrake' && (
                <div className="flex justify-between text-zinc-400">
                  <span>الهاند بريك: كسوة هاند</span>
                  <span>+150 ج.م</span>
                </div>
              )}
              <div className="pt-2 border-t border-zinc-700 flex justify-between font-black text-sm text-[#E3211C]">
                <span>الإجمالي النهائي:</span>
                <span>{totalPrice} ج.م</span>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black rounded-xl transition mt-2 flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 text-sm cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.944.558 3.766 1.523 5.309L2.094 22l4.82-1.406a9.98 9.98 0 0 0 5.117 1.437h.004c5.536 0 10.031-4.495 10.031-10.031C22.066 6.495 17.571 2 12.031 2zm0 18.234h-.003a8.196 8.196 0 0 1-4.172-1.141l-.3-.178-3.109.906.836-3.023-.195-.312A8.17 8.17 0 0 1 3.844 12.03c0-4.516 3.672-8.188 8.188-8.188 4.516 0 8.188 3.672 8.188 8.188 0 4.516-3.672 8.203-8.189 8.203zm4.492-6.133c-.246-.125-1.461-.723-1.688-.805-.227-.082-.391-.125-.555.125s-.641.805-.785.969-.289.184-.535.063c-.246-.125-1.043-.387-1.988-1.23-.734-.656-1.23-1.465-1.375-1.711-.145-.246-.016-.379.109-.504.109-.109.246-.289.367-.434.125-.145.164-.246.246-.41.082-.164.043-.309-.02-.434-.063-.125-.555-1.336-.762-1.832-.2-.48-.406-.418-.555-.426-.145-.008-.309-.008-.473-.008s-.434.063-.66.309c-.227.246-.867.848-.867 2.07 0 1.223.891 2.406 1.012 2.57.125.164 1.754 2.676 4.246 3.754.594.258 1.059.41 1.422.527.598.191 1.141.164 1.57.102.48-.07 1.461-.598 1.668-1.176.207-.578.207-1.074.145-1.176-.063-.102-.227-.164-.473-.285z"/>
              </svg>
              <span>تأكيد الحجز ومتابعة الميعاد عبر واتساب</span>
            </button>

          </div>

          {!selectedBranch && (
            <p className="text-xs text-amber-400/90 text-center font-semibold mt-2">
              ⚠️ يرجى الضغط على الفرع أولاً لتفعيل بيانات الحجز والمواعيد
            </p>
          )}

        </form>
      </section>

      {/* 8. زر عائم دائري في منتصف الشاشة من الأسفل للنزول التدريجي */}
      <button 
        onClick={scrollStepDown}
        title="انزل خطوة لأسفل"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-12 h-12 rounded-full bg-zinc-900/90 border border-zinc-700 text-white flex items-center justify-center shadow-2xl hover:bg-[#E3211C] hover:border-[#E3211C] transition-all transform hover:scale-110 active:scale-95 group backdrop-blur-sm cursor-pointer"
      >
        <ChevronDown className="w-6 h-6 group-hover:translate-y-0.5 transition-transform animate-bounce" />
      </button>

      {/* 9. Footer */}
      <footer className="py-8 border-t border-zinc-900 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} WheelSkins. جميع الحقوق محفوظة. By Maestro omar fox
      </footer>

      {/* 10. المعاينة المنبثقة الذكية (Modal) */}
      {modalMedia && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setModalMedia(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/80 hover:text-white bg-zinc-800/80 hover:bg-[#E3211C] p-2.5 rounded-full transition shadow-lg cursor-pointer"
            onClick={() => setModalMedia(null)}
          >
            <X className="w-6 h-6" />
          </button>

          <div 
            className="relative max-w-3xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {modalMedia.videoSrc ? (
              <video 
                src={modalMedia.videoSrc} 
                autoPlay 
                loop 
                muted 
                playsInline
                preload="none"
                controls
                className="max-w-full max-h-[70vh] rounded-2xl border border-zinc-800 shadow-2xl"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : modalMedia.isSpecial && modalMedia.gallery ? (
              <div className="relative flex flex-col items-center">
                <img 
                  src={modalMedia.gallery[specialImgIndex]} 
                  alt={modalMedia.title} 
                  className="max-w-full max-h-[70vh] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)] transition-all duration-500"
                />
                <div className="flex gap-2 mt-3">
                  {modalMedia.gallery.map((_, i) => (
                    <span 
                      key={i} 
                      className={`h-2 rounded-full transition-all duration-300 ${i === specialImgIndex ? 'w-6 bg-[#E3211C]' : 'w-2 bg-zinc-700'}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <img 
                src={modalMedia.src} 
                alt={modalMedia.title} 
                className="max-w-full max-h-[75vh] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
              />
            )}

            <div className="mt-4 text-center bg-zinc-950/80 px-6 py-2.5 rounded-full border border-zinc-800">
              <h3 className="text-base font-bold text-white inline-block ml-3">{modalMedia.title}</h3>
              <span className="text-[#E3211C] font-black text-sm">{modalMedia.price}</span>
            </div>
          </div>
        </div>
      )}
      <div className="py-8 max-w-6xl mx-auto px-4">
        <div className="elfsight-app-93f92eec-4ab1-4e6a-a32b-0bb44040f15b" data-elfsight-app-lazy></div>
      </div>
     <Analytics />
    </div>
  );
}