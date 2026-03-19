import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  MapPin,
  MessageCircle,
  Package,
  User,
  X,
  Trash2,
  Pencil,
  Star,
  CheckCircle,
  Truck,
  Loader2,
} from "lucide-react";
import ChatModal from "../chat/ChatModal";
import { useState } from "react";
import RatingModal from "../rating/RatingModal";
import { useConfirm } from "../../context/ConfirmContext";

const steps = [
  { key: "pending", label: "Pending", icon: Loader2 },
  { key: "accepted", label: "Accepted", icon: User },
  { key: "picked", label: "Picked", icon: Truck },
  { key: "completed", label: "Done", icon: CheckCircle },
];

const statusText = {
  pending: "Waiting for delivery partner...",
  accepted: "Partner assigned",
  picked: "Out for delivery",
  completed: "Delivered successfully",
};

const MyRequestModal = ({ request, onClose, onEdit, onDelete, onCancel }) => {
  if (!request) return null;

  const [openChat, setOpenChat] = useState(false);
  const [openRating, setOpenRating] = useState(false);
  const { confirm } = useConfirm();

  const currentStep = steps.findIndex((s) => s.key === request.status);

  const handleDeleteClick = async () => {
    const ok = await confirm({
      title: "Delete Request",
      message: "This action cannot be undone.",
    });
    if (ok) onDelete(request);
  };

  const handleCancelClick = async () => {
    const ok = await confirm({
      title: "Cancel Request",
      message: "Delivery partner will be notified.",
    });
    if (ok) onCancel(request);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex justify-center items-end md:items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
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
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
          className="w-full md:max-w-6xl max-h-[92vh] bg-white/90 backdrop-blur-xl rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* MOBILE HANDLE */}
          <div className="md:hidden flex justify-center py-2">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          {/* HEADER */}
          <div className="relative bg-linear-to-r from-orange-500 via-orange-600 to-orange-700 text-white px-6 py-5">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />

            <div className="relative flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold tracking-wide">
                  {request.orderId}
                </h2>
                <p className="text-xs opacity-80">
                  {new Date(request.createdAt).toLocaleString()}
                </p>
              </div>

              <button onClick={onClose} className="hover:scale-110 transition">
                <X size={22} />
              </button>
            </div>
          </div>

          {/* 🔥 TIMELINE */}
          <div className="px-6 py-5">
            <div className="relative flex justify-between items-center">
              {/* BASE LINE */}
              <div className="absolute top-6 left-0 right-0 h-0.75 bg-gray-200 rounded-full" />

              {/* PROGRESS LINE FIXED */}
              <motion.div
                className="absolute top-6 left-0 h-0.75 bg-linear-to-r from-orange-500 to-orange-600 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `calc(${(currentStep / (steps.length - 1)) * 100}% + 20px)`,
                }}
              />

              {steps.map((step, i) => {
                const active = i <= currentStep;
                const Icon = step.icon;

                return (
                  <div
                    key={step.key}
                    className="flex flex-col items-center z-10 flex-1"
                  >
                    <div className="relative">
                      {/* Pulse effect */}
                      {active && i === currentStep && (
                        <span className="absolute w-10 h-10 rounded-full bg-orange-400 opacity-30 animate-ping" />
                      )}

                      <motion.div
                        animate={active ? { scale: 1.1 } : { scale: 1 }}
                        className={`w-10 h-10 flex items-center justify-center rounded-full shadow-md ${
                          active
                            ? "bg-orange-500 text-white"
                            : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        <Icon size={16} />
                      </motion.div>
                    </div>

                    <span
                      className={`text-xs mt-2 ${
                        active
                          ? "text-orange-600 font-semibold"
                          : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="text-center text-sm text-gray-500 mt-4">
              {statusText[request.status]}
            </p>
          </div>

          {/* BODY */}
          <div className="flex-1 overflow-y-auto p-5 md:p-6">
            <div className="grid md:grid-cols-2 gap-5">
              {/* ITEMS */}
              <div className="bg-white/70 backdrop-blur rounded-xl p-4 shadow-lg flex flex-col max-h-100">
                <h3 className="font-semibold mb-3 flex gap-2">
                  <Package size={18} /> Items
                </h3>

                <div className="space-y-3 overflow-y-auto flex-1">
                  {request.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition"
                    >
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.quantity} {item.unit}
                        </p>
                      </div>

                      <span className="font-semibold text-sm text-orange-600">
                        ₹ {item.quantity * item.estimatedPrice}
                      </span>
                    </div>
                  ))}
                </div>

                {/* TOTAL */}
                <div className="mt-4 border-t pt-3 text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Items Total</span>
                    <span>₹ {request.itemsTotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>₹ {request.deliveryFee}</span>
                  </div>

                  <div className="flex justify-between font-bold text-orange-600 border-t pt-2">
                    <span>Total</span>
                    <span>₹ {request.grandTotal}</span>
                  </div>
                </div>
              </div>

              {/* DETAILS */}
              <div className="bg-white/70 backdrop-blur rounded-xl p-4 shadow-lg flex flex-col">
                <h3 className="font-semibold mb-3">Request Details</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex gap-2 items-center">
                    <User size={14} />
                    {request.hosteller?.name}
                  </div>

                  <div className="flex gap-2 items-center">
                    <MapPin size={14} />
                    {request.deliveryLocation}
                  </div>

                  <div className="flex gap-2 items-center">
                    <Clock size={14} />
                    {new Date(request.createdAt).toLocaleString()}
                  </div>
                </div>

                {/* ✅ ACCEPTED BY WITH CHAT ICON */}
                {request.acceptedBy && (
                  <div className="mt-4 flex items-center justify-between bg-white rounded-xl p-3 shadow-sm border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
                        {request.acceptedBy.name?.[0]}
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          {request.acceptedBy.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Delivery Partner
                        </p>
                      </div>
                    </div>

                    {request.acceptedBy &&
                      (request.status === "accepted" ||
                        request.status === "picked") && (
                        <button
                          onClick={() => setOpenChat(true)}
                          className="bg-green-100 hover:bg-green-200 text-green-600 p-2 rounded-full transition active:scale-90"
                        >
                          <MessageCircle size={18} />
                        </button>
                      )}
                  </div>
                )}

                {request.instructions && (
                  <div className="mt-4 bg-white p-3 rounded-lg text-sm shadow-inner">
                    <p className="font-medium mb-1">Instructions</p>
                    {request.instructions}
                  </div>
                )}

                {/* ACTIONS */}
                <div className="mt-6 space-y-3">
                  {request.status === "pending" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => onEdit(request)}
                        className="w-full py-2.5 rounded-xl bg-yellow-500 text-white font-medium shadow-md hover:bg-yellow-600 hover:scale-[1.02] active:scale-[0.97] transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={handleDeleteClick}
                        className="w-full py-2.5 rounded-xl bg-red-500 text-white font-medium shadow-md hover:bg-red-600 hover:scale-[1.02] active:scale-[0.97] transition"
                      >
                        Delete
                      </button>
                    </div>
                  )}

                  {request.status === "accepted" && (
                    <button
                      onClick={handleCancelClick}
                      className="w-full py-2.5 rounded-xl bg-red-500 text-white font-medium shadow-md hover:bg-red-600 hover:scale-[1.02] active:scale-[0.97] transition"
                    >
                      Cancel Request
                    </button>
                  )}

                  {request.status === "completed" && request.acceptedBy && (
                    <button
                      onClick={() => setOpenRating(true)}
                      className="w-full py-3 rounded-xl bg-yellow-500 text-white font-medium shadow-md hover:bg-yellow-600 hover:scale-[1.02] active:scale-[0.97] transition flex justify-center gap-2"
                    >
                      <Star size={22} />
                      Rate Delivery Partner
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* MODALS */}
          {openChat && (
            <ChatModal request={request} onClose={() => setOpenChat(false)} />
          )}

          {openRating && (
            <RatingModal
              requestId={request._id}
              onClose={() => setOpenRating(false)}
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MyRequestModal;
