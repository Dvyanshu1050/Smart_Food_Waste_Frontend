import { Link } from "react-router-dom";
import ImpactMap from "../components/ImpactMap";
const Home = () => {
  return (
    <div className="bg-white">

      {/* =====================================================
          VIDEO HERO
      ===================================================== */}

      <section className="relative min-h-[calc(100vh-74px)] overflow-hidden bg-black">

        {/* ===================================================
            BACKGROUND VIDEO
        =================================================== */}

        <video
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
          "
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


        {/* ===================================================
            DARK OVERLAY
        =================================================== */}

        <div
          className="
            absolute
            inset-0
            bg-black/55
          "
        />


        {/* ===================================================
            LEFT GRADIENT
        =================================================== */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-black/85
            via-black/55
            to-black/10
          "
        />


        {/* ===================================================
            BOTTOM GRADIENT
        =================================================== */}

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            h-48
            bg-gradient-to-t
            from-black/80
            to-transparent
          "
        />


        {/* ===================================================
            HERO CONTENT
        =================================================== */}

        <div
          className="
            relative
            z-10
            min-h-[calc(100vh-74px)]
            max-w-7xl
            mx-auto
            px-6
            flex
            items-center
          "
        >

          <div className="max-w-3xl text-white">

            {/* =================================================
                LABEL
            ================================================= */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                border
                border-white/20
                bg-white/10
                backdrop-blur-md
                text-sm
                font-semibold
                text-green-300
                mb-7
                shadow-lg
              "
            >

              <span
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-green-400
                  shadow-[0_0_12px_rgba(74,222,128,0.9)]
                  animate-pulse
                "
              />

              Reduce Food Waste • Feed People

            </div>


            {/* =================================================
                MAIN HEADING
            ================================================= */}

            <h1
              className="
                text-5xl
                sm:text-6xl
                md:text-7xl
                font-black
                leading-[0.95]
                tracking-[-0.045em]
                animate-[fadeIn_0.8s_ease-out]
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


            {/* =================================================
                SUB HEADING
            ================================================= */}

            <h2
              className="
                mt-6
                text-2xl
                sm:text-3xl
                md:text-4xl
                font-bold
                leading-tight
                text-white
              "
            >

              Someone, somewhere,

              <span className="text-green-300">
                {" "}needs it.
              </span>

            </h2>


            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p
              className="
                mt-6
                max-w-2xl
                text-base
                sm:text-lg
                md:text-xl
                leading-relaxed
                text-gray-200
              "
            >
              Every day, perfectly good food is wasted while
              people in need struggle to get enough to eat.
              FoodBridge connects surplus food with NGOs and
              volunteers who can turn it into someone's next meal.
            </p>


            {/* =================================================
                BUTTONS
            ================================================= */}

            <div
              className="
                mt-9
                flex
                flex-wrap
                gap-4
              "
            >

              {/* =================================================
                  DONATE FOOD
              ================================================= */}

              <Link
                to="/register"
                className="
                  group
                  relative
                  isolate
                  overflow-hidden
                  px-7
                  py-3.5
                  rounded-xl
                  bg-green-500
                  border
                  border-green-400
                  text-white
                  font-bold
                  text-base
                  shadow-[0_10px_35px_rgba(34,197,94,0.30)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:text-green-700
                  hover:shadow-[0_15px_45px_rgba(34,197,94,0.40)]
                "
              >

                {/* WHITE HOVER */}

                <span
                  className="
                    absolute
                    inset-0
                    -z-10
                    translate-y-full
                    bg-white
                    transition-transform
                    duration-300
                    group-hover:translate-y-0
                  "
                />

                <span className="relative z-10">
                  Donate Food →
                </span>

              </Link>


              {/* =================================================
                  FIND DONATIONS
              ================================================= */}

              <Link
                to="/ngo/available-donations"
                className="
                  group
                  relative
                  overflow-hidden
                  px-7
                  py-3.5
                  rounded-xl
                  border
                  border-white/40
                  bg-white/10
                  backdrop-blur-md
                  text-white
                  font-bold
                  text-base
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white
                  hover:text-green-700
                  hover:border-white
                  hover:shadow-[0_10px_35px_rgba(255,255,255,0.18)]
                "
              >
                Find Donations
              </Link>

            </div>


            {/* =================================================
                IMPACT POINTS
            ================================================= */}

            <div
              className="
                mt-10
                flex
                flex-wrap
                items-center
                gap-6
                text-sm
                text-gray-300
              "
            >

              {/* SAVE MEALS */}

              <div className="flex items-center gap-2">

                <span
                  className="
                    flex
                    items-center
                    justify-center
                    w-9
                    h-9
                    rounded-full
                    bg-green-500/20
                    border
                    border-green-400/30
                  "
                >
                  🍽️
                </span>

                <span className="font-medium">
                  Save meals
                </span>

              </div>


              <div className="hidden sm:block w-px h-6 bg-white/20" />


              {/* FEED COMMUNITIES */}

              <div className="flex items-center gap-2">

                <span
                  className="
                    flex
                    items-center
                    justify-center
                    w-9
                    h-9
                    rounded-full
                    bg-green-500/20
                    border
                    border-green-400/30
                  "
                >
                  ❤️
                </span>

                <span className="font-medium">
                  Feed communities
                </span>

              </div>


              <div className="hidden sm:block w-px h-6 bg-white/20" />


              {/* REDUCE WASTE */}

              <div className="flex items-center gap-2">

                <span
                  className="
                    flex
                    items-center
                    justify-center
                    w-9
                    h-9
                    rounded-full
                    bg-green-500/20
                    border
                    border-green-400/30
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


        {/* ===================================================
            SCROLL INDICATOR
        =================================================== */}

        <div
          className="
            absolute
            bottom-7
            left-1/2
            -translate-x-1/2
            z-20
            hidden
            md:flex
            flex-col
            items-center
            gap-2
            text-white/70
          "
        >

          <span
            className="
              text-[10px]
              font-semibold
              tracking-[0.2em]
              uppercase
            "
          >
            Explore
          </span>

          <div
            className="
              w-6
              h-10
              rounded-full
              border
              border-white/40
              flex
              justify-center
              pt-2
            "
          >

            <span
              className="
                w-1.5
                h-1.5
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

      <section className="py-16 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-6
            "
          >

            {/* STAT 1 */}

            <div
              className="
                group
                text-center
                p-6
                rounded-2xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-green-50
                hover:shadow-lg
              "
            >

              <h2 className="text-4xl font-black text-green-600">
                12K+
              </h2>

              <p className="text-gray-500 mt-2 font-medium">
                Meals Donated
              </p>

            </div>


            {/* STAT 2 */}

            <div
              className="
                group
                text-center
                p-6
                rounded-2xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-green-50
                hover:shadow-lg
              "
            >

              <h2 className="text-4xl font-black text-green-600">
                9K+
              </h2>

              <p className="text-gray-500 mt-2 font-medium">
                Meals Distributed
              </p>

            </div>


            {/* STAT 3 */}

            <div
              className="
                group
                text-center
                p-6
                rounded-2xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-green-50
                hover:shadow-lg
              "
            >

              <h2 className="text-4xl font-black text-green-600">
                250+
              </h2>

              <p className="text-gray-500 mt-2 font-medium">
                Active Donors
              </p>

            </div>


            {/* STAT 4 */}

            <div
              className="
                group
                text-center
                p-6
                rounded-2xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-green-50
                hover:shadow-lg
              "
            >

              <h2 className="text-4xl font-black text-green-600">
                80+
              </h2>

              <p className="text-gray-500 mt-2 font-medium">
                NGOs & Volunteers
              </p>

            </div>

          </div>

        </div>

      </section>


<ImpactMap />


      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section className="bg-gray-50 py-20">

        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}

          <div className="text-center mb-12">

            <p className="text-green-600 font-bold tracking-wider text-sm">
              SIMPLE PROCESS
            </p>

            <h2
              className="
                text-3xl
                md:text-4xl
                font-black
                text-gray-900
                mt-2
              "
            >
              How FoodBridge Works
            </h2>

            <p className="text-gray-500 mt-4">
              From surplus food to someone who needs it.
            </p>

          </div>


          {/* STEPS */}

          <div className="grid md:grid-cols-4 gap-8">

            {/* STEP 1 */}

            <div
              className="
                group
                bg-white
                p-7
                rounded-2xl
                shadow-sm
                text-center
                border
                border-transparent
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-green-100
                hover:shadow-[0_15px_35px_rgba(16,185,129,0.12)]
              "
            >

              <div
                className="
                  w-14
                  h-14
                  mx-auto
                  bg-green-100
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-2xl
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                🥗
              </div>

              <h3 className="text-xl font-bold mt-5">
                Donate
              </h3>

              <p className="text-gray-500 mt-3 leading-relaxed">
                Donors list their surplus food with
                quantity and pickup details.
              </p>

            </div>


            {/* STEP 2 */}

            <div
              className="
                group
                bg-white
                p-7
                rounded-2xl
                shadow-sm
                text-center
                border
                border-transparent
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-blue-100
                hover:shadow-[0_15px_35px_rgba(59,130,246,0.10)]
              "
            >

              <div
                className="
                  w-14
                  h-14
                  mx-auto
                  bg-blue-100
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-2xl
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                🔎
              </div>

              <h3 className="text-xl font-bold mt-5">
                Discover
              </h3>

              <p className="text-gray-500 mt-3 leading-relaxed">
                NGOs and volunteers find available
                donations nearby.
              </p>

            </div>


            {/* STEP 3 */}

            <div
              className="
                group
                bg-white
                p-7
                rounded-2xl
                shadow-sm
                text-center
                border
                border-transparent
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-orange-100
                hover:shadow-[0_15px_35px_rgba(249,115,22,0.10)]
              "
            >

              <div
                className="
                  w-14
                  h-14
                  mx-auto
                  bg-orange-100
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-2xl
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                🚚
              </div>

              <h3 className="text-xl font-bold mt-5">
                Pickup
              </h3>

              <p className="text-gray-500 mt-3 leading-relaxed">
                Volunteers collect the food from
                the donor's location.
              </p>

            </div>


            {/* STEP 4 */}

            <div
              className="
                group
                bg-white
                p-7
                rounded-2xl
                shadow-sm
                text-center
                border
                border-transparent
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-purple-100
                hover:shadow-[0_15px_35px_rgba(168,85,247,0.10)]
              "
            >

              <div
                className="
                  w-14
                  h-14
                  mx-auto
                  bg-purple-100
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-2xl
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                ❤️
              </div>

              <h3 className="text-xl font-bold mt-5">
                Deliver
              </h3>

              <p className="text-gray-500 mt-3 leading-relaxed">
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

      <section className="py-20 bg-white">

        <div className="max-w-5xl mx-auto px-6">

          <div
            className="
              relative
              overflow-hidden
              bg-gradient-to-br
              from-green-600
              via-emerald-600
              to-green-700
              rounded-3xl
              p-10
              md:p-14
              text-center
              text-white
              shadow-[0_20px_60px_rgba(16,185,129,0.20)]
            "
          >

            {/* DECORATION */}

            <div
              className="
                absolute
                -top-20
                -right-20
                w-60
                h-60
                rounded-full
                bg-white/10
                blur-2xl
              "
            />

            <div
              className="
                absolute
                -bottom-20
                -left-20
                w-60
                h-60
                rounded-full
                bg-green-300/10
                blur-2xl
              "
            />


            {/* CONTENT */}

            <div className="relative z-10">

              <h2
                className="
                  text-3xl
                  md:text-4xl
                  font-black
                "
              >
                Have Extra Food?
              </h2>

              <p
                className="
                  mt-4
                  text-green-100
                  max-w-2xl
                  mx-auto
                  leading-relaxed
                "
              >
                Don't let good food go to waste.
                Donate it and help someone in your
                community.
              </p>


              <Link
                to="/register"
                className="
                  group
                  relative
                  inline-block
                  overflow-hidden
                  mt-8
                  bg-white
                  text-green-700
                  px-7
                  py-3
                  rounded-xl
                  font-bold
                  border
                  border-white
                  transition-all
                  duration-300
                  hover:bg-green-50
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >
                Start Donating
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="bg-gray-950 text-gray-300">

        <div className="max-w-7xl mx-auto px-6 py-10">

          <div
            className="
              flex
              flex-col
              md:flex-row
              justify-between
              gap-6
            "
          >

            {/* BRAND */}

            <div>

              <h2
                className="
                  text-2xl
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
                  mt-2
                  text-sm
                  text-gray-400
                  max-w-sm
                "
              >
                Connecting surplus food with
                people who need it.
              </p>

            </div>


            {/* COPYRIGHT */}

            <div className="text-sm md:text-right">

              <p>
                © 2026 FoodBridge
              </p>

              <p className="mt-1 text-gray-500">
                Reduce Waste. Share Food. Create Impact.
              </p>

            </div>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default Home;