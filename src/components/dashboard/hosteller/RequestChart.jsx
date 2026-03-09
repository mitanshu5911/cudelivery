import React, { useEffect, useState } from "react";
import { getMyRequests } from "../../../services/requestService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart3 } from "lucide-react";

const RequestsChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getMyRequests();
        if (!data) return;

        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        const counts = {
          Mon: 0,
          Tue: 0,
          Wed: 0,
          Thu: 0,
          Fri: 0,
          Sat: 0,
          Sun: 0,
        };

        const today = new Date();

        const startOfWeek = new Date(today);
        const dayIndex = (today.getDay() + 6) % 7;
        startOfWeek.setDate(today.getDate() - dayIndex);
        startOfWeek.setHours(0, 0, 0, 0);

        data.forEach((req) => {
          const created = new Date(req.createdAt);

          if (created >= startOfWeek) {
            const jsDay = created.getDay();
            const adjustedDay = days[(jsDay + 6) % 7];
            counts[adjustedDay] += 1;
          }
        });

        const formatted = days.map((day) => ({
          day,
          requests: counts[day],
        }));

        setChartData(formatted);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="hidden md:grid bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 size={20} className="text-orange-500" />
        <h2 className="text-lg font-semibold text-gray-800">
          Requests This Week
        </h2>
      </div>

      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="day" stroke="#9ca3af" />
            <YAxis allowDecimals={false} stroke="#9ca3af" />
            <Tooltip />
            <Bar
              dataKey="requests"
              fill="#f97316"
              radius={[6, 6, 0, 0]}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RequestsChart;