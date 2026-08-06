'use client'

import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaClipboardList, FaChartBar, FaInfoCircle } from 'react-icons/fa'

interface Question {
  id: number
  text: string
  options: { value: number; label: string }[]
}

const questions: Question[] = [
  {
    id: 1,
    text: "เบื่อทำอะไรๆ ก็ไม่เพลิดเพลิน",
    options: [
      { value: 0, label: "ไม่มีเลย" },
      { value: 1, label: "มีบางวัน" },
      { value: 2, label: "มีมากกว่า 7 วัน" },
      { value: 3, label: "มีเกือบทุกวัน" }
    ]
  },
  {
    id: 2,
    text: "ไม่สบายใจ ซึมเศร้า หรือสิ้นหวัง",
    options: [
      { value: 0, label: "ไม่มีเลย" },
      { value: 1, label: "มีบางวัน" },
      { value: 2, label: "มีมากกว่า 7 วัน" },
      { value: 3, label: "มีเกือบทุกวัน" }
    ]
  },
  {
    id: 3,
    text: "นอนไม่หลับ หรือหลับๆ ตื่นๆ หรือหลับมากไป",
    options: [
      { value: 0, label: "ไม่มีเลย" },
      { value: 1, label: "มีบางวัน" },
      { value: 2, label: "มีมากกว่า 7 วัน" },
      { value: 3, label: "มีเกือบทุกวัน" }
    ]
  },
  {
    id: 4,
    text: "เหนื่อยง่าย หรือไม่ค่อยมีแรง",
    options: [
      { value: 0, label: "ไม่มีเลย" },
      { value: 1, label: "มีบางวัน" },
      { value: 2, label: "มีมากกว่า 7 วัน" },
      { value: 3, label: "มีเกือบทุกวัน" }
    ]
  },
  {
    id: 5,
    text: "เบื่ออาหาร หรือกินมากเกินไป",
    options: [
      { value: 0, label: "ไม่มีเลย" },
      { value: 1, label: "มีบางวัน" },
      { value: 2, label: "มีมากกว่า 7 วัน" },
      { value: 3, label: "มีเกือบทุกวัน" }
    ]
  },
  {
    id: 6,
    text: "รู้สึกไม่ดีกับตัวเอง คิดว่าตัวเองล้มเหลว หรือทำให้ตัวเองหรือครอบครัวผิดหวัง",
    options: [
      { value: 0, label: "ไม่มีเลย" },
      { value: 1, label: "มีบางวัน" },
      { value: 2, label: "มีมากกว่า 7 วัน" },
      { value: 3, label: "มีเกือบทุกวัน" }
    ]
  },
  {
    id: 7,
    text: "สมาธิไม่ดี เวลาทำอะไร เช่น อ่านหนังสือหรือดูทีวี",
    options: [
      { value: 0, label: "ไม่มีเลย" },
      { value: 1, label: "มีบางวัน" },
      { value: 2, label: "มีมากกว่า 7 วัน" },
      { value: 3, label: "มีเกือบทุกวัน" }
    ]
  },
  {
    id: 8,
    text: "พูดหรือทำอะไรช้าจนคนอื่นสังเกต หรือตรงกันข้าม คือ กระสับกระส่าย หรือดิ้นไปมา",
    options: [
      { value: 0, label: "ไม่มีเลย" },
      { value: 1, label: "มีบางวัน" },
      { value: 2, label: "มีมากกว่า 7 วัน" },
      { value: 3, label: "มีเกือบทุกวัน" }
    ]
  },
  {
    id: 9,
    text: "คิดทำร้ายตัวเอง หรือคิดว่าถ้าตายไปเสียดีกว่า",
    options: [
      { value: 0, label: "ไม่มีเลย" },
      { value: 1, label: "มีบางวัน" },
      { value: 2, label: "มีมากกว่า 7 วัน" },
      { value: 3, label: "มีเกือบทุกวัน" }
    ]
  }
]

