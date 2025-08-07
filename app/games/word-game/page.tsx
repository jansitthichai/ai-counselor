'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface WordQuestion {
  word: string
  meaning: string
  options: string[]
  correctAnswer: string
}

const wordQuestions: WordQuestion[] = [
  {
    word: 'ความสุข',
    meaning: 'ความรู้สึกที่ดีและพึงพอใจ',
    options: ['Sadness', 'Happiness', 'Anger', 'Fear'],
    correctAnswer: 'Happiness'
  },
  {
    word: 'สันติภาพ',
    meaning: 'สภาพที่สงบสุข ไม่มีสงครามหรือความขัดแย้ง',
    options: ['War', 'Conflict', 'Peace', 'Chaos'],
    correctAnswer: 'Peace'
  },
  {
    word: 'มิตรภาพ',
    meaning: 'ความสัมพันธ์ที่ดีระหว่างเพื่อน',
    options: ['Hatred', 'Friendship', 'Jealousy', 'Misunderstanding'],
    correctAnswer: 'Friendship'
  },
  {
    word: 'ความหวัง',
    meaning: 'ความรู้สึกที่คาดหวังสิ่งที่ดีในอนาคต',
    options: ['Despair', 'Hope', 'Fear', 'Anxiety'],
    correctAnswer: 'Hope'
  },
  {
    word: 'ความรัก',
    meaning: 'ความรู้สึกที่ลึกซึ้งและอบอุ่นต่อบุคคลหรือสิ่งใดสิ่งหนึ่ง',
    options: ['Hatred', 'Love', 'Indifference', 'Fear'],
    correctAnswer: 'Love'
  },
  {
    word: 'ความเมตตา',
    meaning: 'ความรู้สึกเห็นอกเห็นใจและต้องการช่วยเหลือผู้อื่น',
    options: ['Cruelty', 'Compassion', 'Selfishness', 'Indifference'],
    correctAnswer: 'Compassion'
  },
  {
    word: 'ความอดทน',
    meaning: 'ความสามารถในการยอมรับความยากลำบากโดยไม่ยอมแพ้',
    options: ['Impatience', 'Patience', 'Laziness', 'Irresponsibility'],
    correctAnswer: 'Patience'
  },
  {
    word: 'ความขอบคุณ',
    meaning: 'ความรู้สึกที่แสดงออกเมื่อได้รับความช่วยเหลือหรือสิ่งดีๆ',
    options: ['Dissatisfaction', 'Gratitude', 'Jealousy', 'Indifference'],
    correctAnswer: 'Gratitude'
  },
  {
    word: 'ความเชื่อมั่น',
    meaning: 'ความรู้สึกมั่นใจในตนเองและความสามารถ',
    options: ['Insecurity', 'Confidence', 'Fear', 'Anxiety'],
    correctAnswer: 'Confidence'
  },
  {
    word: 'ความสำเร็จ',
    meaning: 'การบรรลุเป้าหมายหรือสิ่งที่ตั้งใจไว้',
    options: ['Failure', 'Success', 'Disappointment', 'Frustration'],
    correctAnswer: 'Success'
  }
]

export default function WordGame() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [gameComplete, setGameComplete] = useState(false)

  const currentQuestion = wordQuestions[currentQuestionIndex]

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return // Prevent multiple selections

    setSelectedAnswer(answer)
    const correct = answer === currentQuestion.correctAnswer
    setIsCorrect(correct)
    
    if (correct) {
      setScore(prev => prev + 10)
    }

    // Show result for 2 seconds then move to next question
    setTimeout(() => {
      setSelectedAnswer(null)
      setIsCorrect(null)
      
      if (currentQuestionIndex < wordQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
      } else {
        setGameComplete(true)
      }
    }, 2000)
  }

  const restartGame = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
    setIsCorrect(null)
    setGameComplete(false)
  }

  const getProgressPercentage = () => {
    return ((currentQuestionIndex + 1) / wordQuestions.length) * 100
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4 font-sarabun">เกมคำศัพท์</h1>
          <p className="text-lg text-gray-600 mb-6">เรียนรู้คำศัพท์ภาษาอังกฤษที่เกี่ยวข้องกับสุขภาพจิตและอารมณ์</p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>คำถาม {currentQuestionIndex + 1} จาก {wordQuestions.length}</span>
              <span>คะแนน: {score}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-blue-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${getProgressPercentage()}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {!gameComplete ? (
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              {/* Question */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{currentQuestion.word}</h2>
                <p className="text-lg text-gray-600">ความหมาย: {currentQuestion.meaning}</p>
              </div>

              {/* Answer Options */}
              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-4 rounded-lg text-left transition-all duration-200 ${
                      selectedAnswer === option
                        ? isCorrect
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : selectedAnswer && option === currentQuestion.correctAnswer
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    <span className="font-semibold">{String.fromCharCode(65 + index)}. </span>
                    {option}
                  </motion.button>
                ))}
              </div>

              {/* Feedback */}
              {selectedAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-4 rounded-lg text-center ${
                    isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {isCorrect ? '✅ ถูกต้อง!' : '❌ ไม่ถูกต้อง'}
                  <div className="mt-2">
                    คำตอบที่ถูกต้องคือ: <strong>{currentQuestion.correctAnswer}</strong>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">เกมจบแล้ว!</h2>
              <div className="text-6xl mb-4">
                {score >= 80 ? '🎉' : score >= 60 ? '👍' : '💪'}
              </div>
              <p className="text-xl text-gray-600 mb-4">
                คะแนนของคุณ: <span className="font-bold text-blue-600">{score}</span> / {wordQuestions.length * 10}
              </p>
              <p className="text-lg text-gray-600 mb-6">
                {score >= 80 ? 'ยอดเยี่ยม! คุณมีความรู้เกี่ยวกับคำศัพท์สุขภาพจิตดีมาก' :
                 score >= 60 ? 'ดีมาก! คุณมีความรู้เกี่ยวกับคำศัพท์สุขภาพจิตในระดับที่ดี' :
                 'ไม่เป็นไร! การเรียนรู้เป็นกระบวนการที่ต่อเนื่อง'}
              </p>
              <button
                onClick={restartGame}
                className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                เล่นอีกครั้ง
              </button>
            </motion.div>
          )}

          {/* Game Info */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">เกี่ยวกับเกม</h3>
            <p className="text-gray-600 mb-3">
              เกมนี้จะช่วยให้คุณเรียนรู้คำศัพท์ภาษาอังกฤษที่เกี่ยวข้องกับสุขภาพจิต อารมณ์ และความรู้สึกต่างๆ 
              ซึ่งจะช่วยให้คุณเข้าใจและสื่อสารเกี่ยวกับสุขภาพจิตได้ดีขึ้น รวมถึงพัฒนาทักษะภาษาอังกฤษ
            </p>
            <div className="text-sm text-gray-500">
              <p>• เลือกคำตอบภาษาอังกฤษที่ถูกต้องจากตัวเลือก 4 ข้อ</p>
              <p>• ได้ 10 คะแนนต่อคำตอบที่ถูกต้อง</p>
              <p>• มีทั้งหมด {wordQuestions.length} คำถาม</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 