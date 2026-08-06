'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Game {
  id: string
  title: string
  description: string
  icon: string
  category: string
  url: string
}

const games: Game[] = [
  {
    id: '1',
    title: 'เกมฝึกสมาธิ',
    description: 'ฝึกสมาธิผ่านการเล่นเกมที่ช่วยให้จิตใจสงบและมีสติ',
    icon: '🧘',
    category: 'สมาธิ',
    url: '/games/meditation'
  },
  {
    id: '2',
    title: 'เกมจับคู่ภาพ',
    description: 'ฝึกความจำและสมาธิผ่านการจับคู่ภาพที่เหมือนกัน',
    icon: '🧩',
    category: 'ความจำ',
    url: '/games/memory'
  },
  {
    id: '3',
    title: 'เกมฝึกสมอง',
    description: 'เกมฝึกสมองที่ช่วยพัฒนาความคิดและความจำ',
    icon: '🧠',
    category: 'สมอง',
    url: '/games/brain'
  },
  {
    id: '4',
    title: 'เกมผ่อนคลาย',
    description: 'เกมที่ช่วยให้จิตใจสงบและผ่อนคลายความเครียด',
    icon: '💝',
    category: 'ผ่อนคลาย',
    url: '/games/relax'
  },
  {
    id: '5',
    title: 'เกมดนตรี',
    description: 'เล่นดนตรีและสร้างจังหวะเพื่อผ่อนคลายอารมณ์',
    icon: '🎵',
    category: 'ดนตรี',
    url: '/games/music'
  },
  {
    id: '6',
    title: 'เกม XO (Tic Tac Toe)',
    description: 'เกม XO ที่สามารถเลือกระดับความยากได้ เพื่อฝึกความคิดและวางแผน',
    icon: '⭕',
    category: 'สมอง',
    url: '/games/nature'
  },
  {
    id: '7',
    title: 'เกมจับคู่สี',
    description: 'ฝึกการแยกแยะสีและความเร็วในการตอบสนอง',
    icon: '🎨',
    category: 'ความจำ',
    url: '/games/color-match'
  },
  {
    id: '8',
    title: 'เกมลมหายใจ',
    description: 'เกมที่ช่วยฝึกการหายใจอย่างถูกต้องเพื่อลดความเครียด',
    icon: '💨',
    category: 'ผ่อนคลาย',
    url: '/games/breathing'
  },
  {
    id: '9',
    title: 'เกมคำศัพท์',
    description: 'เกมทายคำศัพท์ที่ช่วยพัฒนาความคิดและความรู้',
    icon: '📚',
    category: 'สมอง',
    url: '/games/word-game'
  }
]

const categories = [
  'ทั้งหมด',
  'สมาธิ',
  'ความจำ',
  'สมอง',
  'ผ่อนคลาย',
  'ดนตรี'
]

export default function GamesPage() {
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredGames = games.filter(game => {
    const matchesCategory = selectedCategory === 'ทั้งหมด' || game.category === selectedCategory
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4 font-sarabun">เกมคลายเครียด</h1>
          <p className="text-lg text-gray-600">เลือกเกมที่คุณสนใจเพื่อผ่อนคลายและพัฒนาสุขภาพจิต</p>
        </motion.div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="ค้นหาเกม..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 text-4xl">
                  {game.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">{game.title}</h3>
                <p className="text-gray-600 text-center mb-4">{game.description}</p>
                <a
                  href={game.url}
                  className="block w-full text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  เล่นเกม
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 