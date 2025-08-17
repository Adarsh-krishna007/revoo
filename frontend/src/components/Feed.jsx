import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRegHeart } from "react-icons/fa6";
import { BiMessageAltDetail } from "react-icons/bi";
import { HiSparkles } from "react-icons/hi";
import StoryDp from './StoryDp';
import Nav from './Nav';
import Post from './Post';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Feed() {
  const { postData } = useSelector(state => state.post)
  const { userData, notificationData } = useSelector(state => state.user)
  const { storyList, currentUserStory } = useSelector(state => state.story)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [hasNotification, setHasNotification] = useState(false)

  useEffect(() => {
    if (notificationData?.length > 0 && notificationData.some(noti => !noti.isRead)) {
      setHasNotification(true)
    } else {
      setHasNotification(false)
    }
  }, [notificationData])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const storyVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const feedVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className='lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto'>
      {/* Mobile Header */}
      <div className='w-full h-[60px] flex items-center justify-between px-4 lg:hidden bg-black/20 backdrop-blur-md'>
        <div className='flex items-center gap-2'>
          <HiSparkles className='w-5 h-5 text-white' />
          <h1 className='text-xl font-bold text-white'>Revoo</h1>
        </div>
        <div className='flex items-center gap-3'>
          <FaRegHeart 
            className='text-white w-5 h-5 cursor-pointer' 
            onClick={() => navigate("/notifications")}
          />
          <BiMessageAltDetail 
            className='text-white w-5 h-5 cursor-pointer' 
            onClick={() => navigate("/messages")}
          />
        </div>
      </div>

      {/* Animated Stories Section */}
      <motion.div 
        variants={storyVariants}
        className='flex w-full justify-start overflow-x-auto gap-4 items-center p-6 scrollbar-hide'
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': { display: 'none' }
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <StoryDp userName={"Your Story"} ProfileImage={userData?.profileImage} story={currentUserStory} />
        </motion.div>
        
        {storyList?.map((story, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.8, opacity: 0, x: 50 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <StoryDp 
              userName={story.author?.userName} 
              ProfileImage={story.author?.profileImage} 
              story={story} 
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Main Feed Area */}
      <div className='w-full min-h-[100vh] flex flex-col items-center gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[60px] relative pb-[120px]'>
        <Nav />
        
        {/* Posts with Stagger Animation */}
        <AnimatePresence>
          {postData && postData.length > 0 ? (
            postData.map((post, index) => (
              <motion.div
                key={post._id || index}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.95 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6 }
                }}
                viewport={{ once: true, margin: "-50px" }}
                className='w-full max-w-md'
              >
                <Post post={post} />
              </motion.div>
            ))
          ) : (
            // Empty state with animated message
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className='flex flex-col items-center gap-4 py-12 text-gray-500'
            >
              <div className='w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center'>
                <HiSparkles className='w-8 h-8 text-white' />
              </div>
              <p className='text-lg font-medium'>No posts yet!</p>
              <p className='text-sm text-center'>Be the first to share something amazing</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading More Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className='flex items-center gap-2 text-gray-500 py-4'
          >
            <div className='animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full' />
            <span>Loading more posts...</span>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Feed
