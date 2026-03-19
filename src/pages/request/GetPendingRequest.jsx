import React, { useEffect, useState, useMemo } from "react";
import { acceptRequest, getPendingRequests } from "../../services/requestService";
import RequestCard from "../../components/request/RequestCard";
import RequestModal from "../../components/request/RequestModal";
import { useSearchParams } from "react-router-dom";

import { useToast } from "../../context/ToastContext";
import { useLoading } from "../../context/LoadingContext";

import { getSocket } from "../../socket/socket";

const urgencyPriority = {
  high: 3,
  medium: 2,
  low: 1,
};

const GetPendingRequest = () => {
  const [searchParams] = useSearchParams();
  const requestId = searchParams.get("request");

  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterUrgency, setFilterUrgency] = useState("all");

  const { showToast } = useToast();
  const { startLoading, stopLoading } = useLoading();

  const fetchRequests = async () => {
    try {
      setLoading(true);
      startLoading("Fetching requests...");

      const data = await getPendingRequests();

      const sorted = [...data].sort((a, b) => {
        const timeDiff = new Date(b.createdAt) - new Date(a.createdAt);
        if (timeDiff !== 0) return timeDiff;
        return urgencyPriority[b.urgency] - urgencyPriority[a.urgency];
      });

      setRequests(sorted);
    } catch (error) {
      showToast("error", "Failed to fetch pending requests");
    } finally {
      setLoading(false);
      stopLoading();
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedRequest) return;
    if (newStatus !== "accepted") return;

    try {
      startLoading("Accepting request...");

      const response = await acceptRequest(selectedRequest._id);

      showToast("success", response.message || "Status updated");

      setSelectedRequest(null);
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message || "Action failed"
      );
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    if (!requestId || requests.length === 0) return;
    const request = requests.find((r) => r._id === requestId);
    if (request) setSelectedRequest(request);
  }, [requestId, requests]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on("request_updated", (updated) => {
      setRequests((prev) => {
        const exists = prev.find((r) => r._id === updated._id);

        if (updated.status !== "pending") {
          return prev.filter((r) => r._id !== updated._id);
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
      const matchesSearch = req.hosteller?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesUrgency =
        filterUrgency === "all" || req.urgency === filterUrgency;

      return matchesSearch && matchesUrgency;
    });
  }, [requests, search, filterUrgency]);

  return (
    <div className="w-full">
      <div className="w-full py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Pending Requests
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              Manage and monitor all pending delivery requests
            </p>
          </div>

          <div className="hidden md:block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
            {filteredRequests.length} Requests
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 pb-12 mt-5">
        <div className="flex flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
          />

          <select
            value={filterUrgency}
            onChange={(e) => setFilterUrgency(e.target.value)}
            className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
          >
            <option value="all">All Urgency</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {loading && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        )}

        {!loading && filteredRequests.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow">
            <h2 className="text-xl font-semibold text-gray-700">
              No Pending Requests Found
            </h2>
            <button
              onClick={fetchRequests}
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
      </div>

      {selectedRequest && (
        <RequestModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default GetPendingRequest;