import React, { useEffect, useState } from "react";
import {
  getPendingRequests,
  getMyDeliveries,
} from "../../../services/requestService";
import { Bell } from "lucide-react";
import { getSocket } from "../../../socket/socket";

const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState([]);

  const MAX_NOTIFICATIONS = 6;

  const pushNotification = (message) => {
    setNotifications((prev) => {
      const newList = [
        {
          id: Date.now(),
          message,
        },
        ...prev,
      ];

      return newList.slice(0, MAX_NOTIFICATIONS);
    });
  };

  /* 🔥 INITIAL LOAD */
  const fetchNotifications = async () => {
    try {
      const pending = await getPendingRequests();
      const deliveries = await getMyDeliveries();

      const newRequests = pending.slice(0, 3).map((req) => ({
        id: req._id,
        message: `🔥 New request at ${req.deliveryLocation}`,
      }));

      const deliveryUpdates = deliveries.slice(0, 3).map((d) => ({
        id: d._id,
        message:
          d.status === "picked"
            ? `📦 Order ${d.orderId || d._id.slice(-6)} picked`
            : d.status === "completed"
            ? `✅ Order ${d.orderId || d._id.slice(-6)} completed`
            : `🚚 Order ${d.orderId || d._id.slice(-6)} accepted`,
      }));

      setNotifications([...newRequests, ...deliveryUpdates]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  /* 🔥 REAL-TIME SOCKET */
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on("request_updated", (data) => {
      if (!data) return;

      /* 🎯 SMART MESSAGE */
      if (data.status === "pending") {
        pushNotification(`🚀 New request available`);
      }

      if (data.status === "accepted") {
        pushNotification(`🚚 Order accepted`);
      }

      if (data.status === "picked") {
        pushNotification(`📦 Order picked`);
      }

      if (data.status === "completed") {
        pushNotification(`✅ Order completed`);
      }
    });

    socket.on("request_deleted", () => {
      pushNotification("❌ Request removed");
    });

    return () => {
      socket.off("request_updated");
      socket.off("request_deleted");
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mx-2 md:mx-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-orange-500" />
          <h2 className="text-lg font-semibold text-gray-700">
            Notifications
          </h2>
        </div>

        <span className="text-xs text-gray-400">
          Live
        </span>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-500 text-sm">No notifications</p>
      ) : (
        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
          {notifications.map((note) => (
            <div
              key={note.id}
              className="bg-gray-50 px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-orange-50 transition flex items-center gap-2"
            >
              <span className="text-orange-500">•</span>
              {note.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel;