import React from "react";

// =========================================================
// DATA & ICONS
// =========================================================
const processSteps = [
  {
    number: "01",
    title: "Donate",
    description: "Donors list their surplus food with quantity, category and pickup details.",
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21a9.002 9.002 0 0 0 8.716-6.747A3.299 3.299 0 0 0 18.25 11H5.75a3.3 3.3 0 0 0-2.466 3.253A9.002 9.002 0 0 0 12 21z"/>
        <path d="m15 11-1-9"/><path d="m9 11 1-9"/><path d="M2 11h20"/>
      </svg>
    ),
    colors: {
      text: "text-green-600",
      bgLight: "bg-green-50",
      gradient: "from-green-400 to-emerald-600",
      borderHover: "group-hover:border-green-200",
      shadowHover: "group-hover:shadow-[0_20px_40px_rgba(16,185,129,0.12)]",
      watermark: "text-green-500/5",
    },
  },
  {
    number: "02",
    title: "Discover",
    description: "NGOs and volunteers discover available food donations nearby.",
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
    ),
    colors: {
      text: "text-blue-600",
      bgLight: "bg-blue-50",
      gradient: "from-blue-400 to-cyan-600",
      borderHover: "group-hover:border-blue-200",
      shadowHover: "group-hover:shadow-[0_20px_40px_rgba(59,130,246,0.12)]",
      watermark: "text-blue-500/5",
    },
  },
  {
    number: "03",
    title: "Pickup",
    description: "Volunteers collect the food safely from the donor's location.",
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>
      </svg>
    ),
    colors: {
      text: "text-orange-600",
      bgLight: "bg-orange-50",
      gradient: "from-orange-400 to-amber-600",
      borderHover: "group-hover:border-orange-200",
      shadowHover: "group-hover:shadow-[0_20px_40px_rgba(249,115,22,0.12)]",
      watermark: "text-orange-500/5",
    },
  },
  {
    number: "04",
    title: "Deliver",
    description: "The donated food reaches NGOs and people who need it most.",
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      </svg>
    ),
    colors: {
      text: "text-purple-600",
      bgLight: "bg-purple-50",
      gradient: "from-purple-400 to-violet-600",
      borderHover: "group-hover:border-purple-200",
      shadowHover: "group-hover:shadow-[0_20px_40px_rgba(168,85,247,0.12)]",
      watermark: "text-purple-500/5",
    },
  },
];

// =========================================================
// MAIN COMPONENT
// =========================================================
const Process = () => {
  return (
    <>
      <style>{`
        /* Creates a continuous flowing animation for the connecting line */
        @keyframes flowGradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>

      <section className="relative w-full overflow-hidden bg-gray-50 py-20 md:py-28">
        
        {/* BACKGROUND GLOWS */}
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-green-300/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-purple-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          
          {/* HEADER */}
          <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-green-700 shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              Simple Process
            </div>

            <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              How{" "}
              <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-700 bg-clip-text text-transparent">
                FoodBridge
              </span>{" "}
              Works
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-500 md:text-lg">
              From surplus food to someone who needs it.
              <br className="hidden sm:block" />
              <span className="font-semibold text-gray-700"> Every step creates an impact.</span>
            </p>
          </div>

          {/* PROCESS GRID */}
          <div className="relative">
            
            {/* CONNECTING LINE (Desktop Only) */}
            <div className="pointer-events-none absolute left-[12%] right-[12%] top-[40px] hidden h-1.5 overflow-hidden rounded-full bg-gray-100 lg:block">
              <div
                className="h-full w-full opacity-70"
                style={{
                  background: "linear-gradient(90deg, #34d399, #60a5fa, #fb923c, #c084fc, #34d399, #60a5fa)",
                  backgroundSize: "200% 100%",
                  animation: "flowGradient 4s linear infinite",
                }}
              />
            </div>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {processSteps.map((step, index) => (
                <div key={step.number} className="group relative">
                  
                  {/* FLOATING ICON */}
                  <div className="relative z-20 mx-auto flex h-20 w-20 items-center justify-center">
                    {/* Pulsing Glow behind icon */}
                    <div className={`absolute inset-0 rounded-full ${step.colors.bgLight} scale-110 animate-pulse transition-all duration-500 group-hover:scale-125`} />
                    
                    {/* Icon Container */}
                    <div
                      className={`relative flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br ${step.colors.gradient} text-white shadow-lg transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-6 group-hover:scale-110`}
                    >
                      {step.svg}
                    </div>
                  </div>

                  {/* CARD */}
                  <div
                    className={`relative -mt-10 min-h-[280px] overflow-hidden rounded-[24px] border border-gray-100 bg-white p-8 pt-14 text-center shadow-sm transition-all duration-500 group-hover:-translate-y-2 ${step.colors.borderHover} ${step.colors.shadowHover}`}
                  >
                    {/* Animated Top Border */}
                    <div
                      className={`absolute left-0 right-0 top-0 h-1.5 origin-left scale-x-0 bg-gradient-to-r ${step.colors.gradient} transition-transform duration-500 ease-out group-hover:scale-x-100`}
                    />

                    {/* Background Watermark Number */}
                    <span className={`pointer-events-none absolute -right-4 -top-2 text-8xl font-black ${step.colors.watermark} transition-transform duration-500 group-hover:scale-110`}>
                      {step.number}
                    </span>

                    {/* Step Label */}
                    <p className={`relative mt-2 text-xs font-black uppercase tracking-[0.2em] ${step.colors.text}`}>
                      Step {step.number}
                    </p>

                    {/* Title */}
                    <h3 className="relative mt-3 text-2xl font-black text-gray-900">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="relative mt-4 text-sm leading-relaxed text-gray-500">
                      {step.description}
                    </p>

                    {/* Impact Tag (Only on last card) */}
                    {index === processSteps.length - 1 && (
                      <div className="absolute bottom-6 left-0 right-0 flex justify-center text-xs font-black uppercase tracking-widest text-purple-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <span className="flex items-center gap-1 bg-purple-50 px-3 py-1 rounded-full">
                          ❤️ Impact Created
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM MESSAGE */}
          <div className="mt-16 text-center lg:mt-24">
            <div className="inline-flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-2 pr-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-600 md:text-base">
                Small action. <span className="font-bold text-green-600">Big impact.</span>
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Process;