import React, { useEffect, useState } from "react";
import { getPendingRequests, getMyDeliveries } from "../../services/requestService";
import { Bell } from "lucide-react";

const NotificationsPanel = () => {

  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {

      const pending = await getPendingRequests();
      const deliveries = await getMyDeliveries();

      const newRequests = pending.slice(0, 2).map((req) => ({
        id: req._id,
        message: `🔥 New request at ${req.deliveryLocation}`,
      }));

      const deliveryUpdates = deliveries
        .slice(0, 2)
        .map((d) => ({
          id: d._id,
          message:
            d.status === "picked"
              ? `📦 Order ${d.orderId} picked`
              : d.status === "completed"
              ? `✅ Order ${d.orderId} completed`
              : `🚚 Order ${d.orderId} accepted`,
        }));

      setNotifications([...newRequests, ...deliveryUpdates]);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mx-2 md:mx-0 ">

      <div className="flex items-center gap-2 mb-4">
        <Bell size={18} className="text-orange-500" />
        <h2 className="text-lg font-semibold text-gray-700">
          Notifications
        </h2>
      </div>

      {notifications.length === 0 ? (

        <p className="text-gray-500 text-sm">
          No notifications
        </p>

      ) : (

        <div className="space-y-3">

          {notifications.map((note) => (

            <div
              key={note.id}
              className="bg-gray-50 px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-orange-50 transition"
            >
              {note.message}
            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default NotificationsPanel;