'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaComments, FaChartLine, FaBook, FaGamepad, FaHandHoldingHeart, FaClipboardList, FaEye } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [visitCount, setVisitCount] = useState(359)
  const [isLoading, setIsLoading] = useState(true)
  const hasIncremented = useRef(false)

  useEffect(() => {
    // ป้องกันการเพิ่มซ้ำใน React Strict Mode
    if (hasIncremented.current) return
    hasIncremented.current = true

    const updateVisitCount = async () => {
      try {
        // เพิ่มสถิติการเข้าชม
        const response = await fetch('/api/visit-stats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const data = await response.json()
          setVisitCount(data.visitCount)
        }
      } catch (error) {
        console.error('Failed to update visit count:', error)
        // หาก API ไม่ทำงาน ให้ใช้ค่าเริ่มต้น
        setVisitCount(359)
      } finally {
        setIsLoading(false)
      }
    }

    updateVisitCount()
  }, [])

  return (
    <div className="space-y-6 md:space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-4"
      >
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4 font-sarabun">
          ยินดีต้อนรับสู่ AI เพื่อนที่ปรึกษา
        </h1>
        <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
          เพื่อนที่พร้อมรับฟังและให้คำแนะนำในทุกช่วงเวลาของชีวิต
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition-all transform hover:-translate-y-1 border border-blue-100"
        >
          <div className="flex items-center mb-3 md:mb-4">
            <div className="p-2 md:p-3 bg-blue-100 rounded-lg">
              <FaComments className="text-xl md:text-2xl text-blue-600" />
            </div>
            <h2 className="text-lg md:text-2xl font-semibold text-blue-700 ml-3 md:ml-4 font-sarabun">แชทกับ AI</h2>
          </div>
          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-5">
            พูดคุยกับ AI เพื่อนที่ปรึกษาที่พร้อมรับฟังและให้คำแนะนำในทุกเรื่อง
          </p>
          <Link href="/chat" className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base font-medium shadow-sm">
            เริ่มแชท
            <svg className="w-3 h-3 md:w-4 md:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition-all transform hover:-translate-y-1 border border-green-100"
        >
          <div className="flex items-center mb-3 md:mb-4">
            <div className="p-2 md:p-3 bg-green-100 rounded-lg">
              <FaChartLine className="text-xl md:text-2xl text-green-600" />
            </div>
            <h2 className="text-lg md:text-2xl font-semibold text-green-700 ml-3 md:ml-4 font-sarabun">ติดตามอารมณ์</h2>
          </div>
          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-5">
            บันทึกและติดตามอารมณ์ของคุณ พร้อมวิเคราะห์แนวโน้มเพื่อการดูแลสุขภาพจิตที่ดีขึ้น
          </p>
          <Link href="/mood-tracker" className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm md:text-base font-medium shadow-sm">
            เริ่มติดตาม
            <svg className="w-3 h-3 md:w-4 md:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition-all transform hover:-translate-y-1 border border-teal-100"
        >
          <div className="flex items-center mb-3 md:mb-4">
            <div className="p-2 md:p-3 bg-teal-100 rounded-lg">
              <FaClipboardList className="text-xl md:text-2xl text-teal-600" />
            </div>
            <h2 className="text-lg md:text-2xl font-semibold text-teal-700 ml-3 md:ml-4 font-sarabun">ประเมินภาวะซึมเศร้า</h2>
          </div>
          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-5">
            แบบประเมินภาวะซึมเศร้าเบื้องต้น 9 คำถาม (PHQ-9) เพื่อคัดกรองสุขภาพจิต
          </p>
          <Link href="/phq9" className="inline-flex items-center bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm md:text-base font-medium shadow-sm">
            เริ่มประเมิน
            <svg className="w-3 h-3 md:w-4 md:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition-all transform hover:-translate-y-1 border border-orange-100"
        >
          <div className="flex items-center mb-3 md:mb-4">
            <div className="p-2 md:p-3 bg-orange-100 rounded-lg">
              <FaBook className="text-xl md:text-2xl text-orange-600" />
            </div>
            <h2 className="text-lg md:text-2xl font-semibold text-orange-700 ml-3 md:ml-4 font-sarabun">บทความ</h2>
          </div>
          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-5">
            ค้นพบบทความและคำแนะนำที่เป็นประโยชน์สำหรับการดูแลสุขภาพจิต
          </p>
          <Link href="/resources" className="inline-flex items-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm md:text-base font-medium shadow-sm">
            ดูบทความ
            <svg className="w-3 h-3 md:w-4 md:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition-all transform hover:-translate-y-1 border border-purple-100"
        >
          <div className="flex items-center mb-3 md:mb-4">
            <div className="p-2 md:p-3 bg-purple-100 rounded-lg">
              <FaGamepad className="text-xl md:text-2xl text-purple-600" />
            </div>
            <h2 className="text-lg md:text-2xl font-semibold text-purple-700 ml-3 md:ml-4 font-sarabun">เกมคลายเครียด</h2>
          </div>
          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-5">
            เล่นเกมที่ออกแบบมาเพื่อผ่อนคลายและพัฒนาสุขภาพจิต
          </p>
          <Link href="/games" className="inline-flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm md:text-base font-medium shadow-sm">
            เล่นเกม
            <svg className="w-3 h-3 md:w-4 md:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition-all transform hover:-translate-y-1 border border-red-100"
        >
          <div className="flex items-center mb-3 md:mb-4">
            <div className="p-2 md:p-3 bg-red-100 rounded-lg">
              <FaHandHoldingHeart className="text-xl md:text-2xl text-red-600" />
            </div>
            <h2 className="text-lg md:text-2xl font-semibold text-red-700 ml-3 md:ml-4 font-sarabun">ต้องการความช่วยเหลือ</h2>
          </div>
          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-5">
            ติดต่อครูแนะแนว นักจิตวิทยา สายด่วนสุขภาพจิต และโรงพยาบาลจิตเวช
          </p>
          <Link href="/help" className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm md:text-base font-medium shadow-sm">
            ดูข้อมูลติดต่อ
            <svg className="w-3 h-3 md:w-4 md:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="bg-gradient-to-br from-lavender-50 to-purple-50 rounded-xl p-6 md:p-8 text-center mx-4 border border-lavender-100"
      >
        <div className="flex items-center justify-center mb-4 md:mb-6">
          <div className="p-3 md:p-4 bg-lavender-100 rounded-full">
            <FaComments className="text-2xl md:text-3xl text-lavender-600" />
          </div>
        </div>
        <h2 className="text-xl md:text-2xl font-semibold text-lavender-700 mb-3 md:mb-4 font-sarabun">
          เริ่มต้นการเดินทางสู่สุขภาพจิตที่ดี
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
          AI เพื่อนที่ปรึกษาพร้อมอยู่เคียงข้างคุณในทุกช่วงเวลาของชีวิต
        </p>
        <Link
          href="/chat"
          className="inline-flex items-center bg-gradient-to-r from-lavender-600 to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg hover:from-lavender-700 hover:to-purple-700 transition-all text-sm md:text-base font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          เริ่มต้นตอนนี้
          <svg className="w-3 h-3 md:w-4 md:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </motion.div>

      {/* สถิติการเข้าชมเว็บไซต์ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 md:p-6 text-center mx-4 border border-gray-100"
      >
        <div className="flex items-center justify-center mb-2 md:mb-3">
          <div className="p-2 md:p-3 bg-gray-100 rounded-full">
            <FaEye className="text-lg md:text-xl text-gray-600" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm md:text-base font-medium text-gray-700 font-sarabun">
            สถิติการเข้าชม {isLoading ? 'กำลังโหลด...' : visitCount.toLocaleString()} ครั้ง
          </p>
        </div>
      </motion.div>
    </div>
  )
} 