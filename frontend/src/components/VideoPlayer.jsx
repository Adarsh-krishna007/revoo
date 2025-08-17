import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiVolume2, FiVolumeX, FiPlay, FiPause } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

function VideoPlayer({media}) {
    const videoTag = useRef()
    const [mute, setMute] = useState(false)
    const [isPlaying, setIsPlaying] = useState(true)
    const [showControls, setShowControls] = useState(false)
    const [progress, setProgress] = useState(0)
    const handleClick = () => {
        if(isPlaying) {
            videoTag.current.pause()
            setIsPlaying(false)
        } else {
            videoTag.current.play()
            setIsPlaying(true)
        }
    }

    const handleTimeUpdate = () => {
        if (videoTag.current) {
            const currentProgress = (videoTag.current.currentTime / videoTag.current.duration) * 100
            setProgress(currentProgress)
        }
    }
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            const video = videoTag.current
            if (entry.isIntersecting) {
                video.play()
                setIsPlaying(true)
            } else {
                video.pause()
                setIsPlaying(false)
            }
        }, { threshold: 0.6 })
        
        if (videoTag.current) {
            observer.observe(videoTag.current)
            videoTag.current.addEventListener('timeupdate', handleTimeUpdate)
        }

        return () => {
            if (videoTag.current) {
                observer.unobserve(videoTag.current)
                videoTag.current.removeEventListener('timeupdate', handleTimeUpdate)
            }
        }
    }, [])
    return (
        <motion.div 
            className='h-full relative cursor-pointer max-w-full rounded-2xl overflow-hidden bg-black group'
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onHoverStart={() => setShowControls(true)}
            onHoverEnd={() => setShowControls(false)}
        >
            <video 
                ref={videoTag} 
                src={media} 
                autoPlay 
                loop 
                muted={mute} 
                className='h-full cursor-pointer w-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105' 
                onClick={handleClick}
            />
            
            {/* Play/Pause Overlay */}
            <AnimatePresence>
                {!isPlaying && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className='absolute inset-0 flex items-center justify-center bg-black/30'
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className='w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg'
                        >
                            <FiPlay className='w-8 h-8 text-black ml-1' />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Progress Bar */}
            <motion.div 
                className='absolute bottom-0 left-0 w-full h-1 bg-white/20'
                initial={{ opacity: 0 }}
                animate={{ opacity: showControls ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div 
                    className='h-full bg-gradient-to-r from-pink-500 to-purple-500'
                    style={{ width: `${progress}%` }}
                    animate={{ width: `${progress}%` }}
                />
            </motion.div>
            
            {/* Controls */}
            <AnimatePresence>
                {(showControls || !isPlaying) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className='absolute bottom-4 right-4 flex items-center gap-3'
                    >
                        {/* Mute/Unmute Button */}
                        <motion.button
                            onClick={(e) => {
                                e.stopPropagation()
                                setMute(prev => !prev)
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className='w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-black/70 transition-colors'
                        >
                            <AnimatePresence mode="wait">
                                {!mute ? (
                                    <motion.div
                                        key="volume"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <FiVolume2 className='w-5 h-5 text-white' />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="mute"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <FiVolumeX className='w-5 h-5 text-white' />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                        
                        {/* Play/Pause Button */}
                        <motion.button
                            onClick={(e) => {
                                e.stopPropagation()
                                handleClick()
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className='w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-black/70 transition-colors'
                        >
                            <AnimatePresence mode="wait">
                                {isPlaying ? (
                                    <motion.div
                                        key="pause"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <FiPause className='w-5 h-5 text-white' />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="play"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <FiPlay className='w-5 h-5 text-white ml-0.5' />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Sparkle effects on corners */}
            <div className='absolute top-2 right-2'>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className='opacity-30'
                >
                    <HiSparkles className='w-4 h-4 text-white' />
                </motion.div>
            </div>
        </motion.div>
    )
}

export default VideoPlayer 
