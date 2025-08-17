import { ReactLenis } from 'lenis/react'
import { motion } from 'framer-motion'

export default function SmoothScrolling({ children }) {
  return (
    <ReactLenis 
      root 
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothTouch: true,
        smooth: true,
        direction: 'vertical',
        gestureDirection: 'vertical',
        syncTouch: false,
        touchInertiaMultiplier: 35,
        wheelMultiplier: 1,
        infinite: false,
        autoResize: true,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </ReactLenis>
  )
}
