import React, { useEffect, useState } from "react";
import { getMyDeliveries } from "../../../services/requestService";
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
    <div className="bg-white rounded-2xl shadow-md p-6 h-52.5 flex flex-col mx-2 md:mx-0">

      
      <div className="flex items-center gap-2 mb-3">
        <Truck size={20} className="text-orange-500" />
        <h2 className="text-lg font-semibold text-gray-800">
          Delivery Progress
        </h2>
      </div>

      
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

      
      <div className="relative flex justify-between items-center flex-1">

  <div className="absolute left-0 right-0 top-4 h-0.75 bg-gray-200 rounded-full"></div>

  <div
    className="absolute left-0 top-4 h-0.75 bg-linear-to-r from-orange-400 to-orange-600 transition-all duration-700 rounded-full"
    style={{
      width:
        currentStep < 0
          ? "0%"
          : `${(currentStep / (steps.length - 1)) * 100}%`,
    }}
  ></div>

  {steps.map((step, index) => {
    const isCompleted = index <= currentStep;
    const isActive = index === currentStep;

    return (
      <div
        key={step}
        className="flex flex-col items-center relative z-10 w-full"
      >
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300
          ${
            isCompleted
              ? "bg-orange-500 border-orange-500 text-white scale-105"
              : "bg-white border-gray-300 text-gray-400"
          }
          ${isActive ? "ring-4 ring-orange-200 animate-pulse" : ""}
          `}
        >
          {isCompleted ? <Check size={18} /> : index + 1}
        </div>

        <span
          className={`text-xs mt-2 font-semibold capitalize tracking-wide
          ${isCompleted ? "text-orange-600" : "text-gray-500"}
          `}
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