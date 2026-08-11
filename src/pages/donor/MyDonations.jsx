import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { fetchMyDonations } from "../../redux/slices/donationSlice";
import socket from "../../socket";

// =====================================================
// MAP ICONS
// =====================================================

const createMarkerIcon = (color, live = false) =>
  L.divIcon({
    className: "food-waste-marker",
    html: `
      <div style="
        position:relative;
        width:${live ? 44 : 38}px;
        height:${live ? 44 : 38}px;
      ">
        ${
          live
            ? `
              <span style="
                position:absolute;
                inset:0;
                border-radius:50%;
                background:${color};
                opacity:.18;
                animation:foodWastePulse 1.7s infinite;
              "></span>
            `
            : ""
        }

        <div style="
          position:absolute;
          left:50%;
          top:50%;
          transform:translate(-50%,-50%);
          width:${live ? 34 : 30}px;
          height:${live ? 34 : 30}px;
          border:3px solid white;
          border-radius:50%;
          background:${color};
          box-shadow:0 4px 14px rgba(0,0,0,.28);
          display:flex;
          align-items:center;
          justify-content:center;
          color:white;
          font-size:${live ? 16 : 14}px;
          font-weight:800;
        ">
          ${live ? "➤" : "●"}
        </div>
      </div>

      <style>
        @keyframes foodWastePulse {
          0% { transform:scale(.65); opacity:.28; }
          70% { transform:scale(1.35); opacity:0; }
          100% { transform:scale(1.35); opacity:0; }
        }
      </style>
    `,
    iconSize: live ? [44, 44] : [38, 38],
    iconAnchor: live ? [22, 22] : [19, 19],
    popupAnchor: [0, -22],
  });

const donorIcon = createMarkerIcon("#dc2626");
const ngoIcon = createMarkerIcon("#2563eb", true);

// =====================================================
// DISTANCE
// =====================================================

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const lat1Rad = (lat1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const formatDistance = (distance) => {
  if (distance === null || distance === undefined) {
    return "—";
  }

  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }

  return `${distance.toFixed(2)} km`;
};

// =====================================================
// MAP VIEW
// =====================================================

// =====================================================
// MAP VIEW
// =====================================================

const MapViewUpdater = ({
  donorLocation,
  ngoLocation,
  deliveryLocation,
}) => {
  const map = useMap();

  useEffect(() => {
    const locations = [
      donorLocation,
      ngoLocation,
      deliveryLocation,
    ].filter(Boolean);

    // Agar koi location nahi hai
    if (locations.length === 0) {
      return;
    }

    // Sirf donor location available
    if (locations.length === 1) {
      map.setView(locations[0], 14, {
        animate: true,
      });

      return;
    }

    // Multiple locations ko ek saath map mein fit karo
    const bounds = L.latLngBounds(
      locations
    );

    map.fitBounds(bounds, {
      padding: [55, 55],
      maxZoom: 15,
      animate: true,
    });
  }, [
    donorLocation,
    ngoLocation,
    deliveryLocation,
    map,
  ]);

  return null;
};

// =====================================================
// STATUS
// =====================================================

const statusConfig = {
  AVAILABLE: {
    label: "Available",
    className: "bg-emerald-50 text-emerald-700 border-emerald-100",
    dot: "bg-emerald-500",
  },
  CLAIMED: {
    label: "Claimed",
    className: "bg-amber-50 text-amber-700 border-amber-100",
    dot: "bg-amber-500",
  },
  PICKED_UP: {
    label: "Picked Up",
    className: "bg-blue-50 text-blue-700 border-blue-100",
    dot: "bg-blue-500",
  },
  DELIVERED: {
    label: "Delivered",
    className: "bg-violet-50 text-violet-700 border-violet-100",
    dot: "bg-violet-500",
  },
};

// =====================================================
// TIMELINE
// =====================================================

