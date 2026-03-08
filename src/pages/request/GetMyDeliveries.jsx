import React, { useEffect, useMemo, useState } from "react";
import { getMyDeliveries } from "../../services/requestService";
// import Alert from "../../components/layouts/Alert";
import AlertToast from "../../components/ui/AlertToast";
import RequestModal from "../../components/request/RequestModal";
import RequestCard from "../../components/request/RequestCard";
import { useSearchParams } from "react-router-dom";
import {
  markPickedRequest,
  completeRequest,
  cancelRequest,
} from "../../services/requestService";

const GetMyDeliveries = () => {

   const [searchParams] = useSearchParams();
   const tabFormUrl = searchParams.get("tab");
    const requestId = searchParams.get("request");

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedTab, setSelectedTab] = useState(tabFormUrl || "active");;

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [toastVisible, setToastVisible] = useState(false);

 

  const fetchMyDeliveries = async () => {
    try {
      setLoading(true);
      const data = await getMyDeliveries();

      setRequests(data);
    } catch (error) {
      setToastMessage("Failed to fetch pending requests");
      setToastType("error");
      setToastVisible(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyDeliveries();
  }, []);

  useEffect(() => {
  if (!requestId || requests.length === 0) return;

  const req = requests.find(r => r._id === requestId);

  if (req) {
    setSelectedRequest(req);
  }
}, [requestId, requests]);

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
        response = await markPickedRequest(selectedRequest._id);

        setRequests((prev) =>
          prev.map((r) =>
            r._id === selectedRequest._id ? { ...r, status: "picked" } : r,
          ),
        );
      } else if (newStatus === "completed") {
        response = await completeRequest(selectedRequest._id);

        setRequests((prev) =>
          prev.map((r) =>
            r._id === selectedRequest._id ? { ...r, status: "completed" } : r,
          ),
        );
      } else if (newStatus === "cancelled") {
        response = await cancelRequest(selectedRequest._id);

        setRequests((prev) =>
          prev.filter((r) => r._id !== selectedRequest._id),
        );
      }

      setToastMessage(response.message || "Status updated");
      setToastType("success");
      setToastVisible(true);

      setSelectedRequest(null);
    } catch (error) {
      setToastMessage(error.response?.data?.message || "Action failed");
      setToastType("error");
      setToastVisible(true);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full p-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800">My Deliveries</h1>

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

      <AlertToast
        type={toastType}
        message={toastMessage}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
};

export default GetMyDeliveries;
