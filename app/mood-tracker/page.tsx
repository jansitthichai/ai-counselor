'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { FaRegSmile, FaRegMeh, FaRegFrown, FaRegTired, FaRegAngry, FaRegSurprise } from 'react-icons/fa'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface MoodEntry {
  id: string
  mood: number
  note: string
  timestamp: string
}

const moodLabels = [
  { label: 'มีความสุขมาก', icon: FaRegSmile, color: '#22c55e' },
  { label: 'พอใจ', icon: FaRegMeh, color: '#84cc16' },
  { label: 'เฉยๆ', icon: FaRegFrown, color: '#eab308' },
  { label: 'เหนื่อย', icon: FaRegTired, color: '#f97316' },
  { label: 'หงุดหงิด', icon: FaRegAngry, color: '#ef4444' },
  { label: 'กังวล', icon: FaRegSurprise, color: '#8b5cf6' },
]

export default function MoodTrackerPage() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([])
  const [currentMood, setCurrentMood] = useState<number | null>(null)
  const [note, setNote] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const savedEntries = localStorage.getItem('moodEntries')
      if (savedEntries) {
        const parsedEntries = JSON.parse(savedEntries)
        if (Array.isArray(parsedEntries) && parsedEntries.length > 0) {
          setMoodEntries(parsedEntries)
        }
      }
    } catch (error) {
      console.error('Error loading mood entries:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('moodEntries', JSON.stringify(moodEntries))
      } catch (error) {
        console.error('Error saving mood entries:', error)
      }
    }
  }, [moodEntries, isLoading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentMood === null) return

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood: currentMood,
      note,
      timestamp: new Date().toISOString(),
    }

    setMoodEntries(prevEntries => [...prevEntries, newEntry])
    setCurrentMood(null)
    setNote('')
  }

  const getWeeklyStats = () => {
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    const weeklyEntries = moodEntries.filter(entry => 
      new Date(entry.timestamp) >= weekAgo
    )

    const moodCounts = new Array(6).fill(0)
    weeklyEntries.forEach(entry => {
      moodCounts[entry.mood]++
    })

    return moodCounts
  }

  const weeklyStats = getWeeklyStats()

  const chartData = {
    labels: moodLabels.map(mood => mood.label),
    datasets: [
      {
        label: 'จำนวนครั้ง',
        data: weeklyStats,
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
        tension: 0.4,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'สถิติอารมณ์รายสัปดาห์',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lavender-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 font-sarabun">บันทึกอารมณ์ของคุณ</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              คุณรู้สึกอย่างไรในตอนนี้?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {moodLabels.map((mood, index) => {
                const Icon = mood.icon
                return (
                  <motion.button
                    key={index}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentMood(index)}
                    className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors ${
                      currentMood === index
                        ? 'border-lavender-600 bg-lavender-50'
                        : 'border-gray-200 hover:border-lavender-300'
                    }`}
                  >
                    <Icon
                      className={`text-2xl mb-2 ${
                        currentMood === index ? 'text-lavender-600' : 'text-gray-400'
                      }`}
                      style={{ color: mood.color }}
                    />
                    <span className={`text-sm ${
                      currentMood === index ? 'text-lavender-600' : 'text-gray-600'
                    }`}>
                      {mood.label}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </div>

          <div>
            <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
              บันทึกเพิ่มเติม (ถ้ามี)
            </label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-lavender-500 focus:border-lavender-500"
              rows={3}
              placeholder="เขียนความรู้สึกหรือเหตุการณ์ที่เกิดขึ้น..."
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={currentMood === null}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
              currentMood === null
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-lavender-600 hover:bg-lavender-700'
            }`}
          >
            บันทึกอารมณ์
          </motion.button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">สถิติอารมณ์รายสัปดาห์</h2>
        <div className="h-64">
          <Line data={chartData} options={chartOptions} />
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {moodLabels.map((mood, index) => {
            const Icon = mood.icon
            return (
              <div key={index} className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50">
                <Icon className="text-xl" style={{ color: mood.color }} />
                <div>
                  <div className="text-sm font-medium text-gray-700">{mood.label}</div>
                  <div className="text-lg font-semibold" style={{ color: mood.color }}>
                    {weeklyStats[index]}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">ประวัติการบันทึกอารมณ์</h2>
        <div className="space-y-4">
          {moodEntries.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              ยังไม่มีประวัติการบันทึกอารมณ์
            </div>
          ) : (
            moodEntries.slice().reverse().map((entry) => {
              const Icon = moodLabels[entry.mood].icon
              return (
                <div key={entry.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <Icon
                      className="text-2xl"
                      style={{ color: moodLabels[entry.mood].color }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{moodLabels[entry.mood].label}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(entry.timestamp).toLocaleDateString('th-TH', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    {entry.note && (
                      <p className="mt-1 text-gray-600">{entry.note}</p>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </motion.div>
    </div>
  )
} 