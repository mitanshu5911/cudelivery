import React, { useEffect, useState } from "react";
import { getMyDeliveries } from "../../../services/requestService";
import { getMyRatings } from "../../../services/ratingService";
import { Truck, CheckCircle, Wallet, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { getSocket } from "../../../socket/socket";

const StatsCards = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [stats, setStats] = useState({
    active: 0,
    completed: 0,
    earnings: 0,
  });

  const [ratingData, setRatingData] = useState({
    average: 0,
    total: 0,
  });

  const fetchStats = async () => {
    try {
      const deliveries = await getMyDeliveries();

      const active = deliveries.filter(
        (d) => d.status === "accepted" || d.status === "picked"
      ).length;

      const completed = deliveries.filter(
        (d) => d.status === "completed"
      ).length;

      const earnings = deliveries
        .filter((d) => d.status === "completed")
        .reduce((acc, d) => acc + (d.deliveryFee || 0), 0);

      setStats({ active, completed, earnings });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRatings = async () => {
    try {
      const data = await getMyRatings(user._id);

      setRatingData({
        average: data.averageRating || 0,
        total: data.totalRatings || 0,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!user?._id) return;

    fetchStats();
    fetchRatings();
  }, [user]);

  /* 🔥 REAL-TIME */
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on("request_updated", fetchStats);

    return () => {
      socket.off("request_updated", fetchStats);
    };
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
      
      <div
        className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4 cursor-pointer hover:scale-[1.02] hover:shadow-lg transition"
        onClick={() => navigate("/my_deliveries?tab=active")}
      >
        <div className="bg-orange-100 p-4 rounded-xl">
          <Truck className="text-orange-500" size={28} />
        </div>
        <div>
          <p className="text-gray-500 text-sm">Active</p>
          <h2 className="text-2xl font-bold">{stats.active}</h2>
        </div>
      </div>

      <div
        className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4 cursor-pointer hover:scale-[1.02]"
        onClick={() => navigate("/my_deliveries?tab=completed")}
      >
        <div className="bg-green-100 p-4 rounded-xl">
          <CheckCircle className="text-green-600" size={28} />
        </div>
        <div>
          <p className="text-gray-500 text-sm">Completed</p>
          <h2 className="text-2xl font-bold">{stats.completed}</h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4">
        <div className="bg-orange-100 p-4 rounded-xl">
          <Wallet className="text-orange-500" size={28} />
        </div>
        <div>
          <p className="text-gray-500 text-sm">Earnings</p>
          <h2 className="text-2xl font-bold">₹{stats.earnings}</h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4">
        <div className="bg-yellow-100 p-4 rounded-xl">
          <Star className="text-yellow-500" size={28} />
        </div>
        <div>
          <p className="text-gray-500 text-sm">Rating</p>
          <h2 className="text-2xl font-bold flex items-center gap-1">
            {ratingData.average || "0.0"} ★
          </h2>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;