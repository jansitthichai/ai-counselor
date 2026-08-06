'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Bubble {
  id: number
  x: number
  y: number
  size: number
  color: string
}

const colors = [
  'bg-blue-200',
  'bg-blue-300',
  'bg-blue-400',
  'bg-blue-500',
  'bg-blue-600'
]

export default function RelaxGame() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const startGame = () => {
    setIsPlaying(true)
    setTimer(0)
    generateBubbles()
  }

  const generateBubbles = () => {
    const newBubbles: Bubble[] = []
    for (let i = 0; i < 20; i++) {
      newBubbles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 50 + 20,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }
    setBubbles(newBubbles)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">เกมผ่อนคลาย</h1>
          <p className="text-lg text-gray-600">ผ่อนคลายด้วยการดูฟองสบู่ลอยขึ้น</p>
        </motion.div>

        {!isPlaying ? (
          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              เริ่มผ่อนคลาย
            </button>
          </div>
        ) : (
          <div className="relative h-[600px] bg-blue-50 rounded-xl overflow-hidden">
            <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg">
              <p className="text-lg font-semibold text-gray-700">
                เวลา: {formatTime(timer)}
              </p>
            </div>
            {bubbles.map((bubble) => (
              <motion.div
                key={bubble.id}
                initial={{ y: '100%', opacity: 0 }}
                animate={{
                  y: '-100%',
                  opacity: [0, 1, 1, 0],
                  x: bubble.x + '%'
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className={`absolute ${bubble.color} rounded-full`}
                style={{
                  width: bubble.size,
                  height: bubble.size,
                  left: bubble.x + '%',
                  bottom: 0
                }}
              />
            ))}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <button
                onClick={() => setIsPlaying(false)}
                className="bg-white text-blue-600 px-6 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
              >
                หยุด
              </button>
            </div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg p-6 mt-8 shadow-lg"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            วิธีการผ่อนคลาย
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>นั่งในท่าที่สบาย</li>
            <li>หายใจเข้าออกช้าๆ</li>
            <li>จดจ่ออยู่กับฟองสบู่ที่ลอยขึ้น</li>
            <li>ปล่อยความคิดให้ลอยไปกับฟองสบู่</li>
            <li>ทำแบบนี้อย่างน้อย 5 นาที</li>
          </ol>
        </motion.div>
      </div>
    </div>
  )
} 