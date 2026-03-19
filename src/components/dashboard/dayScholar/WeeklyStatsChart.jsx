import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import { getWeeklyStats } from "../../../services/requestService";
const WeeklyStatsChart = () => {
  const [data, setData] = useState([]);

  const fetchStats = async () => {
    try {
      const res = await getWeeklyStats();
      // console.log("bar chart data :", res);
      setData(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mx-2 md:mx-0">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Weekly Performance
        </h2>

        <span className="text-xs text-gray-400">
          Mon → Sun
        </span>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />

          <Bar
            dataKey="count"
            radius={[10, 10, 0, 0]}
            className="fill-orange-500"
          />
        </BarChart>
      </ResponsiveContainer>

      {/* EMPTY STATE */}
      {data.every((d) => d.count === 0) && (
        <p className="text-center text-gray-400 text-sm mt-4">
          No deliveries this week
        </p>
      )}
    </div>
  );
};

export default WeeklyStatsChart;