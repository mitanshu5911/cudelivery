import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  const links = [
    { name: "How It Works", path: "/how_it_works" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="mt-24 bg-linear-to-b from-gray-900 to-black text-gray-300">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12"
      >

        {/* Brand */}

        <div>
          <h2 className="text-2xl font-bold mb-4">
            <span className="text-white">Cu</span>
            <span className="text-orange-500">Delivery</span>
          </h2>

          <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
            A campus delivery platform connecting hostellers with day scholars
            to make everyday purchases easier, faster and more convenient.
          </p>
        </div>

        {/* Quick Links */}

        <div>
          <h3 className="text-lg font-semibold text-white mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3">
            {links.map((link, i) => (
              <li key={i}>
                <NavLink
                  to={link.path}
                  className="hover:text-orange-400 transition hover:translate-x-1 inline-block"
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}

        <div>
          <h3 className="text-lg font-semibold text-white mb-5">
            Contact
          </h3>

          <div className="space-y-4 text-sm">

            {/* Email */}

            <a
              href="mailto:cudelivery001@gmail.com"
              className="flex items-center gap-3 hover:text-orange-400 transition"
            >
              <Mail size={18} className="text-orange-400" />
              cudelivery001@gmail.com
            </a>

            {/* Phone */}

            <a
              href="tel:+917009674256"
              className="flex items-center gap-3 hover:text-orange-400 transition"
            >
              <Phone size={18} className="text-orange-400" />
              +91 70096 74256
            </a>

          </div>
        </div>

      </motion.div>

      {/* Bottom */}

      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">

        © {year} CuDelivery — Built with ❤️ by{" "}
        <span className="text-white font-semibold">
          Mitanshu Bansal
        </span>

      </div>

    </footer>
  );
};

export default Footer;