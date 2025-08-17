import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dp from "../assets/dp.webp"
import { FiPlusCircle } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';
function StoryDp({ProfileImage,userName,story}) {
  const navigate = useNavigate()
  const { userData } = useSelector(state => state.user)
  const { storyData, storyList } = useSelector(state => state.story)
  const [viewed, setViewed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  useEffect(() => {
    if(story?.viewers?.some((viewer) =>
      viewer?._id?.toString() === userData._id.toString() || viewer?.toString() == userData._id.toString()
    )) {
      setViewed(true)
    } else {
      setViewed(false)
    }
  }, [story, userData, storyData, storyList])
  const handleViewers = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/story/view/${story._id}`, {withCredentials: true})
    } catch (error) {
      console.log(error)
    }
  }


  const handleClick = () => {
    if (!story && userName == "Your Story") {
      navigate("/upload")
    } else if (story && userName == "Your Story") {
      handleViewers()
      navigate(`/story/${userData?.userName}`)
    } else {
      handleViewers()
      navigate(`/story/${userName}`)
    }
  }
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  }

  const ringVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    },
    static: {
      scale: 1,
      rotate: 0
    }
  }

  const getGradientClass = () => {
    if (!story) {
      return "bg-gradient-to-br from-gray-300 to-gray-400"
    }
    return !viewed 
      ? "bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500" 
      : "bg-gradient-to-br from-gray-400 to-gray-500"
  }

  return (
    <motion.div 
      className='flex flex-col items-center min-w-[80px] max-w-[80px]'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Story Ring */}
      <motion.div 
        className={`w-20 h-20 ${getGradientClass()} rounded-full flex items-center justify-center p-0.5 cursor-pointer relative shadow-lg`}
        onClick={handleClick}
        variants={ringVariants}
        animate={story && !viewed ? "pulse" : "static"}
      >
        {/* Profile Image Container */}
        <motion.div 
          className='w-full h-full bg-white rounded-full flex items-center justify-center p-0.5 relative overflow-hidden'
          whileHover={{ scale: 1.05 }}
        >
          <motion.img 
            src={ProfileImage || dp} 
            alt="" 
            className='w-full h-full object-cover rounded-full'
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Add Story Plus Icon */}
          <AnimatePresence>
            {!story && userName === "Your Story" && (
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                whileHover={{ scale: 1.2, rotate: 90 }}
                className='absolute bottom-1 right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white'
              >
                <FiPlusCircle className='text-white w-4 h-4' />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Story Available Indicator */}
          <AnimatePresence>
            {story && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className='absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm'
              />
            )}
          </AnimatePresence>
          
          {/* Hover Effects */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full flex items-center justify-center'
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <HiSparkles className='text-white w-6 h-6' />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Pulsing Ring Effect for New Stories */}
        <AnimatePresence>
          {story && !viewed && (
            <motion.div
              className='absolute inset-0 rounded-full border-2 border-white/30'
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ 
                scale: [1, 1.2, 1], 
                opacity: [0.8, 0.3, 0.8] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Username */}
      <motion.div 
        className='text-xs text-center truncate w-full text-white mt-2 font-medium drop-shadow-lg'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ 
          scale: 1.05,
          textShadow: "0px 0px 8px rgba(255,255,255,0.8)"
        }}
      >
        {userName === "Your Story" ? "Your Story" : userName}
      </motion.div>
    </motion.div>
  )
}

export default StoryDp