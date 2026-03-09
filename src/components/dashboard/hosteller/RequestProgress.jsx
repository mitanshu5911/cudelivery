import React, { useState, useEffect } from "react";
import { getMyRequests } from "../../../services/requestService";
import { Check, Package } from "lucide-react";

const RequestProgress = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const steps = ["pending", "accepted", "picked", "completed"];

  const fetchRequests = async () => {
    try {
      const data = await getMyRequests();
      if (!data || data.length === 0) return;

      setRequests(data);

      const active =
        data.find(
          (r) =>
            r.status === "pending" ||
            r.status === "accepted" ||
            r.status === "picked"
        ) || data[0];

      setSelectedRequest(active);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const currentStep = selectedRequest
    ? steps.indexOf(selectedRequest.status)
    : -1;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 ">
      <div className="flex items-center gap-2 mb-4">
        <Package size={20} className="text-orange-500" />
        <h2 className="text-lg font-semibold text-gray-800">
          Request Progress
        </h2>
      </div>

      <div className="flex items-center gap-3 mb-8 text-sm text-gray-500">
        <span>Tracking request</span>

        {requests.length > 0 && (
          <select
            value={selectedRequest?._id || ""}
            onChange={(e) => {
              const req = requests.find((r) => r._id === e.target.value);
              setSelectedRequest(req);
            }}
            className="border border-gray-300 rounded-lg px-3 py-1 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            {requests.map((r) => (
              <option key={r._id} value={r._id}>
                {r.orderId || r._id.slice(-6)}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="relative">

        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 "></div>

        <div
          className="absolute top-5 left-0 h-0.5 bg-linear-to-r from-orange-400 to-orange-600 transition-all duration-700"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`
          }}
        ></div>

        <div className="grid grid-cols-4 relative">
          {steps.map((step, index) => {
            const completed = index <= currentStep;
            const active = index === currentStep;

            return (
              <div key={step} className="flex flex-col items-center ">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all 
                  ${
                    completed
                      ? "bg-orange-500 border-orange-500 text-white"
                      : "bg-white border-gray-300 text-gray-400"
                  }
                  ${active ? "ring-4 ring-orange-200 animate-pulse" : ""}
                  `}
                >
                  {completed ? <Check size={18} /> : index + 1}
                </div>

                <span
                  className={`text-xs mt-2 font-semibold capitalize
                  ${completed ? "text-orange-600" : "text-gray-500"}
                  `}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RequestProgress;