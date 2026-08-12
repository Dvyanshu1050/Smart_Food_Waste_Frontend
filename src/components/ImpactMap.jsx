import { useEffect, useMemo, useState } from "react";


// =====================================================
// REGION DATA
// Temporary hardcoded data
// Later backend / MongoDB se aayega
// =====================================================

const regions = [
  {
    id: "north",
    name: "North",
    cities: 34,
    meals: 1260,
    ngos: 28,
  },
  {
    id: "east",
    name: "East",
    cities: 42,
    meals: 1480,
    ngos: 31,
  },
  {
    id: "south",
    name: "South",
    cities: 66,
    meals: 2631,
    ngos: 157,
  },
  {
    id: "west",
    name: "West",
    cities: 36,
    meals: 1840,
    ngos: 42,
  },
];


// =====================================================
// DONATION POINTS
// Temporary hardcoded
// x/y are longitude / latitude
// =====================================================

const donationPoints = [
  {
    city: "Delhi",
    longitude: 77.209,
    latitude: 28.6139,
    meals: 820,
  },

  {
    city: "Jaipur",
    longitude: 75.7873,
    latitude: 26.9124,
    meals: 460,
  },

  {
    city: "Bhopal",
    longitude: 77.4126,
    latitude: 23.2599,
    meals: 520,
  },

  {
    city: "Mumbai",
    longitude: 72.8777,
    latitude: 19.076,
    meals: 980,
  },

  {
    city: "Pune",
    longitude: 73.8567,
    latitude: 18.5204,
    meals: 640,
  },

  {
    city: "Hyderabad",
    longitude: 78.4867,
    latitude: 17.385,
    meals: 720,
  },

  {
    city: "Bengaluru",
    longitude: 77.5946,
    latitude: 12.9716,
    meals: 910,
  },

  {
    city: "Chennai",
    longitude: 80.2707,
    latitude: 13.0827,
    meals: 680,
  },

  {
    city: "Kolkata",
    longitude: 88.3639,
    latitude: 22.5726,
    meals: 560,
  },

  {
    city: "Patna",
    longitude: 85.1376,
    latitude: 25.5941,
    meals: 390,
  },

  {
    city: "Lucknow",
    longitude: 80.9462,
    latitude: 26.8467,
    meals: 480,
  },

  {
    city: "Ahmedabad",
    longitude: 72.5714,
    latitude: 23.0225,
    meals: 530,
  },
];


// =====================================================
// GEOJSON URL
// =====================================================

const INDIA_GEO_URL = "/maps/india.geojson";


// =====================================================
// MAIN COMPONENT
// =====================================================

const ImpactMap = () => {

  const [geoData, setGeoData] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const [activeRegion, setActiveRegion] =
    useState("south");

  const [activePoint, setActivePoint] =
    useState(null);


  // ===================================================
  // LOAD INDIA GEOJSON
  // ===================================================

  useEffect(() => {

    const loadMap = async () => {

      try {

        setLoading(true);

        setError(null);


        const response =
          await fetch(INDIA_GEO_URL);


        if (!response.ok) {
          throw new Error(
            `Unable to load India map (${response.status})`
          );
        }


        const data =
          await response.json();


        if (
          !data ||
          data.type !== "FeatureCollection"
        ) {
          throw new Error(
            "Invalid India GeoJSON format"
          );
        }


        setGeoData(data);

      } catch (err) {

        console.error(
          "India Map Error:",
          err
        );

        setError(
          err.message ||
          "Failed to load India map"
        );

      } finally {

        setLoading(false);

      }

    };


    loadMap();

  }, []);


  // ===================================================
  // ACTIVE REGION
  // ===================================================

  const selectedRegion =
    regions.find(
      (region) =>
        region.id === activeRegion
    ) || regions[2];


  // ===================================================
  // GEOJSON BOUNDS
  // ===================================================

  const bounds = useMemo(() => {

    if (!geoData) {
      return null;
    }


    let minLon = Infinity;
    let maxLon = -Infinity;

    let minLat = Infinity;
    let maxLat = -Infinity;


    const processCoordinates = (
      coordinates
    ) => {

      if (
        typeof coordinates[0] === "number"
      ) {

        const [
          longitude,
          latitude,
        ] = coordinates;


        minLon = Math.min(
          minLon,
          longitude
        );

        maxLon = Math.max(
          maxLon,
          longitude
        );

        minLat = Math.min(
          minLat,
          latitude
        );

        maxLat = Math.max(
          maxLat,
          latitude
        );

        return;
      }


      coordinates.forEach(
        processCoordinates
      );

    };


    geoData.features.forEach(
      (feature) => {

        if (!feature.geometry) {
          return;
        }


        processCoordinates(
          feature.geometry.coordinates
        );

      }
    );


    return {
      minLon,
      maxLon,
      minLat,
      maxLat,
    };

  }, [geoData]);


  // ===================================================
  // SVG SIZE
  // ===================================================

  const SVG_WIDTH = 600;

  const SVG_HEIGHT = 650;

  const PADDING = 35;


  // ===================================================
  // PROJECT LAT/LON → SVG
  // ===================================================

  const projectPoint = (
    longitude,
    latitude
  ) => {

    if (!bounds) {
      return {
        x: 0,
        y: 0,
      };
    }


    const lonRange =
      bounds.maxLon -
      bounds.minLon;


    const latRange =
      bounds.maxLat -
      bounds.minLat;


    const x =
      PADDING +
      ((longitude - bounds.minLon) /
        lonRange) *
        (SVG_WIDTH -
          PADDING * 2);


    // Latitude reverse because SVG
    // Y-axis starts from top

    const y =
      SVG_HEIGHT -
      PADDING -
      ((latitude - bounds.minLat) /
        latRange) *
        (SVG_HEIGHT -
          PADDING * 2);


    return {
      x,
      y,
    };

  };


  // ===================================================
  // GEOJSON → SVG PATH
  // ===================================================

  const coordinatesToPath = (
    coordinates
  ) => {

    if (!coordinates?.length) {
      return "";
    }


    // Polygon ring

    if (
      typeof coordinates[0][0] ===
      "number"
    ) {

      return coordinates
        .map(
          (
            [longitude, latitude],
            index
          ) => {

            const {
              x,
              y,
            } =
              projectPoint(
                longitude,
                latitude
              );


            return `${
              index === 0
                ? "M"
                : "L"
            } ${x} ${y}`;

          }
        )
        .join(" ") + " Z";

    }


    // Multi ring / MultiPolygon

    return coordinates
      .map(
        (part) =>
          coordinatesToPath(part)
      )
      .join(" ");

  };


  // ===================================================
  // FEATURE PATH
  // ===================================================

  const featureToPath = (
    feature
  ) => {

    if (
      !feature?.geometry
    ) {
      return "";
    }


    const {
      type,
      coordinates,
    } =
      feature.geometry;


    if (
      type === "Polygon" ||
      type === "MultiPolygon"
    ) {

      return coordinatesToPath(
        coordinates
      );

    }


    return "";

  };


  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {

    return (
      <section className="bg-white py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div
            className="
              flex
              min-h-[500px]
              items-center
              justify-center
              rounded-3xl
              bg-gray-50
            "
          >

            <div className="text-center">

              <div
                className="
                  mx-auto
                  mb-5
                  h-12
                  w-12
                  animate-spin
                  rounded-full
                  border-4
                  border-green-100
                  border-t-green-600
                "
              />

              <p className="font-semibold text-gray-700">
                Loading India impact map...
              </p>

              <p className="mt-1 text-sm text-gray-400">
                Preparing donation network
              </p>

            </div>

          </div>

        </div>

      </section>
    );

  }


  // ===================================================
  // ERROR
  // ===================================================

  if (error || !geoData) {

    return (
      <section className="bg-white py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div
            className="
              rounded-3xl
              border
              border-red-100
              bg-red-50
              p-10
              text-center
            "
          >

            <div className="text-5xl">
              🗺️
            </div>

            <h2
              className="
                mt-4
                text-2xl
                font-bold
                text-gray-900
              "
            >
              India map couldn't load
            </h2>

            <p
              className="
                mx-auto
                mt-2
                max-w-xl
                text-gray-500
              "
            >
              Make sure your GeoJSON file exists at:
            </p>

            <code
              className="
                mt-4
                inline-block
                rounded-lg
                bg-white
                px-4
                py-2
                text-sm
                font-semibold
                text-red-600
                shadow-sm
              "
            >
              public/maps/india.geojson
            </code>

            <p className="mt-4 text-xs text-gray-400">
              {error}
            </p>

          </div>

        </div>

      </section>
    );

  }


  // ===================================================
  // MAIN UI
  // ===================================================

  return (

    <section
      className="
        relative
        overflow-hidden
        bg-white
        py-24
      "
    >

      {/* =================================================
          BACKGROUND GLOW
      ================================================= */}

      <div
        className="
          absolute
          -left-40
          -top-40
          h-[500px]
          w-[500px]
          rounded-full
          bg-green-100/60
          blur-3xl
        "
      />


      <div
        className="
          absolute
          -bottom-40
          -right-40
          h-[500px]
          w-[500px]
          rounded-full
          bg-red-100/40
          blur-3xl
        "
      />


      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-6
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            mb-14
            max-w-3xl
          "
        >

          <p
            className="
              mb-4
              text-sm
              font-bold
              uppercase
              tracking-[0.2em]
              text-green-600
            "
          >
            Our Impact Across India
          </p>


          <h2
            className="
              text-4xl
              font-black
              leading-[1.05]
              tracking-tight
              text-gray-900
              md:text-6xl
            "
          >

            We've reimagined how{" "}

            <span className="text-green-600">
              surplus food
            </span>{" "}

            reaches people.

          </h2>


          <p
            className="
              mt-6
              max-w-2xl
              text-lg
              leading-relaxed
              text-gray-500
            "
          >
            Connecting donors, NGOs and volunteers
            across India so surplus food reaches
            people who need it instead of going to waste.
          </p>

        </div>


        {/* =================================================
            CONTENT
        ================================================= */}

        <div
          className="
            grid
            items-center
            gap-12
            lg:grid-cols-[390px_1fr]
          "
        >

          {/* =================================================
              REGION CARDS
          ================================================= */}

          <div className="space-y-4">

            {regions.map(
              (region) => {

                const isActive =
                  activeRegion ===
                  region.id;


                return (

                  <button
                    key={region.id}
                    type="button"
                    onClick={() =>
                      setActiveRegion(
                        region.id
                      )
                    }
                    className={`
                      group
                      w-full
                      overflow-hidden
                      rounded-2xl
                      border
                      bg-white
                      text-left
                      transition-all
                      duration-300

                      ${
                        isActive
                          ? `
                            border-green-500
                            shadow-[0_20px_50px_rgba(34,197,94,0.14)]
                          `
                          : `
                            border-gray-200
                            hover:-translate-y-1
                            hover:border-green-300
                            hover:shadow-xl
                          `
                      }
                    `}
                  >

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        px-5
                        py-5
                      "
                    >

                      <div className="flex items-center gap-3">

                        <span
                          className={`
                            h-3
                            w-3
                            rounded-full
                            transition-all

                            ${
                              isActive
                                ? `
                                  bg-green-500
                                  shadow-[0_0_14px_rgba(34,197,94,0.8)]
                                `
                                : "bg-gray-300"
                            }
                          `}
                        />

                        <span
                          className={`
                            text-lg
                            font-bold

                            ${
                              isActive
                                ? "text-gray-900"
                                : "text-gray-600"
                            }
                          `}
                        >
                          {region.name}
                        </span>

                      </div>


                      <span
                        className={`
                          text-sm
                          font-semibold

                          ${
                            isActive
                              ? "text-red-500"
                              : "text-gray-400"
                          }
                        `}
                      >
                        {region.cities} cities
                      </span>

                    </div>


                    {isActive && (

                      <div
                        className="
                          border-t
                          border-gray-100
                        "
                      >

                        <div
                          className="
                            h-1
                            w-1/2
                            bg-green-500
                          "
                        />


                        <div
                          className="
                            grid
                            grid-cols-2
                            gap-6
                            px-5
                            py-5
                          "
                        >

                          <div>

                            <p
                              className="
                                text-sm
                                text-gray-400
                              "
                            >
                              Meals Rescued
                            </p>

                            <p
                              className="
                                mt-1
                                text-2xl
                                font-black
                                text-gray-900
                              "
                            >
                              {selectedRegion.meals.toLocaleString()}
                            </p>

                          </div>


                          <div>

                            <p
                              className="
                                text-sm
                                text-gray-400
                              "
                            >
                              NGOs
                            </p>

                            <p
                              className="
                                mt-1
                                text-2xl
                                font-black
                                text-gray-900
                              "
                            >
                              {selectedRegion.ngos}
                            </p>

                          </div>

                        </div>

                      </div>

                    )}

                  </button>

                );

              }
            )}


            {/* =================================================
                IMPACT SUMMARY
            ================================================= */}

            <div
              className="
                mt-7
                rounded-2xl
                border
                border-green-100
                bg-green-50
                p-5
              "
            >

              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-green-600
                "
              >
                Platform Impact
              </p>


              <div
                className="
                  mt-4
                  grid
                  grid-cols-2
                  gap-5
                "
              >

                <div>

                  <p
                    className="
                      text-3xl
                      font-black
                      text-gray-900
                    "
                  >
                    12.6K+
                  </p>

                  <p className="text-sm text-gray-500">
                    Meals Rescued
                  </p>

                </div>


                <div>

                  <p
                    className="
                      text-3xl
                      font-black
                      text-gray-900
                    "
                  >
                    157+
                  </p>

                  <p className="text-sm text-gray-500">
                    NGOs Connected
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              FULL INDIA MAP
          ================================================= */}

          <div
            className="
              relative
              min-h-[560px]
              overflow-hidden
              rounded-[2rem]
              border
              border-gray-100
              bg-gradient-to-br
              from-gray-50
              via-white
              to-green-50/60
              p-4
              shadow-sm
              lg:min-h-[680px]
            "
          >

            {/* MAP GLOW */}

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[500px]
                w-[500px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-green-100/50
                blur-3xl
              "
            />


            {/* LIVE BADGE */}

            <div
              className="
                absolute
                right-5
                top-5
                z-30
                rounded-2xl
                border
                border-white
                bg-white/90
                px-4
                py-3
                shadow-xl
                backdrop-blur-md
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <span
                  className="
                    h-2.5
                    w-2.5
                    animate-pulse
                    rounded-full
                    bg-red-500
                  "
                />

                <span
                  className="
                    text-xs
                    font-bold
                    tracking-wide
                    text-gray-600
                  "
                >
                  LIVE IMPACT
                </span>

              </div>


              <p
                className="
                  mt-1
                  text-lg
                  font-black
                  text-gray-900
                "
              >
                Across India 🇮🇳
              </p>

            </div>


            {/* =================================================
                SVG
            ================================================= */}

            <div
              className="
                relative
                z-10
                flex
                h-full
                min-h-[540px]
                items-center
                justify-center
              "
            >

              <svg
                viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                className="
                  h-auto
                  max-h-[620px]
                  w-full
                  max-w-[560px]
                  overflow-visible
                "
                preserveAspectRatio="xMidYMid meet"
              >

                <defs>

                  {/* INDIA GRADIENT */}

                  <linearGradient
                    id="indiaMapGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >

                    <stop
                      offset="0%"
                      stopColor="#f0fdf4"
                    />

                    <stop
                      offset="45%"
                      stopColor="#dcfce7"
                    />

                    <stop
                      offset="100%"
                      stopColor="#86efac"
                    />

                  </linearGradient>


                  {/* SHADOW */}

                  <filter
                    id="indiaShadow"
                    x="-30%"
                    y="-30%"
                    width="160%"
                    height="160%"
                  >

                    <feDropShadow
                      dx="0"
                      dy="12"
                      stdDeviation="10"
                      floodColor="#16a34a"
                      floodOpacity="0.18"
                    />

                  </filter>


                  {/* DOT GLOW */}

                  <filter
                    id="dotGlow"
                    x="-100%"
                    y="-100%"
                    width="300%"
                    height="300%"
                  >

                    <feGaussianBlur
                      stdDeviation="3"
                    />

                  </filter>

                </defs>


                {/* =================================================
                    ACTUAL GEOJSON FEATURES
                ================================================= */}

                <g
                  filter="url(#indiaShadow)"
                >

                  {geoData.features.map(
                    (feature, index) => {

                      const path =
                        featureToPath(
                          feature
                        );


                      if (!path) {
                        return null;
                      }


                      const isSelected =
                        activeRegion ===
                        "south";


                      return (

                        <path
                          key={
                            feature.id ||
                            index
                          }
                          d={path}
                          fill={
                            isSelected
                              ? "url(#indiaMapGradient)"
                              : "#ecfdf5"
                          }
                          stroke="#86b89a"
                          strokeWidth="0.8"
                          vectorEffect="non-scaling-stroke"
                          className="
                            cursor-pointer
                            transition-all
                            duration-300
                          "
                          onMouseEnter={(
                            event
                          ) => {

                            event.currentTarget.style.fill =
                              "#bbf7d0";

                            event.currentTarget.style.stroke =
                              "#16a34a";

                            event.currentTarget.style.strokeWidth =
                              "1.5";

                          }}
                          onMouseLeave={(
                            event
                          ) => {

                            event.currentTarget.style.fill =
                              isSelected
                                ? "url(#indiaMapGradient)"
                                : "#ecfdf5";

                            event.currentTarget.style.stroke =
                              "#86b89a";

                            event.currentTarget.style.strokeWidth =
                              "0.8";

                          }}
                        />

                      );

                    }
                  )}

                </g>


                {/* =================================================
                    DONATION POINTS
                ================================================= */}

                {donationPoints.map(
                  (point, index) => {

                    const {
                      x,
                      y,
                    } =
                      projectPoint(
                        point.longitude,
                        point.latitude
                      );


                    const isActive =
                      activePoint ===
                      point.city;


                    return (

                      <g
                        key={
                          point.city
                        }
                        className="cursor-pointer"
                        onMouseEnter={() =>
                          setActivePoint(
                            point.city
                          )
                        }
                        onMouseLeave={() =>
                          setActivePoint(
                            null
                          )
                        }
                      >

                        {/* OUTER PULSE */}

                        <circle
                          cx={x}
                          cy={y}
                          r="7"
                          fill="#ef4444"
                          opacity="0.25"
                        >

                          <animate
                            attributeName="r"
                            values="6;16;6"
                            dur={`${
                              2 +
                              (index %
                                4) *
                                0.3
                            }s`}
                            repeatCount="indefinite"
                          />

                          <animate
                            attributeName="opacity"
                            values="0.4;0;0.4"
                            dur={`${
                              2 +
                              (index %
                                4) *
                                0.3
                            }s`}
                            repeatCount="indefinite"
                          />

                        </circle>


                        {/* GLOW */}

                        <circle
                          cx={x}
                          cy={y}
                          r={
                            isActive
                              ? 12
                              : 8
                          }
                          fill="#ef4444"
                          opacity="0.15"
                          filter="url(#dotGlow)"
                        />


                        {/* MAIN DOT */}

                        <circle
                          cx={x}
                          cy={y}
                          r={
                            isActive
                              ? 7
                              : 5
                          }
                          fill="#ef4444"
                          stroke="white"
                          strokeWidth="2"
                          className="
                            transition-all
                            duration-200
                          "
                        />

                      </g>

                    );

                  }
                )}


                {/* INDIA LABEL */}

                <text
                  x={SVG_WIDTH / 2}
                  y={SVG_HEIGHT - 10}
                  textAnchor="middle"
                  fill="#166534"
                  fontSize="14"
                  fontWeight="800"
                  letterSpacing="4"
                  opacity="0.7"
                >
                  INDIA
                </text>

              </svg>


              {/* =================================================
                  CITY TOOLTIP
              ================================================= */}

              {activePoint && (

                <div
                  className="
                    absolute
                    left-1/2
                    top-6
                    z-40
                    -translate-x-1/2
                    rounded-xl
                    border
                    border-gray-100
                    bg-white
                    px-4
                    py-3
                    shadow-2xl
                  "
                >

                  <p
                    className="
                      text-sm
                      font-bold
                      text-gray-900
                    "
                  >
                    📍 {activePoint}
                  </p>

                  {donationPoints
                    .filter(
                      (point) =>
                        point.city ===
                        activePoint
                    )
                    .map(
                      (point) => (

                        <p
                          key={
                            point.city
                          }
                          className="
                            mt-1
                            text-xs
                            text-gray-500
                          "
                        >
                          {point.meals} meals
                          rescued
                        </p>

                      )
                    )}

                </div>

              )}

            </div>


            {/* =================================================
                BOTTOM STAT
            ================================================= */}

            <div
              className="
                absolute
                bottom-5
                left-5
                z-30
                rounded-2xl
                border
                border-white
                bg-white/90
                px-5
                py-4
                shadow-xl
                backdrop-blur-md
              "
            >

              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-gray-400
                "
              >
                Active Donation Network
              </p>


              <p
                className="
                  mt-1
                  text-2xl
                  font-black
                  text-green-600
                "
              >
                250+
              </p>


              <p
                className="
                  text-xs
                  text-gray-500
                "
              >
                Active donors
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>

  );
};


export default ImpactMap;