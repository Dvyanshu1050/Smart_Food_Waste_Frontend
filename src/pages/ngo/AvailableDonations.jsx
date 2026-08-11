import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAvailableDonations,
  claimDonation,
} from "../../redux/slices/donationSlice";

// Leaflet
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

// Fix Leaflet marker icon issue in Vite/React
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",

  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const AvailableDonations = () => {
  const dispatch = useDispatch();

  const {
    donations,
    loading,
    error,
  } = useSelector(
    (state) => state.donations
  );

  // =========================
  // MAP MODAL
  // =========================

  const [selectedDonation, setSelectedDonation] =
    useState(null);

  // =========================
  // FETCH DONATIONS
  // =========================

  useEffect(() => {
    dispatch(fetchAvailableDonations());
  }, [dispatch]);

  // =========================
  // CLAIM
  // =========================

  const handleClaim = async (donationId) => {
    const result = await dispatch(
      claimDonation(donationId)
    );

    if (
      claimDonation.fulfilled.match(result)
    ) {
      setSelectedDonation(null);

      dispatch(fetchAvailableDonations());
    }
  };

  // =========================
  // OPEN MAP
  // =========================

  const handleViewMap = (donation) => {
    setSelectedDonation(donation);
  };

  // =========================
  // CLOSE MAP
  // =========================

  const handleCloseMap = () => {
    setSelectedDonation(null);
  };

  return (
    <div>

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-8">

        <p className="font-medium text-green-600">
          NGO / Volunteer
        </p>

        <h1 className="mt-1 text-3xl font-bold text-gray-900 md:text-4xl">
          Available Donations
        </h1>

        <p className="mt-2 text-gray-500">
          Find available food donations and claim
          them for delivery.
        </p>

      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* =================================================
          LOADING
      ================================================= */}

      {loading && donations.length === 0 ? (

        <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

          <div className="mb-4 text-5xl">
            ⏳
          </div>

          <p className="text-gray-500">
            Loading available donations...
          </p>

        </div>

      ) : donations.length === 0 ? (

        /* =================================================
            EMPTY
        ================================================= */

        <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

          <div className="mb-5 text-6xl">
            🍱
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            No Available Donations
          </h2>

          <p className="mt-2 text-gray-500">
            There are currently no food donations
            available.
          </p>

        </div>

      ) : (

        /* =================================================
            DONATIONS
        ================================================= */

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

          {donations.map(
            (donation) => (

              <div
                key={donation._id}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >

                {/* =================================================
                    FOOD HEADER
                ================================================= */}

                <div className="flex h-36 items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 text-6xl">
                  🍱
                </div>

                <div className="p-6">

                  {/* =================================================
                      TITLE
                  ================================================= */}

                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      <h2 className="truncate text-xl font-bold text-gray-900">
                        {donation.foodType}
                      </h2>

                      <p className="mt-1 text-sm capitalize text-gray-500">
                        {donation.category?.replace(
                          /-/g,
                          " "
                        )}
                      </p>

                    </div>

                    <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      AVAILABLE
                    </span>

                  </div>

                  {/* =================================================
                      DETAILS
                  ================================================= */}

                  <div className="mt-5 space-y-4">

                    {/* QUANTITY */}

                    <div className="flex items-center justify-between">

                      <span className="text-sm text-gray-500">
                        Quantity
                      </span>

                      <span className="text-sm font-semibold text-gray-800">
                        {donation.quantity}{" "}
                        {donation.unit}
                      </span>

                    </div>

                    {/* LOCATION */}

                    <div>

                      <p className="text-sm text-gray-500">
                        Pickup Location
                      </p>

                      <p className="mt-1 line-clamp-2 text-sm font-medium text-gray-800">
                        📍 {donation.pickupLocation}
                      </p>

                    </div>

                    {/* PICKUP TIME */}

                    <div>

                      <p className="text-sm text-gray-500">
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

                    {/* EXPIRY */}

                    <div>

                      <p className="text-sm text-gray-500">
                        Available Until
                      </p>

                      <p className="mt-1 text-sm font-medium text-gray-800">
                        ⏰{" "}
                        {donation.expiryTime
                          ? new Date(
                              donation.expiryTime
                            ).toLocaleString()
                          : "Not specified"}
                      </p>

                    </div>

                  </div>

                  {/* =================================================
                      DESCRIPTION
                  ================================================= */}

                  {donation.description && (
                    <div className="mt-5">

                      <p className="text-sm text-gray-500">
                        Description
                      </p>

                      <p className="mt-1 line-clamp-2 text-sm text-gray-700">
                        {donation.description}
                      </p>

                    </div>
                  )}

                  {/* =================================================
                      MAP + CLAIM BUTTONS
                  ================================================= */}

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">

                    {/* VIEW MAP */}

                    <button
                      type="button"
                      onClick={() =>
                        handleViewMap(
                          donation
                        )
                      }
                      disabled={
                        donation.latitude ===
                          undefined ||
                        donation.longitude ===
                          undefined
                      }
                      className="rounded-xl border border-green-600 bg-white py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400"
                    >
                      📍 View Map
                    </button>

                    {/* CLAIM */}

                    <button
                      type="button"
                      onClick={() =>
                        handleClaim(
                          donation._id
                        )
                      }
                      disabled={loading}
                      className="rounded-xl bg-green-600 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading
                        ? "Claiming..."
                        : "Claim Donation"}
                    </button>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      )}

      {/* =================================================
          MAP MODAL
      ================================================= */}

      {selectedDonation && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-3 sm:p-6"
          onClick={handleCloseMap}
        >

          <div
            className="flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* =================================================
                MAP HEADER
            ================================================= */}

            <div className="flex items-center justify-between border-b px-4 py-4 sm:px-6">

              <div className="min-w-0">

                <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
                  Pickup Location
                </p>

                <h2 className="mt-1 truncate text-lg font-bold text-gray-900 sm:text-xl">
                  {selectedDonation.foodType}
                </h2>

              </div>

              <button
                type="button"
                onClick={handleCloseMap}
                className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg text-gray-600 transition hover:bg-gray-200"
              >
                ✕
              </button>

            </div>

            {/* =================================================
                MAP
            ================================================= */}

            <div className="h-[55vh] min-h-[300px] w-full sm:h-[500px]">

              <MapContainer
                center={[
                  Number(
                    selectedDonation.latitude
                  ),
                  Number(
                    selectedDonation.longitude
                  ),
                ]}
                zoom={15}
                scrollWheelZoom={true}
                className="h-full w-full"
              >

                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker
                  position={[
                    Number(
                      selectedDonation.latitude
                    ),
                    Number(
                      selectedDonation.longitude
                    ),
                  ]}
                >

                  <Popup>

                    <div className="min-w-[180px]">

                      <p className="font-bold text-gray-900">
                        {selectedDonation.foodType}
                      </p>

                      <p className="mt-1 text-sm text-gray-600">
                        📍{" "}
                        {
                          selectedDonation.pickupLocation
                        }
                      </p>

                      <p className="mt-2 text-sm font-semibold text-green-700">
                        {selectedDonation.quantity}{" "}
                        {selectedDonation.unit}
                      </p>

                    </div>

                  </Popup>

                </Marker>

              </MapContainer>

            </div>

            {/* =================================================
                LOCATION INFO
            ================================================= */}

            <div className="border-t bg-gray-50 px-4 py-4 sm:px-6">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="min-w-0">

                  <p className="text-xs font-medium text-gray-500">
                    Pickup Address
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    📍{" "}
                    {selectedDonation.pickupLocation}
                  </p>

                </div>

                {/* OPEN IN MAP */}

                <a
                  href={`https://www.google.com/maps?q=${selectedDonation.latitude},${selectedDonation.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-xl bg-gray-900 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  🧭 Open Navigation
                </a>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default AvailableDonations;