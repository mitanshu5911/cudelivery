import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, CheckCircle } from "lucide-react";
import { submitRating } from "../../services/ratingService";
import { useToast } from "../../context/ToastContext";

const RatingModal = ({ requestId, onClose, onSuccess }) => {

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { showToast } = useToast(); // ✅ GLOBAL TOAST

  const handleSubmit = async () => {

    if (rating === 0) {
      showToast("error", "Please select a rating");
      return;
    }

    try {
      setLoading(true);

      await submitRating(requestId, { rating, review });

      setSuccess(true);

      showToast("success", "Rating submitted successfully ⭐");

      onSuccess?.();

      // 🔥 close after 0.5s
      setTimeout(() => {
        onClose();
      }, 500);

    } catch (error) {

      showToast(
        "error",
        error.response?.data?.message || "Failed to submit rating"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
        >

          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {success ? "Thank You!" : "Rate Your Delivery"}
            </h2>

            <button onClick={onClose}>
              <X size={20}/>
            </button>
          </div>

          {/* SUCCESS STATE */}
          {success ? (
            <div className="flex flex-col items-center text-center py-6">
              <CheckCircle size={50} className="text-green-500 mb-3" />
              <p className="text-gray-600">
                Your rating has been submitted!
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-500 text-sm mb-4">
                How was your delivery experience?
              </p>

              {/* STARS */}
              <div className="flex justify-center gap-2 mb-5">
                {[1,2,3,4,5].map((star) => (
                  <Star
                    key={star}
                    size={32}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer transition ${
                      (hover || rating) >= star
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* REVIEW */}
              <textarea
                value={review}
                onChange={(e)=>setReview(e.target.value)}
                placeholder="Write a review (optional)"
                className="w-full border rounded-lg p-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                rows={3}
              />

              {/* BUTTON */}
              <button
                onClick={handleSubmit}
                disabled={loading || rating === 0}
                className={`w-full py-2 rounded-lg ${
                  loading || rating === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600 text-white"
                }`}
              >
                {loading ? "Submitting..." : "Submit Rating"}
              </button>
            </>
          )}

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RatingModal;