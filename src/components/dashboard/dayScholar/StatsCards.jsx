import React, { useEffect, useState } from "react";
import { getMyDeliveries } from "../../../services/requestService";
import { Truck, CheckCircle, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StatsCards = () => {
    const navigate = useNavigate();
  const [stats, setStats] = useState({
    active: 0,
    completed: 0,
    earnings: 0,
  });

  const fetchStats = async () => {
    try {
      const deliveries = await getMyDeliveries();

      const active = deliveries.filter(
        (d) => d.status === "accepted" || d.status === "picked",
      ).length;

      const completed = deliveries.filter(
        (d) => d.status === "completed",
      ).length;

      const earnings = deliveries
        .filter((d) => d.status === "completed")
        .reduce((acc, d) => acc + (d.deliveryFee || 0), 0);

      setStats({
        active,
        completed,
        earnings,
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchStats();
  }, []);
  return (
    <div className="grid md:grid-cols-3 gap-6  px-4">
      <div 
        className="bg-white rounded-2xl  shadow-md p-4 flex items-center gap-4"
        onClick={() => navigate("/my_deliveries?tab=active")}
      >
        <div className="bg-orange-100 p-4 rounded-xl">
          <Truck className="text-orange-500" size={28} />
        </div>
        <div>
          <p className="text-gray-500">Active Deliveries</p>
          <h2 className="text-2xl font-bold">{stats.active}</h2>
        </div>
      </div>

      <div 
        className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4"
        onClick={() => navigate("/my_deliveries?tab=completed")}
      >

        <div className="bg-green-100 p-4 rounded-xl">
          <CheckCircle className="text-green-600" size={28} />
        </div>

        <div>
          <p className="text-gray-500">Completed Deliveries</p>
          <h2 className="text-2xl font-bold">{stats.completed}</h2>
        </div>

      </div>

      <div 
        className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4"
        onClick={() => navigate("/my_deliveries?tab=completed")}
      >

        <div className="bg-orange-100 p-4 rounded-xl">
          <Wallet className="text-orange-500" size={28} />
        </div>

        <div>
          <p className="text-gray-500">Earnings</p>
          <h2 className="text-2xl font-bold">₹{stats.earnings}</h2>
        </div>

      </div>
    </div>
  );
};

export default StatsCards;
