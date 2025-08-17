import React from 'react'
import { motion } from 'framer-motion'

// Shimmer animation for skeleton loaders
const shimmerVariants = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear'
    }
  }
}

// Post Skeleton Loader
export const PostSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='w-full max-w-md bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20 rounded-3xl overflow-hidden p-4'
    >
      {/* Header Skeleton */}
      <div className='flex items-center gap-3 mb-4'>
        <motion.div
          className='w-12 h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full'
          variants={shimmerVariants}
          animate="animate"
          style={{
            backgroundSize: '200% 100%'
          }}
        />
        <div className='flex-1'>
          <motion.div
            className='h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2'
            variants={shimmerVariants}
            animate="animate"
            style={{
              backgroundSize: '200% 100%',
              width: '60%'
            }}
          />
          <motion.div
            className='h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded'
            variants={shimmerVariants}
            animate="animate"
            style={{
              backgroundSize: '200% 100%',
              width: '40%'
            }}
          />
        </div>
      </div>

      {/* Image Skeleton */}
      <motion.div
        className='w-full aspect-square bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-2xl mb-4'
        variants={shimmerVariants}
        animate="animate"
        style={{
          backgroundSize: '200% 100%'
        }}
      />

      {/* Actions Skeleton */}
      <div className='flex items-center gap-4 mb-3'>
        <motion.div
          className='w-8 h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded'
          variants={shimmerVariants}
          animate="animate"
          style={{
            backgroundSize: '200% 100%'
          }}
        />
        <motion.div
          className='w-8 h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded'
          variants={shimmerVariants}
          animate="animate"
          style={{
            backgroundSize: '200% 100%'
          }}
        />
      </div>

      {/* Caption Skeleton */}
      <motion.div
        className='h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2'
        variants={shimmerVariants}
        animate="animate"
        style={{
          backgroundSize: '200% 100%',
          width: '80%'
        }}
      />
      <motion.div
        className='h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded'
        variants={shimmerVariants}
        animate="animate"
        style={{
          backgroundSize: '200% 100%',
          width: '60%'
        }}
      />
    </motion.div>
  )
}

// Story Skeleton Loader
export const StorySkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className='flex flex-col items-center min-w-[80px]'
    >
      <motion.div
        className='w-20 h-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full mb-2'
        variants={shimmerVariants}
        animate="animate"
        style={{
          backgroundSize: '200% 100%'
        }}
      />
      <motion.div
        className='h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded'
        variants={shimmerVariants}
        animate="animate"
        style={{
          backgroundSize: '200% 100%',
          width: '60px'
        }}
      />
    </motion.div>
  )
}

// Feed Header Skeleton
export const FeedHeaderSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className='w-full h-[100px] flex items-center justify-between p-6 backdrop-blur-md bg-white/10 border-b border-white/20'
    >
      <div className='flex items-center gap-2'>
        <motion.div
          className='w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl'
          variants={shimmerVariants}
          animate="animate"
          style={{
            backgroundSize: '200% 100%'
          }}
        />
        <motion.div
          className='h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded'
          variants={shimmerVariants}
          animate="animate"
          style={{
            backgroundSize: '200% 100%',
            width: '100px'
          }}
        />
      </div>
      
      <div className='flex items-center gap-4'>
        <motion.div
          className='w-6 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded'
          variants={shimmerVariants}
          animate="animate"
          style={{
            backgroundSize: '200% 100%'
          }}
        />
        <motion.div
          className='w-6 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded'
          variants={shimmerVariants}
          animate="animate"
          style={{
            backgroundSize: '200% 100%'
          }}
        />
      </div>
    </motion.div>
  )
}

// Profile Page Skeleton
export const ProfileSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='w-full max-w-4xl mx-auto p-6'
    >
      {/* Profile Header */}
      <div className='flex items-center gap-6 mb-8'>
        <motion.div
          className='w-32 h-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full'
          variants={shimmerVariants}
          animate="animate"
          style={{
            backgroundSize: '200% 100%'
          }}
        />
        <div className='flex-1'>
          <motion.div
            className='h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-3'
            variants={shimmerVariants}
            animate="animate"
            style={{
              backgroundSize: '200% 100%',
              width: '200px'
            }}
          />
          <motion.div
            className='h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2'
            variants={shimmerVariants}
            animate="animate"
            style={{
              backgroundSize: '200% 100%',
              width: '300px'
            }}
          />
          <motion.div
            className='h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded'
            variants={shimmerVariants}
            animate="animate"
            style={{
              backgroundSize: '200% 100%',
              width: '150px'
            }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className='flex gap-8 mb-8'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='text-center'>
            <motion.div
              className='h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-1'
              variants={shimmerVariants}
              animate="animate"
              style={{
                backgroundSize: '200% 100%',
                width: '50px'
              }}
            />
            <motion.div
              className='h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded'
              variants={shimmerVariants}
              animate="animate"
              style={{
                backgroundSize: '200% 100%',
                width: '60px'
              }}
            />
          </div>
        ))}
      </div>

      {/* Post Grid */}
      <div className='grid grid-cols-3 gap-4'>
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className='aspect-square bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg'
            variants={shimmerVariants}
            animate="animate"
            style={{
              backgroundSize: '200% 100%'
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

// Loading Spinner Component
export const LoadingSpinner = ({ size = 'md', color = 'purple' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const colorClasses = {
    purple: 'border-purple-500',
    pink: 'border-pink-500',
    blue: 'border-blue-500',
    green: 'border-green-500'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='flex items-center justify-center'
    >
      <motion.div
        className={`${sizeClasses[size]} ${colorClasses[color]} border-2 border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  )
}

// Page Loading Overlay
export const PageLoader = ({ message = 'Loading...' }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 flex items-center justify-center z-50'
    >
      <div className='text-center'>
        <motion.div
          className='w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4'
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='text-white text-lg font-medium'
        >
          {message}
        </motion.p>
        <motion.div
          className='flex justify-center mt-4 gap-1'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className='w-2 h-2 bg-white rounded-full'
              animate={{ scale: [1, 1.5, 1] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

// Pulse Loading Animation
export const PulseLoader = ({ className = '' }) => {
  return (
    <motion.div
      className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 ${className}`}
      variants={shimmerVariants}
      animate="animate"
      style={{
        backgroundSize: '200% 100%'
      }}
    />
  )
}
