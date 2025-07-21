'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaBookmark, FaShare, FaHeart, FaClock, FaUser, FaExternalLinkAlt } from 'react-icons/fa'
import { Article } from '@/lib/types'

export default function ResourcesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/articles')
      if (!response.ok) {
        throw new Error('ไม่สามารถโหลดบทความได้')
      }
      const result = await response.json()
      if (result.success && Array.isArray(result.data)) {
        setArticles(result.data)
      } else {
        throw new Error('ข้อมูลไม่ถูกต้อง')
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการโหลดบทความ')
      console.error('Error fetching articles:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Get unique categories from articles
  const categories = ['ทั้งหมด', ...Array.from(new Set((articles || []).map(article => article.category)))]

  const filteredArticles = (articles || []).filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'ทั้งหมด' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleArticleClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-lavender-600 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลดบทความ...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchArticles}
            className="bg-lavender-600 text-white px-6 py-2 rounded-lg hover:bg-lavender-700 transition-colors"
          >
            ลองใหม่
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 font-sarabun">
              📚 แหล่งข้อมูลสุขภาพจิต
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              บทความและข้อมูลที่เป็นประโยชน์สำหรับการดูแลสุขภาพจิต 
              คัดสรรมาเพื่อคุณโดยทีม AI เพื่อนที่ปรึกษา
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="🔍 ค้นหาบทความ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500 transition-all"
                />
                <FaSearch className="absolute left-4 top-4 text-gray-400 text-lg" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500 bg-white transition-all"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Results count */}
            <div className="mt-4 text-sm text-gray-600">
              พบ {filteredArticles.length} บทความ
              {searchTerm && ` สำหรับ "${searchTerm}"`}
              {selectedCategory !== 'ทั้งหมด' && ` ในหมวด "${selectedCategory}"`}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                onClick={() => handleArticleClick(article.url)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-lavender-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    {article.category}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                    <FaClock className="text-xs" />
                    {article.readTime || 5} นาที
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-lavender-600 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {article.content}
                  </p>

                  {/* Meta info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <FaUser className="text-xs" />
                      <span>{article.author || 'ทีม AI เพื่อนที่ปรึกษา'}</span>
                    </div>
                    <span>{new Date(article.date).toLocaleDateString('th-TH')}</span>
                  </div>

                  {/* Tags */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-lavender-600 font-medium group-hover:text-lavender-700 transition-colors">
                      <FaExternalLinkAlt className="text-sm" />
                      อ่านเพิ่มเติม
                    </div>
                    <div className="flex items-center space-x-3">
                      <button 
                        className="text-gray-400 hover:text-lavender-600 transition-colors p-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Bookmark functionality
                        }}
                      >
                        <FaBookmark />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-lavender-600 transition-colors p-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Share functionality
                        }}
                      >
                        <FaShare />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Like functionality
                        }}
                      >
                        <FaHeart />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* No results */}
          {filteredArticles.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 text-6xl mb-4">📖</div>
              <p className="text-gray-500 text-lg mb-2">ไม่พบบทความที่ตรงกับคำค้นหา</p>
              <p className="text-gray-400">ลองเปลี่ยนคำค้นหาหรือหมวดหมู่</p>
            </motion.div>
          )}

          {/* Footer */}
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">
              💡 ต้องการเพิ่มบทความใหม่? ติดต่อทีม AI เพื่อนที่ปรึกษา
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 