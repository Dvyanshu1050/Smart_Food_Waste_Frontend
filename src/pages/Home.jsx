import { Link } from "react-router-dom";
import ImpactMap from "../components/ImpactMap";
import Mission from "./Mission";

const Home = () => {
  return (
    <div className="w-full bg-white">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-[calc(100vh-74px)] overflow-hidden bg-black">

        {/* VIDEO */}

        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source
            src="/videos/food-story.mp4"
            type="video/mp4"
          />

          Your browser does not support the video tag.
        </video>


        {/* DARK OVERLAY */}

        <div className="absolute inset-0 bg-black/55" />


        {/* LEFT GRADIENT */}

        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-black/85
            via-black/55
            to-black/10
          "
        />


        {/* BOTTOM GRADIENT */}

        <div
          className="
            absolute bottom-0 left-0 right-0
            h-48
            bg-gradient-to-t
            from-black/80
            to-transparent
          "
        />


        {/* HERO CONTENT */}

        <div
          className="
            relative z-10
            mx-auto flex
            min-h-[calc(100vh-74px)]
            max-w-7xl
            items-center
            px-6
          "
        >

          <div className="max-w-3xl text-white">

            {/* LABEL */}

            <div
              className="
                mb-7 inline-flex
                items-center gap-2
                rounded-full
                border border-white/20
                bg-white/10
                px-4 py-2
                text-sm font-semibold
                text-green-300
                shadow-lg
                backdrop-blur-md
              "
            >

              <span
                className="
                  h-2 w-2
                  rounded-full
                  bg-green-400
                  shadow-[0_0_12px_rgba(74,222,128,0.9)]
                  animate-pulse
                "
              />

              Reduce Food Waste • Feed People

            </div>


            {/* HEADING */}

            <h1
              className="
                text-5xl
                font-black
                leading-[0.95]
                tracking-[-0.045em]
                sm:text-6xl
                md:text-7xl
              "
            >

              Don't Waste

              <br />

              <span
                className="
                  text-green-400
                  drop-shadow-[0_0_25px_rgba(74,222,128,0.25)]
                "
              >
                Good Food.
              </span>

            </h1>


            {/* SUB HEADING */}

            <h2
              className="
                mt-6
                text-2xl
                font-bold
                leading-tight
                sm:text-3xl
                md:text-4xl
              "
            >

              Someone, somewhere,

              <span className="text-green-300">
                {" "}needs it.
              </span>

            </h2>


            {/* DESCRIPTION */}

            <p
              className="
                mt-6
                max-w-2xl
                text-base
                leading-relaxed
                text-gray-200
                sm:text-lg
                md:text-xl
              "
            >
              Every day, perfectly good food is wasted while
              people in need struggle to get enough to eat.
              FoodBridge connects surplus food with NGOs and
              volunteers who can turn it into someone's next meal.
            </p>


            {/* BUTTONS */}

            <div className="mt-9 flex flex-wrap gap-4">

              {/* DONATE */}

              <Link
                to="/register"
                className="
                  group relative isolate overflow-hidden
                  rounded-xl
                  border border-green-400
                  bg-green-500
                  px-7 py-3.5
                  text-base font-bold text-white
                  shadow-[0_10px_35px_rgba(34,197,94,0.30)]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:text-green-700
                  hover:shadow-[0_15px_45px_rgba(34,197,94,0.40)]
                "
              >

                <span
                  className="
                    absolute inset-0 -z-10
                    translate-y-full
                    bg-white
                    transition-transform duration-300
                    group-hover:translate-y-0
                  "
                />

                <span className="relative z-10">
                  Donate Food →
                </span>

              </Link>


              {/* FIND DONATIONS */}

              <Link
                to="/ngo/available-donations"
                className="
                  rounded-xl
                  border border-white/40
                  bg-white/10
                  px-7 py-3.5
                  text-base font-bold text-white
                  backdrop-blur-md
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-white
                  hover:bg-white
                  hover:text-green-700
                  hover:shadow-[0_10px_35px_rgba(255,255,255,0.18)]
                "
              >
                Find Donations
              </Link>

            </div>


            {/* IMPACT POINTS */}

            <div
              className="
                mt-10
                flex flex-wrap
                items-center
                gap-6
                text-sm text-gray-300
              "
            >

              <div className="flex items-center gap-2">

                <span
                  className="
                    flex h-9 w-9
                    items-center justify-center
                    rounded-full
                    border border-green-400/30
                    bg-green-500/20
                  "
                >
                  🍽️
                </span>

                <span className="font-medium">
                  Save meals
                </span>

              </div>


              <div className="hidden h-6 w-px bg-white/20 sm:block" />


              <div className="flex items-center gap-2">

                <span
                  className="
                    flex h-9 w-9
                    items-center justify-center
                    rounded-full
                    border border-green-400/30
                    bg-green-500/20
                  "
                >
                  ❤️
                </span>

                <span className="font-medium">
                  Feed communities
                </span>

              </div>


              <div className="hidden h-6 w-px bg-white/20 sm:block" />


              <div className="flex items-center gap-2">

                <span
                  className="
                    flex h-9 w-9
                    items-center justify-center
                    rounded-full
                    border border-green-400/30
                    bg-green-500/20
                  "
                >
                  🌱
                </span>

                <span className="font-medium">
                  Reduce waste
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* SCROLL */}

        <div
          className="
            absolute bottom-7 left-1/2
            z-20 hidden
            -translate-x-1/2
            flex-col items-center gap-2
            text-white/70
            md:flex
          "
        >

          <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
            Explore
          </span>

          <div
            className="
              flex h-10 w-6
              justify-center
              rounded-full
              border border-white/40
              pt-2
            "
          >

            <span
              className="
                h-1.5 w-1.5
                rounded-full
                bg-white
                animate-bounce
              "
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="w-full bg-white py-16">

        <div className="mx-auto w-full max-w-7xl px-6">

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">

            <div
              className="
                group rounded-2xl p-6 text-center
                transition-all duration-300
                hover:-translate-y-1
                hover:bg-green-50
                hover:shadow-lg
              "
            >

              <h2 className="text-4xl font-black text-green-600">
                12K+
              </h2>

              <p className="mt-2 font-medium text-gray-500">
                Meals Donated
              </p>

            </div>


            <div
              className="
                group rounded-2xl p-6 text-center
                transition-all duration-300
                hover:-translate-y-1
                hover:bg-green-50
                hover:shadow-lg
              "
            >

              <h2 className="text-4xl font-black text-green-600">
                9K+
              </h2>

              <p className="mt-2 font-medium text-gray-500">
                Meals Distributed
              </p>

            </div>


            <div
              className="
                group rounded-2xl p-6 text-center
                transition-all duration-300
                hover:-translate-y-1
                hover:bg-green-50
                hover:shadow-lg
              "
            >

              <h2 className="text-4xl font-black text-green-600">
                250+
              </h2>

              <p className="mt-2 font-medium text-gray-500">
                Active Donors
              </p>

            </div>


            <div
              className="
                group rounded-2xl p-6 text-center
                transition-all duration-300
                hover:-translate-y-1
                hover:bg-green-50
                hover:shadow-lg
              "
            >

              <h2 className="text-4xl font-black text-green-600">
                80+
              </h2>

              <p className="mt-2 font-medium text-gray-500">
                NGOs & Volunteers
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          INDIA IMPACT MAP
      ===================================================== */}

      <ImpactMap />


      {/* =====================================================
          OUR MISSION
      ===================================================== */}

      <Mission />


      {/* =====================================================
          HOW FOODBRIDGE WORKS
      ===================================================== */}

      <section className="w-full bg-gray-50 py-20">

        <div className="mx-auto w-full max-w-7xl px-6">

          {/* HEADER */}

          <div className="mb-12 text-center">

            <p className="text-sm font-bold tracking-wider text-green-600">
              SIMPLE PROCESS
            </p>

            <h2
              className="
                mt-2
                text-3xl
                font-black
                text-gray-900
                md:text-4xl
              "
            >
              How FoodBridge Works
            </h2>

            <p className="mt-4 text-gray-500">
              From surplus food to someone who needs it.
            </p>

          </div>


          {/* STEPS */}

          <div className="grid gap-8 md:grid-cols-4">

            {/* DONATE */}

            <div
              className="
                group
                rounded-2xl
                bg-white
                p-7
                text-center
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
              "
            >

              <div
                className="
                  mx-auto flex h-14 w-14
                  items-center justify-center
                  rounded-full
                  bg-green-100
                  text-2xl
                  transition-transform duration-300
                  group-hover:scale-110
                "
              >
                🥗
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Donate
              </h3>

              <p className="mt-3 leading-relaxed text-gray-500">
                Donors list their surplus food with
                quantity and pickup details.
              </p>

            </div>


            {/* DISCOVER */}

            <div
              className="
                group
                rounded-2xl
                bg-white
                p-7
                text-center
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
              "
            >

              <div
                className="
                  mx-auto flex h-14 w-14
                  items-center justify-center
                  rounded-full
                  bg-blue-100
                  text-2xl
                  transition-transform duration-300
                  group-hover:scale-110
                "
              >
                🔎
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Discover
              </h3>

              <p className="mt-3 leading-relaxed text-gray-500">
                NGOs and volunteers find available
                donations nearby.
              </p>

            </div>


            {/* PICKUP */}

            <div
              className="
                group
                rounded-2xl
                bg-white
                p-7
                text-center
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
              "
            >

              <div
                className="
                  mx-auto flex h-14 w-14
                  items-center justify-center
                  rounded-full
                  bg-orange-100
                  text-2xl
                  transition-transform duration-300
                  group-hover:scale-110
                "
              >
                🚚
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Pickup
              </h3>

              <p className="mt-3 leading-relaxed text-gray-500">
                Volunteers collect the food from
                the donor's location.
              </p>

            </div>


            {/* DELIVER */}

            <div
              className="
                group
                rounded-2xl
                bg-white
                p-7
                text-center
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
              "
            >

              <div
                className="
                  mx-auto flex h-14 w-14
                  items-center justify-center
                  rounded-full
                  bg-purple-100
                  text-2xl
                  transition-transform duration-300
                  group-hover:scale-110
                "
              >
                ❤️
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Deliver
              </h3>

              <p className="mt-3 leading-relaxed text-gray-500">
                Food reaches NGOs and people who
                need it.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="w-full bg-white py-20">

        <div className="mx-auto w-full max-w-6xl px-6">

          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              bg-gradient-to-br
              from-green-600
              via-emerald-600
              to-green-700
              px-6
              py-14
              text-center
              text-white
              shadow-[0_20px_60px_rgba(16,185,129,0.20)]
              md:px-14
            "
          >

            {/* DECORATIVE GLOW */}

            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-60
                w-60
                rounded-full
                bg-white/10
                blur-2xl
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -bottom-20
                -left-20
                h-60
                w-60
                rounded-full
                bg-green-300/10
                blur-2xl
              "
            />


            {/* CTA CONTENT */}

            <div className="relative z-10">

              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-green-100">
                Make A Difference
              </p>

              <h2 className="text-3xl font-black md:text-5xl">
                Have Extra Food?
              </h2>

              <p
                className="
                  mx-auto mt-4
                  max-w-2xl
                  leading-relaxed
                  text-green-100
                "
              >
                Don't let good food go to waste.
                Donate it and help someone in your
                community.
              </p>


              <Link
                to="/register"
                className="
                  mt-8
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  bg-white
                  px-7
                  py-3
                  font-bold
                  text-green-700
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-green-50
                  hover:shadow-xl
                "
              >
                Start Donating →
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="w-full border-t border-white/5 bg-gray-950 text-gray-300">

        <div className="mx-auto max-w-7xl px-6 py-12">

          <div
            className="
              flex
              flex-col
              items-start
              justify-between
              gap-8
              md:flex-row
              md:items-center
            "
          >

            {/* BRAND */}

            <div>

              <h2
                className="
                  text-3xl
                  font-black
                  tracking-tight
                  text-white
                "
              >
                Food

                <span className="text-green-500">
                  Bridge
                </span>
              </h2>

              <p
                className="
                  mt-3
                  max-w-md
                  text-sm
                  leading-6
                  text-gray-400
                "
              >
                Connecting surplus food with people
                who need it — reducing food waste and
                creating meaningful impact.
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
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  text-green-400
                "
              >

                <span>
                  🌱
                </span>

                Reduce Waste. Create Impact.

              </div>

            </div>


            {/* RIGHT */}

            <div className="text-sm md:text-right">

              <p className="text-gray-400">

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
                  bg-white/5
                  px-4
                  py-2
                "
              >

                <span className="text-xs text-gray-500">
                  Built with ❤️ by
                </span>

                <span className="font-bold text-green-400">
                  Mr.Dev
                </span>

              </div>

            </div>

          </div>


          {/* BOTTOM */}

          <div
            className="
              mt-10
              flex
              flex-col
              items-center
              justify-between
              gap-3
              border-t
              border-white/10
              pt-6
              text-xs
              text-gray-500
              sm:flex-row
            "
          >

            <p>
              Every meal saved is a step toward
              a better tomorrow.
            </p>

            <p className="text-gray-600">
              FoodBridge • Smart Food Donation Platform
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default Home;