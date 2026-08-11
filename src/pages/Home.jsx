import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-white">

      {/* ================= HERO ================= */}
      <section className="bg-green-50">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-5">
              Reduce Food Waste • Feed People
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Turn Surplus Food Into{" "}
              <span className="text-green-600">
                Hope
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Connect surplus food from restaurants, hotels,
              events and households with NGOs and volunteers
              who can deliver it to people in need.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                to="/register"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Donate Food
              </Link>

              <Link
                to="/ngo/donations"
                className="border border-green-600 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
              >
                Find Donations
              </Link>

            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-xl p-8">

              <div className="text-center">
                <div className="text-7xl mb-5">
                  🍲
                </div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Every Meal Matters
                </h2>

                <p className="text-gray-500 mt-3">
                  Your surplus food can become someone's
                  next meal.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">

                <div className="bg-green-50 p-4 rounded-xl text-center">
                  <h3 className="text-2xl font-bold text-green-600">
                    12K+
                  </h3>
                  <p className="text-sm text-gray-500">
                    Meals Saved
                  </p>
                </div>

                <div className="bg-orange-50 p-4 rounded-xl text-center">
                  <h3 className="text-2xl font-bold text-orange-500">
                    450+
                  </h3>
                  <p className="text-sm text-gray-500">
                    Donations
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>


      {/* ================= STATS ================= */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            <div className="text-center p-6">
              <h2 className="text-4xl font-bold text-green-600">
                12K+
              </h2>
              <p className="text-gray-500 mt-2">
                Meals Donated
              </p>
            </div>

            <div className="text-center p-6">
              <h2 className="text-4xl font-bold text-green-600">
                9K+
              </h2>
              <p className="text-gray-500 mt-2">
                Meals Distributed
              </p>
            </div>

            <div className="text-center p-6">
              <h2 className="text-4xl font-bold text-green-600">
                250+
              </h2>
              <p className="text-gray-500 mt-2">
                Active Donors
              </p>
            </div>

            <div className="text-center p-6">
              <h2 className="text-4xl font-bold text-green-600">
                80+
              </h2>
              <p className="text-gray-500 mt-2">
                NGOs & Volunteers
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-gray-50 py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">

            <p className="text-green-600 font-semibold">
              SIMPLE PROCESS
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              How Food Waste Works
            </h2>

            <p className="text-gray-500 mt-4">
              From surplus food to someone who needs it.
            </p>

          </div>


          <div className="grid md:grid-cols-4 gap-8">

            {/* Step 1 */}
            <div className="bg-white p-7 rounded-2xl shadow-sm text-center">

              <div className="w-14 h-14 mx-auto bg-green-100 rounded-full flex items-center justify-center text-2xl">
                🥗
              </div>

              <h3 className="text-xl font-bold mt-5">
                Donate
              </h3>

              <p className="text-gray-500 mt-3">
                Donors list their surplus food with
                quantity and pickup details.
              </p>

            </div>


            {/* Step 2 */}
            <div className="bg-white p-7 rounded-2xl shadow-sm text-center">

              <div className="w-14 h-14 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                🔎
              </div>

              <h3 className="text-xl font-bold mt-5">
                Discover
              </h3>

              <p className="text-gray-500 mt-3">
                NGOs and volunteers find available
                donations nearby.
              </p>

            </div>


            {/* Step 3 */}
            <div className="bg-white p-7 rounded-2xl shadow-sm text-center">

              <div className="w-14 h-14 mx-auto bg-orange-100 rounded-full flex items-center justify-center text-2xl">
                🚚
              </div>

              <h3 className="text-xl font-bold mt-5">
                Pickup
              </h3>

              <p className="text-gray-500 mt-3">
                Volunteers collect the food from
                the donor's location.
              </p>

            </div>


            {/* Step 4 */}
            <div className="bg-white p-7 rounded-2xl shadow-sm text-center">

              <div className="w-14 h-14 mx-auto bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                ❤️
              </div>

              <h3 className="text-xl font-bold mt-5">
                Deliver
              </h3>

              <p className="text-gray-500 mt-3">
                Food reaches NGOs and people who
                need it.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="py-20">

        <div className="max-w-5xl mx-auto px-6">

          <div className="bg-green-600 rounded-3xl p-10 md:p-14 text-center text-white">

            <h2 className="text-3xl md:text-4xl font-bold">
              Have Extra Food?
            </h2>

            <p className="mt-4 text-green-100 max-w-2xl mx-auto">
              Don't let good food go to waste. Donate it
              and help someone in your community.
            </p>

            <Link
              to="/register"
              className="inline-block mt-8 bg-white text-green-700 px-7 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Start Donating
            </Link>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-300">

        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="flex flex-col md:flex-row justify-between gap-6">

            <div>
              <h2 className="text-2xl font-bold text-white">
                Food<span className="text-green-500">
                  Waste
                </span>
              </h2>

              <p className="mt-2 text-sm text-gray-400 max-w-sm">
                Connecting surplus food with people
                who need it.
              </p>
            </div>

            <div className="text-sm">
              <p>
                © 2026 Food Waste Platform
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