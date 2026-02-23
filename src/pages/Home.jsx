import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

function Home() {
  const { logout, authMessage, setAuthMessage } = useAuth();

  useEffect(() => {
    if (authMessage) {
      // alert(authMessage);
      setAuthMessage("");
    }
  }, [authMessage]);

  return (
    <button type="button" onClick={logout}>
      Logout
    </button>
  )
}

export default Home;
