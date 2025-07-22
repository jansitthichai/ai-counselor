'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaBookmark, FaShare, FaHeart } from 'react-icons/fa'

interface Article {
  id: string
  title: string
  content: string
  source?: string
  url?: string
  imageUrl?: string
  category: string
  date?: string
  createdAt: string
}

export default function ResourcesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // โหลดข้อมูลบทความจาก API
    loadArticles()
  }, [])

  const loadArticles = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/articles')
      if (response.ok) {
        const data = await response.json()
        setArticles(data)
      } else {
        setError('ไม่สามารถโหลดข้อมูลบทความได้')
      }
    } catch (error) {
      setError('เกิดข้อผิดพลาดในการโหลดข้อมูล')
    } finally {
      setIsLoading(false)
    }
  }

  const categories = [
    'ทั้งหมด',
    'อาหารเพื่อสุขภาพจิต',
    'รู้ทันอาการซึมเศร้า',
    'การจัดการความเครียด',
    'ยาต้านเศร้า',
    'ความสัมพันธ์',
    'การจัดการอารมณ์'
  ]

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'ทั้งหมด' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lavender-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={loadArticles}
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            ลองใหม่
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 font-sarabun">แหล่งข้อมูลสุขภาพจิต</h1>
          <p className="text-lg text-gray-600">
            บทความและข้อมูลที่เป็นประโยชน์สำหรับการดูแลสุขภาพจิต
          </p>
          <div className="mt-4">
            <a
              href="/admin/login"
              className="inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-sm"
            >
              เข้าสู่ระบบผู้ดูแล
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="ค้นหาบทความ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-lavender-500 focus:border-lavender-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-lavender-500 focus:border-lavender-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                {article.imageUrl ? (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // ถ้ารูปภาพโหลดไม่ได้ ให้แสดงรูปภาพ default
                      e.currentTarget.src = 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=ไม่มีรูปภาพ'
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">ไม่มีรูปภาพ</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-lavender-600 text-white px-2 py-1 rounded text-sm">
                  {article.category}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.content}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{article.source || 'ไม่ระบุแหล่งที่มา'}</span>
                  <span>
                    {article.date 
                      ? new Date(article.date).toLocaleDateString('th-TH')
                      : new Date(article.createdAt).toLocaleDateString('th-TH')
                    }
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  {article.url ? (
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lavender-600 hover:text-lavender-700 font-medium"
                    >
                      อ่านเพิ่มเติม
                    </a>
                  ) : (
                    <span className="text-gray-400">ไม่มีลิงก์</span>
                  )}
                  <div className="flex items-center space-x-4">
                    <button className="text-gray-400 hover:text-lavender-600">
                      <FaBookmark />
                    </button>
                    <button className="text-gray-400 hover:text-lavender-600">
                      <FaShare />
                    </button>
                    <button className="text-gray-400 hover:text-lavender-600">
                      <FaHeart />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">ไม่พบบทความที่ตรงกับคำค้นหา</p>
          </div>
        )}
      </motion.div>
    </div>
  )
} 