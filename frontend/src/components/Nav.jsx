import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GoHomeFill, GoHome } from "react-icons/go";
import { FiSearch, FiPlusSquare, FiUser, FiBell, FiMessageCircle } from "react-icons/fi";
import { RxVideo } from "react-icons/rx";
import { HiSparkles } from "react-icons/hi";
import { BsFillPlayFill } from "react-icons/bs";
import dp from "../assets/dp.webp"
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Nav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { userData } = useSelector(state => state.user)
  const [activeTab, setActiveTab] = useState(location.pathname)
  
  const navItems = [
    {
      path: "/",
      icon: GoHome,
      activeIcon: GoHomeFill,
      label: "Home",
      color: "from-revoo-500 to-revoo-600"
    },
    {
      path: "/search",
      icon: FiSearch,
      activeIcon: FiSearch,
      label: "Search",
      color: "from-accent-500 to-accent-600"
    },
    {
      path: "/upload",
      icon: FiPlusSquare,
      activeIcon: FiPlusSquare,
      label: "Create",
      color: "from-green-500 to-green-600",
      special: true
    },
    {
      path: "/loops",
      icon: RxVideo,
      activeIcon: BsFillPlayFill,
      label: "Loops",
      color: "from-purple-500 to-purple-600"
    },
    {
      path: `/profile/${userData?.userName}`,
      icon: FiUser,
      activeIcon: FiUser,
      label: "Profile",
      color: "from-pink-500 to-pink-600",
      isProfile: true
    }
  ]

  const handleNavClick = (path) => {
    setActiveTab(path)
    navigate(path)
  }

  return (
    <>
      {/* Bottom Navigation */}
      <div className='fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50'>
        <div className='glass-dark rounded-3xl p-2 border border-white/10 shadow-2xl backdrop-blur-xl'>
          <div className='flex items-center gap-1'>
            {navItems.map((item, index) => {
              const Icon = location.pathname === item.path ? item.activeIcon : item.icon
              const isActive = location.pathname === item.path
              
              return (
                <motion.button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className='relative p-3 rounded-2xl transition-all duration-300'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Active background */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="activeBackground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.color} shadow-lg`}
                      />
                    )}
                  </AnimatePresence>
                  
                  {/* Special create button */}
                  {item.special ? (
                    <div className='relative z-10'>
                      <motion.div
                        animate={{ rotate: isActive ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400'}`}
                      >
                        <Icon size={24} />
                      </motion.div>
                    </div>
                  ) : item.isProfile ? (
                    <div className='relative z-10'>
                      <motion.div
                        className={`w-7 h-7 rounded-full overflow-hidden border-2 ${
                          isActive ? 'border-white' : 'border-gray-600'
                        }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        <img 
                          src={userData?.profileImage || dp} 
                          alt="Profile" 
                          className='w-full h-full object-cover'
                        />
                      </motion.div>
                    </div>
                  ) : (
                    <div className='relative z-10'>
                      <Icon 
                        size={22} 
                        className={`transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                        }`}
                      />
                    </div>
                  )}
                  
                  {/* Active indicator dot */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className='absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full'
                      />
                    )}
                  </AnimatePresence>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Nav