export default function PHQ9Page() {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  // Memoized values
  const progress = useMemo(() => (Object.keys(answers).length / questions.length) * 100, [answers])
  const isAllQuestionsAnswered = useMemo(() => Object.keys(answers).length === questions.length, [answers])
  const currentQuestionData = useMemo(() => questions[currentQuestion], [currentQuestion])

  const handleAnswer = useCallback((questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }, [])

  const nextQuestion = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }, [currentQuestion])

  const prevQuestion = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }, [currentQuestion])

  const calculateScore = useCallback(() => {
    return Object.values(answers).reduce((sum, score) => sum + score, 0)
  }, [answers])

  const getSeverity = useCallback((score: number) => {
    if (score <= 4) return { level: 'ไม่มีภาวะซึมเศร้า', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' }
    if (score <= 9) return { level: 'ภาวะซึมเศร้าเล็กน้อย', color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' }
    if (score <= 14) return { level: 'ภาวะซึมเศร้าปานกลาง', color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' }
    if (score <= 19) return { level: 'ภาวะซึมเศร้าปานกลางค่อนข้างรุนแรง', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' }
    return { level: 'ภาวะซึมเศร้ารุนแรง', color: 'text-red-700', bgColor: 'bg-red-100', borderColor: 'border-red-300' }
  }, [])

  const handleSubmit = useCallback(() => {
    if (isAllQuestionsAnswered) {
      setShowResults(true)
    }
  }, [isAllQuestionsAnswered])

  const resetAssessment = useCallback(() => {
    setAnswers({})
    setCurrentQuestion(0)
    setShowResults(false)
    setShowInfo(false)
  }, [])

  const toggleInfo = useCallback(() => {
    setShowInfo(prev => !prev)
  }, [])

  // Memoized recommendation component
  const RecommendationComponent = useMemo(() => {
    const score = calculateScore()
    
    if (score <= 4) {
      return (
        <div className="text-green-700">
          <p className="mb-2">• คุณไม่มีภาวะซึมเศร้า</p>
          <p className="mb-2">• ควรดูแลสุขภาพจิตให้ดีต่อไป</p>
          <p>• หากมีอาการเปลี่ยนแปลง ควรประเมินซ้ำ</p>
        </div>
      )
    }
    
    if (score >= 5 && score <= 9) {
      return (
        <div className="text-yellow-700">
          <p className="mb-2">• คุณมีภาวะซึมเศร้าเล็กน้อย</p>
          <p className="mb-2">• ควรดูแลตัวเองและหาวิธีผ่อนคลาย</p>
          <p className="mb-2">• พิจารณาปรึกษาเพื่อน ครอบครัว หรือครูแนะแนว</p>
          <p>• ประเมินซ้ำใน 2-4 สัปดาห์</p>
        </div>
      )
    }
    
    if (score >= 10 && score <= 14) {
      return (
        <div className="text-orange-700">
          <p className="mb-2">• คุณมีภาวะซึมเศร้าปานกลาง</p>
          <p className="mb-2">• ควรปรึกษาครูแนะแนวหรือผู้ปกครอง</p>
          <p className="mb-2">• พิจารณาปรึกษานักจิตวิทยา</p>
          <p>• ประเมินซ้ำใน 1-2 สัปดาห์</p>
        </div>
      )
    }
    
    return (
      <div className="text-red-700">
        <p className="mb-2">• คุณมีภาวะซึมเศร้ารุนแรง</p>
        <p className="mb-2">• ควรปรึกษานักจิตวิทยาหรือจิตแพทย์โดยเร็ว</p>
        <p className="mb-2">• ติดต่อสายด่วนสุขภาพจิต: <a href="tel:1323" className="underline hover:text-red-800 font-medium">1323</a></p>
        <p>• อย่าลังเลที่จะขอความช่วยเหลือ</p>
      </div>
    )
  }, [calculateScore])

  if (showResults) {
    const score = calculateScore()
    const severity = getSeverity(score)
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-4">ผลการประเมิน PHQ-9</h1>
          <p className="text-gray-600">แบบประเมินภาวะซึมเศร้าเบื้องต้น 9 คำถาม</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${severity.bgColor} ${severity.borderColor} border-2 rounded-2xl p-8 mb-8`}
        >
          <div className="text-center">
            <div className={`text-6xl font-bold ${severity.color} mb-4`}>{score}</div>
            <div className={`text-2xl font-semibold ${severity.color} mb-4`}>{severity.level}</div>
            <div className="text-gray-600">
              คะแนนรวม: {score} จาก 27 คะแนน
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">คำแนะนำ</h2>
          {RecommendationComponent}
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetAssessment}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            ประเมินใหม่
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleInfo}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            ข้อมูลเพิ่มเติม
          </motion.button>
        </div>

        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-200"
            >
              <h3 className="text-lg font-semibold text-blue-800 mb-4">เกี่ยวกับ PHQ-9</h3>
              <div className="text-blue-700 space-y-2">
                <p>• PHQ-9 เป็นเครื่องมือคัดกรองภาวะซึมเศร้าเบื้องต้น</p>
                <p>• ประเมินอาการในช่วง 2 สัปดาห์ที่ผ่านมา</p>
                <p>• ผลการประเมินนี้ไม่ใช่การวินิจฉัยทางการแพทย์</p>
                <p>• หากมีข้อสงสัย ควรปรึกษาผู้เชี่ยวชาญ</p>
                <p>• สายด่วนสุขภาพจิต: <a href="tel:1323" className="underline hover:text-blue-800 font-medium">1323</a> (24 ชั่วโมง)</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <FaClipboardList className="text-2xl text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">แบบประเมินภาวะซึมเศร้าเบื้องต้น</h1>
        <p className="text-gray-600 mb-4">PHQ-9 (Patient Health Questionnaire-9)</p>
        <p className="text-sm text-gray-500">กรุณาตอบคำถามตามความรู้สึกในช่วง 2 สัปดาห์ที่ผ่านมา</p>
      </motion.div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>คำถามที่ {currentQuestion + 1} จาก {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          />
        </div>
      </div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {currentQuestionData.text}
        </h2>

        <div className="space-y-3">
          {currentQuestionData.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(currentQuestionData.id, option.value)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                answers[currentQuestionData.id] === option.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                  answers[currentQuestionData.id] === option.value
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {answers[currentQuestionData.id] === option.value && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                  )}
                </div>
                <span className="font-medium">{option.label}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="flex justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            currentQuestion === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
        >
          ก่อนหน้า
        </motion.button>

        {currentQuestion < questions.length - 1 ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextQuestion}
            disabled={answers[currentQuestionData.id] === undefined}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              answers[currentQuestionData.id] === undefined
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            ถัดไป
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={!isAllQuestionsAnswered}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              !isAllQuestionsAnswered
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            ดูผลการประเมิน
          </motion.button>
        )}
      </div>
    </div>
  )
} 