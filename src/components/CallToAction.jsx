import React from "react";
import { Link } from "react-router-dom"; 

const CallToAction = () => {
  return (
    <>
      {/* Custom Animations for Floating Elements */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-5deg); }
        }
      `}</style>

      {/* Main Section Background (White/Off-white for contrast) */}
      <section className="bg-white py-24 md:py-32 relative overflow-hidden">
        
        <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
          
          {/* =====================================================
              MAIN CTA CARD - DEEP PREMIUM GRADIENT
          ===================================================== */}
          <div className="group relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#022c22] via-[#065f46] to-[#047857] px-8 py-16 text-center shadow-[0_30px_80px_rgba(4,120,87,0.3)] md:px-16 md:py-20 lg:py-24">

            {/* =====================================================
                BACKGROUND DECORATIONS & GLOWS
            ===================================================== */}
            {/* Top Right Warm Glow */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-500/20 blur-[100px] transition-transform duration-1000 group-hover:scale-110" />
            
            {/* Bottom Left Emerald Glow */}
            <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-emerald-400/20 blur-[100px] transition-transform duration-1000 group-hover:scale-110" />

            {/* Subtle Grid Pattern Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />

            {/* =====================================================
                FLOATING 3D-LIKE ICONS (DECORATION)
            ===================================================== */}
            {/* Floating Heart */}
            <div className="absolute left-[10%] top-[20%] hidden md:block" style={{ animation: 'float 6s ease-in-out infinite' }}>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl shadow-2xl backdrop-blur-md">
                ❤️
              </div>
            </div>
            
            {/* Floating Bowl */}
            <div className="absolute right-[12%] top-[30%] hidden md:block" style={{ animation: 'float-reverse 7s ease-in-out infinite' }}>
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl shadow-2xl backdrop-blur-md">
                🍲
              </div>
            </div>

            {/* Floating Star/Sparkle */}
            <div className="absolute bottom-[20%] left-[15%] hidden md:block" style={{ animation: 'float-reverse 5s ease-in-out infinite' }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl shadow-2xl backdrop-blur-md text-amber-300">
                ✨
              </div>
            </div>

            {/* =====================================================
                MAIN CONTENT
            ===================================================== */}
            <div className="relative z-20 flex flex-col items-center">
              
              {/* SLOGAN BADGE */}
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-5 py-2 text-sm font-bold uppercase tracking-[0.2em] text-amber-300 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
                </span>
                Share Food • Share Hope
              </div>

              {/* HEADING */}
              <h2 className="mx-auto max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Your Surplus is <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">
                  Someone's Survival.
                </span>
              </h2>

              {/* SUBTITLE */}
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-emerald-100/80 md:text-xl">
                Every single day, perfectly good food gets thrown away while millions sleep hungry. 
                Be the bridge. Donate your extra food today and bring a smile to someone's face.
              </p>

              {/* ACTION AREA */}
              <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
                
                {/* Primary Button */}
                <Link
                  to="/register"
                  className="
                    group 
                    relative 
                    inline-flex 
                    items-center 
                    justify-center 
                    gap-3 
                    overflow-hidden 
                    rounded-full 
                    bg-white 
                    px-10 
                    py-5 
                    font-black 
                    text-[#065f46] 
                    transition-all 
                    duration-300 
                    hover:-translate-y-1.5 
                    hover:shadow-[0_20px_40px_rgba(255,255,255,0.25)] 
                    hover:bg-amber-50
                    focus:outline-none 
                    focus:ring-4 
                    focus:ring-emerald-400/50
                  "
                >
                  <span className="relative z-10 text-lg tracking-wide uppercase">
                    Start Donating Now
                  </span>
                  
                  {/* Icon */}
                  <svg
                    className="relative z-10 h-6 w-6 transition-transform duration-300 group-hover:translate-x-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>

              </div>

              {/* =====================================================
                  TRUST INDICATORS (SOCIAL PROOF)
              ===================================================== */}
              <div className="mt-12 flex items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-sm">
                <div className="flex -space-x-3">
                  {/* Dummy Avatar Circles */}
                  <div className="h-10 w-10 rounded-full border-2 border-[#065f46] bg-gray-200 bg-[url('https://i.pravatar.cc/100?img=1')] bg-cover" />
                  <div className="h-10 w-10 rounded-full border-2 border-[#065f46] bg-gray-300 bg-[url('https://i.pravatar.cc/100?img=2')] bg-cover" />
                  <div className="h-10 w-10 rounded-full border-2 border-[#065f46] bg-gray-400 bg-[url('https://i.pravatar.cc/100?img=3')] bg-cover" />
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#065f46] bg-emerald-500 text-xs font-bold text-white">
                    +2k
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-white">Join 2,500+ Donors</p>
                  <p className="text-xs text-emerald-200/70">Making an impact daily</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CallToAction;