import React from 'react'
import Greeting from "../../components/dashboard/hosteller/Greeting.jsx"
import Stats from "../../components/dashboard/hosteller/Stats.jsx"
import RequestProgress from "../../components/dashboard/hosteller/RequestProgress.jsx"
import RecentActivity from '../../components/dashboard/hosteller/RecentActivity.jsx'
import RequestsChart from '../../components/dashboard/hosteller/RequestChart.jsx'
import TopRequestedItems from '../../components/dashboard/hosteller/TopRequestedItems.jsx'
const HostellerDashboard = () => {
  return (
    <div className="w-full md:p-6">
      <Greeting/>
      <div className="p-4 md:p-0 space-y-6">
        <Stats/>
        <div className="grid lg:grid-cols-2 gap-3">
        <RequestProgress/>
        <RecentActivity/>
        </div>

        <div className="md:grid lg:grid-cols-2 gap-6 ">
          <RequestsChart/>
          <TopRequestedItems/>
        </div>
      </div>
    </div>
  )
}

export default HostellerDashboard