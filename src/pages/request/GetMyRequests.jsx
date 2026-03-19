import React, { useEffect, useState } from "react";
import {
  getMyRequests,
  cancelRequest,
  deleteRequest,
} from "../../services/requestService";
import MyRequestcard from "../../components/request/MyRequestcard.jsx";
import MyRequestModal from "../../components/request/MyRequestModal.jsx";
import { useNavigate } from "react-router-dom";
import { Package } from "lucide-react";

import { useToast } from "../../context/ToastContext";
import { useLoading } from "../../context/LoadingContext";

import { getSocket } from "../../socket/socket.js";

const GetMyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [selectedRequest, setSelectedRequest] = useState(null);
  // const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { showToast } = useToast();
  const { startLoading, stopLoading } = useLoading();

  const fetchRequests = async () => {
    try {
      startLoading("Fetching your requests...");
      const data = await getMyRequests();
      setRequests(data);
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message || "Failed to load requests"
      );
    } finally {
    
      stopLoading();
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on("request_updated", (updated) => {
      setRequests((prev) => {
        const exists = prev.find((r) => r._id === updated._id);

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

  const activeStatuses = ["pending", "accepted", "picked"];
  const completedStatuses = ["completed", "expired"];

  const filteredRequests =
    activeTab === "active"
      ? requests.filter((r) => r && activeStatuses.includes(r.status))
      : requests.filter((r) => r && completedStatuses.includes(r.status));

  const handleDelete = async (request) => {
    if (request.status !== "pending") {
      showToast("error", "Only pending requests can be deleted");
      return;
    }

    try {
      startLoading("Deleting request...");
      await deleteRequest(request._id);

      setRequests((prev) =>
        prev.filter((r) => r._id !== request._id)
      );

      setSelectedRequest(null);

      showToast("success", "Request deleted successfully");
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message || "Delete failed"
      );
    } finally {
      stopLoading();
    }
  };

  const handleCancel = async (request) => {
    if (request.status !== "accepted") {
      showToast("error", "Only accepted requests can be cancelled");
      return;
    }

    try {
      startLoading("Cancelling request...");
      await cancelRequest(request._id);

      setSelectedRequest(null);

      showToast("success", "Request Cancelled successfully");
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message || "Cancel failed"
      );
    } finally {
      stopLoading();
    }
  };

  const handleEdit = (request) => {
    navigate(`/request/edit/${request._id}`);
  };

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6">My Requests</h1>

      <div className="flex justify-center mb-10 ">
        <div className="flex bg-white shadow-md rounded-full p-1">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition ${
              activeTab === "active"
                ? "bg-orange-500 text-white"
                : "text-gray-700"
            }`}
          >
            Active
          </button>

          <button
            onClick={() => setActiveTab("completed")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition ${
              activeTab === "completed"
                ? "bg-orange-500 text-white"
                : "text-gray-700"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        activeTab === "active" ? (
          <div className="flex flex-col items-center justify-center pt-10 text-center">
            <div className="bg-orange-100 p-6 rounded-full mb-4">
              <Package className="text-orange-500" size={36} />
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No Active Requests
            </h2>

            <p className="text-gray-500 max-w-sm mb-6">
              Create a request to get started 🚀
            </p>

            <button
              onClick={() => navigate("/create_request")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold transition"
            >
              Create Request
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <Package className="text-gray-400" size={36} />
            </div>

            <h2 className="text-xl font-semibold text-gray-700">
              No Completed Requests
            </h2>

            <p className="text-gray-500 mt-2">
              Your completed requests will appear here.
            </p>
          </div>
        )
      ) : (
        <>
          <div className="hidden md:grid grid-cols-6 text-sm font-semibold text-gray-700 px-6 mb-2">
            <div className="pl-8">Request ID</div>
            <div className="pl-8">Items</div>
            <div>Location</div>
            <div>Total</div>
            <div>Status</div>
            <div>Created</div>
          </div>

          <div className="space-y-3 max-w-6xl mx-auto">
            {filteredRequests.map((req) => (
              <MyRequestcard
                key={req._id}
                request={req}
                onClick={() => setSelectedRequest(req)}
              />
            ))}
          </div>
        </>
      )}

      {selectedRequest && (
        <MyRequestModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onDelete={() => handleDelete(selectedRequest)}
          onCancel={() => handleCancel(selectedRequest)}
          onEdit={() => handleEdit(selectedRequest)}
        />
      )}
    </div>
  );
};

export default GetMyRequests;