import React from 'react'
import { motion } from 'framer-motion'

export const PostSkeleton = () => {
  const shimmer = {
    animate: {
      backgroundPosition: ['200% 0', '-200% 0'],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-4 mb-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          {...shimmer}
          className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-200%"
          style={{
            backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          }}
        />
        <div className="flex flex-col gap-2 flex-1">
          <motion.div
            {...shimmer}
            className="h-3 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full w-24"
          />
          <motion.div
            {...shimmer}
            className="h-2 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full w-16"
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2 mb-4">
        <motion.div
          {...shimmer}
          className="h-3 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full w-full"
        />
        <motion.div
          {...shimmer}
          className="h-3 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full w-3/4"
        />
      </div>

      {/* Image placeholder */}
      <motion.div
        {...shimmer}
        className="w-full h-64 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-2xl mb-4"
      />

      {/* Action buttons */}
      <div className="flex items-center gap-4">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            {...shimmer}
            className="w-8 h-8 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full"
          />
        ))}
      </div>
    </motion.div>
  )
}

export const StorySkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-2"
    >
      <motion.div
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 p-0.5"
      >
        <div className="w-full h-full bg-dark-900 rounded-full" />
      </motion.div>
      <motion.div
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="h-2 w-12 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full"
      />
    </motion.div>
  )
}

export const UserCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-3 p-3 glass-dark rounded-2xl"
    >
      <motion.div
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700"
      />
      <div className="flex-1 space-y-2">
        <motion.div
          animate={{
            backgroundPosition: ['200% 0', '-200% 0'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="h-3 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full w-20"
        />
        <motion.div
          animate={{
            backgroundPosition: ['200% 0', '-200% 0'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="h-2 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full w-16"
        />
      </div>
      <motion.div
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="w-16 h-6 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full"
      />
    </motion.div>
  )
}

export const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center gap-4 p-8"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`${sizes[size]} border-3 border-revoo-500/20 border-t-revoo-500 rounded-full`}
      />
      {text && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-400 text-sm"
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  )
}

export const PulseLoader = ({ count = 3 }) => {
  return (
    <div className="flex gap-2 items-center justify-center">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2
          }}
          className="w-2 h-2 bg-revoo-500 rounded-full"
        />
      ))}
    </div>
  )
}
