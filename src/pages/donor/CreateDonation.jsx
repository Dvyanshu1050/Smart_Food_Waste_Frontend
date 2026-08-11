import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { createDonation } from "../../redux/slices/donationSlice";

// =====================================================
// DONOR MAP ICON
// =====================================================

const donorIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width: 30px;
      height: 30px;
      background: #dc2626;
      border: 3px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 3px 8px rgba(0,0,0,0.35);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        width: 8px;
        height: 8px;
        background: white;
        border-radius: 50%;
      "></div>
    </div>
  `,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

// =====================================================
// DEFAULT LOCATION
// =====================================================

const DEFAULT_LOCATION = [23.2599, 77.4126];

// =====================================================
// MAP CENTER CONTROLLER
// =====================================================

const MapController = ({ position }) => {
  const map = useMap();

  if (position) {
    map.setView(position, 15, {
      animate: true,
    });
  }

  return null;
};

// =====================================================
// MAP CLICK HANDLER
// =====================================================

const LocationMarker = ({
  position,
  setPosition,
  setFormData,
}) => {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;

      // Update marker
      setPosition([lat, lng]);

      // Update coordinates
      setFormData((prev) => ({
        ...prev,
        latitude: lat,
        longitude: lng,
      }));
    },
  });

  return position ? (
    <Marker
      position={position}
      icon={donorIcon}
    />
  ) : null;
};

// =====================================================
// CREATE DONATION
// =====================================================

const CreateDonation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading,
    error: donationError,
  } = useSelector(
    (state) => state.donations
  );

  // =====================================================
  // FORM DATA
  // =====================================================

  const [formData, setFormData] = useState({
    foodType: "",
    category: "",
    quantity: "",
    unit: "meals",

    pickupLocation: "",

    latitude: DEFAULT_LOCATION[0],
    longitude: DEFAULT_LOCATION[1],

    pickupTime: "",
    expiryTime: "",

    description: "",
  });

  // =====================================================
  // MAP POSITION
  // =====================================================

  const [position, setPosition] =
    useState(DEFAULT_LOCATION);

  // =====================================================
  // LOCATION LOADING
  // =====================================================

  const [locationLoading, setLocationLoading] =
    useState(false);

  const [error, setError] = useState("");

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };

  // =====================================================
  // USE CURRENT LOCATION
  // =====================================================

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError(
        "Geolocation is not supported by your browser."
      );

      return;
    }

    setLocationLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (location) => {
        const lat =
          location.coords.latitude;

        const lng =
          location.coords.longitude;

        // Update marker
        setPosition([lat, lng]);

        // Update coordinates
        setFormData((prev) => ({
          ...prev,
          latitude: lat,
          longitude: lng,
        }));

        setLocationLoading(false);
      },

      (geoError) => {
        console.error(
          "Location Error:",
          geoError
        );

        setLocationLoading(false);

        if (
          geoError.code ===
          geoError.PERMISSION_DENIED
        ) {
          setError(
            "Location permission was denied. Please allow location access or select a location on the map."
          );
        } else if (
          geoError.code ===
          geoError.POSITION_UNAVAILABLE
        ) {
          setError(
            "Your current location could not be detected. Please select a location on the map."
          );
        } else if (
          geoError.code ===
          geoError.TIMEOUT
        ) {
          setError(
            "Location request timed out. Please try again."
          );
        } else {
          setError(
            "Unable to get your current location. Please select a location on the map."
          );
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // =====================================================
  // HANDLE SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // =================================================
    // REQUIRED FIELDS
    // =================================================

    if (
      !formData.foodType ||
      !formData.category ||
      !formData.quantity ||
      !formData.pickupLocation ||
      !formData.pickupTime ||
      !formData.expiryTime
    ) {
      setError(
        "Please fill all required fields."
      );

      return;
    }

    // =================================================
    // LOCATION VALIDATION
    // =================================================

    if (
      formData.latitude === null ||
      formData.latitude === undefined ||
      formData.longitude === null ||
      formData.longitude === undefined
    ) {
      setError(
        "Please select a pickup location on the map."
      );

      return;
    }

    // =================================================
    // QUANTITY VALIDATION
    // =================================================

    if (Number(formData.quantity) <= 0) {
      setError(
        "Quantity must be greater than 0."
      );

      return;
    }

    // =================================================
    // DATE VALIDATION
    // =================================================

    const pickupDate = new Date(
      formData.pickupTime
    );

    const expiryDate = new Date(
      formData.expiryTime
    );

    if (pickupDate <= new Date()) {
      setError(
        "Pickup time must be in the future."
      );

      return;
    }

    if (expiryDate <= new Date()) {
      setError(
        "Expiry time must be in the future."
      );

      return;
    }

    if (pickupDate >= expiryDate) {
      setError(
        "Pickup time must be before expiry time."
      );

      return;
    }

    // =================================================
    // SEND TO BACKEND
    // =================================================

    const result = await dispatch(
      createDonation({
        foodType:
          formData.foodType,

        category:
          formData.category,

        quantity:
          Number(formData.quantity),

        unit:
          formData.unit,

        pickupLocation:
          formData.pickupLocation,

        latitude:
          Number(formData.latitude),

        longitude:
          Number(formData.longitude),

        pickupTime:
          formData.pickupTime,

        expiryTime:
          formData.expiryTime,

        description:
          formData.description,
      })
    );

    // =================================================
    // SUCCESS
    // =================================================

    if (
      createDonation.fulfilled.match(
        result
      )
    ) {
      navigate(
        "/donor/my-donations"
      );
    }
  };

  // =====================================================
  // DISPLAY ERROR
  // =====================================================

  const displayError =
    error || donationError;

  return (
    <div className="mx-auto w-full max-w-4xl">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-8">

        <p className="font-medium text-green-600">
          Donor
        </p>

        <h1 className="mt-1 text-3xl font-bold text-gray-900 md:text-4xl">
          Create Food Donation
        </h1>

        <p className="mt-2 text-gray-500">
          Tell us about the surplus food
          you want to donate.
        </p>

      </div>

      {/* =================================================
          FORM
      ================================================= */}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white p-5 shadow-sm sm:p-6 md:p-8"
      >

        {/* =================================================
            ERROR
        ================================================= */}

        {displayError && (
          <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {displayError}
          </div>
        )}

        {/* =================================================
            FOOD INFORMATION
        ================================================= */}

        <div className="mb-8">

          <h2 className="mb-5 text-xl font-bold text-gray-900">
            Food Information
          </h2>

          <div className="grid gap-5 md:grid-cols-2">

            {/* FOOD TYPE */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Food Type *
              </label>

              <input
                type="text"
                name="foodType"
                value={
                  formData.foodType
                }
                onChange={
                  handleChange
                }
                placeholder="e.g. Cooked Rice, Meals"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />

            </div>

            {/* CATEGORY */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Food Category *
              </label>

              <select
                name="category"
                value={
                  formData.category
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              >

                <option value="">
                  Select Category
                </option>

                <option value="cooked-meals">
                  Cooked Meals
                </option>

                <option value="grains">
                  Grains & Rice
                </option>

                <option value="vegetables">
                  Vegetables
                </option>

                <option value="fruits">
                  Fruits
                </option>

                <option value="bakery">
                  Bakery
                </option>

                <option value="packaged">
                  Packaged Food
                </option>

                <option value="other">
                  Other
                </option>

              </select>

            </div>

            {/* QUANTITY */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Quantity *
              </label>

              <input
                type="number"
                min="1"
                name="quantity"
                value={
                  formData.quantity
                }
                onChange={
                  handleChange
                }
                placeholder="Enter quantity"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />

            </div>

            {/* UNIT */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Unit
              </label>

              <select
                name="unit"
                value={
                  formData.unit
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              >

                <option value="meals">
                  Meals
                </option>

                <option value="kg">
                  Kilograms
                </option>

                <option value="liters">
                  Liters
                </option>

                <option value="packets">
                  Packets
                </option>

                <option value="boxes">
                  Boxes
                </option>

              </select>

            </div>

          </div>

        </div>

        {/* =================================================
            PICKUP INFORMATION
        ================================================= */}

        <div className="mb-8">

          <h2 className="mb-5 text-xl font-bold text-gray-900">
            Pickup Information
          </h2>

          <div className="space-y-5">

            {/* LOCATION ADDRESS */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Pickup Location / Address *
              </label>

              <input
                type="text"
                name="pickupLocation"
                value={
                  formData.pickupLocation
                }
                onChange={
                  handleChange
                }
                placeholder="Enter pickup address"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />

            </div>

            {/* CURRENT LOCATION */}

            <div className="rounded-2xl border border-green-100 bg-green-50 p-4">

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="font-semibold text-gray-900">
                    📍 Set Pickup Location
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    Use your current location or
                    select a point directly on the map.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={
                    handleUseLocation
                  }
                  disabled={
                    locationLoading
                  }
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {locationLoading ? (
                    <>
                      <span className="animate-spin">
                        ⟳
                      </span>

                      Detecting...
                    </>
                  ) : (
                    <>
                      📍 Use My Current Location
                    </>
                  )}

                </button>

              </div>

            </div>

            {/* MAP */}

            <div>

              <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                <label className="block text-sm font-medium text-gray-700">
                  Select Pickup Location on Map *
                </label>

                <span className="text-xs text-gray-500">
                  Click anywhere on the map to move the pin
                </span>

              </div>

              <div className="h-[320px] overflow-hidden rounded-2xl border border-gray-300 shadow-sm sm:h-[400px]">

                <MapContainer
                  center={
                    DEFAULT_LOCATION
                  }
                  zoom={13}
                  scrollWheelZoom={true}
                  className="h-full w-full"
                >

                  <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <MapController
                    position={position}
                  />

                  <LocationMarker
                    position={position}
                    setPosition={
                      setPosition
                    }
                    setFormData={
                      setFormData
                    }
                  />

                </MapContainer>

              </div>

              {/* LOCATION STATUS */}

              <div className="mt-3 flex items-start gap-3 rounded-xl bg-gray-50 px-4 py-3">

                <span className="mt-0.5">
                  📌
                </span>

                <div>

                  <p className="text-sm font-semibold text-gray-800">
                    Pickup point selected
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    The selected coordinates will
                    automatically be saved with your
                    donation.
                  </p>

                  {/* COORDINATES */}

                  <p className="mt-2 text-xs text-gray-400">
                    Latitude:{" "}
                    {Number(
                      formData.latitude
                    ).toFixed(6)}
                    {" • "}
                    Longitude:{" "}
                    {Number(
                      formData.longitude
                    ).toFixed(6)}
                  </p>

                </div>

              </div>

            </div>

            {/* TIME */}

            <div className="grid gap-5 md:grid-cols-2">

              {/* PICKUP TIME */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Pickup Time *
                </label>

                <input
                  type="datetime-local"
                  name="pickupTime"
                  value={
                    formData.pickupTime
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

              </div>

              {/* EXPIRY */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Available Until *
                </label>

                <input
                  type="datetime-local"
                  name="expiryTime"
                  value={
                    formData.expiryTime
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <div className="mb-8">

          <label className="mb-2 block text-sm font-medium text-gray-700">
            Additional Information
          </label>

          <textarea
            name="description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
            rows="4"
            placeholder="Any additional information about the food..."
            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
          />

        </div>

        {/* =================================================
            BUTTONS
        ================================================= */}

        <div className="flex flex-col gap-3 sm:flex-row">

          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-xl bg-green-600 py-3.5 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >

            {loading
              ? "Creating Donation..."
              : "Create Donation"}

          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/donor/dashboard"
              )
            }
            disabled={loading}
            className="flex-1 rounded-xl border border-gray-300 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
};

export default CreateDonation;