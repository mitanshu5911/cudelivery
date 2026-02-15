import {motion, AnimatePresence } from 'framer-motion';
import { Menu, User, X } from 'lucide-react';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function SmallDesktop({ isAuthenticated, navItems }) {

  const navigate = useNavigate();
  const [showMobileMenu,setShowMobileMenu] = useState(false);
  return (
    <header className='sticky top-0 z-50 h-20 w-full bg-orange-600 px-6 flex items-center justify-between'>
      <NavLink
        to="/home"      
      >
        <div className='flex items-center'>
          <h1 className="text-red-700 text-4xl font-bold">C</h1>
          <h2 className="text-white text-2xl font-bold pt-1">Delivery</h2>
        </div>
      </NavLink>

     <div className="flex md:hidden">
        {!isAuthenticated?(
          <button
            onClick={()=> navigate('/login')}          
            className="bg-white text-orange-600 px-3 py-1.5 rounded-lg font-bold hover:bg-orange-100 transition flex items-center gap-2"
          >
            <User size={16}/> Login
          </button>
        ):(
          <button
            onClick={()=> setShowMobileMenu(!showMobileMenu)}
            className='text-white'
          >
            {showMobileMenu ? <X size={26}/> : <Menu size={26}/>}
          </button>
        )}
     </div>

     <AnimatePresence>
      {isAuthenticated && showMobileMenu && (
        <motion.div
           initial={{ opacity: 0, y: -10 }}   
          animate={{ opacity: 1, y: 0 }}     
          exit={{opacity:0,y:-10}}
          transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute z-40 top-20 left-0 w-full bg-orange-700 text-white flex flex-col gap-6 p-6 md:hidden shadow-lg"
        >
          {navItems.map((item,idx) =>(
              <NavLink
                key={idx}
                to={item.path}
                className={({ isActive }) =>
                  `font-semibold ${
                    isActive ? "text-yellow-300" : "text-white"
                  } hover:text-yellow-200`
                }
                onClick={() => setShowMobileMenu(false)}
            >
              {item.name}
            </NavLink>
          ))}

        </motion.div>
      )}
     </AnimatePresence>
    </header>
  )
}

export default SmallDesktop