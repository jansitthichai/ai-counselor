'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSave, FaArrowLeft, FaPlus, FaTimes, FaSignOutAlt } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

interface ArticleForm {
  title: string
  content: string
  source: string
  url: string
  imageUrl: string
  category: string
  author: string
  tags: string[]
}

export default function CreateArticlePage() {
  const router = useRouter()
  const [form, setForm] = useState<ArticleForm>({
    title: '',
    content: '',
    source: '',
    url: '',
    imageUrl: '',
    category: '',
    author: 'ทีม AI เพื่อนที่ปรึกษา',
    tags: []
  })
  const [newTag, setNewTag] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Handle logout
  const handleLogout = () => {
    // Clear cookies
    document.cookie = 'adminLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = 'adminLoginTime=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    
    // Redirect to login page
    router.push('/admin/login')
  }

  const categories = [
    'สุขภาพจิต',
    'การนอนหลับ',
    'ความสัมพันธ์',
    'การจัดการอารมณ์',
    'การผ่อนคลาย',
    'การพัฒนาตัวเอง',
    'การเรียนและการศึกษา',
    'อาชีพและการทำงาน'
  ]

  const handleInputChange = (field: keyof ArticleForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const addTag = () => {
    if (newTag.trim() && !form.tags.includes(newTag.trim())) {
      setForm(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setForm(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!form.title.trim() || !form.content.trim() || !form.source.trim() || !form.url.trim() || !form.category) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน')
      return
    }

    // Validate URL format
    try {
      new URL(form.url)
    } catch {
      setError('URL ไม่ถูกต้อง')
      return
    }

    try {
      setLoading(true)
      setError('')

      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      const result = await response.json()

      if (result.success) {
        alert('สร้างบทความสำเร็จ')
        router.push('/admin')
      } else {
        setError(result.error || 'เกิดข้อผิดพลาดในการสร้างบทความ')
      }
    } catch (error) {
      console.error('Error creating article:', error)
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <FaArrowLeft className="text-xl" />
              </motion.button>
              <h1 className="text-2xl font-bold text-gray-800">เพิ่มลิงก์บทความใหม่</h1>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <FaSignOutAlt />
              ออกจากระบบ
            </motion.button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ชื่อบทความ *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ใส่ชื่อบทความ..."
                required
              />
            </div>

            {/* Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                แหล่งที่มา *
              </label>
              <input
                type="text"
                value={form.source}
                onChange={(e) => handleInputChange('source', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="เช่น Sanook, Ooca, Healthline..."
                required
              />
            </div>

            {/* URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ลิงก์บทความ *
              </label>
              <input
                type="url"
                value={form.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/article..."
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ลิงก์รูปภาพ
              </label>
              <input
                type="url"
                value={form.imageUrl}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg..."
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                หมวดหมู่ *
              </label>
              <select
                value={form.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">เลือกหมวดหมู่</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ผู้เขียน
              </label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ใส่ชื่อผู้เขียน..."
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                แท็ก
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ใส่แท็ก..."
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaPlus />
                </motion.button>
              </div>
              {form.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {form.tags.map(tag => (
                    <motion.span
                      key={tag}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </motion.span>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                เนื้อหาบทความ *
              </label>
              <textarea
                value={form.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                rows={15}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                placeholder="ใส่เนื้อหาบทความ..."
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                ความยาว: {form.content.length} ตัวอักษร
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                ยกเลิก
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    กำลังบันทึก...
                  </>
                ) : (
                  <>
                                     <FaSave />
                 เพิ่มลิงก์บทความ
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
} 