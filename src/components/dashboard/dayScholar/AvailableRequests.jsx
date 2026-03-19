import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPendingRequests } from "../../../services/requestService.js";
import { MapPin, Flame } from "lucide-react";
import { getSocket } from "../../../socket/socket.js";

const AvailableRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      const data = await getPendingRequests();
      setRequests(data.slice(0, 3));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  /* 🔥 REAL-TIME */
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on("request_updated", fetchRequests);
    socket.on("request_deleted", fetchRequests);

    return () => {
      socket.off("request_updated", fetchRequests);
      socket.off("request_deleted", fetchRequests);
    };
  }, []);

  const urgencyStyles = {
    high: "bg-red-100 text-red-600",
    medium: "bg-yellow-100 text-yellow-600",
    low: "bg-green-100 text-green-600",
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col h-full mx-2 md:mx-0">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Flame className="text-orange-500" size={20} />
          <h2 className="text-lg font-semibold text-gray-800">
            Available Requests
          </h2>
        </div>

        <span className="text-xs text-gray-400">
          {requests.length} active
        </span>
      </div>

      <div className="flex flex-col gap-3 grow">
        {requests.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center text-gray-400 text-sm">
            No delivery requests available
          </div>
        )}

        {requests.map((req) => (
          <div
            key={req._id}
            onClick={() => navigate(`/pending_requests?request=${req._id}`)}
            className="group cursor-pointer bg-gray-50 hover:bg-orange-50 border border-transparent hover:border-orange-200 transition-all rounded-xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <MapPin size={18} className="text-orange-500" />
              </div>

              <div>
                <p className="font-semibold text-gray-800 group-hover:text-orange-600">
                  {req.deliveryLocation}
                </p>

                <p className="text-sm text-gray-500">
                  ₹{req.grandTotal}
                </p>
              </div>
            </div>

            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${urgencyStyles[req.urgency]}`}
            >
              {req.urgency}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/pending_requests")}
        className="mt-6 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl font-semibold transition"
      >
        View All Requests
      </button>
    </div>
  );
};

export default AvailableRequests;