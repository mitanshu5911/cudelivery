import React, { useEffect, useState } from "react";
import { getMyRequests } from "../../../services/requestService";
import { Package } from "lucide-react";

const TopRequestedItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getMyRequests();
        if (!data) return;

        const itemCounts = {};

        data.forEach((req) => {
          req.items.forEach((item) => {
            const name = item.name.trim().toLowerCase();

            if (!itemCounts[name]) {
              itemCounts[name] = {
                name: item.name,
                count: 0,
              };
            }

            itemCounts[name].count += item.quantity || 1;
          });
        });

        const sorted = Object.values(itemCounts)
          .sort((a, b) => b.count - a.count)
          .slice(0, 4);

        setItems(sorted);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Package className="text-orange-500" size={20} />
        <h2 className="text-lg font-semibold text-gray-800">
          Top Requested Items
        </h2>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition"
          >
            <span className="text-gray-700 capitalize">
              {item.name}
            </span>

            <span className="text-sm font-semibold text-gray-500">
              {item.count} requests
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRequestedItems;