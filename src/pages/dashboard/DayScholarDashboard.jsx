import React from "react";
import Greeting from "../../components/dashboard/dayScholar/Greeting.jsx"
import StatsCards from "../../components/dashboard/dayScholar/StatsCards.jsx"
import AvailableRequests from "../../components/dashboard/dayScholar/AvailableRequests.jsx"
import MyDeliveriesWidget from "../../components/dashboard/dayScholar/MyDeliveriesWidget.jsx"
import DeliveryProgress from "../../components/dashboard/dayScholar/DeliveryProgress.jsx"
import NotificationsPanel from "../../components/dashboard/dayScholar/NotificationsPanel.jsx"
import WeeklyStatsChart from "../../components/dashboard/dayScholar/WeeklyStatsChart.jsx";

const DayScholarDashboard = () => {
  return (
    <div className="p-0 md:p-8 max-w-full mx-auto space-y-8">
      <Greeting/>
      <StatsCards/>
       

      <div className="grid lg:grid-cols-2 gap-6">
        <AvailableRequests />
        <WeeklyStatsChart/>
        <MyDeliveriesWidget />
        <NotificationsPanel />
      </div>
        <DeliveryProgress  />
    </div>
  );
};

export default DayScholarDashboard;
