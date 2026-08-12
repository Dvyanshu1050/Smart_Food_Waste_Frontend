import React from "react";

// --- Reusable Sub-Components ---

const Stat = ({ value, label, showDivider }) => (
  <>
    <div>
      <p className="text-3xl font-black text-green-600">{value}</p>
      <p className="mt-1 text-sm font-medium text-gray-500">{label}</p>
    </div>
    {showDivider && <div className="hidden h-12 w-px bg-gray-200 sm:block" />}
  </>
);

const OrbitIcon = ({ emoji, positionClasses, delay }) => (
  <div className={`absolute h-14 w-14 ${positionClasses}`}>
    <div
      className="flex h-full w-full items-center justify-center rounded-2xl bg-white text-2xl shadow-[0_8px_25px_rgba(0,0,0,0.10)]"
      style={{
        animation: `iconScale 2.2s ease-in-out infinite ${delay}s`,
      }}
      aria-hidden="true"
    >
      {emoji}
    </div>
  </div>
);

// --- Main Component ---

const Mission = () => {
  return (
    <>
      <style>{`
        @keyframes orbitRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes iconScale { 0%, 100% { transform: scale(0.78); } 50% { transform: scale(1.18); } }
        @keyframes centerPulse { 0%, 100% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.4; } 50% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.8; } }
      `}</style>

      <section className="w-full bg-gray-50 py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6">
          
          {/* HEADER */}
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-600">
              Our Mission
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
              Turning Surplus Into <span className="text-green-600">Impact</span>
            </h2>
            <p className="mt-3 text-gray-500">
              Every donation can become a meal for someone who needs it.
            </p>
          </header>

          {/* MAIN CONTENT */}
          <div className="mx-auto mt-12 w-full max-w-6xl">
            <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
              
              {/* LEFT CONTENT */}
              <div>
                {/* LABEL */}
                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-green-700">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  FoodBridge Impact
                </div>

                {/* TITLE & DESCRIPTION */}
                <h3 className="text-3xl font-black leading-tight tracking-tight text-gray-900 md:text-4xl">
                  One donation. <br />
                  <span className="text-green-600">One less wasted meal.</span>
                </h3>
                <p className="mt-5 max-w-xl text-base leading-7 text-gray-500">
                  FoodBridge connects people with surplus food to NGOs and
                  volunteers who can help deliver it to people who need it.
                </p>

                {/* IMPACT NUMBERS */}
                <div className="mt-7 flex flex-wrap items-center gap-8">
                  <Stat value="12K+" label="Meals donated" showDivider={true} />
                  <Stat value="9K+" label="Meals delivered" showDivider={true} />
                  <Stat value="250+" label="Active donors" showDivider={false} />
                </div>
              </div>

              {/* RIGHT SIDE: ROTATING IMPACT ORBIT */}
              <div className="flex justify-center md:justify-end">
                <div className="relative h-[330px] w-[330px] sm:h-[360px] sm:w-[360px]">
                  
                  {/* BACKGROUND GLOW */}
                  <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-300/30 blur-3xl" />

                  {/* ORBIT RINGS */}
                  <div className="pointer-events-none absolute inset-5 rounded-full border border-gray-200" />
                  <div className="pointer-events-none absolute inset-16 rounded-full border border-dashed border-gray-200" />

                  {/* ROTATING ORBIT CONTAINER */}
                  <div className="absolute inset-0 animate-[orbitRotate_18s_linear_infinite]">
                    <OrbitIcon 
                      emoji="🥗" 
                      positionClasses="left-1/2 top-0 -translate-x-1/2" 
                      delay={0} 
                    />
                    <OrbitIcon 
                      emoji="🔎" 
                      positionClasses="right-0 top-1/2 -translate-y-1/2" 
                      delay={0.5} 
                    />
                    <OrbitIcon 
                      emoji="🚚" 
                      positionClasses="bottom-0 left-1/2 -translate-x-1/2" 
                      delay={1.0} 
                    />
                    <OrbitIcon 
                      emoji="❤️" 
                      positionClasses="left-0 top-1/2 -translate-y-1/2" 
                      delay={1.5} 
                    />
                  </div>

                  {/* CENTER IMPACT BUTTON */}
                  <div className="absolute left-1/2 top-1/2 z-20 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 text-white shadow-[0_18px_50px_rgba(16,185,129,0.30)]">
                    <span className="text-4xl" aria-hidden="true">🍽️</span>
                    <span className="mt-1 text-[10px] font-black uppercase tracking-[0.2em]">
                      Impact
                    </span>
                  </div>

                  {/* CENTER PULSE */}
                  <div className="pointer-events-none absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 animate-[centerPulse_3s_ease-in-out_infinite] rounded-full bg-green-400/20 blur-2xl" />
                
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Mission;