const Timeline = ({ donation }) => {
  const steps = [
    {
      label: "Created",
      done: true,
      date: donation.createdAt,
      color: "bg-emerald-500",
    },
    {
      label: "Claimed",
      done: !!donation.claimedAt,
      date: donation.claimedAt,
      color: "bg-amber-500",
    },
    {
      label: "Picked up",
      done: !!donation.pickedUpAt,
      date: donation.pickedUpAt,
      color: "bg-blue-500",
    },
    {
      label: "Delivered",
      done: !!donation.deliveredAt,
      date: donation.deliveredAt,
      color: "bg-violet-500",
    },
  ];

  return (
    <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50/70 p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-gray-900">Donation journey</p>
          <p className="mt-1 text-xs text-gray-500">
            Follow your food from donation to delivery.
          </p>
        </div>

        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-500 shadow-sm">
          Live status
        </span>
      </div>

      <div className="relative grid grid-cols-4">
        <div className="absolute left-[12.5%] right-[12.5%] top-3 h-0.5 bg-gray-200" />

        {steps.map((step) => (
          <div key={step.label} className="relative z-10 text-center">
            <div
              className={`mx-auto flex h-6 w-6 items-center justify-center rounded-full border-4 border-gray-50 ${
                step.done ? step.color : "bg-gray-300"
              }`}
            >
              {step.done && (
                <span className="text-[9px] font-black text-white">✓</span>
              )}
            </div>

            <p
              className={`mt-2 text-[11px] font-semibold ${
                step.done ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {step.label}
            </p>

            {step.done && step.date && (
              <p className="mt-1 hidden text-[9px] text-gray-400 sm:block">
                {new Date(step.date).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// =====================================================
// LIVE TRACKING
// =====================================================

const LiveTracking = ({
  donation,
  donorLocation,
  ngoLocation,
  deliveryLocation,
  liveLocation,
  isTracking,
  liveDistance,
}) => {
  if (
    !donation.claimedBy ||
    !["CLAIMED", "PICKED_UP"].includes(donation.status)
  ) {
    return null;
  }

  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 shadow-sm">
      {/* Tracking header */}
      <div className="border-b border-blue-100/70 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                isTracking
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "bg-white text-blue-600 border border-blue-100"
              }`}
            >
              {isTracking && (
                <span className="absolute inset-0 rounded-2xl bg-blue-400 opacity-30 animate-ping" />
              )}
              <span className="relative text-xl">
                {isTracking ? "📡" : "🚚"}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-gray-900">
                  {isTracking ? "NGO is on the way" : "Live delivery tracking"}
                </h3>

                {isTracking && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-black tracking-wide text-emerald-700">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    LIVE
                  </span>
                )}
              </div>

              <p className="mt-1 text-xs text-gray-500">
                {isTracking
                  ? "The blue marker updates as the NGO moves."
                  : "Waiting for the NGO to start live location sharing."}
              </p>
            </div>
          </div>

          {liveLocation?.updatedAt && (
            <span className="hidden rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-gray-500 shadow-sm sm:block">
              Updated just now
            </span>
          )}
        </div>

        {/* Metrics */}
        {isTracking && ngoLocation && (
          <div className="mt-5 grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-white p-3 shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                Distance
              </p>
              <p className="mt-1 text-lg font-black text-gray-900">
                {formatDistance(liveDistance)}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-3 shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                GPS
              </p>
              <p className="mt-1 text-lg font-black text-gray-900">
                ±{Math.round(liveLocation?.accuracy || 0)}m
              </p>
            </div>

            <div className="rounded-2xl bg-white p-3 shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                Status
              </p>
              <p className="mt-1 text-lg font-black text-emerald-600">
                LIVE
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Map */}
      {donorLocation ? (
        <div className="relative h-[330px] w-full">
          <MapContainer
            center={donorLocation}
            zoom={13}
            scrollWheelZoom
            className="h-full w-full"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapViewUpdater
  donorLocation={donorLocation}
  ngoLocation={ngoLocation}
  deliveryLocation={deliveryLocation}
/>

            {/* Donor */}
            <Marker position={donorLocation} icon={donorIcon}>
              <Popup>
                <div className="min-w-[180px]">
                  <p className="font-bold text-red-600">🔴 Donor</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Food pickup point
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {donation.pickupLocation}
                  </p>
                </div>
              </Popup>
            </Marker>

            {/* NGO */}
            {ngoLocation && (
              <Marker position={ngoLocation} icon={ngoIcon}>
                <Popup>
                  <div className="min-w-[180px]">
                    <p className="font-bold text-blue-600">🔵 NGO / Volunteer</p>

                    {isTracking && (
                      <p className="mt-1 font-semibold text-emerald-600">
                        ● LIVE
                      </p>
                    )}

                    <p className="mt-1 text-sm text-gray-600">
                      Distance: {formatDistance(liveDistance)}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      GPS: ±{Math.round(liveLocation?.accuracy || 0)}m
                    </p>
                  </div>
                </Popup>
              </Marker>
            )}

            {/* =================================================
                ROUTE
            ================================================= */}

            {donorLocation && ngoLocation && (
              <Polyline
                positions={
                  deliveryLocation
                    ? [
                        donorLocation,
                        ngoLocation,
                        deliveryLocation,
                      ]
                    : [
                        donorLocation,
                        ngoLocation,
                      ]
                }
                pathOptions={{
                  color: "#2563eb",
                  weight: 4,
                  opacity: 0.7,
                  dashArray: "8 8",
                }}
              />
            )}

            {/* =================================================
                DELIVERY DESTINATION 🟢
            ================================================= */}

            {deliveryLocation && (
              <Marker
                position={deliveryLocation}
                icon={createMarkerIcon("#16a34a")}
              >
                <Popup>
                  <div className="min-w-[180px]">
                    <p className="font-bold text-green-600">
                      🟢 Delivery Destination
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                      Food will be delivered here
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {donation.deliveryLocation ||
                        "Delivery location"}
                    </p>
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>

          {/* Map legend */}
          <div className="absolute bottom-4 left-4 z-[1000] flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 text-xs font-semibold shadow-xl backdrop-blur">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-600" />
              Donor
            </span>

            <span className="h-4 w-px bg-gray-200" />

            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
              NGO
            </span>

            {deliveryLocation && (
              <>
                <span className="h-4 w-px bg-gray-200" />

                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
                  Delivery
                </span>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="flex h-[230px] items-center justify-center bg-gray-50 p-8 text-center">
          <div>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
              📍
            </div>
            <p className="mt-4 font-semibold text-gray-800">
              Location unavailable
            </p>
            <p className="mt-1 text-sm text-gray-500">
              This donation does not have a valid pickup coordinate.
            </p>
          </div>
        </div>
      )}

      {/* Tracking footer */}
      <div className="border-t border-blue-100/70 bg-white/70 p-4">
        {isTracking && ngoLocation ? (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              ✓
            </div>

            <div>
              <p className="text-sm font-bold text-gray-800">
                Location sharing is active
              </p>
              <p className="text-xs text-gray-500">
                Distance and NGO position update automatically.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              🚚
            </div>

            <div>
              <p className="text-sm font-bold text-gray-800">
                Waiting for NGO
              </p>
              <p className="text-xs text-gray-500">
                The blue marker will appear when live tracking starts.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// =====================================================
// MY DONATIONS
// =====================================================

const MyDonations = () => {
  const dispatch = useDispatch();

  const { donations, loading, error } = useSelector(
    (state) => state.donations
  );

  const [liveLocations, setLiveLocations] = useState({});
  const [trackingDonations, setTrackingDonations] = useState({});

  // =====================================================
  // FETCH
  // =====================================================

  useEffect(() => {
    dispatch(fetchMyDonations());
  }, [dispatch]);

  // =====================================================
  // SOCKET.IO
  // =====================================================

  useEffect(() => {
    if (!donations?.length) return;

    const trackedDonations = donations.filter(
      (donation) =>
        donation.status === "CLAIMED" ||
        donation.status === "PICKED_UP"
    );

    // Donor only WATCHES the donation room.
    // NGO is responsible for starting live tracking.
    trackedDonations.forEach((donation) => {
      socket.emit("donation:tracking-watch", {
        donationId: donation._id,
      });
    });

    const handleLocationUpdate = (data) => {
      if (
        !data?.donationId ||
        data.latitude === undefined ||
        data.longitude === undefined
      ) {
        return;
      }

      setLiveLocations((prev) => ({
        ...prev,
        [data.donationId]: {
          latitude: Number(data.latitude),
          longitude: Number(data.longitude),
          accuracy: Number(data.accuracy || 0),
          updatedAt: Date.now(),
        },
      }));

      setTrackingDonations((prev) => ({
        ...prev,
        [data.donationId]: true,
      }));
    };

    const handleTrackingStarted = (data) => {
      if (!data?.donationId) return;

      setTrackingDonations((prev) => ({
        ...prev,
        [data.donationId]: true,
      }));
    };

    const handleTrackingStopped = (data) => {
      if (!data?.donationId) return;

      setTrackingDonations((prev) => ({
        ...prev,
        [data.donationId]: false,
      }));

      setLiveLocations((prev) => {
        const updated = { ...prev };
        delete updated[data.donationId];
        return updated;
      });
    };

    socket.on("donation:location-updated", handleLocationUpdate);
    socket.on("donation:tracking-started", handleTrackingStarted);
    socket.on("donation:tracking-stopped", handleTrackingStopped);

    return () => {
      // Stop listening for old events.
      socket.off("donation:location-updated", handleLocationUpdate);
      socket.off("donation:tracking-started", handleTrackingStarted);
      socket.off("donation:tracking-stopped", handleTrackingStopped);
    };
  }, [donations]);

  // =====================================================
  // STATS
  // =====================================================

  const stats = useMemo(() => {
    return {
      total: donations.length,
      available: donations.filter((d) => d.status === "AVAILABLE").length,
      active: donations.filter(
        (d) => d.status === "CLAIMED" || d.status === "PICKED_UP"
      ).length,
      delivered: donations.filter((d) => d.status === "DELIVERED").length,
    };
  }, [donations]);

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="mx-auto max-w-7xl pb-12">
      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative mb-8 overflow-hidden rounded-[28px] bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 p-7 text-white shadow-xl shadow-green-100 md:p-9">
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-emerald-300/20 blur-3xl" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
              Donor Dashboard
            </div>

            <h1 className="text-3xl font-black tracking-tight md:text-4xl">
              My Donations
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-50 md:text-base">
              Give surplus food a second life and follow every donation from
              pickup to delivery.
            </p>
          </div>

          <Link
            to="/donor/create-donation"
            className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 font-bold text-emerald-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <span className="mr-2 text-lg">+</span>
            New Donation
          </Link>
        </div>
      </section>

      {/* =================================================
          STATS
      ================================================= */}

      <section className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          {
            label: "Total donations",
            value: stats.total,
            icon: "🍱",
            iconBg: "bg-gray-100",
          },
          {
            label: "Available",
            value: stats.available,
            icon: "🟢",
            iconBg: "bg-emerald-50",
          },
          {
            label: "In progress",
            value: stats.active,
            icon: "🚚",
            iconBg: "bg-blue-50",
          },
          {
            label: "Delivered",
            value: stats.delivered,
            icon: "✓",
            iconBg: "bg-violet-50",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg md:p-5"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.iconBg} text-lg`}
              >
                {item.icon}
              </div>

              <span className="text-2xl font-black text-gray-900">
                {item.value}
              </span>
            </div>

            <p className="mt-4 text-xs font-semibold text-gray-500 md:text-sm">
              {item.label}
            </p>
          </div>
        ))}
      </section>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
          <span className="text-lg">!</span>
          <div>
            <p className="font-bold">Something went wrong</p>
            <p className="mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* =================================================
          LOADING
      ================================================= */}

      {loading && donations.length === 0 ? (
        <div className="rounded-3xl border border-gray-100 bg-white p-16 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl bg-emerald-50 text-3xl">
            🍱
          </div>

          <p className="mt-5 font-bold text-gray-800">
            Loading your donations...
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Fetching your donation journey.
          </p>
        </div>
      ) : donations.length === 0 ? (
        <div className="rounded-3xl border border-gray-100 bg-white p-16 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-4xl">
            🍱
          </div>

          <h2 className="mt-6 text-2xl font-black text-gray-900">
            Start your first donation
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            Share surplus food with people who need it. Create a donation and
            let an NGO or volunteer handle the pickup.
          </p>

          <Link
            to="/donor/create-donation"
            className="mt-7 inline-flex rounded-2xl bg-emerald-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-emerald-100 transition hover:-translate-y-0.5 hover:bg-emerald-700"
          >
            Create your first donation
          </Link>
        </div>
      ) : (
        <div className="space-y-7">
          {donations.map((donation) => {
            const liveLocation = liveLocations[donation._id];
            const isTracking = !!trackingDonations[donation._id];

            const donorLocation =
              donation.latitude !== undefined &&
              donation.latitude !== null &&
              donation.longitude !== undefined &&
              donation.longitude !== null
                ? [Number(donation.latitude), Number(donation.longitude)]
                : null;

            const ngoLocation = liveLocation
              ? [
                  Number(liveLocation.latitude),
                  Number(liveLocation.longitude),
                ]
              : null;

            // =================================================
            // DELIVERY LOCATION 🟢
            // =================================================

            const deliveryLocation =
              donation.deliveryLatitude !== undefined &&
              donation.deliveryLatitude !== null &&
              donation.deliveryLongitude !== undefined &&
              donation.deliveryLongitude !== null
                ? [
                    Number(donation.deliveryLatitude),
                    Number(donation.deliveryLongitude),
                  ]
                : null;

            const liveDistance =
              donorLocation && ngoLocation
                ? calculateDistance(
                    donorLocation[0],
                    donorLocation[1],
                    ngoLocation[0],
                    ngoLocation[1]
                  )
                : null;

            const status =
              statusConfig[donation.status] || statusConfig.AVAILABLE;

            return (
              <article
                key={donation._id}
                className="overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-sm transition hover:shadow-xl"
              >
                {/* =================================================
                    CARD TOP
                ================================================= */}

                <div className="flex flex-col gap-5 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between md:p-6">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-2xl shadow-inner">
                      🍱
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="truncate text-xl font-black text-gray-900 md:text-2xl">
                          {donation.foodType}
                        </h2>

                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-wide ${status.className}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                          />
                          {status.label}
                        </span>
                      </div>

                      <p className="mt-1 text-sm capitalize text-gray-500">
                        {donation.category?.replace(/-/g, " ")}{" "}
                        <span className="mx-1 text-gray-300">•</span>{" "}
                        <span className="font-semibold text-gray-700">
                          {donation.quantity} {donation.unit}
                        </span>
                      </p>
                    </div>
                  </div>

                  {donation.claimedBy && (
                    <div className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm">
                        👤
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                          Claimed by
                        </p>
                        <p className="text-sm font-bold text-gray-800">
                          {donation.claimedBy.name || "Unknown"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* =================================================
                    QUICK DETAILS
                ================================================= */}

                <div className="grid grid-cols-1 gap-3 p-5 md:grid-cols-3 md:p-6">
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                      Pickup point
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm font-bold text-gray-800">
                      📍 {donation.pickupLocation}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                      Pickup time
                    </p>
                    <p className="mt-2 text-sm font-bold text-gray-800">
                      🕐{" "}
                      {donation.pickupTime
                        ? new Date(donation.pickupTime).toLocaleString()
                        : "Not specified"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                      Delivery destination
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm font-bold text-gray-800">
                      🟢{" "}
                      {donation.deliveryLocation ||
                        "Not set yet"}
                    </p>
                  </div>
                </div>

                {/* =================================================
                    LIVE TRACKING
                ================================================= */}

                <div className="px-5 pb-5 md:px-6">
                  <LiveTracking
                    donation={donation}
                    donorLocation={donorLocation}
                    ngoLocation={ngoLocation}
                    deliveryLocation={deliveryLocation}
                    liveLocation={liveLocation}
                    isTracking={isTracking}
                    liveDistance={liveDistance}
                  />
                </div>

                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                {donation.description && (
                  <div className="mx-5 mb-5 rounded-2xl border border-gray-100 bg-white p-4 md:mx-6">
                    <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                      Description
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-700">
                      {donation.description}
                    </p>
                  </div>
                )}

                {/* =================================================
                    TIMELINE
                ================================================= */}

                <div className="px-5 pb-6 md:px-6">
                  <Timeline donation={donation} />
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyDonations