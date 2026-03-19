import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { useState } from "react";
import { sendContactMessage } from "../services/contactService";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";

const Contact = () => {
  const { showToast } = useToast();
  const { user, isAuthenticated } = useAuth();

  const [form, setForm] = useState({
    name: isAuthenticated ? user?.name || "" : "",
    email: isAuthenticated ? user?.email || "" : "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await sendContactMessage(form);

      showToast("success", "Message sent successfully 🚀");

      setForm((prev) => ({
        ...prev,
        subject: "",
        message: ""
      }));

    } catch (error) {
      showToast("error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full relative overflow-hidden">

      {/* 🌈 BACKGROUND GRADIENT BLOBS */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-24 pb-12 px-6"
      >
        <h1 className="text-5xl font-bold text-gray-800">
          Contact <span className="text-orange-500">Us</span>
        </h1>

        <p className="text-gray-600 mt-4 max-w-xl mx-auto text-lg">
          Let’s build something amazing together 🚀
        </p>
      </motion.div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-12 items-center">

        {/* 🧊 GLASS FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 space-y-6"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            Send a Message
          </h2>

          {/* FLOATING INPUT */}
          {[
            { name: "name", label: "Your Name" },
            { name: "email", label: "Your Email" },
            { name: "subject", label: "Subject" }
          ].map((field) => (
            <div key={field.name} className="relative">
              <input
                type="text"
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                disabled={
                  isAuthenticated &&
                  (field.name === "name" || field.name === "email")
                }
                required
                className={`peer w-full px-4 pt-5 pb-2 rounded-xl bg-white/30 border border-white/40 text-gray-800 placeholder-transparent
                focus:outline-none focus:ring-2 focus:ring-orange-400
                ${isAuthenticated &&
                  (field.name === "name" || field.name === "email")
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              />
              <label
                className="absolute left-4 top-2 text-xs text-gray-600 transition-all
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
                peer-focus:top-2 peer-focus:text-xs peer-focus:text-orange-500"
              >
                {field.label}
              </label>
            </div>
          ))}

          {/* TEXTAREA */}
          <div className="relative">
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              className="peer w-full px-4 pt-5 pb-2 rounded-xl bg-white/30 border border-white/40 text-gray-800 placeholder-transparent
              focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <label
              className="absolute left-4 top-2 text-xs text-gray-600 transition-all
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
              peer-focus:top-2 peer-focus:text-xs peer-focus:text-orange-500"
            >
              Your Message
            </label>
          </div>

          {/* BUTTON */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full bg-linear-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>

        {/* 🔥 RIGHT SIDE */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-gray-800">
            Get in touch
          </h2>

          <p className="text-gray-600">
            We usually respond within minutes ⚡
          </p>

          {/* CARDS */}
          <div className="space-y-4">

            <motion.a
              whileHover={{ scale: 1.03 }}
              href="mailto:cudelivery001@gmail.com"
              className="flex items-center gap-4 p-5 bg-white/40 backdrop-blur-lg rounded-2xl shadow-md"
            >
              <div className="bg-orange-500 text-white p-3 rounded-full">
                <Mail />
              </div>

              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-800">
                  cudelivery001@gmail.com
                </p>
              </div>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03 }}
              href="tel:+917009674256"
              className="flex items-center gap-4 p-5 bg-white/40 backdrop-blur-lg rounded-2xl shadow-md"
            >
              <div className="bg-orange-500 text-white p-3 rounded-full">
                <Phone />
              </div>

              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-gray-800">
                  +91 70096 74256
                </p>
              </div>
            </motion.a>

            {/* SUPPORT */}
            <div className="flex items-center gap-4 p-5 bg-linear-to-r from-orange-400 to-orange-500 text-white rounded-2xl shadow-lg">
              <MessageCircle />

              <div>
                <p className="text-sm opacity-80">Support</p>
                <p className="font-semibold">
                  Fast response guaranteed 🚀
                </p>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;