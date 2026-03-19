import { Package, Truck, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    icon: Package,
    title: "Create a Request",
    description:
      "Hostellers simply create a request listing the items they need from outside the campus. Add quantities, delivery location, and instructions.",
  },
  {
    icon: Truck,
    title: "Day Scholar Accepts",
    description:
      "Day scholars traveling to campus can view available requests and accept one. They purchase the items while coming to campus.",
  },
  {
    icon: CheckCircle,
    title: "Delivery Completed",
    description:
      "The items are delivered to the hostel and the hosteller confirms the delivery. Both users can chat and track the request status in real time.",
  },
];

const benefits = {
  hostellers: [
    "Get items delivered without leaving hostel",
    "Real-time chat with delivery partner",
    "Track request progress easily",
    "Fast and convenient deliveries",
  ],
  scholars: [
    "Earn extra pocket money",
    "Flexible delivery opportunities",
    "Easy request management dashboard",
    "Build reputation through ratings",
  ],
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">

      

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto text-center pt-20 pb-14 px-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          How <span className="text-orange-500">CuDelivery</span> Works
        </h1>

        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          CuDelivery connects hostellers and day scholars to make campus
          deliveries fast, reliable, and convenient. No more leaving campus
          just to buy daily essentials.
        </p>
      </motion.section>

    
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6 pb-24"
      >
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition"
            >
              <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center bg-orange-100 rounded-full">
                <Icon className="text-orange-500" size={30} />
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {step.title}
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          );
        })}
      </motion.section>

    

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-white py-20"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">

        

          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              For Hostellers
            </h2>

            <ul className="space-y-4 text-gray-600">
              {benefits.hostellers.map((b, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-orange-500 font-bold">✔</span>
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>

          

          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              For Day Scholars
            </h2>

            <ul className="space-y-4 text-gray-600">
              {benefits.scholars.map((b, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-orange-500 font-bold">✔</span>
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </motion.section>

      

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-20 text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Ready to start using CuDelivery?
        </h2>

        <p className="text-gray-500 mb-8">
          Join the campus delivery network and make daily life easier.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 mx-auto transition"
        >
          Get Started
          <ArrowRight size={18} />
        </button>
      </motion.section>

    </div>
  );
};

export default HowItWorks;