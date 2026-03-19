import React from "react";
import { format } from "timeago.js";
import { ChevronRight } from "lucide-react";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  accepted: "bg-blue-100 text-blue-700",
  picked: "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  expired: "bg-gray-200 text-gray-700",
};

const MyRequestcard = ({ request, onClick }) => {
  const itemCount = request.items.length;

  return (
    <div
      onClick={onClick}
      className="
        group cursor-pointer
        bg-white/80 backdrop-blur-xl
        border border-orange-100
        rounded-2xl px-6 py-4
        shadow-sm hover:shadow-xl
        hover:-translate-y-1
        active:scale-[0.98]
        transition-all duration-300
      "
    >
      {/* DESKTOP */}
      <div className="hidden md:grid grid-cols-6 items-center text-sm">

        <div className="font-semibold text-gray-900 group-hover:text-orange-600 transition">
          {request.orderId}
        </div>

        <div className="text-gray-600">
          {itemCount} items
        </div>

        <div className="truncate text-gray-700">
          {request.deliveryLocation}
        </div>

        <div className="font-semibold text-orange-600">
          ₹{request.grandTotal}
        </div>

        <div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize shadow-sm ${statusStyles[request.status]}`}
          >
            {request.status}
          </span>
        </div>

        <div className="flex items-center justify-between text-gray-400 text-xs">
          {format(request.createdAt)}
          <ChevronRight
            size={16}
            className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition"
          />
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-900">
            {request.orderId}
          </span>

          <span
            className={`px-2 py-1 rounded-full text-xs capitalize ${statusStyles[request.status]}`}
          >
            {request.status}
          </span>
        </div>

        <div className="text-sm text-gray-600">
          {itemCount} items • {request.deliveryLocation}
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold text-orange-600">
            ₹{request.grandTotal}
          </span>

          <span className="text-gray-400 text-xs">
            {format(request.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyRequestcard;