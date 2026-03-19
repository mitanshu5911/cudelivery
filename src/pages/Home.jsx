import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx';
import { useProfile } from '../context/ProfileContext.jsx';
import DayScholarDashboard from './dashboard/DayScholarDashboard.jsx';
import HostellerDashboard from './dashboard/HostellerDashboard.jsx';
import { useLoading } from '../context/LoadingContext.jsx';

function Home() {
  const { authMessage, setAuthMessage } = useAuth();
  const {isDayScholar, isHosteller, loading} = useProfile();
  const {startLoading} = useLoading();

  useEffect(() => {
    if (authMessage) {
      alert(authMessage);
      setAuthMessage("");
    }
  }, [authMessage]);


 
  if(loading) {
    startLoading("Loading");
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
