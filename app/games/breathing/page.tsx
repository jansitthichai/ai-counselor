'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function BreathingGame() {
  const [isBreathing, setIsBreathing] = useState(false)
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale')
  const [breathCount, setBreathCount] = useState(0)
  const [sessionTime, setSessionTime] = useState(0)
  const [isSessionActive, setIsSessionActive] = useState(false)

  const breathCycle = {
    inhale: 4,
    hold: 4,
    exhale: 6,
    rest: 2
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    let breathTimer: NodeJS.Timeout

    if (isSessionActive) {
      // Session timer
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1)
      }, 1000)

      // Breathing cycle
      const startBreathingCycle = () => {
        setBreathPhase('inhale')
        setIsBreathing(true)

        breathTimer = setTimeout(() => {
          setBreathPhase('hold')
          breathTimer = setTimeout(() => {
            setBreathPhase('exhale')
            breathTimer = setTimeout(() => {
              setBreathPhase('rest')
              breathTimer = setTimeout(() => {
                setBreathCount(prev => prev + 1)
                if (isSessionActive) {
                  startBreathingCycle()
                }
              }, breathCycle.rest * 1000)
            }, breathCycle.exhale * 1000)
          }, breathCycle.hold * 1000)
        }, breathCycle.inhale * 1000)
      }

      startBreathingCycle()
    }

    return () => {
      clearInterval(interval)
      clearTimeout(breathTimer)
    }
  }, [isSessionActive])

  const startSession = () => {
    setIsSessionActive(true)
    setBreathCount(0)
    setSessionTime(0)
  }

  const stopSession = () => {
    setIsSessionActive(false)
    setIsBreathing(false)
    setBreathPhase('inhale')
  }

  const getBreathingText = () => {
    switch (breathPhase) {
      case 'inhale':
        return 'หายใจเข้า'
      case 'hold':
        return 'กลั้นหายใจ'
      case 'exhale':
        return 'หายใจออก'
      case 'rest':
        return 'พัก'
      default:
        return 'เริ่มต้น'
    }
  }

  const getBreathingColor = () => {
    switch (breathPhase) {
      case 'inhale':
        return 'bg-blue-500'
      case 'hold':
        return 'bg-purple-500'
      case 'exhale':
        return 'bg-green-500'
      case 'rest':
        return 'bg-gray-500'
      default:
        return 'bg-gray-300'
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4 font-sarabun">เกมลมหายใจ</h1>
          <p className="text-lg text-gray-600 mb-6">ฝึกการหายใจอย่างถูกต้องเพื่อลดความเครียด</p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Breathing Circle */}
          <div className="flex justify-center mb-8">
            <motion.div
              animate={{
                scale: isBreathing ? [1, 1.5, 1.5, 1] : 1,
                opacity: isBreathing ? [0.7, 1, 1, 0.7] : 0.7
              }}
              transition={{
                duration: breathCycle[breathPhase],
                ease: "easeInOut"
              }}
              className={`w-64 h-64 rounded-full ${getBreathingColor()} flex items-center justify-center shadow-2xl`}
            >
              <div className="text-white text-center">
                <div className="text-3xl font-bold mb-2">{getBreathingText()}</div>
                <div className="text-lg">
                  {breathPhase === 'inhale' && 'หายใจเข้าช้าๆ'}
                  {breathPhase === 'hold' && 'กลั้นหายใจ'}
                  {breathPhase === 'exhale' && 'หายใจออกช้าๆ'}
                  {breathPhase === 'rest' && 'พักสักครู่'}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Controls */}
          <div className="text-center mb-8">
            {!isSessionActive ? (
              <button
                onClick={startSession}
                className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors"
              >
                เริ่มฝึกหายใจ
              </button>
            ) : (
              <button
                onClick={stopSession}
                className="bg-red-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-600 transition-colors"
              >
                หยุด
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-blue-600">{breathCount}</div>
              <div className="text-sm text-gray-600">รอบการหายใจ</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-green-600">{formatTime(sessionTime)}</div>
              <div className="text-sm text-gray-600">เวลาฝึก</div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">วิธีการฝึกหายใจ 4-4-6-2</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                <span>หายใจเข้า 4 วินาที</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                <span>กลั้นหายใจ 4 วินาที</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                <span>หายใจออก 6 วินาที</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</div>
                <span>พัก 2 วินาที</span>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">ประโยชน์ของการฝึกหายใจ</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• ลดความเครียดและความวิตกกังวล</li>
              <li>• ช่วยให้จิตใจสงบและมีสมาธิ</li>
              <li>• ปรับปรุงคุณภาพการนอน</li>
              <li>• เพิ่มระดับพลังงานในร่างกาย</li>
              <li>• ช่วยควบคุมอารมณ์ได้ดีขึ้น</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 