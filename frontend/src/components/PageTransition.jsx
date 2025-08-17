import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

export default function PageTransition({ children, className = "" }) {
  const location = useLocation()

  return (
    <motion.div
      key={location.pathname}
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className={`w-full min-h-screen ${className}`}
    >
      {children}
    </motion.div>
  )
}
