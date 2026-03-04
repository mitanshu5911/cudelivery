import React from "react";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const units = ["piece", "kg", "liter", "pack"];

function ItemRow({ item, index, updateItem, removeItem, isMobile }) {
  const total =
    Number(item.quantity || 0) * Number(item.estimatedPrice || 0);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="
        bg-white p-3 rounded-2xl shadow-sm border border-gray-200 
        hover:shadow-md transition mb-3
        
        flex flex-col gap-3
        md:grid md:grid-cols-12 md:gap-4 md:items-center
      "
    >
      {/* Item Name */}
      <input
        type="text"
        placeholder="Item name"
        value={item.name}
        onChange={(e) => updateItem(index, "name", e.target.value)}
        className="
          w-full
          md:col-span-4
          input text-left outline-none
        "
      />

      {/* Qty + Unit */}
      <div className="flex gap-3 md:contents">
        <input
          type="number"
          min="0"
          placeholder={isMobile ? "Qty" : "0"}
          value={item.quantity}
          onChange={(e) =>
            updateItem(index, "quantity", e.target.value)
          }
          className="
            w-1/2
            md:w-full md:col-span-2
            input text-center outline-none
          "
        />

        <select
          value={item.unit}
          onChange={(e) => updateItem(index, "unit", e.target.value)}
          className="
            w-1/2
            md:w-full md:col-span-2
            input text-center outline-none
          "
        >
          {units.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div className="relative md:col-span-2">
        <span className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          ₹
        </span>

        <input
          type="number"
          min="0"
          placeholder={isMobile ? "Price" : "0.00"}
          value={item.estimatedPrice}
          onChange={(e) =>
            updateItem(index, "estimatedPrice", e.target.value)
          }
          className="input pl-7 text-center w-full outline-none"
        />
      </div>

      {/* Total + Delete */}
      <div className="flex items-center md:col-span-2">
  <div className="flex-1 text-orange-600 font-semibold text-center md:text-left">
    ₹{total.toFixed(2)}
  </div>

  <div className="flex-1 flex justify-center">
    <button
      onClick={() => removeItem(index)}
      className="text-red-500 hover:scale-110 transition"
    >
      <Trash2 size={18} />
    </button>
  </div>
</div>
    </motion.div>
  );
}

export default ItemRow;
