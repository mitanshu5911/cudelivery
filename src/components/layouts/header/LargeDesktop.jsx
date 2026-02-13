import React from 'react'
import {motion} from 'framer-motion'
function LargeDesktop() {
  return (
    <header className='sticky top-0 z-50 h-20 w-full 
                   bg-orange-600 rounded-b-full 
                   px-6 md:px-20 
                   flex items-center'>
        <div className="flex items-center justify-between w-full relative">
            <motion.div
                initial={{x:0}}
            >
                {}
            </motion.div>
        </div>
    </header>
  )
}

export default LargeDesktop