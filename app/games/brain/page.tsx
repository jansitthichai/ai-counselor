'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Problem {
  question: string
  answer: number
  options: number[]
}

export default function BrainGame() {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null)
  const [gameOver, setGameOver] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const generateProblem = (): Problem => {
    const operations = ['+', '-', '×']
    const operation = operations[Math.floor(Math.random() * operations.length)]
    let num1 = Math.floor(Math.random() * 20) + 1
    let num2 = Math.floor(Math.random() * 20) + 1

    // Ensure positive result for subtraction
    if (operation === '-' && num2 > num1) {
      [num1, num2] = [num2, num1]
    }

    let answer: number
    switch (operation) {
      case '+':
        answer = num1 + num2
        break
      case '-':
        answer = num1 - num2
        break
      case '×':
        answer = num1 * num2
        break
      default:
        answer = 0
    }

    // Generate wrong options
    const options = [answer]
    while (options.length < 4) {
      const wrongAnswer = answer + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 5) + 1)
      if (!options.includes(wrongAnswer)) {
        options.push(wrongAnswer)
      }
    }

    return {
      question: `${num1} ${operation} ${num2} = ?`,
      answer,
      options: options.sort(() => Math.random() - 0.5)
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setGameOver(true)
      setIsPlaying(false)
    }
    return () => clearInterval(timer)
  }, [isPlaying, timeLeft])

  const startGame = () => {
    setScore(0)
    setTimeLeft(60)
    setGameOver(false)
    setIsPlaying(true)
    setCurrentProblem(generateProblem())
  }

  const handleAnswer = (selectedAnswer: number) => {
    if (currentProblem && selectedAnswer === currentProblem.answer) {
      setScore(prev => prev + 1)
    }
    setCurrentProblem(generateProblem())
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">เกมฝึกสมอง</h1>
          <p className="text-lg text-gray-600">ฝึกสมองด้วยการแก้โจทย์คณิตศาสตร์</p>
        </motion.div>

        {!isPlaying && !gameOver && (
          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              เริ่มเกม
            </button>
          </div>
        )}

        {isPlaying && currentProblem && (
          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div className="text-xl font-semibold text-gray-700">
                คะแนน: {score}
              </div>
              <div className="text-xl font-semibold text-gray-700">
                เวลา: {timeLeft} วินาที
              </div>
            </div>

            <motion.div
              key={currentProblem.question}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-8"
            >
              <h2 className="text-3xl font-bold text-center mb-8">
                {currentProblem.question}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {currentProblem.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-xl font-semibold py-4 px-6 rounded-lg transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <div className="bg-white p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">จบเกม!</h2>
              <p className="text-lg text-gray-600 mb-4">
                คะแนนของคุณ: {score}
              </p>
              <button
                onClick={startGame}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                เล่นอีกครั้ง
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 