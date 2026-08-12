import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300">

      <div className="mx-auto max-w-7xl px-6 py-12 md:py-14">

        {/* =====================================================
            MAIN FOOTER
        ===================================================== */}

        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">

          {/* BRAND */}

          <div className="max-w-xl">

            <h2 className="text-3xl font-black tracking-tight text-white">
              Food
              <span className="text-green-500">Bridge</span>
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-gray-400">
              Connecting surplus food with people who need it —
              reducing food waste and creating meaningful impact.
            </p>

            <div
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-green-500/20
                bg-green-500/10
                px-4
                py-2
                text-xs
                font-semibold
                text-green-400
              "
            >
              <span className="text-sm">🌱</span>

              <span>Reduce Waste. Create Impact.</span>
            </div>

          </div>


          {/* RIGHT INFO */}

          <div className="md:text-right">

            <p className="text-sm text-gray-400">

              © 2026{" "}

              <span className="font-semibold text-white">
                FoodBridge
              </span>

              . All rights reserved.

            </p>

            <p className="mt-2 text-xs text-gray-500">
              Reduce Waste. Share Food. Create Impact.
            </p>


            {/* DEVELOPER */}

            <div
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/[0.04]
                px-4
                py-2
                transition-all
                duration-300
                hover:border-green-500/20
                hover:bg-green-500/5
              "
            >

              <span className="text-xs text-gray-500">
                Built with
              </span>

              <span className="text-xs text-red-400">
                ❤️
              </span>

              <span className="text-xs text-gray-500">
                by
              </span>

              <span className="text-sm font-bold text-green-400">
                Mr.Dev
              </span>

            </div>

          </div>

        </div>


        {/* =====================================================
            DIVIDER
        ===================================================== */}

        <div className="my-10 h-px bg-white/10" />


        {/* =====================================================
            BOTTOM
        ===================================================== */}

        <div
          className="
            flex
            flex-col
            items-center
            justify-between
            gap-3
            text-center
            text-xs
            text-gray-500
            sm:flex-row
            sm:text-left
          "
        >

          <p>
            Every meal saved is a step toward a better tomorrow.
          </p>

          <p className="text-gray-600">
            FoodBridge • Smart Food Donation Platform
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;