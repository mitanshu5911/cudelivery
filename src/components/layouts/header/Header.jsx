import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import SmallDesktop from './SmallDesktop';
import LargeDesktop from './LargeDesktop';
import { useAuth } from '../../../context/AuthContext.jsx';
const Header = () => {
  const [isMobile,setIsMobile] = useState(window.innerWidth<768);
  const {isAuthenticated} = useAuth();

  const navItems = [
    {name: "Components", path: "/components"},
    {name: "About Us", path: "/about"},
    {name: "Contact", path: "/contact"},
    {name: "Settings", path: "/settings"},
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    }


    window.addEventListener("resize", handleResize);
    return ()=> window.removeEventListener("resize", handleResize);
  },[]);

  return (
    <>
      {isMobile? <SmallDesktop  isAuthenticated={isAuthenticated} navItems={navItems} /> : <LargeDesktop isAuthenticated={isAuthenticated} navItems={navItems} />}

    </>
  )
}

export default Header