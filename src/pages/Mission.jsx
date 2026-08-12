import React from "react";

const Stat = ({ value, label, divider }) => (
  <div className="flex items-center gap-8">
    <div>
      <p className="text-3xl font-black text-green-600">{value}</p>
      <p className="mt-1 text-sm font-medium text-gray-500">{label}</p>
    </div>

    {divider && (
      <div className="hidden h-12 w-px bg-gray-200 sm:block" />
    )}
  </div>
);

/* =========================================================
   ORBIT ICON
   Outer element moves around the circle.
   Inner element counter-rotates so emoji stays straight.
========================================================= */

const OrbitIcon = ({ emoji, className }) => {
  return (
    <div className={`absolute ${className}`}>
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-white
          text-2xl
          shadow-[0_8px_25px_rgba(0,0,0,0.12)]
        "
        style={{
          animation: "counterOrbit 12s linear infinite",
        }}
      >
        {emoji}
      </div>
    </div>
  );
};

const Mission = () => {
  return (
    <section className="w-full overflow-hidden bg-gray-50 py-16 md:py-20">

      {/* =====================================================
          ANIMATION CSS
      ===================================================== */}

      <style>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes counterOrbit {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes pulseImpact {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0.25;
          }

          50% {
            transform: translate(-50%, -50%) scale(1.15);
            opacity: 0.5;
          }
        }

        @keyframes floatImpact {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0);
          }

          50% {
            transform: translate(-50%, -50%) translateY(-7px);
          }
        }
      `}</style>


      <div className="mx-auto w-full max-w-7xl px-6">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-600">
            Our Mission
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
            Turning Surplus Into{" "}
            <span className="text-green-600">
              Impact
            </span>
          </h2>

          <p className="mt-3 text-gray-500">
            Every donation can become a meal for someone who needs it.
          </p>

        </div>


        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="mx-auto mt-12 w-full max-w-6xl">

          <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">

            {/* =================================================
                LEFT
            ================================================= */}

            <div>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-green-700">

                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

                FoodBridge Impact

              </div>


              <h3 className="text-3xl font-black leading-tight tracking-tight text-gray-900 md:text-4xl">

                One donation.

                <br />

                <span className="text-green-600">
                  One less wasted meal.
                </span>

              </h3>


              <p className="mt-5 max-w-xl text-base leading-7 text-gray-500">
                FoodBridge connects people with surplus food to NGOs
                and volunteers who can help deliver it to people who
                need it.
              </p>


              {/* STATS */}

              <div className="mt-7 flex flex-wrap items-center gap-8">

                <Stat
                  value="12K+"
                  label="Meals donated"
                  divider
                />

                <Stat
                  value="9K+"
                  label="Meals delivered"
                  divider
                />

                <Stat
                  value="250+"
                  label="Active donors"
                />

              </div>

            </div>


            {/* =================================================
                RIGHT ORBIT
            ================================================= */}

            <div className="flex justify-center md:justify-end">

              <div className="relative h-[350px] w-[350px]">

                {/* GLOW */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    h-72
                    w-72
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-green-200/40
                    blur-3xl
                  "
                />


                {/* OUTER RING */}

                <div
                  className="
                    absolute
                    inset-5
                    rounded-full
                    border
                    border-gray-200
                  "
                />


                {/* INNER RING */}

                <div
                  className="
                    absolute
                    inset-16
                    rounded-full
                    border
                    border-dashed
                    border-gray-200
                  "
                />


                {/* =================================================
                    THIS WHOLE THING ROTATES
                ================================================= */}

                <div
                  className="absolute inset-0"
                  style={{
                    animation: "orbit 12s linear infinite",
                  }}
                >

                  {/* TOP */}

                  <OrbitIcon
                    emoji="🥗"
                    className="
                      left-1/2
                      top-0
                      -translate-x-1/2
                    "
                  />


                  {/* RIGHT */}

                  <OrbitIcon
                    emoji="🔎"
                    className="
                      right-0
                      top-1/2
                      -translate-y-1/2
                    "
                  />


                  {/* BOTTOM */}

                  <OrbitIcon
                    emoji="❤️"
                    className="
                      bottom-0
                      left-1/2
                      -translate-x-1/2
                    "
                  />


                  {/* LEFT */}

                  <OrbitIcon
                    emoji="🚚"
                    className="
                      left-0
                      top-1/2
                      -translate-y-1/2
                    "
                  />

                </div>


                {/* =================================================
                    CENTER GLOW
                ================================================= */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    h-40
                    w-40
                    rounded-full
                    bg-green-400/20
                    blur-2xl
                  "
                  style={{
                    animation: "pulseImpact 3s ease-in-out infinite",
                  }}
                />


                {/* =================================================
                    CENTER
                ================================================= */}

                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    z-20
                    flex
                    h-32
                    w-32
                    flex-col
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-green-500
                    via-emerald-500
                    to-green-600
                    text-white
                    shadow-[0_18px_50px_rgba(16,185,129,0.30)]
                  "
                  style={{
                    animation: "floatImpact 4s ease-in-out infinite",
                  }}
                >

                  <span className="text-4xl">
                    🍽️
                  </span>

                  <span className="mt-1 text-[10px] font-black uppercase tracking-[0.2em]">
                    Impact
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Mission;