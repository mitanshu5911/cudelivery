import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, MessageCircle, Package, User, X } from "lucide-react";
const steps = ["pending", "accepted", "picked", "completed"];
const MyRequestModal = ({ request, onClose, onEdit, onDelete, onCancel }) => {
  if (!request) return null;

  const currentStep = steps.indexOf(request.status);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-end md:items-center z-50"
      >
        <motion.div
          drag="y"
          dragConstraints={{ top: 0 }}
          onDragEnd={(e, info) => {
            if (info.offset.y > 120) onClose();
          }}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="bg-white w-full md:max-w-6xl max-h-[92vh] rounded-t-3xl md:rounded-2xl shadow-xl flex flex-col overflow-hidden"
        >
          <div className="md:hidden flex justify-center py-2">
            <div className="w-10 h-1.5 bg-gray-300 rounded-full"></div>
          </div>

          <div className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-5 py-4 flex justify-between items-center">
            <div>
              <h2 className="font-bold text-lg">{request.orderId}</h2>
              <p className="text-xs opacity-80">
                {new Date(request.createdAt).toLocaleString()}
              </p>
            </div>

            <button onClick={onClose}>
              <X size={22} />
            </button>
          </div>

          <div className="px-5 py-4 border-b">
            <div className="flex justify-between min-w-75 relative">
              <div className="absolute top-3 left-0 right-0 h-0.5 bg-gray-200 "></div>

              {steps.map((step, index) => {
                const active = index <= currentStep;

                return (
                  <div
                    key={step}
                    className="flex flex-col items-center relative z-10 flex-1"
                  >
                    <div
                      className={`w-5 h-5 rounded-full ${
                        active ? "bg-orange-500" : "bg-gray-300"
                      }`}
                    />
                    <span
                      className={`text-[11px] mt-1 capitalize ${
                        active ? "text-orange-600 font-medium" : "text-gray-400"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Package size={18} />
                  Items
                </h3>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {request.items.map((item, i) => {
                    const total = item.quantity * item.estimatedPrice;

                    return (
                      <div
                        key={i}
                        className="flex justify-between bg-white rounded-lg p-3 shadow-sm"
                      >
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>

                          <p className="text-xs text-gray-500">
                            {item.quantity} {item.unit}
                          </p>
                        </div>

                        <span className="font-semibold text-sm">₹ {total}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 border-t pt-3 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Items Total</span>
                    <span>₹ {request.itemsTotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>₹ {request.deliveryFee}</span>
                  </div>
                </div>

                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Grand Total</span>
                  <span className="text-orange-600">
                    ₹ {request.grandTotal}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 flex flex-col">
                <h3 className="font-semibold mb-3">Request Details</h3>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <User size={14} />
                    Requested By:
                    <span className="font-semibold">
                      {request.hosteller?.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    Location:
                    <span className="font-semibold">
                      {request.deliveryLocation}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    Requested At:
                    <span className="font-semibold">
                      {new Date(request.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {request.acceptedBy && (
                    <div className="flex items-center gap-2">
                      Accepted By:
                      <span className="font-semibold">
                        {request.acceptedBy.name}
                      </span>
                    </div>
                  )}
                </div>

                {request.instructions && (
                  <div className="mt-4 bg-white p-3 rounded-lg text-sm">
                    <p className="font-medium mb-1">Instructions</p>
                    <p className="wrap-break-word max-w-75 md:max-w-full">
                      {request.instructions}
                    </p>
                  </div>
                )}

                <div className="mt-6 space-y-3">
                  {request.acceptedBy && (
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2">
                      <MessageCircle size={16} />
                      Chat with Deliverer
                    </button>
                  )}

                  {request.status === "pending" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => onEdit(request)}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(request)}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  )}

                  {request.status === "accepted" && (
                    <button
                      onClick={() => onCancel(request)}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                    >
                      Cancel Request
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MyRequestModal;
