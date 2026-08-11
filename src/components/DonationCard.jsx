const DonationCard = ({ donation }) => {
  const statusStyles = {
    AVAILABLE: "bg-green-100 text-green-700",
    CLAIMED: "bg-orange-100 text-orange-700",
    PICKED_UP: "bg-blue-100 text-blue-700",
    DELIVERED: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition">

      {/* Image Placeholder */}
      <div className="h-40 bg-green-50 flex items-center justify-center text-6xl">
        🍱
      </div>

      <div className="p-5">

        {/* Food */}
        <div className="flex items-start justify-between gap-3">

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {donation.foodType}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              {donation.category}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              statusStyles[donation.status] ||
              "bg-gray-100 text-gray-600"
            }`}
          >
            {donation.status}
          </span>

        </div>

        {/* Details */}
        <div className="mt-5 space-y-3 text-sm">

          <div className="flex justify-between">
            <span className="text-gray-500">
              Quantity
            </span>

            <span className="font-medium text-gray-800">
              {donation.quantity} {donation.unit}
            </span>
          </div>

          <div>
            <p className="text-gray-500">
              Pickup Location
            </p>

            <p className="font-medium text-gray-800 mt-1">
              📍 {donation.pickupLocation}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Pickup Time
            </p>

            <p className="font-medium text-gray-800 mt-1">
              🕐{" "}
              {donation.pickupTime
                ? new Date(donation.pickupTime).toLocaleString()
                : "Not specified"}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Available Until
            </p>

            <p className="font-medium text-red-600 mt-1">
              ⏰{" "}
              {donation.expiryTime
                ? new Date(donation.expiryTime).toLocaleString()
                : "Not specified"}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DonationCard;