import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import {User} from 'lucide-react';
function LargeDesktop({ isAuthenticated, navItems }) {
  // console.log("LargePage:" + (isAuthenticated));
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 h-20 w-full mb-1 bg-orange-600 rounded-b-full px-6 md:px-10 lg:px-20 flex items-center justify-between">
      <div className=" w-full relative flex items-center justify-between ">
        <motion.div
          initial={{ x: 0 }}
          animate={isAuthenticated ? { x: "41vw"} : { x: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="flex items-center absolute left-0"
        >
          <NavLink to="/home">
            <div className="flex">
              <h1 className="text-red-700 text-4xl font-bold ">C</h1>
              <h2 className="text-white text-2xl mt-2 font-bold">Delivery</h2>
            </div>
          </NavLink>
        </motion.div>

        {!isAuthenticated && (
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                className="flex items-center justify-center w-full gap-10"
            >
                {navItems.map((item,idx) => (
                    <NavLink
                        key={idx}
                        to={item.path}
                        className={({isActive}) =>
                            `font-semibold transition ${
                                isActive?"text-yellow-300" : "text-white"
                            } hover:text-yellow-200`
                        } 
                    >
                        {item.name}
                    </NavLink>
                ))}

            </motion.div>
        )}

        {isAuthenticated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex items-center justify-center w-full gap-16"
          >
            {/* Left side (2 items) */}
            <div className="flex gap-6">
              {navItems.slice(0, 2).map((item, idx) => (
                <NavLink
                  key={idx}
                  to={item.path}
                  className={({ isActive }) =>
                    `font-semibold transition ${
                      isActive ? "text-yellow-300" : "text-white"
                    } hover:text-yellow-200`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Spacer for centered logo */}
            <div className="w-40"></div>

            {/* Right side (2 items) */}
            <div className="flex gap-6">
              {navItems.slice(2, 4).map((item, idx) => (
                <NavLink
                  key={idx}
                  to={item.path}
                  className={({ isActive }) =>
                    `font-semibold transition ${
                      isActive ? "text-yellow-300" : "text-white"
                    } hover:text-yellow-200`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}


        <motion.div
          initial={{ x: 0, opacity: 1 }}
          animate={
            isAuthenticated ? { x: "50vw", opacity: 0 } : { x: 0, opacity: 1 }
          }
          transition={{ duration: 1, ease: "easeInOut" }}
          className="ml-auto"
        >
          {!isAuthenticated && (
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-orange-600 px-4 py-2 rounded-lg font-bold hover:bg-orange-100 transition flex items-center gap-2"
            >
              <User size={18} /> Login
            </button>
          )}
        </motion.div>

      </div>
    </header>
  );
}

export default LargeDesktop;
