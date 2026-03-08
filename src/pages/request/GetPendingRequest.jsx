import React, { useEffect, useState, useMemo } from "react";
import { acceptRequest, getPendingRequests } from "../../services/requestService";
import AlertToast from "../../components/ui/AlertToast";
import RequestCard from "../../components/request/RequestCard";
import RequestModal from "../../components/request/RequestModal";
import { useSearchParams } from "react-router-dom";

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

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [toastVisible, setToastVisible] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await getPendingRequests();

      const sorted = [...data].sort((a, b) => {
        const timeDiff =
          new Date(b.createdAt) - new Date(a.createdAt);

        if (timeDiff !== 0) return timeDiff;

        return (
          urgencyPriority[b.urgency] -
          urgencyPriority[a.urgency]
        );
      });

      setRequests(sorted);
    } catch (error) {
      setToastMessage("Failed to fetch pending requests");
      setToastType("error");
      setToastVisible(true);
    } finally {
      setLoading(false);
    }
  };


  const handleStatusChange = async (newStatus) => {
    if(!selectedRequest) return;

    if (newStatus !== "accepted") return;
    try {
    const response = await acceptRequest(selectedRequest._id);

    setToastMessage(response.message || "Status updated");
    setToastType("success");
    setToastVisible(true);

    setRequests(prev =>
      prev.filter(r => r._id !== selectedRequest._id)
    );
    setSelectedRequest(null);

    } catch (error) {
      setToastMessage(
      error.response?.data?.message || "Action failed"
    );
    setToastType("error");
    setToastVisible(true);
    }
  }

  useEffect(() => {
    fetchRequests();
   
  }, []);

  useEffect(() => {
  if (!requestId || requests.length === 0) return;

  const request = requests.find(r => r._id === requestId);

  if (request) {
    setSelectedRequest(request);
  }
}, [requestId, requests]);

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const matchesSearch =
        req.hosteller?.name
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesUrgency =
        filterUrgency === "all" ||
        req.urgency === filterUrgency;

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
            name="searchbar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white focus:border-none"
          />

          <select
            value={filterUrgency}
            name="urgency"
            onChange={(e) =>
              setFilterUrgency(e.target.value)
            }
            className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white focus:border-none"
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
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-500">
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

      <AlertToast
        type={toastType}
        message={toastMessage}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
};

export default GetPendingRequest;