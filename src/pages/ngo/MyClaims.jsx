import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchMyClaims,
  pickupDonation,
  deliverDonation,
  setDeliveryLocation as saveDeliveryLocation,
} from "../../redux/slices/donationSlice";

import socket from "../../socket";

const API_URL = "http://localhost:5000/api";

// =====================================================
// MY CLAIMS
// =====================================================

const MyClaims = () => {
  const dispatch = useDispatch();

  const {
    donations,
    loading,
    error,
  } = useSelector((state) => state.donations);

  // =====================================================
  // LIVE TRACKING
  // =====================================================

  const [trackingDonationId, setTrackingDonationId] =
    useState(null);

  const [currentLocation, setCurrentLocation] =
    useState(null);

  const [locationError, setLocationError] =
    useState("");

  const [locationLoading, setLocationLoading] =
    useState(false);

  // =====================================================
  // DELIVERY LOCATION
  // =====================================================

  const [deliveryLocation, setDeliveryLocation] =
    useState("");

  const [deliveryLatitude, setDeliveryLatitude] =
    useState(null);

  const [deliveryLongitude, setDeliveryLongitude] =
    useState(null);

  const [deliveryLoading, setDeliveryLoading] =
    useState(false);

  const [deliveryError, setDeliveryError] =
    useState("");

  const [deliveryDonationId, setDeliveryDonationId] =
    useState(null);

  const [lastUpdated, setLastUpdated] =
    useState(null);

  const watchIdRef = useRef(null);

  // =====================================================
  // FETCH CLAIMS
  // =====================================================

  useEffect(() => {
    dispatch(fetchMyClaims());
  }, [dispatch]);

  // =====================================================
  // CLEANUP GPS
  // =====================================================

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(
          watchIdRef.current
        );

        watchIdRef.current = null;
      }

      if (trackingDonationId) {
        socket.emit(
          "donation:tracking-stop",
          {
            donationId:
              trackingDonationId,
          }
        );
      }
    };
  }, [trackingDonationId]);

  // =====================================================
  // PICKUP
  // =====================================================

  const handlePickup = async (donationId) => {
    const result = await dispatch(
      pickupDonation(donationId)
    );

    if (
      pickupDonation.fulfilled.match(result)
    ) {
      dispatch(fetchMyClaims());
    }
  };

  // =====================================================
  // DELIVER
  // =====================================================

  const handleDeliver = async (donationId) => {
    stopLiveTracking();

    const result = await dispatch(
      deliverDonation(donationId)
    );

    if (
      deliverDonation.fulfilled.match(result)
    ) {
      dispatch(fetchMyClaims());
    }
  };

  // =====================================================
  // OPEN DELIVERY LOCATION FORM
  // =====================================================

  const openDeliveryForm = (donation) => {
    setDeliveryDonationId(donation._id);
    setDeliveryLocation(
      donation.deliveryLocation || ""
    );
    setDeliveryLatitude(
      donation.deliveryLatitude ?? null
    );
    setDeliveryLongitude(
      donation.deliveryLongitude ?? null
    );
    setDeliveryError("");
  };

  // =====================================================
  // USE CURRENT LOCATION AS DELIVERY LOCATION
  // =====================================================

  const useCurrentDeliveryLocation = () => {
    if (!navigator.geolocation) {
      setDeliveryError(
        "Your browser does not support location services."
      );
      return;
    }

    setDeliveryError("");
    setDeliveryLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setDeliveryLatitude(latitude);
        setDeliveryLongitude(longitude);

        if (!deliveryLocation) {
          setDeliveryLocation("Current selected location");
        }

        setDeliveryLoading(false);
      },
      (geoError) => {
        console.error("Delivery GPS Error:", geoError);
        setDeliveryLoading(false);

        if (geoError.code === geoError.PERMISSION_DENIED) {
          setDeliveryError(
            "Location permission was denied. Please allow location access from your browser."
          );
        } else {
          setDeliveryError(
            "Unable to detect delivery location. Please try again."
          );
        }
      },
      {
        enableHighAccuracy: true,
        maximumAge: 2000,
        timeout: 10000,
      }
    );
  };

  // =====================================================
  // SAVE DELIVERY LOCATION
  // =====================================================

