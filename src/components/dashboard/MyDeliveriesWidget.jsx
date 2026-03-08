import React, { useEffect, useState } from "react";
import { getMyDeliveries } from "../../services/requestService";
import { useNavigate } from "react-router-dom";
import { PackageCheck } from "lucide-react";

const MyDeliveriesWidget = () => {
  const [deliveries, setDeliveries] = useState([]);
  const navigate = useNavigate();

  const fetchDeliveries = async () => {
    try {
      const data = await getMyDeliveries();
      setDeliveries(data.slice(0, 3));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const statusStyles = {
    accepted: "bg-orange-100 text-orange-600",
    picked: "bg-yellow-100 text-yellow-600",
    completed: "bg-green-100 text-green-600",
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col h-full mx-2 md:mx-0">

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <PackageCheck className="text-orange-500" size={20}/>
          <h2 className="text-lg font-semibold text-gray-800">
            My Deliveries
          </h2>
        </div>

        <span className="text-xs text-gray-400">
          {deliveries.length} active
        </span>
      </div>

      <div className="flex flex-col gap-3 grow">

        {deliveries.length === 0 && (
          <div className="text-center text-gray-400 py-8 text-sm">
            No deliveries yet
          </div>
        )}

        {deliveries.map((delivery) => (
          <div
            key={delivery._id}
            onClick={() =>
              navigate(`/my_deliveries?request=${delivery._id}`)
            }
            className="cursor-pointer group flex items-center justify-between bg-gray-50 hover:bg-orange-50 border border-transparent hover:border-orange-200 rounded-xl p-4 transition"
          >
            <div>
              <p className="font-semibold text-gray-800 group-hover:text-orange-600">
                {delivery.orderId || delivery._id.slice(-6)}
              </p>

              <p className="text-sm text-gray-500">
                ₹{delivery.grandTotal || delivery.deliveryFee}
              </p>
            </div>

            <span
              className={`text-xs px-3 py-1 rounded-full capitalize font-semibold ${statusStyles[delivery.status]}`}
            >
              {delivery.status}
            </span>
          </div>
        ))}

      </div>

      <button
        onClick={() => navigate("/my_deliveries")}
        className="mt-6 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl font-semibold transition"
      >
        View All
      </button>

    </div>
  );
};

export default MyDeliveriesWidget;