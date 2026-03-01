import React from "react";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const units = ["piece", "kg", "liter", "pack"];

function ItemRow({ item, index, updateItem, removeItem }) {
  const total = item.quantity * item.estimatedPrice;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-12 gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition mb-1"
    >
      
      <input
        type="text"
        placeholder="Item name"
        value={item.name}
        onChange={(e) => updateItem(index, "name", e.target.value)}
        className="col-span-4 input text-left outline-none"
      />

      {/* Quantity */}
      <input
        type="number"
        min="0"
        placeholder="0"
        value={item.quantity}
        onChange={(e) =>
          updateItem(index, "quantity", Math.max(0, Number(e.target.value)))
        }
        className="col-span-2 input text-center outline-none"
      />

      {/* Unit */}
      <select
        value={item.unit}
        onChange={(e) => updateItem(index, "unit", e.target.value)}
        className="col-span-2 input text-center outline-none"
      >
        {units.map((u) => (
          <option key={u} value={u}>
            {u}
          </option>
        ))}
      </select>

      {/* Estimated Price */}
      <div className="col-span-2 relative flex items-center">
        <span className="absolute left-3 text-gray-400 text-sm">₹</span>

        <input
          type="number"
          min="0"
          placeholder="0.00"
          value={item.estimatedPrice}
          onChange={(e) =>
            updateItem(
              index,
              "estimatedPrice",
              Math.max(0, Number(e.target.value))
            )
          }
          className="input pl-2 text-center w-full outline-none"
        />
      </div>

      {/* Total */}
      <div className="col-span-1 text-center font-semibold text-orange-600">
        ₹{isNaN(total) ? "0.00" : total.toFixed(2)}
      </div>

      {/* Delete */}
      <div className="col-span-1 flex justify-center">
        <button
          onClick={() => removeItem(index)}
          className="text-red-500 hover:scale-110 transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
}

export default ItemRow;