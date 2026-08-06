'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
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

  // Load mood entries from localStorage
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

  // Save mood entries to localStorage
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('moodEntries', JSON.stringify(moodEntries))
      } catch (error) {
        console.error('Error saving mood entries:', error)
      }
    }
  }, [moodEntries, isLoading])

  const handleSubmit = useCallback((e: React.FormEvent) => {
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
  }, [currentMood, note])

  const handleMoodSelect = useCallback((moodIndex: number) => {
    setCurrentMood(moodIndex)
  }, [])

  const clearEntries = useCallback(() => {
    setMoodEntries([])
  }, [])

  // Memoized weekly data
  const weeklyData = useMemo(() => {
    const now = new Date()
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay())
    const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000)

    const weekEntries = moodEntries.filter(entry => {
      const entryDate = new Date(entry.timestamp)
      return entryDate >= weekStart && entryDate <= weekEnd
    })

    const daysOfWeek = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
    const moodData = daysOfWeek.map((day, index) => {
      const dayStart = new Date(weekStart.getTime() + index * 24 * 60 * 60 * 1000)
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000)
      
      const dayEntries = weekEntries.filter(entry => {
        const entryDate = new Date(entry.timestamp)
        return entryDate >= dayStart && entryDate < dayEnd
      })

      if (dayEntries.length === 0) return null

      const averageMood = dayEntries.reduce((sum, entry) => sum + entry.mood, 0) / dayEntries.length
      return {
        day,
        mood: averageMood,
        count: dayEntries.length
      }
    })

    return moodData.filter(day => day !== null)
  }, [moodEntries])

  // Memoized chart data
  const chartData = useMemo(() => ({
    labels: weeklyData.map(day => day?.day || ''),
    datasets: [
      {
        label: 'อารมณ์เฉลี่ย',
        data: weeklyData.map(day => day?.mood || 0),
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  }), [weeklyData])

  const chartOptions = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'อารมณ์ประจำสัปดาห์',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: function(value: any) {
            const labels = ['', 'มีความสุขมาก', 'พอใจ', 'เฉยๆ', 'เหนื่อย', 'หงุดหงิด', 'กังวล']
            return labels[value] || ''
          }
        }
      }
    }
  }), [])

  // Memoized recent entries
  const recentEntries = useMemo(() => {
    return moodEntries
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5)
  }, [moodEntries])

  const formatDate = useCallback((timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lavender-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-lavender-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4 font-sarabun">ติดตามอารมณ์</h1>
          <p className="text-lg text-gray-600">บันทึกและติดตามอารมณ์ของคุณเพื่อการดูแลสุขภาพจิตที่ดีขึ้น</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mood Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">บันทึกอารมณ์วันนี้</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  คุณรู้สึกอย่างไรวันนี้?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {moodLabels.map((mood, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => handleMoodSelect(index)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        currentMood === index
                          ? 'border-lavender-500 bg-lavender-50'
                          : 'border-gray-200 hover:border-lavender-300'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <mood.icon 
                          className="text-2xl" 
                          style={{ color: mood.color }}
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {mood.label}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                  บันทึกเพิ่มเติม (ไม่บังคับ)
                </label>
                <textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="เขียนความรู้สึกหรือเหตุการณ์ที่เกิดขึ้น..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={currentMood === null}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  currentMood === null
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-lavender-600 text-white hover:bg-lavender-700'
                }`}
              >
                บันทึกอารมณ์
              </motion.button>
            </form>
          </motion.div>

          {/* Chart Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">สถิติอารมณ์</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearEntries}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                ล้างข้อมูล
              </motion.button>
            </div>

            {weeklyData.length > 0 ? (
              <div className="h-64">
                <Line data={chartData} options={chartOptions} />
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                <p>ยังไม่มีข้อมูลอารมณ์</p>
              </div>
            )}

            {/* Recent Entries */}
            {recentEntries.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">บันทึกล่าสุด</h3>
                <div className="space-y-2">
                  {recentEntries.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: moodLabels[entry.mood].color }}
                        />
                        <span className="font-medium">{moodLabels[entry.mood].label}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(entry.timestamp)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
} 