const handleSaveDeliveryLocation = async (donationId) => {
  if (!deliveryLocation.trim()) {
    setDeliveryError(
      "Please enter the delivery / beneficiary location."
    );
    return;
  }

  if (
    deliveryLatitude === null ||
    deliveryLongitude === null
  ) {
    setDeliveryError(
      "Please select delivery coordinates using your current location."
    );
    return;
  }

  try {
    setDeliveryLoading(true);
    setDeliveryError("");

    const result = await dispatch(
      saveDeliveryLocation({
        donationId,
        deliveryLocation: deliveryLocation.trim(),
        deliveryLatitude,
        deliveryLongitude,
      })
    );

    if (saveDeliveryLocation.fulfilled.match(result)) {
      setDeliveryDonationId(null);
      setDeliveryLocation("");
      setDeliveryLatitude(null);
      setDeliveryLongitude(null);

      await dispatch(fetchMyClaims());
    } else {
      setDeliveryError(
        result.payload ||
          "Failed to save delivery location."
      );
    }
  } catch (error) {
    console.error(
      "Save Delivery Location Error:",
      error
    );

    setDeliveryError(
      "Failed to save delivery location."
    );
  } finally {
    setDeliveryLoading(false);
  }
};

  // =====================================================
  // START LIVE TRACKING
  // =====================================================

  const startLiveTracking = (donation) => {
    if (!navigator.geolocation) {
      setLocationError(
        "Your browser does not support live location tracking."
      );

      return;
    }

    setLocationError("");
    setLocationLoading(true);
    setLastUpdated(null);

    // =================================================
    // STOP OLD GPS WATCH
    // =================================================

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(
        watchIdRef.current
      );

      watchIdRef.current = null;
    }

    // =================================================
    // STOP PREVIOUS TRACKING
    // =================================================

    if (
      trackingDonationId &&
      trackingDonationId !== donation._id
    ) {
      socket.emit(
        "donation:tracking-stop",
        {
          donationId:
            trackingDonationId,
        }
      );
    }

    // =================================================
    // SET TRACKING DONATION
    // =================================================

    setTrackingDonationId(
      donation._id
    );

    // =================================================
    // JOIN SOCKET ROOM FIRST
    // =================================================

    socket.emit(
      "donation:tracking-start",
      {
        donationId: donation._id,
      }
    );

    console.log(
      "🟢 Tracking started:",
      donation._id
    );

    // =================================================
    // CONTINUOUS GPS
    // =================================================

    const watchId =
      navigator.geolocation.watchPosition(
        (position) => {
          const {
            latitude,
            longitude,
            accuracy,
          } = position.coords;

          const location = {
            latitude,
            longitude,
            accuracy,
          };

          // =============================================
          // UPDATE UI
          // =============================================

          setCurrentLocation(
            location
          );

          setLocationLoading(false);

          setLastUpdated(
            new Date()
          );

          // =============================================
          // SEND TO SOCKET.IO
          // =============================================

          socket.emit(
            "donation:location-update",
            {
              donationId:
                donation._id,

              latitude,

              longitude,

              accuracy,
            }
          );

          console.log(
            "📍 LIVE LOCATION SENT",
            {
              donationId:
                donation._id,

              latitude,

              longitude,

              accuracy,
            }
          );
        },

        (geoError) => {
          console.error(
            "GPS Error:",
            geoError
          );

          setLocationLoading(false);

          switch (geoError.code) {
            case geoError.PERMISSION_DENIED:
              setLocationError(
                "Location permission was denied. Please allow location access from your browser."
              );
              break;

            case geoError.POSITION_UNAVAILABLE:
              setLocationError(
                "Your current location is unavailable. Please check GPS/location services."
              );
              break;

            case geoError.TIMEOUT:
              setLocationError(
                "Location request timed out. Please try again."
              );
              break;

            default:
              setLocationError(
                "Unable to detect your current location."
              );
          }
        },

        {
          enableHighAccuracy: true,
          maximumAge: 2000,
          timeout: 10000,
        }
      );

    watchIdRef.current =
      watchId;
  };

  // =====================================================
  // STOP LIVE TRACKING
  // =====================================================

  const stopLiveTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(
        watchIdRef.current
      );

      watchIdRef.current = null;
    }

    if (trackingDonationId) {
      socket.emit(
        "donation:tracking-stop",
        {
          donationId:
            trackingDonationId,
        }
      );

      console.log(
        "🔴 Tracking stopped:",
        trackingDonationId
      );
    }

    setTrackingDonationId(null);

    setCurrentLocation(null);

    setLocationLoading(false);

    setLastUpdated(null);
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const statusStyles = {
    CLAIMED:
      "bg-orange-100 text-orange-700",

    PICKED_UP:
      "bg-blue-100 text-blue-700",

    DELIVERED:
      "bg-purple-100 text-purple-700",
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="mx-auto w-full max-w-7xl">

      {/* =================================================
          CUSTOM ANIMATIONS
      ================================================= */}

      <style>
        {`
          @keyframes floatUp {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-5px);
            }
          }

          @keyframes pulseRing {
            0% {
              transform: scale(0.8);
              opacity: 0.8;
            }
            70% {
              transform: scale(1.5);
              opacity: 0;
            }
            100% {
              transform: scale(1.5);
              opacity: 0;
            }
          }

          @keyframes signalPulse {
            0% {
              transform: scale(0.8);
              opacity: 0.2;
            }
            50% {
              opacity: 0.8;
            }
            100% {
              transform: scale(1.35);
              opacity: 0;
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes shimmer {
            0% {
              background-position: -500px 0;
            }
            100% {
              background-position: 500px 0;
            }
          }

          @keyframes trackingDot {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.25);
              opacity: 0.7;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          .tracking-float {
            animation: floatUp 2.5s ease-in-out infinite;
          }

          .tracking-slide {
            animation: slideUp 0.45s ease-out;
          }

          .tracking-pulse {
            position: relative;
          }

          .tracking-pulse::after {
            content: "";
            position: absolute;
            inset: -6px;
            border-radius: 9999px;
            background: rgba(34, 197, 94, 0.25);
            animation: pulseRing 1.8s ease-out infinite;
            z-index: -1;
          }

          .signal-animation {
            animation: signalPulse 1.8s ease-out infinite;
          }

          .tracking-dot {
            animation: trackingDot 1.2s ease-in-out infinite;
          }

          .live-shimmer {
            background: linear-gradient(
              90deg,
              rgba(220,252,231,1) 0%,
              rgba(240,253,244,1) 50%,
              rgba(220,252,231,1) 100%
            );
            background-size: 500px 100%;
            animation: shimmer 2.5s linear infinite;
          }
        `}
      </style>

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-8">

        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">

          <span className="h-2 w-2 rounded-full bg-green-500" />

          NGO / Volunteer

        </div>

        <h1 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">

          My Claims

        </h1>

        <p className="mt-2 max-w-2xl text-gray-500">

          Manage your claimed donations and
          share your live journey with donors.

        </p>

      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (

        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">

          <span className="text-lg">
            ⚠️
          </span>

          <div>

            <p className="font-bold">
              Something went wrong
            </p>

            <p className="mt-1">
              {error}
            </p>

          </div>

        </div>

      )}

      {/* =================================================
          LOCATION ERROR
      ================================================= */}

      {locationError && (

        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-orange-100 bg-orange-50 p-4 text-sm text-orange-700">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-100">

            📍

          </div>

          <div>

            <p className="font-bold">
              Location access required
            </p>

            <p className="mt-1 leading-5">
              {locationError}
            </p>

          </div>

        </div>

      )}

      {/* =================================================
          LOADING
      ================================================= */}

      {loading &&
      donations.length === 0 ? (

        <div className="rounded-3xl border border-gray-100 bg-white p-12 text-center shadow-sm">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-3xl tracking-float">

            📦

          </div>

          <h2 className="font-bold text-gray-900">
            Loading your claims
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Please wait...
          </p>

        </div>

      ) : donations.length === 0 ? (

        <div className="rounded-3xl border border-gray-100 bg-white p-12 text-center shadow-sm">

          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-green-50 text-4xl tracking-float">

            🍱

          </div>

          <h2 className="text-xl font-black text-gray-900">
            No Claims Found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">

            You haven't claimed any donations
            yet. Available food donations will
            appear here after you claim them.

          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

          {donations.map(
            (donation, index) => {

              const isTracking =
                trackingDonationId ===
                donation._id;

              return (

                <div
                  key={donation._id}
                  className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    animation:
                      `slideUp 0.45s ease-out ${
                        index * 0.08
                      }s both`,
                  }}
                >

                  {/* =================================================
                      FOOD HERO
                  ================================================= */}

                  <div className="relative h-36 overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">

                    <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-green-200/30" />

                    <div className="absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-white/40" />

                    <div className="relative flex h-full items-center justify-center">

                      <div className="tracking-float text-6xl drop-shadow-sm">

                        🍱

                      </div>

                    </div>

                  </div>

                  <div className="p-6">

                    {/* =================================================
                        TITLE
                    ================================================= */}

                    <div className="flex items-start justify-between gap-3">

                      <div className="min-w-0">

                        <h2 className="truncate text-xl font-black text-gray-900">

                          {donation.foodType}

                        </h2>

                        <p className="mt-1 text-sm capitalize text-gray-500">

                          {donation.category?.replace(
                            /-/g,
                            " "
                          )}

                        </p>

                      </div>

                      <span
                        className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] font-black tracking-wide ${
                          statusStyles[
                            donation.status
                          ] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >

                        {donation.status}

                      </span>

                    </div>

                    {/* =================================================
                        DETAILS
                    ================================================= */}

                    <div className="mt-6 space-y-4">

                      <div className="flex items-center justify-between">

                        <span className="text-sm text-gray-500">
                          Quantity
                        </span>

                        <span className="rounded-lg bg-gray-50 px-3 py-1.5 text-sm font-bold text-gray-800">

                          {donation.quantity}{" "}
                          {donation.unit}

                        </span>

                      </div>

                      <div>

                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Donor
                        </p>

                        <p className="mt-1 font-semibold text-gray-800">
                          {donation.donor?.name ||
                            "Unknown"}
                        </p>

                        {donation.donor?.email && (

                          <p className="mt-0.5 text-xs text-gray-500">

                            {
                              donation.donor.email
                            }

                          </p>

                        )}

                      </div>

                      <div>

                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Pickup Location
                        </p>

                        <p className="mt-1 text-sm font-medium leading-5 text-gray-800">

                          🔴{" "}
                          {
                            donation.pickupLocation
                          }

                        </p>

                      </div>

                      {donation.deliveryLocation && (
                        <div>

                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Delivery Destination
                          </p>

                          <p className="mt-1 text-sm font-medium leading-5 text-gray-800">

                            🟢{" "}
                            {
                              donation.deliveryLocation
                            }

                          </p>

                        </div>
                      )}

                      <div>

                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Pickup Time
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-800">

                          🕐{" "}
                          {donation.pickupTime
                            ? new Date(
                                donation.pickupTime
                              ).toLocaleString()
                            : "Not specified"}

                        </p>

                      </div>

                    </div>

                    {/* =================================================
                        CLAIM TIME
                    ================================================= */}

                    {donation.claimedAt && (

                      <div className="mt-5 rounded-2xl border border-orange-100 bg-orange-50 p-4">

                        <div className="flex items-center gap-2">

                          <span>
                            🎟️
                          </span>

                          <p className="text-xs font-bold uppercase tracking-wide text-orange-600">
                            Claimed At
                          </p>

                        </div>

                        <p className="mt-2 text-sm font-semibold text-gray-800">

                          {new Date(
                            donation.claimedAt
                          ).toLocaleString()}

                        </p>

                      </div>

                    )}

                    {/* =================================================
                        LIVE TRACKING CARD
                    ================================================= */}

                    {(donation.status ===
                      "CLAIMED" ||
                      donation.status ===
                        "PICKED_UP") &&
                      donation.deliveryLocation &&
                      donation.deliveryLatitude !== null &&
                      donation.deliveryLongitude !== null && (

                      <div
                        className={`tracking-slide relative mt-6 overflow-hidden rounded-3xl border transition-all duration-500 ${
                          isTracking
                            ? "border-green-200 bg-green-50"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >

                        {/* TOP GLOW */}

                        {isTracking && (

                          <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400" />

                        )}

                        <div className="p-5">

                          {/* =================================================
                              TRACKING HEADER
                          ================================================= */}

                          <div className="flex items-center gap-3">

                            <div
                              className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                                isTracking
                                  ? "bg-green-600 text-white shadow-lg shadow-green-200"
                                  : "bg-white text-gray-500 shadow-sm"
                              }`}
                            >

                              {isTracking && (

                                <span className="absolute inset-0 rounded-2xl bg-green-400/30 signal-animation" />

                              )}

                              <span className="relative text-xl">

                                {isTracking
                                  ? "📡"
                                  : "📍"}

                              </span>

                            </div>

                            <div className="min-w-0 flex-1">

                              <div className="flex flex-wrap items-center gap-2">

                                <p className="font-black text-gray-900">

                                  {isTracking
                                    ? "You're Live"
                                    : "Live Tracking"}

                                </p>

                                {isTracking && (

                                  <span className="relative flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-black text-green-700">

                                    <span className="tracking-pulse h-2 w-2 rounded-full bg-green-500" />

                                    LIVE

                                  </span>

                                )}

                              </div>

                              <p className="mt-1 text-xs leading-5 text-gray-500">

                                {isTracking
                                  ? "Your location is being shared with the donor in real time."
                                  : "Start tracking when you begin travelling to collect the food."}

                              </p>

                            </div>

                          </div>

                          {/* =================================================
                              ACTIVE LIVE PANEL
                          ================================================= */}

                          {isTracking && (

                            <div className="live-shimmer mt-5 rounded-2xl border border-green-100 p-4">

                              {/* STATUS */}

                              <div className="flex items-center justify-between">

                                <div className="flex items-center gap-2">

                                  <span className="tracking-dot h-2.5 w-2.5 rounded-full bg-green-500" />

                                  <span className="text-sm font-bold text-green-700">

                                    On the way

                                  </span>

                                </div>

                                <span className="text-xs font-medium text-gray-500">

                                  GPS Active

                                </span>

                              </div>

                              {/* =================================================
                                  STATS
                              ================================================= */}

                              {currentLocation && (

                                <div className="mt-4 grid grid-cols-2 gap-3">

                                  {/* ACCURACY */}

                                  <div className="rounded-2xl bg-white/80 p-3">

                                    <div className="flex items-center gap-2">

                                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-sm">
                                        🎯
                                      </div>

                                      <div>

                                        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                                          Accuracy
                                        </p>

                                        <p className="text-base font-black text-gray-900">

                                          ±
                                          {Math.round(
                                            currentLocation.accuracy
                                          )}
                                          m

                                        </p>

                                      </div>

                                    </div>

                                  </div>

                                  {/* UPDATE */}

                                  <div className="rounded-2xl bg-white/80 p-3">

                                    <div className="flex items-center gap-2">

                                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-green-50 text-sm">
                                        ⚡
                                      </div>

                                      <div>

                                        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                                          Status
                                        </p>

                                        <p className="text-base font-black text-green-600">
                                          Updating
                                        </p>

                                      </div>

                                    </div>

                                  </div>

                                </div>

                              )}

                              {/* =================================================
                                  COORDINATES
                              ================================================= */}

                              {currentLocation && (

                                <div className="mt-3 rounded-2xl bg-white/80 p-3">

                                  <div className="flex items-center justify-between gap-3">

                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                                      Current Coordinates
                                    </p>

                                    {lastUpdated && (

                                      <p className="text-[10px] text-gray-400">

                                        Updated{" "}
                                        {lastUpdated.toLocaleTimeString()}

                                      </p>

                                    )}

                                  </div>

                                  <p className="mt-1 break-all font-mono text-xs font-semibold text-gray-700">

                                    {currentLocation.latitude.toFixed(
                                      6
                                    )}
                                    {" , "}
                                    {currentLocation.longitude.toFixed(
                                      6
                                    )}

                                  </p>

                                </div>

                              )}

                            </div>

                          )}

                          {/* =================================================
                              START BUTTON
                          ================================================= */}

                          {!isTracking && (

                            <button
                              type="button"
                              onClick={() =>
                                startLiveTracking(
                                  donation
                                )
                              }
                              disabled={
                                locationLoading
                              }
                              className="group relative mt-5 w-full overflow-hidden rounded-2xl bg-green-600 py-3.5 font-bold text-white shadow-lg shadow-green-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                            >

                              <span className="relative z-10 flex items-center justify-center gap-2">

                                {locationLoading ? (
                                  <>
                                    <span className="animate-spin text-lg">
                                      ⟳
                                    </span>

                                    Detecting Location...
                                  </>
                                ) : (
                                  <>
                                    <span className="text-lg transition-transform duration-300 group-hover:scale-125">
                                      📡
                                    </span>

                                    Start Live Tracking
                                  </>
                                )}

                              </span>

                            </button>

                          )}

                          {/* =================================================
                              STOP BUTTON
                          ================================================= */}

                          {isTracking && (

                            <button
                              type="button"
                              onClick={
                                stopLiveTracking
                              }
                              className="mt-5 w-full rounded-2xl border border-red-200 bg-white py-3.5 font-bold text-red-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-50 hover:shadow-md"
                            >

                              <span className="flex items-center justify-center gap-2">

                                <span>
                                  ⏹
                                </span>

                                Stop Live Tracking

                              </span>

                            </button>

                          )}

                        </div>

                      </div>

                    )}

                    {/* =================================================
                        PICKUP BUTTON
                    ================================================= */}

                    {donation.status ===
                      "CLAIMED" && (

                      <>

                        {/* =================================================
                            DELIVERY LOCATION
                        ================================================= */}

                        {donation.deliveryLocation ? (

                          <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">

                            <div className="flex items-start gap-3">

                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
                                🟢
                              </div>

                              <div className="min-w-0 flex-1">

                                <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
                                  Delivery Destination
                                </p>

                                <p className="mt-1 text-sm font-semibold text-gray-800">
                                  {donation.deliveryLocation}
                                </p>

                                {donation.deliveryLatitude !== null &&
                                  donation.deliveryLongitude !== null && (
                                    <p className="mt-1 break-all font-mono text-[10px] text-gray-500">
                                      {Number(
                                        donation.deliveryLatitude
                                      ).toFixed(6)}
                                      {" , "}
                                      {Number(
                                        donation.deliveryLongitude
                                      ).toFixed(6)}
                                    </p>
                                  )}

                              </div>

                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                openDeliveryForm(
                                  donation
                                )
                              }
                              disabled={isTracking}
                              className="mt-3 w-full rounded-xl border border-emerald-200 bg-white py-2.5 text-sm font-bold text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Edit Delivery Location
                            </button>

                          </div>

                        ) : (

                          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">

                            <div className="flex items-start gap-3">

                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                                📍
                              </div>

                              <div>
                                <p className="text-sm font-black text-amber-800">
                                  Delivery location required
                                </p>

                                <p className="mt-1 text-xs leading-5 text-amber-700">
                                  Set the beneficiary / delivery
                                  destination before starting the
                                  pickup journey.
                                </p>
                              </div>

                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                openDeliveryForm(
                                  donation
                                )
                              }
                              className="mt-4 w-full rounded-xl bg-amber-500 py-3 text-sm font-bold text-white transition hover:bg-amber-600"
                            >
                              Set Delivery Location
                            </button>

                          </div>

                        )}

                        {/* =================================================
                            DELIVERY LOCATION FORM
                        ================================================= */}

                        {deliveryDonationId ===
                          donation._id && (

                          <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

                            <div className="mb-4">

                              <p className="text-sm font-black text-gray-900">
                                Where will you deliver the food?
                              </p>

                              <p className="mt-1 text-xs leading-5 text-gray-500">
                                Enter the beneficiary location and
                                select its GPS coordinates.
                              </p>

                            </div>

                            {deliveryError && (
                              <div className="mb-4 rounded-xl border border-red-100 bg-red-50 p-3 text-xs font-medium text-red-700">
                                {deliveryError}
                              </div>
                            )}

                            <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                              Delivery Address
                            </label>

                            <input
                              type="text"
                              value={deliveryLocation}
                              onChange={(e) =>
                                setDeliveryLocation(
                                  e.target.value
                                )
                              }
                              placeholder="e.g. ABC Community Center"
                              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                            />

                            <div className="mt-3 rounded-xl bg-gray-50 p-3">

                              <div className="flex items-center justify-between gap-3">

                                <div>
                                  <p className="text-xs font-bold text-gray-700">
                                    GPS Coordinates
                                  </p>

                                  {deliveryLatitude !== null &&
                                  deliveryLongitude !== null ? (
                                    <p className="mt-1 font-mono text-[10px] text-gray-500">
                                      {Number(
                                        deliveryLatitude
                                      ).toFixed(6)}
                                      {" , "}
                                      {Number(
                                        deliveryLongitude
                                      ).toFixed(6)}
                                    </p>
                                  ) : (
                                    <p className="mt-1 text-xs text-gray-400">
                                      Location not selected
                                    </p>
                                  )}

                                </div>

                                <button
                                  type="button"
                                  onClick={
                                    useCurrentDeliveryLocation
                                  }
                                  disabled={
                                    deliveryLoading
                                  }
                                  className="shrink-0 rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-blue-700 disabled:opacity-50"
                                >
                                  {deliveryLoading
                                    ? "Detecting..."
                                    : "Use My Location"}
                                </button>

                              </div>

                            </div>

                            <div className="mt-3 grid grid-cols-2 gap-2">

                              <button
                                type="button"
                                onClick={() => {
                                  setDeliveryDonationId(
                                    null
                                  );
                                  setDeliveryError("");
                                }}
                                className="rounded-xl border border-gray-200 bg-white py-3 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
                              >
                                Cancel
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleSaveDeliveryLocation(
                                    donation._id
                                  )
                                }
                                disabled={
                                  deliveryLoading
                                }
                                className="rounded-xl bg-green-600 py-3 text-sm font-bold text-white transition hover:bg-green-700 disabled:opacity-50"
                              >
                                {deliveryLoading
                                  ? "Saving..."
                                  : "Save Destination"}
                              </button>

                            </div>

                          </div>

                        )}

                        {/* =================================================
                            PICKUP BUTTON
                        ================================================= */}

                        {donation.deliveryLocation ? (

                          <button
                            type="button"
                            onClick={() =>
                              handlePickup(
                                donation._id
                              )
                            }
                            disabled={
                              loading ||
                              isTracking
                            }
                            className="mt-5 w-full rounded-2xl bg-blue-600 py-3.5 font-bold text-white shadow-lg shadow-blue-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                          >

                            {loading ? (
                          <span className="flex items-center justify-center gap-2">

                            <span className="animate-spin">
                              ⟳
                            </span>

                            Processing...

                          </span>
                        ) : isTracking ? (
                          "Stop Tracking Before Pickup"
                        ) : (
                          <span className="flex items-center justify-center gap-2">

                            <span>
                              📦
                            </span>

                            Mark as Picked Up

                          </span>
                        )}

                          </button>

                        ) : null}

                      </>

                    )}

                    {/* =================================================
                        DELIVER BUTTON
                    ================================================= */}

                    {donation.status ===
                      "PICKED_UP" && (

                      <button
                        type="button"
                        onClick={() =>
                          handleDeliver(
                            donation._id
                          )
                        }
                        disabled={
                          loading
                        }
                        className="mt-5 w-full rounded-2xl bg-purple-600 py-3.5 font-bold text-white shadow-lg shadow-purple-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                      >

                        {loading ? (
                          <span className="flex items-center justify-center gap-2">

                            <span className="animate-spin">
                              ⟳
                            </span>

                            Processing...

                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">

                            <span>
                              🚚
                            </span>

                            Mark as Delivered

                          </span>
                        )}

                      </button>

                    )}

                    {/* =================================================
                        DELIVERED
                    ================================================= */}

                    {donation.status ===
                      "DELIVERED" && (

                      <div className="mt-6 overflow-hidden rounded-2xl border border-purple-100 bg-purple-50">

                        <div className="flex items-center justify-center gap-2 py-4 font-bold text-purple-700">

                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-600 text-sm text-white">
                            ✓
                          </span>

                          Donation Delivered

                        </div>

                      </div>

                    )}

                  </div>

                </div>
              );
            }
          )}

        </div>

      )}

    </div>
  );
};

export default MyClaims;