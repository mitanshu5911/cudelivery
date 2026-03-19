import React, { useEffect, useMemo, useState } from "react";
import { getMyDeliveries } from "../../services/requestService";
import RequestModal from "../../components/request/RequestModal";
import RequestCard from "../../components/request/RequestCard";
import { useSearchParams } from "react-router-dom";
import {
  markPickedRequest,
  completeRequest,
  cancelRequest,
} from "../../services/requestService";

import { useToast } from "../../context/ToastContext";
import { useLoading } from "../../context/LoadingContext";

import { getSocket } from "../../socket/socket";

const GetMyDeliveries = () => {
  const [searchParams] = useSearchParams();
  const tabFormUrl = searchParams.get("tab");
  const requestId = searchParams.get("request");

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedTab, setSelectedTab] = useState(tabFormUrl || "active");

  const { showToast } = useToast();
  const { startLoading, stopLoading } = useLoading();

  const fetchMyDeliveries = async () => {
    try {
      setLoading(true);
      startLoading("Fetching deliveries...");
      const data = await getMyDeliveries();
      setRequests(data);
    } catch (error) {
      showToast("error", "Failed to fetch deliveries");
    } finally {
      setLoading(false);
      stopLoading();
    }
  };

  useEffect(() => {
    fetchMyDeliveries();
  }, []);

  useEffect(() => {
    if (!requestId || requests.length === 0) return;
    const req = requests.find((r) => r._id === requestId);
    if (req) setSelectedRequest(req);
  }, [requestId, requests]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on("request_updated", (updated) => {
      setRequests((prev) => {
        const exists = prev.find((r) => r._id === updated._id);

        if (!updated.acceptedBy) {
          return prev.filter((r) => r._id !== updated._id);
        }

        if (updated.acceptedBy?._id !== updated.acceptedBy?._id) {
          return prev;
        }

        if (exists) {
          return prev.map((r) =>
            r._id === updated._id ? updated : r
          );
        }

        return [updated, ...prev];
      });

      setSelectedRequest((prev) =>
        prev?._id === updated._id ? { ...updated } : prev
      );
    });

    socket.on("request_deleted", ({ _id }) => {
      setRequests((prev) =>
        prev.filter((r) => r._id !== _id)
      );

      setSelectedRequest((prev) =>
        prev?._id === _id ? null : prev
      );
    });

    return () => {
      socket.off("request_updated");
      socket.off("request_deleted");
    };
  }, []);

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      if (selectedTab === "active") {
        return req.status === "accepted" || req.status === "picked";
      } else {
        return req.status === "completed";
      }
    });
  }, [requests, selectedTab]);

  const handleStatusChange = async (newStatus) => {
    if (!selectedRequest) return;

    try {
      let response;

      if (newStatus === "picked") {
        startLoading("Marking as picked...");
        response = await markPickedRequest(selectedRequest._id);
      } else if (newStatus === "completed") {
        startLoading("Completing delivery...");
        response = await completeRequest(selectedRequest._id);
      } else if (newStatus === "cancelled") {
        startLoading("Cancelling delivery...");
        response = await cancelRequest(selectedRequest._id);
      }

      showToast("success", response.message || "Status updated");

      setSelectedRequest(null);
    } catch (error) {
      showToast("error", error.response?.data?.message || "Action failed");
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="w-full">
      <div className="w-full p-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            My Deliveries
          </h1>

          <p className="text-gray-600 mt-1 text-sm">
            Track your accepted and completed deliveries
          </p>

          <div className="flex justify-center mt-6">
            <div className="flex bg-orange-100 rounded-full overflow-hidden">
              <button
                onClick={() => setSelectedTab("active")}
                className={`px-6 py-2 text-md font-semibold transition ${
                  selectedTab === "active"
                    ? "bg-orange-500 text-white"
                    : "text-gray-700"
                }`}
              >
                Active
              </button>

              <button
                onClick={() => setSelectedTab("completed")}
                className={`px-6 py-2 text-md font-semibold transition ${
                  selectedTab === "completed"
                    ? "bg-orange-500 text-white"
                    : "text-gray-700"
                }`}
              >
                Completed
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 pb-12 mt-8">
        {loading && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-32 bg-gray-200 rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
        )}

        {!loading && filteredRequests.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow">
            <h2 className="text-xl font-semibold text-gray-700">
              No Deliveries Found
            </h2>

            <button
              onClick={fetchMyDeliveries}
              className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              Refresh
            </button>
          </div>
        )}

        {!loading && filteredRequests.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRequests.map((request) => (
              <RequestCard
                key={request._id}
                request={request}
                onClick={() => setSelectedRequest(request)}
              />
            ))}
          </div>
        )}

        {selectedRequest && (
          <RequestModal
            request={selectedRequest}
            onClose={() => setSelectedRequest(null)}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
    </div>
  );
};

export default GetMyDeliveries;