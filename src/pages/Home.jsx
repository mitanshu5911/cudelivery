import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx';
import { useProfile } from '../context/ProfileContext.jsx';
import DayScholarDashboard from './dashboard/DayScholarDashboard.jsx';
import HostellerDashboard from './dashboard/HostellerDashboard.jsx';

function Home() {
  const { authMessage, setAuthMessage } = useAuth();
  const {isDayScholar, isHosteller, loading} = useProfile();

  useEffect(() => {
    if (authMessage) {
      alert(authMessage);
      setAuthMessage("");
    }
  }, [authMessage]);

  if(loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        Loading dashboard...
      </div>
    );
  }

  if (isDayScholar) {
    return (
      <div className='w-full'>
        <DayScholarDashboard/>
      </div>
    )
  }


  if (isHosteller) {
    return <HostellerDashboard />;
  }

  return (
     <div className="p-10 text-center">
      Profile not found
    </div>
  )
}

export default Home;
