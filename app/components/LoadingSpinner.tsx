'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function LoadingSpinner({ message = 'กำลังโหลด...', size = 'md' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-lavender-50 to-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className={`${sizeClasses[size]} border-4 border-lavender-200 border-t-lavender-600 rounded-full mx-auto mb-4`}
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 font-medium"
        >
          {message}
        </motion.p>
      </motion.div>
    </div>
  )
} 