import { MapPin, Package } from "lucide-react";
import React from "react";

const statusColors = {
  pending: "bg-red-500",
  accepted: "bg-yellow-500",
  picked: "bg-blue-500",
  completed: "bg-green-500",
  cancelled: "bg-gray-500",
};

const RequestCard = ({ request, onClick }) => {
  const totalItems = request.items?.length || 0;

  const timeAgo = () => {
    const diffMinutes = (new Date() - new Date(request.createdAt)) / 1000 / 60;
    if (diffMinutes < 60) {
      return `${Math.floor(diffMinutes)} mins ago`;
    }

    const hours = diffMinutes / 60;
    if (hours < 24) {
      return `${Math.floor(hours)} hrs ago`;
    }

    const days = hours / 24;
    return `${Math.floor(days)} days ago`;
  };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer w-full max-w-5xl mx-auto rounded-2xl px-4 py-4 bg-linear-to-r from-orange-400 via-orange-500 to-orange-400 text-white shadow-xl hover:scale-110 transition-all duration-300"
    >
      <div className="flex justify-between items-center relative">
        <div className="flex items-center gap-2 ">
          <div className="w-14 h-14 rounded-full border-2 border-white flex items-center justify-center bg-orange-300 text-xl font-bold">
            {request.hosteller?.name?.charAt(0)?.toUpperCase()}
          </div>

          <div className="flex flex-col  h-14 justify-center ">
            <h2 className="text-xl font-bold">{request.hosteller?.name}</h2>
            <p className="text-base opacity-70 m-0 p-0  leading-none">
              {request.orderId}
            </p>
          </div>
        </div>

        <div
          className={`absolute top-0 right-0 px-2 py-1 text-xs font-semibold rounded-full shadow ${statusColors[request.status]}`}
        >
          {request.status}
        </div>
      </div>

      <div className="flex justify-between items-end mt-2 ">
        <div className="space-y-3">
          <div className="flex items-center gap-10 text-base">
            <div className="flex items-center gap-2">
              <Package size={18} />
              {totalItems} items
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              {request.deliveryLocation}
            </div>
          </div>

          <div className="text-base">
            Delivery fee : ₹{request.deliveryFee}
          </div>

           <div className="text-4xl font-extrabold">
            ₹{request.grandTotal}
          </div>
        </div>

          <div className="text-base opacity-90">
          {timeAgo()}
        </div>

      </div>
    </div>
  );
};

export default RequestCard;
