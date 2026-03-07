import { AnimatePresence, motion } from "framer-motion";
import {
  Clock,
  MapPin,
  MessageCircle,
  Notebook,
  NotebookPen,
  Truck,
  User,
  X,
} from "lucide-react";
const statusStyles = {
  pending: "bg-yellow-300 text-yellow-900",
  accepted: "bg-green-300 text-green-900",
  picked: "bg-blue-300 text-blue-900",
  completed: "bg-purple-300 text-purple-900",
  cancelled: "bg-red-300 text-red-900",
};

const RequestModal = ({ request, onClose, onStatusChange }) => {
  if (!request) return null;

  const disableChat =
    request.status === "cancelled" ||
    request.status === "completed" ||
    request.status === "pending";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-gray-100 z-50 flex flex-col h-full"
      >
        <div className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white tracking-wide">
              {request.orderId}
            </h2>

            <div className="relative inline-flex items-center">
              <div
                className={`font-semibold text-xs px-4 py-2 rounded-full shadow-[0_5px_10px_rgba(0,0,0,0.2)] pr-20 ${statusStyles[request.status]}`}
              >
                {request.status.charAt(0).toUpperCase() +
                  request.status.slice(1)}
              </div>

              <button
                className="absolute right-0 w-10 h-10 flex items-center justify-center rounded-full 
              bg-linear-to-br from-orange-500 to-orange-600
              shadow-[0_5px_10px_rgba(0,0,0,0.25)]
              hover:scale-105
              transition-all duration-300"
                onClick={onClose}
              >
                <X size={22} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-md p-4 md:p-6 flex flex-col">
              <h3 className="text-lg md:text-xl fonst-semibold mb-4 md:mb-6">
                Items
              </h3>

              <div className="hidden md:grid grid-cols-5 font-semibold text-gray-600 border-b pb-1 px-2">
                <span className="col-span-2">Item</span>
                <span>Qty</span>
                <span>Price</span>
                <span className="text-right">Total</span>
              </div>

              <div className="mt-2 md:mt-4 space-y-3 flex-1">
                {request.items.map((item, index) => {
                  const total = item.quantity * item.estimatedPrice;

                  return (
                    <div
                      key={index}
                      className="bg-gray-50 hover:bg-orange-50 transition rounded-xl p-3"
                    >
                      <div className="hidden md:grid grid-cols-5 items-center">
                        <span className="font-medium col-span-2">
                          {item.name}
                        </span>
                        <span>
                          {item.quantity} {item.unit}
                        </span>
                        <span>₹ {item.estimatedPrice}</span>
                        <span className="text-right font-semibold">
                          ₹ {total}
                        </span>
                      </div>

                      <div className="md:hidden space-y-1 text-sm">
                        <div className="flex justify-between font-medium">
                          <span>{item.name}</span>
                          <span className="font-semibold">₹ {total}</span>
                        </div>

                        <div className="flex justify-between text-gray-500">
                          <span>
                            {item.quantity} {item.unit}
                          </span>
                          <span>
                            ₹ {item.estimatedPrice} × {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 bg-orange-50 rounded-xl p-4 md:p-5 space-y-2 text-sm md:text-base">
                <div className="flex justify-between">
                  <span>Items Total</span>
                  <span className="font-semibold">₹ {request.itemsTotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold">₹ {request.deliveryFee}</span>
                </div>

                <div className="flex justify-between font-bold text-base md:text-lg border-t pt-3">
                  <span>Grand Total</span>
                  <span>₹ {request.grandTotal}</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-md p-4 md:p-6 flex flex-col">
              <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">
                Request Details
              </h3>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-700">
                  {request.hosteller ? (
                    request.hosteller.name.charAt(0).toUpperCase()
                  ) : (
                    <User size={20} className="text-gray-500" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-semibold">
                      {request.hosteller ? request.hosteller?.name : "User"}
                    </h4>

                    <button
                      disabled={disableChat}
                      className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full ${
                        disableChat
                          ? "bg-gray-200 text-gray-500"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      <MessageCircle size={16} />
                      Chat
                    </button>
                  </div>

                  <p className="text-gray-500 text-sm">
                    {request.hostellerProfile?.hostellerInfo
                      ? `${request.hostellerProfile.hostellerInfo.hostelName}, Room ${request.hostellerProfile.hostellerInfo.roomNumber}`
                      : request.deliveryLocation}
                  </p>
                </div>
              </div>

              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User size={14} />
                  Requested By:
                  <span className="font-semibold">
                    {request.hosteller?.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Truck size={14} />
                  Accepted By:
                  <span className="font-semibold">
                    {request.acceptedBy?.name || "Not yet"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  Delivery Location:{" "}
                  <span className="font-semibold">
                    {request.deliveryLocation}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  Requested At:{" "}
                  <span className="font-semibold">
                    {new Date(request.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {request.instructions && (
                <div className="mt-5 bg-gray-50 p-4 rounded-xl text-sm">
                  <p className="font-medium mb-1">
                    <NotebookPen size={14} className="inline mr-1" />
                    Special Instructions
                  </p>
                  <p className="text-gray-600 wrap-break-word">{request.instructions}</p>
                </div>
              )}

              <div className="mt-6 space-y-3">
                {request.status === "pending" && (
                  <>
                    <button
                      onClick={() => onStatusChange("accepted")}
                      className="w-full bg-green-600 text-white py-3 rounded-xl"
                    >
                      Accept Request
                    </button>
                  </>
                )}

                {request.status === "accepted" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => onStatusChange("picked")}
                      className="w-full bg-blue-600 text-white py-3 rounded-xl"
                    >
                      Mark Picked
                    </button>

                    <button
                      onClick={() => onStatusChange("cancelled")}
                      className="w-full bg-red-500 text-white py-3 rounded-xl"
                    >
                      Cancel Request
                    </button>
                  </div>
                )}

                {request.status === "picked" && (
                  <button
                    onClick={() => onStatusChange("completed")}
                    className="w-full bg-purple-600 text-white py-3 rounded-xl"
                  >
                    Complete Delivery
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* {body} */}
      </motion.div>
    </AnimatePresence>
  );
};

export default RequestModal;
