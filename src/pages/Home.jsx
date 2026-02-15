import React from 'react'
import { useAuth } from '../context/AuthContext'

function Home() {
  const { logout } = useAuth();

  return (
    <button type="button" onClick={logout}>
      Logout
    </button>
  )
}

export default Home;
