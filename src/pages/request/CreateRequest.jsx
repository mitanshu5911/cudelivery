import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import ItemRow from "../../components/request/ItemRow";
import { MapPin, PlusCircle } from "lucide-react";
import { createRequest } from "../../services/requestService";
import AlertToast from "../../components/ui/AlertToast";

const urgencyList = ["low", "medium", "high"];

const defaultItem = {
  name: "",
  quantity: "",
  unit: "piece",
  estimatedPrice: "",
};

const CreateRequest = () => {
  
  const [items, setItems] = useState([
    { ...defaultItem },
    { ...defaultItem },
    { ...defaultItem },
  ]);

  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [deliveryFee, setDeliveryFee] = useState("");
  const [urgency, setUrgency] = useState("low");
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);

  
  const [toast, setToast] = useState({
    visible: false,
    type: "success",
    message: "",
  });

  const showToast = (type, message) => {
    setToast({ visible: true, type, message });
  };

  const removeItem = (index) => {
    if (items.length ===1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const addItem = () => {
    setItems([...items, { ...defaultItem }]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  
  const itemsTotal = items.reduce((sum, item) => {
    const qty = Number(item.quantity);
    const price = Number(item.estimatedPrice);
    if (!qty || !price) return sum;
    return sum + qty * price;
  }, 0);

  const numericDelivery = Number(deliveryFee);

  const finalDelivery =
    !deliveryFee || isNaN(numericDelivery)
      ? 20
      : numericDelivery < 20
      ? 20
      : numericDelivery;

  const grandTotal = itemsTotal + finalDelivery;

  const handleSubmit = async () => {
    try {
            
      const validItems = [];
      let filledCount = 0;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        const isFilled =
          item.name?.trim() !== "" ||
          item.quantity !== "" ||
          item.estimatedPrice !== "";

        if (isFilled) {
          filledCount++;

          if (
            item.name?.trim() === "" ||
            Number(item.quantity) <= 0 ||
            Number(item.estimatedPrice) <= 0
          ) {
            showToast(
              "error",
              `Row ${i + 1} is incomplete. Please fill all required fields.`
            );
            return;
          }

          validItems.push({
            ...item,
            quantity: Number(item.quantity),
            estimatedPrice: Number(item.estimatedPrice),
          });
        }
      }

      if (filledCount === 0) {
        showToast("error", "At least one item must be filled");
        return;
      }

      if (!deliveryLocation.trim()) {
        showToast("error", "Delivery location is required");
        return;
      }

      setLoading(true);

      const payload = {
        items: validItems,
        deliveryLocation: deliveryLocation.trim(),
        deliveryFee: finalDelivery,
        urgency,
        instructions: instructions.trim(),
      };

      await createRequest(payload);

      showToast("success", "Request Created Successfully!");

      
      setItems([
        { ...defaultItem },
        { ...defaultItem },
        { ...defaultItem },
      ]);
      setDeliveryLocation("");
      setDeliveryFee("");
      setUrgency("low");
      setInstructions("");
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-6 md:p-12">
      <div className="w-full max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          Create Request
        </h1>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Items</h2>

              <div className="grid grid-cols-12 text-sm font-semibold text-gray-700 mb-2 px-2">
                <span className="col-span-4 pl-4">Item</span>
                <span className="col-span-2 text-center">Qty</span>
                <span className="col-span-2 text-center">Unit</span>
                <span className="col-span-2 text-center">
                  Est. ₹ (per unit)
                </span>
                <span className="col-span-1 text-center">Total</span>
                <span className="col-span-1"></span>
              </div>

              <div className="max-h-48 overflow-y-auto pr-2 pb-2">
                <AnimatePresence>
                  {items.map((item, index) => (
                    <ItemRow
                      key={index}
                      item={item}
                      index={index}
                      updateItem={updateItem}
                      removeItem={removeItem}
                    />
                  ))}
                </AnimatePresence>
              </div>

              <button
                onClick={addItem}
                className="ml-3 flex items-center gap-2 text-orange-600 font-semibold hover:scale-105 transition"
              >
                <PlusCircle size={18} />
                Add Item
              </button>
            </div>

            <div className="bg-orange-300 p-7 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-semibold mb-3">Instructions</h2>

              <textarea
                rows="6"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full bg-white rounded-xl p-4 focus:ring-2 focus:ring-orange-600 outline-none"
                placeholder="Add special instructions..."
              />
            </div>
          </div>

          <div className="space-y-10">
            <div className="bg-orange-300 backdrop-blur-md p-6 rounded-3xl shadow-xl space-y-4 transition-all">
              <h2 className="text-xl font-semibold">Delivery</h2>

              <div className="flex items-center gap-2 rounded-xl p-3 bg-white">
                <MapPin className="text-orange-600" size={18} />
                <input
                  type="text"
                  placeholder="Enter delivery location"
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  className="w-full outline-none"
                />
              </div>

              <div className="space-y-2 mb-1">
                <div className="relative mb-0">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-600 font-medium">
                    ₹
                  </span>

                  <input
                    type="number"
                    value={deliveryFee}
                    placeholder="Enter delivery fee"
                    onChange={(e) => setDeliveryFee(e.target.value)}
                    className="w-full rounded-xl bg-white px-4 py-3 pl-8 focus:outline-none transition"
                  />
                </div>

                {deliveryFee && Number(deliveryFee) < 20 && (
                  <p className="text-xs text-red-600 font-semibold text-end px-3">
                    (min ₹20)
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Select Urgency
                </label>

                <div className="grid grid-cols-3 gap-4">
                  {urgencyList.map((level) => (
                    <button
                      key={level}
                      onClick={() => setUrgency(level)}
                      className={`py-3 rounded-2xl font-semibold capitalize transition-all duration-300
                      ${
                        urgency === level
                          ? "bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105"
                          : "bg-gray-100 hover:bg-orange-50 text-gray-700"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl border border-black sticky top-10">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="flex justify-between mb-2">
                <span>Item Total</span>
                <span>₹{itemsTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Delivery Fee</span>
                <span>₹{finalDelivery.toFixed(2)}</span>
              </div>

              <div className="border-t pt-4 flex justify-between text-xl font-bold text-orange-600">
                <span>Grand Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full mt-6 bg-linear-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition shadow-md disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </div>
        </div>
      </div>

      
      <AlertToast
        visible={toast.visible}
        type={toast.type}
        message={toast.message}
        onClose={() =>
          setToast((prev) => ({ ...prev, visible: false }))
        }
      />
    </div>
  );
};

export default CreateRequest;