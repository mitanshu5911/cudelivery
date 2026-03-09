import React, { useEffect, useState } from "react";
import { getMyRequests } from "../../../services/requestService";
import { CheckCircle, Truck, Package, Clock } from "lucide-react";

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const data = await getMyRequests();
        if (!data) return;

        const sorted = [...data]
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .slice(0, 4);

        const mapped = sorted.map((req) => {
          if (req.status === "accepted") {
            return {
              icon: CheckCircle,
              iconBg: "bg-green-100",
              color: "text-green-600",
              text: `Request ${req.orderId} accepted`,
            };
          }

          if (req.status === "picked") {
            return {
              icon: Truck,
              iconBg: "bg-blue-100",
              color: "text-blue-600",
              text: `Items picked for ${req.orderId}`,
            };
          }

          if (req.status === "completed") {
            return {
              icon: Package,
              iconBg: "bg-purple-100",
              color: "text-purple-600",
              text: `Request ${req.orderId} completed`,
            };
          }

          return {
            icon: Clock,
            iconBg: "bg-orange-100",
            color: "text-orange-600",
            text: `Waiting for DayScholar for ${req.orderId}`,
          };
        });

        setActivities(mapped);
      } catch (error) {
        console.error(error);
      }
    };

    fetchActivity();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-5">
        Recent Activity
      </h2>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200"></div>

        <div className="space-y-5">
          {activities.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <div
                key={index}
                className="flex items-center gap-4 group"
              >
                <div
                  className={`relative z-10 w-9 h-9 flex items-center justify-center rounded-full ${activity.iconBg} transition group-hover:scale-110`}
                >
                  <Icon size={18} className={activity.color} />
                </div>

                <p className="text-sm text-gray-700 group-hover:text-gray-900 transition">
                  {activity.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;