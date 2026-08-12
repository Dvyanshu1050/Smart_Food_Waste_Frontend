import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Process from "./Process";
import Footer from "../components/Footer";
import CallToAction from "../components/CallToAction";
import ImpactMap from "../components/ImpactMap";
import Mission from "./Mission";

/* =========================================================
   SOLAR CURSOR
   The orbits rotate, while each planet counter-rotates so
   the planet image stays upright.
========================================================= */

const SolarCursor = () => {
  const cursorRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const frame = useRef(null);
  const isVisible = useRef(false); // 🟢 Tracks if cursor should be visible

  useEffect(() => {
    const handleMouseMove = (event) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;

      // 🟢 Check if hovering over a section with data-solar-cursor="true"
      if (event.target.closest('[data-solar-cursor="true"]')) {
        isVisible.current = true;
      } else {
        isVisible.current = false;
      }
    };

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.18;
      current.current.y += (target.current.y - current.current.y) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
        // 🟢 Apply opacity based on hover state (smooth transition handled by CSS)
        cursorRef.current.style.opacity = isVisible.current ? "1" : "0";
      }

      frame.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    frame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div ref={cursorRef} className="solar-cursor" aria-hidden="true" style={{ opacity: 0, transition: 'opacity 0.3s ease' }}>
      <div className="solar-sun" />

      <div className="solar-orbit solar-orbit-1">
        <div className="solar-planet solar-planet-1">
          <span className="solar-planet-image" />
        </div>
      </div>

      <div className="solar-orbit solar-orbit-2">
        <div className="solar-planet solar-planet-2">
          <span className="solar-planet-image" />
        </div>
      </div>

      <div className="solar-orbit solar-orbit-3">
        <div className="solar-planet solar-planet-3">
          <span className="solar-planet-image" />
        </div>
      </div>
    </div>
  );
};

const processSteps = [
  {
    number: "01",
    icon: "🥗",
    title: "Donate",
    description: "Donors list their surplus food with quantity and pickup details.",
    color: "green",
    gradient: "from-green-400 to-green-600",
    light: "bg-green-50",
    text: "text-green-600",
    border: "hover:border-green-200",
    shadow: "hover:shadow-[0_25px_70px_rgba(16,185,129,0.18)]",
  },
  {
    number: "02",
    icon: "🔎",
    title: "Discover",
    description: "NGOs and volunteers find available donations nearby.",
    color: "blue",
    gradient: "from-blue-400 to-blue-600",
    light: "bg-blue-50",
    text: "text-blue-600",
    border: "hover:border-blue-200",
    shadow: "hover:shadow-[0_25px_70px_rgba(59,130,246,0.18)]",
  },
  {
    number: "03",
    icon: "🚚",
    title: "Pickup",
    description: "Volunteers collect the food safely from the donor's location.",
    color: "orange",
    gradient: "from-orange-400 to-orange-600",
    light: "bg-orange-50",
    text: "text-orange-500",
    border: "hover:border-orange-200",
    shadow: "hover:shadow-[0_25px_70px_rgba(249,115,22,0.18)]",
  },
  {
    number: "04",
    icon: "❤️",
    title: "Deliver",
    description: "Food reaches NGOs and people who need it.",
    color: "purple",
    gradient: "from-purple-400 to-purple-600",
    light: "bg-purple-50",
    text: "text-purple-600",
    border: "hover:border-purple-200",
    shadow: "hover:shadow-[0_25px_70px_rgba(168,85,247,0.18)]",
  },
];

const stats = [
  { value: "12K+", label: "Meals Donated" },
  { value: "9K+", label: "Meals Distributed" },
  { value: "250+", label: "Active Donors" },
  { value: "80+", label: "NGOs & Volunteers" },
];

