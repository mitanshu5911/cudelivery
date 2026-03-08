import React, { useEffect, useState } from "react";
import { getMyDeliveries } from "../../services/requestService";
import { Check, Truck } from "lucide-react";

const DeliveryProgress = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const steps = ["accepted", "picked", "completed"];

  const fetchDeliveries = async () => {
    try {
      const data = await getMyDeliveries();

      if (!data || data.length === 0) return;

      setDeliveries(data);

      const active =
        data.find((d) => d.status === "accepted" || d.status === "picked") ||
        data[0];

      setSelectedDelivery(active);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const currentStep = selectedDelivery
    ? steps.indexOf(selectedDelivery.status)
    : -1;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 h-52.5 flex flex-col">

      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Truck size={20} className="text-orange-500" />
        <h2 className="text-lg font-semibold text-gray-800">
          Delivery Progress
        </h2>
      </div>

      {/* Order Selector */}
      <div className="flex items-center gap-3 mb-8 text-sm text-gray-500">
        <span>Tracking order</span>

        {deliveries.length > 0 && (
          <select
            value={selectedDelivery?._id || ""}
            onChange={(e) => {
              const delivery = deliveries.find(
                (d) => d._id === e.target.value
              );
              setSelectedDelivery(delivery);
            }}
            className="border border-gray-300 rounded-lg px-3 py-1 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            {deliveries.map((d) => (
              <option key={d._id} value={d._id}>
                {d.orderId || d._id.slice(-6)}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Timeline */}
      <div className="relative flex justify-between items-center flex-1">

        {/* Background Line */}
        <div className="absolute left-0 right-0 top-4 h-0.75 bg-gray-200"></div>

        {/* Active Line */}
        <div
          className="absolute left-0 top-4 h-0.75 bg-orange-500 transition-all duration-500"
          style={{
            width:
              currentStep < 0
                ? "0%"
                : `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        ></div>

        {steps.map((step, index) => {
          const isCompleted = index <= currentStep;

          return (
            <div
              key={step}
              className="flex flex-col items-center relative z-10 w-full"
            >

              <div
                className={`w-9 h-9 flex items-center justify-center rounded-full border-2
                ${
                  isCompleted
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {isCompleted ? <Check size={16} /> : index + 1}
              </div>

              <span
                className={`text-xs mt-2 font-medium capitalize
                ${
                  isCompleted
                    ? "text-orange-600"
                    : "text-gray-500"
                }`}
              >
                {step}
              </span>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryProgress;