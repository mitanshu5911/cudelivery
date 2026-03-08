import React from "react";
import Greeting from "../../components/dashboard/Greeting";
import StatsCards from "../../components/dashboard/StatsCards";
import AvailableRequests from "../../components/dashboard/AvailableRequests";
import MyDeliveriesWidget from "../../components/dashboard/MyDeliveriesWidget";
import DeliveryProgress from "../../components/dashboard/DeliveryProgress";
import NotificationsPanel from "../../components/dashboard/NotificationsPanel";

const DayScholarDashboard = () => {
  return (
    <div className="p-0 md:p-8 max-w-full mx-auto space-y-8">
      <Greeting />

      <StatsCards />

      <div className="grid lg:grid-cols-2 gap-6">
        <AvailableRequests />
        <MyDeliveriesWidget />
        <DeliveryProgress />
        <NotificationsPanel />
      </div>
    </div>
  );
};

export default DayScholarDashboard;