const Home = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-white">
      <SolarCursor />

      {/* =====================================================
          HERO (Added data-solar-cursor="true")
      ===================================================== */}
      <section 
        data-solar-cursor="true" 
        className="relative min-h-[calc(100vh-74px)] overflow-hidden bg-black cursor-none"
      >
        {/* BACKGROUND VIDEO */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videos/food-story.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/55" />

        {/* LEFT GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/10" />

        {/* BOTTOM GRADIENT */}
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-black/90 to-transparent" />

        {/* HERO CONTENT */}
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-74px)] max-w-7xl items-center px-6">
          <div className="max-w-3xl text-white">
            
            {/* BADGE */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-green-300 shadow-lg backdrop-blur-md">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.9)]" />
              Reduce Food Waste • Feed People
            </div>

            {/* HEADING */}
            <h1 className="animate-fade-up text-5xl font-black leading-[0.95] tracking-[-0.045em] sm:text-6xl md:text-7xl">
              Don't Waste
              <br />
              <span className="text-green-400 drop-shadow-[0_0_25px_rgba(74,222,128,0.3)]">
                Good Food.
              </span>
            </h1>

            {/* SUB HEADING */}
            <h2 className="mt-6 text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
              Someone, somewhere,
              <span className="text-green-300"> needs it.</span>
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-200 sm:text-lg md:text-xl">
              Every day, perfectly good food is wasted while people in need
              struggle to get enough to eat. FoodBridge connects surplus food
              with NGOs and volunteers who can turn it into someone's next meal.
            </p>

            {/* BUTTONS */}
            <div className="mt-9 flex flex-wrap gap-4">
              {/* DONATE */}
              <Link
                to="/register"
                className="group relative isolate overflow-hidden rounded-xl border border-green-400 bg-green-500 px-7 py-3.5 text-base font-bold text-white shadow-[0_10px_35px_rgba(34,197,94,0.3)] transition-all duration-300 hover:-translate-y-1 hover:text-green-700 hover:shadow-[0_15px_45px_rgba(34,197,94,0.45)]"
              >
                <span className="absolute inset-0 -z-10 translate-y-full bg-white transition-transform duration-300 group-hover:translate-y-0" />
                <span className="relative z-10">Donate Food →</span>
              </Link>

              {/* FIND DONATIONS */}
              <Link
                to="/ngo/available-donations"
                className="rounded-xl border border-white/40 bg-white/10 px-7 py-3.5 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-green-700 hover:shadow-[0_10px_35px_rgba(255,255,255,0.2)]"
              >
                Find Donations
              </Link>
            </div>

            {/* IMPACT POINTS */}
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-green-400/30 bg-green-500/20">🍽️</span>
                <span className="font-medium">Save meals</span>
              </div>
              <div className="hidden h-6 w-px bg-white/20 sm:block" />
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-green-400/30 bg-green-500/20">❤️</span>
                <span className="font-medium">Feed communities</span>
              </div>
              <div className="hidden h-6 w-px bg-white/20 sm:block" />
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-green-400/30 bg-green-500/20">🌱</span>
                <span className="font-medium">Reduce waste</span>
              </div>
            </div>

          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 md:flex">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Explore</span>
          <div className="flex h-10 w-6 justify-center rounded-full border border-white/40 pt-2">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white" />
          </div>
        </div>
      </section>

      {/* =====================================================
          IMPACT MAP
      ===================================================== */}
      <ImpactMap />

      {/* =====================================================
          STATS
      ===================================================== */}
      <section className="relative overflow-hidden bg-white py-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-96 -translate-x-1/2 rounded-full bg-green-100/40 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group rounded-2xl p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:bg-green-50 hover:shadow-[0_20px_50px_rgba(16,185,129,0.12)]"
              >
                <h2 className="text-4xl font-black text-green-600 transition-transform duration-500 group-hover:scale-110">
                  {stat.value}
                </h2>
                <p className="mt-2 font-medium text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          MISSION
      ===================================================== */}
      <Mission />

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}
      <Process />

      {/* =====================================================
          CTA
      ===================================================== */}
      <CallToAction />

      {/* =====================================================
          FOOTER (Wrapped in data-solar-cursor so cursor shows here too)
      ===================================================== */}
      <div data-solar-cursor="true" className="cursor-none">
        <Footer />
      </div>

    </div>
  );
};

export default Home;