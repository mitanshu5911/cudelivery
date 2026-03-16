import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X } from "lucide-react";
import { submitRating } from "../../services/ratingService";

const RatingModal = ({ requestId, onClose, onSuccess }) => {

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    if (rating === 0) return;

    try {

      setLoading(true);

      await submitRating(requestId, {
        rating,
        review
      });

      onSuccess();

      onClose();

    } catch (error) {

      console.error(error);

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

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-xl font-bold">
              Rate Your Delivery
            </h2>

            <button onClick={onClose}>
              <X size={20}/>
            </button>

          </div>

          <p className="text-gray-500 text-sm mb-4">
            How was your delivery experience?
          </p>

          {/* Stars */}

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

          {/* Review */}

          <textarea
            value={review}
            onChange={(e)=>setReview(e.target.value)}
            placeholder="Write a review (optional)"
            className="w-full border rounded-lg p-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
            rows={3}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg"
          >
            {loading ? "Submitting..." : "Submit Rating"}
          </button>

        </motion.div>

      </motion.div>

    </AnimatePresence>
  );
};

export default RatingModal;