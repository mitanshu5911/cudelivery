import { motion } from "framer-motion";
import { Code2, Database, Globe, Zap } from "lucide-react";
const techStack = [
  {
    icon: Code2,
    title: "Frontend",
    description: "React, Vite, TailwindCSS, Framer Motion",
  },
  {
    icon: Database,
    title: "Backend",
    description: "Node.js, Express.js, MongoDB",
  },
  {
    icon: Zap,
    title: "Real-Time",
    description: "Socket.io for live chat and updates",
  },
  {
    icon: Globe,
    title: "Verification",
    description: "OCR ID verification using Tesseract",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};
const AboutUs = () => {
  return (
    <div className="w-full">

    

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          About <span className="text-orange-500">CuDelivery</span>
        </h1>

        <p className="mt-4 text-gray-500 max-w-2xl mx-auto leading-relaxed">
          CuDelivery is a campus-focused delivery platform designed to connect
          hostellers and day scholars. It makes everyday purchases easier,
          faster, and more convenient within the university ecosystem.
        </p>
      </motion.section>

      

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-16 items-center"
      >

        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            The Problem
          </h2>

          <p className="text-gray-600 leading-relaxed">
            In many universities, hostellers often need small items from
            outside the campus — groceries, medicines, food, or daily
            essentials. However, leaving campus frequently is inconvenient
            and sometimes restricted.
          </p>

          <p className="text-gray-600 mt-4 leading-relaxed">
            At the same time, day scholars travel between the city and campus
            every day. This creates an opportunity to connect both groups in
            a mutually beneficial way.
          </p>
        </motion.div>

        <motion.div
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Our Solution
          </h3>

          <p className="text-gray-600 leading-relaxed">
            CuDelivery enables hostellers to create delivery requests for
            items they need. Day scholars can accept these requests while
            traveling to campus and deliver the items, earning a small
            delivery fee.
          </p>

          <p className="text-gray-600 mt-4 leading-relaxed">
            This simple system creates a campus economy where students help
            each other while saving time and effort.
          </p>
        </motion.div>

      </motion.section>

    

      <section className="bg-white py-20">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold text-gray-800 mb-12">
            Built With Modern Technology
          </h2>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8"
          >
            {techStack.map((tech, index) => {
              const Icon = tech.icon;

              return (
                <motion.div
                  key={index}
                  variants={item}
                  whileHover={{ y: -6 }}
                  className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition"
                >
                  <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-orange-100 rounded-full">
                    <Icon className="text-orange-500" size={28} />
                  </div>

                  <h3 className="font-semibold text-gray-800 mb-2">
                    {tech.title}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {tech.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

        </div>

      </section>

    

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-6 py-20 text-center"
      >

        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Our Vision
        </h2>

        <p className="text-gray-600 leading-relaxed">
          CuDelivery aims to simplify everyday campus life by creating a
          collaborative ecosystem where students help each other. By
          combining modern web technologies with real-time communication,
          the platform creates a reliable and efficient delivery network
          within university communities.
        </p>

      </motion.section>

    </div>
  );
}

export default AboutUs