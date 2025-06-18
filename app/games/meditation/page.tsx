'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function MeditationGame() {
  const [isBreathing, setIsBreathing] = useState(false)
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [breathCount, setBreathCount] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isBreathing) {
      switch (breathPhase) {
        case 'inhale':
          timer = setTimeout(() => setBreathPhase('hold'), 4000)
          break
        case 'hold':
          timer = setTimeout(() => setBreathPhase('exhale'), 4000)
          break
        case 'exhale':
          timer = setTimeout(() => {
            setBreathPhase('inhale')
            setBreathCount(prev => prev + 1)
          }, 4000)
          break
      }
    }

    return () => clearTimeout(timer)
  }, [isBreathing, breathPhase])

  const getInstructions = () => {
    switch (breathPhase) {
      case 'inhale':
        return 'หายใจเข้า...'
      case 'hold':
        return 'กลั้นหายใจ...'
      case 'exhale':
        return 'หายใจออก...'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">เกมฝึกสมาธิ</h1>
          <p className="text-lg text-gray-600">ฝึกสมาธิผ่านการหายใจ ช่วยให้จิตใจสงบและมีสติ</p>
        </motion.div>

        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <motion.div
            animate={{
              scale: isBreathing ? (breathPhase === 'inhale' || breathPhase === 'hold' ? 1.5 : 1) : 1,
            }}
            transition={{ duration: 4, ease: 'easeInOut' }}
            className="w-48 h-48 bg-blue-100 rounded-full flex items-center justify-center mb-8"
          >
            <span className="text-2xl font-medium text-blue-600">
              {getInstructions()}
            </span>
          </motion.div>

          <div className="text-center space-y-4">
            <p className="text-xl text-gray-700">
              จำนวนรอบที่หายใจ: {breathCount}
            </p>
            <button
              onClick={() => {
                setIsBreathing(!isBreathing)
                if (!isBreathing) {
                  setBreathPhase('inhale')
                  setBreathCount(0)
                }
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {isBreathing ? 'หยุด' : 'เริ่ม'} การฝึก
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg p-6 mt-8 shadow-lg"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            วิธีการฝึก
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>นั่งในท่าที่สบาย</li>
            <li>หลับตาถ้าคุณรู้สึกสบาย</li>
            <li>หายใจตามวงกลม - หายใจเข้าเมื่อวงขยาย, กลั้นหายใจ, แล้วหายใจออกเมื่อวงหด</li>
            <li>พยายามทำ 5-10 รอบ</li>
            <li>จดจ่ออยู่กับการหายใจของคุณ</li>
          </ol>
        </motion.div>
      </div>
    </div>
  )
} 