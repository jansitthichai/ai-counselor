'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaComments, FaChartLine, FaBook, FaGamepad, FaHandHoldingHeart } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="space-y-6 md:space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-4"
      >
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
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
          className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition-all transform hover:-translate-y-1"
        >
          <div className="flex items-center mb-3 md:mb-4">
            <div className="p-2 md:p-3 bg-lavender-100 rounded-lg">
              <FaComments className="text-xl md:text-2xl text-lavender-600" />
            </div>
            <h2 className="text-lg md:text-2xl font-semibold text-lavender-600 ml-3 md:ml-4">แชทกับ AI</h2>
          </div>
          <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
            พูดคุยกับ AI เพื่อนที่ปรึกษาที่พร้อมรับฟังและให้คำแนะนำในทุกเรื่อง
          </p>
          <Link href="/chat" className="inline-flex items-center text-lavender-600 hover:text-lavender-800 font-medium text-sm md:text-base">
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
          className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition-all transform hover:-translate-y-1"
        >
          <div className="flex items-center mb-3 md:mb-4">
            <div className="p-2 md:p-3 bg-lavender-100 rounded-lg">
              <FaChartLine className="text-xl md:text-2xl text-lavender-600" />
            </div>
            <h2 className="text-lg md:text-2xl font-semibold text-lavender-600 ml-3 md:ml-4">ติดตามอารมณ์</h2>
          </div>
          <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
            บันทึกและติดตามอารมณ์ของคุณ พร้อมวิเคราะห์แนวโน้มเพื่อการดูแลสุขภาพจิตที่ดีขึ้น
          </p>
          <Link href="/mood-tracker" className="inline-flex items-center text-lavender-600 hover:text-lavender-800 font-medium text-sm md:text-base">
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
          className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition-all transform hover:-translate-y-1"
        >
          <div className="flex items-center mb-3 md:mb-4">
            <div className="p-2 md:p-3 bg-lavender-100 rounded-lg">
              <FaBook className="text-xl md:text-2xl text-lavender-600" />
            </div>
            <h2 className="text-lg md:text-2xl font-semibold text-lavender-600 ml-3 md:ml-4">แหล่งข้อมูล</h2>
          </div>
          <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
            ค้นพบแหล่งข้อมูลและคำแนะนำที่เป็นประโยชน์สำหรับการดูแลสุขภาพจิต
          </p>
          <Link href="/resources" className="inline-flex items-center text-lavender-600 hover:text-lavender-800 font-medium text-sm md:text-base">
            ดูแหล่งข้อมูล
            <svg className="w-3 h-3 md:w-4 md:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition-all transform hover:-translate-y-1"
        >
          <div className="flex items-center mb-3 md:mb-4">
            <div className="p-2 md:p-3 bg-lavender-100 rounded-lg">
              <FaGamepad className="text-xl md:text-2xl text-lavender-600" />
            </div>
            <h2 className="text-lg md:text-2xl font-semibold text-lavender-600 ml-3 md:ml-4">เกมคลายเครียด</h2>
          </div>
          <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
            เล่นเกมที่ออกแบบมาเพื่อผ่อนคลายและพัฒนาสุขภาพจิต
          </p>
          <Link href="/games" className="inline-flex items-center text-lavender-600 hover:text-lavender-800 font-medium text-sm md:text-base">
            เล่นเกม
            <svg className="w-3 h-3 md:w-4 md:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition-all transform hover:-translate-y-1"
        >
          <div className="flex items-center mb-3 md:mb-4">
            <div className="p-2 md:p-3 bg-lavender-100 rounded-lg">
              <FaHandHoldingHeart className="text-xl md:text-2xl text-lavender-600" />
            </div>
            <h2 className="text-lg md:text-2xl font-semibold text-lavender-600 ml-3 md:ml-4">ต้องการความช่วยเหลือ</h2>
          </div>
          <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
            ติดต่อครูแนะแนว นักจิตวิทยา สายด่วนสุขภาพจิต และโรงพยาบาลจิตเวช
          </p>
          <Link href="/help" className="inline-flex items-center text-lavender-600 hover:text-lavender-800 font-medium text-sm md:text-base">
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
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-lavender-50 rounded-xl p-6 md:p-8 text-center mx-4"
      >
        <div className="flex items-center justify-center mb-4 md:mb-6">
          <div className="p-3 md:p-4 bg-lavender-100 rounded-full">
            <FaComments className="text-2xl md:text-3xl text-lavender-600" />
          </div>
        </div>
        <h2 className="text-xl md:text-2xl font-semibold text-lavender-600 mb-3 md:mb-4">
          เริ่มต้นการเดินทางสู่สุขภาพจิตที่ดี
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
          AI เพื่อนที่ปรึกษาพร้อมอยู่เคียงข้างคุณในทุกช่วงเวลาของชีวิต
        </p>
        <Link
          href="/chat"
          className="inline-flex items-center bg-lavender-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-lavender-700 transition-colors text-sm md:text-base"
        >
          เริ่มต้นตอนนี้
          <svg className="w-3 h-3 md:w-4 md:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </motion.div>
    </div>
  )
} 