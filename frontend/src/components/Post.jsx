import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dp from "../assets/dp.webp"
import VideoPlayer from './VideoPlayer'
import { GoHeart } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { GoHeartFill } from "react-icons/go";
import { MdOutlineComment } from "react-icons/md";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { GoBookmarkFill } from "react-icons/go";
import { IoSendSharp } from "react-icons/io5";
import { HiSparkles } from "react-icons/hi";
import axios from 'axios';
import { serverUrl } from '../App';
import { setPostData } from '../redux/postSlice';
import { setUserData } from '../redux/userSlice';
import FollowButton from './FollowButton';
import { useNavigate } from 'react-router-dom';
function Post({ post }) {
  const { userData } = useSelector(state => state.user)
  const { postData } = useSelector(state => state.post)
  const { socket } = useSelector(state => state.socket)
  const [showComment, setShowComment] = useState(false)
  const [message, setMessage] = useState("")
  const [isLiked, setIsLiked] = useState(post.likes.includes(userData._id))
  const [isSaved, setIsSaved] = useState(userData.saved.includes(post?._id))
  const [isLiking, setIsLiking] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLike = async () => {
    if (isLiking) return
    
    setIsLiking(true)
    setIsLiked(!isLiked)
    
    try {
      const result = await axios.get(`${serverUrl}/api/post/like/${post._id}`, {withCredentials: true})
      const updatedPost = result.data
      
      const updatedPosts = postData.map(p => p._id == post._id ? updatedPost : p)
      dispatch(setPostData(updatedPosts))
    } catch (error) {
      console.log(error)
      setIsLiked(!isLiked) // Revert on error
    } finally {
      setIsLiking(false)
    }
  }

  const handleComment = async () => {
    if (!message.trim()) return
    
    try {
      const result = await axios.post(`${serverUrl}/api/post/comment/${post._id}`, {message}, {withCredentials: true})
      const updatedPost = result.data
      
      const updatedPosts = postData.map(p => p._id == post._id ? updatedPost : p)
      dispatch(setPostData(updatedPosts))
      setMessage("")
    } catch (error) {
      console.log(error.response)
    }
  }

  const handleSaved = async () => {
    setIsSaved(!isSaved)
    
    try {
      const result = await axios.get(`${serverUrl}/api/post/saved/${post._id}`, {withCredentials: true})
      dispatch(setUserData(result.data))
    } catch (error) {
      console.log(error.response)
      setIsSaved(!isSaved) // Revert on error
    }
  }
  
  useEffect(()=>{
    socket?.on("likedPost",(updatedData)=>{
     const updatedPosts=postData.map(p=>p._id==updatedData.postId?{...p,likes:updatedData.likes}:p)
     dispatch(setPostData(updatedPosts))
    })
socket?.on("commentedPost",(updatedData)=>{
     const updatedPosts=postData.map(p=>p._id==updatedData.postId?{...p,comments:updatedData.comments}:p)
     dispatch(setPostData(updatedPosts))
    })

    return ()=>{socket?.off("likedPost")
               socket?.off("CommentedPost")}
  },[socket,postData,dispatch])
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const likeVariants = {
    liked: {
      scale: [1, 1.3, 1],
      rotate: [0, -10, 10, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    },
    unliked: {
      scale: [1, 0.8, 1],
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <div className='w-[90%] flex flex-col gap-[10px] bg-white items-center shadow-2xl shadow-[#00000058] rounded-2xl pb-[20px]'>
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='w-full flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50'
      >
        <motion.div 
          className='flex items-center gap-3 cursor-pointer'
          onClick={() => navigate(`/profile/${post.author?.userName}`)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className='relative'
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <div className='w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-pink-500 p-0.5'>
              <div className='w-full h-full rounded-full overflow-hidden bg-white'>
                <img src={post.author?.profileImage || dp} alt="" className='w-full h-full object-cover' />
              </div>
            </div>
            <motion.div
              className='absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full border-2 border-white'
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <div className='flex flex-col'>
            <span className='font-semibold text-gray-800 text-sm md:text-base'>{post.author.userName}</span>
            <span className='text-xs text-gray-500'>2 hours ago</span>
          </div>
        </motion.div>
        
        {userData._id !== post.author._id && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FollowButton 
              tailwind={'px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300'} 
              targetUserId={post.author._id}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Media Section */}
      <motion.div 
        className='relative overflow-hidden'
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        {post.mediaType === "image" && (
          <motion.div 
            className='relative group'
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <img 
              src={post.media} 
              alt="" 
              className='w-full aspect-square object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          </motion.div>
        )}
        
        {post.mediaType === "video" && (
          <motion.div 
            className='relative'
            whileHover={{ scale: 1.01 }}
          >
            <VideoPlayer media={post.media} />
          </motion.div>
        )}
      </motion.div>

      {/* Actions */}
      <motion.div 
        className='flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-purple-50'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className='flex items-center gap-6'>
          {/* Like Button */}
          <motion.div 
            className='flex items-center gap-2 cursor-pointer'
            onClick={handleLike}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              variants={likeVariants}
              animate={isLiked ? "liked" : "unliked"}
              className='relative'
            >
              {!isLiked ? (
                <GoHeart className='w-7 h-7 text-gray-700 hover:text-red-500 transition-colors' />
              ) : (
                <>
                  <GoHeartFill className='w-7 h-7 text-red-500' />
                  <motion.div
                    className='absolute inset-0 w-7 h-7'
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: [0, 1.5, 0], opacity: [1, 0.5, 0] }}
                    transition={{ duration: 0.6 }}
                    key={`heart-${post._id}-${Date.now()}`}
                  >
                    <div className='w-full h-full rounded-full bg-red-500/30' />
                  </motion.div>
                </>
              )}
            </motion.div>
            <motion.span 
              className='text-sm font-medium text-gray-700'
              animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
            >
              {post.likes.length}
            </motion.span>
          </motion.div>

          {/* Comment Button */}
          <motion.div 
            className='flex items-center gap-2 cursor-pointer'
            onClick={() => setShowComment(!showComment)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MdOutlineComment className='w-7 h-7 text-gray-700 hover:text-blue-500 transition-colors' />
            <span className='text-sm font-medium text-gray-700'>{post.comments.length}</span>
          </motion.div>
        </div>

        {/* Save Button */}
        <motion.div 
          onClick={handleSaved}
          className='cursor-pointer'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {!isSaved ? (
            <MdOutlineBookmarkBorder className='w-7 h-7 text-gray-700 hover:text-yellow-500 transition-colors' />
          ) : (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <GoBookmarkFill className='w-7 h-7 text-yellow-500' />
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Caption */}
      {post.caption && (
        <motion.div 
          className='px-4 pb-3'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className='text-sm text-gray-800'>
            <span className='font-semibold mr-2'>{post.author.userName}</span>
            {post.caption}
          </p>
        </motion.div>
      )}

      {/* Comments Section */}
      <AnimatePresence>
        {showComment && (
          <motion.div 
            className='border-t border-gray-200 bg-gradient-to-b from-white to-gray-50'
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Comment Input */}
            <motion.div 
              className='flex items-center gap-3 p-4 border-b border-gray-200'
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className='w-8 h-8 rounded-full overflow-hidden border border-gray-300'>
                <img src={userData?.profileImage || dp} alt="" className='w-full h-full object-cover' />
              </div>
              <motion.input 
                type="text" 
                className='flex-1 px-3 py-2 bg-gray-100 rounded-full outline-none focus:bg-white focus:ring-2 focus:ring-purple-300 transition-all duration-300'
                placeholder='Write a comment...' 
                onChange={(e) => setMessage(e.target.value)} 
                value={message}
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button 
                className='p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white disabled:opacity-50'
                onClick={handleComment}
                disabled={!message.trim()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoSendSharp className='w-4 h-4' />
              </motion.button>
            </motion.div>

            {/* Comments List */}
            <motion.div className='max-h-64 overflow-y-auto'>
              <AnimatePresence>
                {post.comments?.map((com, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className='flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors'
                  >
                    <motion.div 
                      className='w-8 h-8 rounded-full overflow-hidden border border-gray-300'
                      whileHover={{ scale: 1.1 }}
                    >
                      <img src={com.author.profileImage || dp} alt="" className='w-full h-full object-cover' />
                    </motion.div>
                    <div className='flex-1'>
                      <div className='bg-gray-100 rounded-2xl px-3 py-2'>
                        <p className='text-sm font-medium text-gray-800'>{com.author.userName}</p>
                        <p className='text-sm text-gray-700 mt-1'>{com.message}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Post
