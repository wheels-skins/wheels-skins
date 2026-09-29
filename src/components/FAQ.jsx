import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "هل تركيب الكسوة بيحتاج فك الطارة أو الإيرباج (Airbag)؟",
    a: "نهائياً. التركيب بيتم بالكامل والطارة راكبة في مكانها وبدون لمس أو فك الإيرباج أو أي جزء من أجزاء الطارة الكهربائيه، وده بيضمن أمان عربيتك بنسبة 100%."
  },
  {
    q: "هل بتستخدموا أي نوع من أنواع الغراء أو اللزق على الطارة الأصلية؟",
    a: "لا نستخدم أي مواد لاصقة إطلاقاً. الكسوة بتتفصل وتتخيط خياطة يدوية مشدودة بإحكام على مقاس الطارة، وده بيحافظ على خامة الطارة الأصلية تماماً لو حبيت تشيل الكسوة في أي وقت."
  },
  {
    q: "التركيب بياخد وقت قد إيه؟",
    a: "التركيب بياخد 30 دقيقة فقط بفضل خبرتنا اللي بتزيد عن 10 سنين وتخصصنا، وبنسلمك العربية جاهزة بدون انتظار طويل."
  },
  {
    q: "إيه نوع الجلد المستخدم، وهل بيتحمل حرارة الصيف والشمس؟",
    a: "بنستخدم جلد ألماني عالي الجودة مخصص للسيارات، يتميز بمقاومته العالية لدرجات الحرارة، أشعة الشمس المباشرة، والاحتكاك اليومي، بدون ما يقشر أو يتشقق مع الاستخدام مع ضمان سنه معتمده."
  },
  {
    q: "هل أقدر أختار شكل الكسوة ولون الخيط؟",
    a: "أكيد، متاح اختيار التصميم اللي يناسب ذوقك ولون عربيتك، سواء جلد سادة أو منقط او كاربون او فورجيد او الكنتارا او الوان او مع حرية اختيار لون الخيط اللي تليق مع فرش العربية الداخلي."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative w-full py-28 bg-[#030303] overflow-hidden" dir="rtl">
      
      {/* ── خلفية النجوم المتحركة المتلألئة ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* نجوم صغيرة متلألئة */}
        <div className="absolute top-12 right-[15%] w-1.5 h-1.5 bg-white rounded-full animate-twinkle-fast" />
        <div className="absolute top-32 left-[20%] w-1 h-1 bg-[#E3211C] rounded-full animate-twinkle-slow" />
        <div className="absolute top-1/2 right-[30%] w-1.5 h-1.5 bg-white rounded-full animate-twinkle-slow" />
        <div className="absolute bottom-20 left-[25%] w-2 h-2 bg-[#E3211C] rounded-full animate-twinkle-fast opacity-60" />
        <div className="absolute bottom-36 right-[10%] w-1 h-1 bg-white rounded-full animate-twinkle-fast" />
        <div className="absolute top-20 left-[45%] w-1.5 h-1.5 bg-white rounded-full animate-twinkle-slow" />
        
        {/* إضاءة سينمائية خافتة في الخلفية */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E3211C] opacity-[0.03] blur-[140px] rounded-full" />
      </div>

      {/* محتوى الأسئلة الشائعة */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10">
        
        {/* عنوان القسم */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-wide">
            الأسئلة <span className="text-[#E3211C] drop-shadow-[0_0_15px_rgba(227,33,28,0.5)]">الشائعة</span>
          </h2>
          <div className="w-16 h-1 bg-[#E3211C] mx-auto rounded-full shadow-[0_0_10px_rgba(227,33,28,0.8)]" />
        </div>

        {/* قائمة الأسئلة */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const num = String(index + 1).padStart(2, '0');

            return (
              <div 
                key={index}
                className={`group relative overflow-hidden rounded-xl transition-all duration-300 backdrop-blur-md
                  ${isOpen 
                    ? 'bg-[#0c0c0c] border border-[#E3211C]/40 shadow-[0_5px_20px_rgba(227,33,28,0.2)]' 
                    : 'bg-[#070707] border border-white/5 hover:border-white/15 cursor-pointer'
                  }`}
              >
                {/* رأس السؤال */}
                <div 
                  onClick={() => toggleFAQ(index)}
                  className="relative z-20 p-5 sm:px-8 sm:py-6 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className={`text-xl sm:text-2xl font-black italic transition-colors duration-300
                      ${isOpen ? 'text-[#E3211C]' : 'text-zinc-600 group-hover:text-zinc-400'}
                    `}>
                      {num}
                    </span>
                    <h3 className={`text-base sm:text-xl font-bold transition-colors duration-300 leading-snug
                      ${isOpen ? 'text-white' : 'text-zinc-300 group-hover:text-white'}
                    `}>
                      {faq.q}
                    </h3>
                  </div>
                  
                  <div className={`flex-shrink-0 transition-all duration-500 transform
                    ${isOpen ? 'text-[#E3211C] rotate-180 scale-110' : 'text-zinc-500 group-hover:text-zinc-300'}
                  `}>
                    <ChevronDown size={24} strokeWidth={2} />
                  </div>
                </div>

                {/* الإجابة */}
                <div 
                  className="grid transition-all duration-300 ease-in-out bg-[#050505]"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="pt-4 pb-8 px-6 sm:px-14 text-base sm:text-lg leading-relaxed text-zinc-400">
                      {faq.a}
                    </p>
                  </div>
                </div>
                
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}