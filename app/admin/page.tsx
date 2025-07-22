'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    // ตรวจสอบการ login
    const isLoggedIn = localStorage.getItem('adminLoggedIn')
    if (!isLoggedIn) {
      router.push('/admin/login')
      return
    }

    // โหลดข้อมูลบทความ
    loadArticles()
  }, [router])

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

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    localStorage.removeItem('adminUsername')
    router.push('/admin/login')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ที่จะลบบทความนี้?')) {
      return
    }

    try {
      setIsDeleting(id)
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        // โหลดข้อมูลใหม่
        loadArticles()
      } else {
        setError('ไม่สามารถลบบทความได้')
      }
    } catch (error) {
      setError('เกิดข้อผิดพลาดในการลบบทความ')
    } finally {
      setIsDeleting(null)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loading Overlay for Delete */}
      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
            <p className="text-gray-700 font-medium">กำลังลบบทความ...</p>
            <p className="text-gray-500 text-sm mt-2">กรุณารอสักครู่</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              จัดการบทความ
            </h1>
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/create"
                className={`bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors ${
                  isDeleting ? 'pointer-events-none opacity-50' : ''
                }`}
              >
                เพิ่มบทความใหม่
              </Link>
              <button
                onClick={handleLogout}
                className={`text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors ${
                  isDeleting ? 'pointer-events-none opacity-50' : ''
                }`}
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">ยังไม่มีบทความ</p>
            <Link
              href="/admin/create"
              className="mt-4 inline-block bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              เพิ่มบทความแรก
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {articles.map((article) => (
                <li key={article.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {article.title}
                        </h3>
                        <div className="mt-1 flex flex-wrap gap-4 text-sm text-gray-500">
                          <span>หมวดหมู่: {article.category}</span>
                          {article.source && <span>แหล่งที่มา: {article.source}</span>}
                          {article.date && <span>วันที่: {article.date}</span>}
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          สร้างเมื่อ: {new Date(article.createdAt).toLocaleDateString('th-TH')}
                        </p>
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                          {article.content.substring(0, 150)}...
                        </p>
                        {article.url && (
                          <p className="mt-1 text-sm text-blue-600">
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              ดูบทความต้นฉบับ →
                            </a>
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Link
                          href={`/admin/edit/${article.id}`}
                          className={`text-blue-600 hover:text-blue-800 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors ${
                            isDeleting ? 'pointer-events-none opacity-50' : ''
                          }`}
                        >
                          แก้ไข
                        </Link>
                        <button
                          onClick={() => handleDelete(article.id)}
                          disabled={isDeleting === article.id}
                          className={`text-red-600 hover:text-red-800 px-3 py-1 rounded-md hover:bg-red-50 transition-colors ${
                            isDeleting === article.id ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          {isDeleting === article.id ? 'กำลังลบ...' : 'ลบ'}
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
} 