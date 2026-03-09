import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, Truck, PackageCheck } from "lucide-react";
import { getMyRequests } from "../../../services/requestService";

const HostellerStats = () => {
  const [stats, setStats] = useState({
    pending: 0,
    accepted: 0,
    picked: 0,
    completed: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const requests = await getMyRequests();

        const newStats = {
          pending: requests.filter((r) => r.status === "pending").length,
          accepted: requests.filter((r) => r.status === "accepted").length,
          picked: requests.filter((r) => r.status === "picked").length,
          completed: requests.filter((r) => r.status === "completed").length,
        };

        setStats(newStats);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Accepted",
      value: stats.accepted,
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Picked",
      value: stats.picked,
      icon: Truck,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: PackageCheck,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
      {cards.map((card, i) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-xl ${card.color}`}
            >
              <Icon size={24} />
            </div>

            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <p className="text-xl md:text-2xl font-bold text-gray-800">
                {card.value}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default HostellerStats;