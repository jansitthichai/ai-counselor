'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaShieldAlt, FaUserSecret, FaDatabase, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <FaShieldAlt className="text-4xl text-lavender-600 mr-3" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-sarabun">
            นโยบายความเป็นส่วนตัว
          </h1>
        </div>
        <p className="text-gray-600 text-lg">
          การปกป้องข้อมูลส่วนตัวของคุณเป็นสิ่งสำคัญสำหรับเรา
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="calm-card"
      >
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaUserSecret className="mr-2 text-lavender-600" />
              ข้อมูลที่เรารวบรวม
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>เราเก็บรวบรวมข้อมูลต่อไปนี้:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>ข้อมูลการติดตามอารมณ์และบันทึกประจำวัน (เก็บในอุปกรณ์ของคุณเท่านั้น)</li>
              </ul>
              <div className="mt-4 p-4 bg-lavender-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>หมายเหตุ:</strong> 
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2 text-sm text-gray-600">
                  <li>ข้อมูลการสนทนากับ AI และผลการประเมินภาวะซึมเศร้า (PHQ-9) จะไม่ถูกเก็บหรือบันทึกในระบบใดๆ ทั้งสิ้น</li>
                  <li>เราไม่เก็บข้อมูลการใช้งานแอปพลิเคชัน ข้อมูลทางเทคนิค หรือข้อมูลส่วนตัวอื่นๆ</li>
                  <li>ข้อมูลทั้งหมดจะถูกเก็บเฉพาะในอุปกรณ์ของคุณเท่านั้น</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaDatabase className="mr-2 text-lavender-600" />
              การใช้ข้อมูล
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>เราใช้ข้อมูลของคุณเพื่อ:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>ให้บริการ AI เพื่อนที่ปรึกษาที่เหมาะสมกับคุณ</li>
                <li>ปรับปรุงคุณภาพของการให้คำแนะนำ</li>
                <li>วิเคราะห์แนวโน้มอารมณ์และสุขภาพจิต</li>
                <li>พัฒนาระบบและฟีเจอร์ใหม่</li>
                <li>ให้การสนับสนุนทางเทคนิค</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaLock className="mr-2 text-lavender-600" />
              การปกป้องข้อมูล
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>เราใช้มาตรการความปลอดภัยที่เข้มงวด:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>การเข้ารหัสข้อมูลในระหว่างการส่งและจัดเก็บ</li>
                <li>การควบคุมการเข้าถึงข้อมูลอย่างเข้มงวด</li>
                <li>การตรวจสอบความปลอดภัยอย่างสม่ำเสมอ</li>
                <li>การสำรองข้อมูลอย่างปลอดภัย</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaEye className="mr-2 text-lavender-600" />
              การแชร์ข้อมูล
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>เราไม่ขาย แลกเปลี่ยน หรือโอนข้อมูลส่วนตัวของคุณให้กับบุคคลที่สาม ยกเว้นในกรณีต่อไปนี้:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>เมื่อได้รับความยินยอมจากคุณ</li>
                <li>เพื่อให้บริการที่คุณร้องขอ</li>
                <li>เมื่อกฎหมายกำหนดให้ต้องทำ</li>
                <li>เพื่อปกป้องสิทธิ์และความปลอดภัยของเราและผู้อื่น</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaEyeSlash className="mr-2 text-lavender-600" />
              สิทธิ์ของคุณ
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>คุณมีสิทธิ์:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>เข้าถึงข้อมูลส่วนตัวของคุณ</li>
                <li>แก้ไขหรือลบข้อมูลที่ไม่ถูกต้อง</li>
                <li>ขอให้ลบข้อมูลส่วนตัวของคุณ</li>
                <li>คัดค้านการประมวลผลข้อมูล</li>
                <li>ขอให้โอนข้อมูลไปยังผู้ให้บริการอื่น</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              การเปลี่ยนแปลงนโยบาย
            </h2>
            <p className="text-gray-700">
              เราอาจปรับปรุงนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราว การเปลี่ยนแปลงใดๆ จะถูกประกาศบนหน้านี้ 
              และวันที่ปรับปรุงล่าสุดจะถูกแสดงไว้ด้านล่าง
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              ติดต่อเรา
            </h2>
            <p className="text-gray-700">
              หากคุณมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ กรุณาติดต่อเรา:
            </p>
            <div className="mt-3 p-4 bg-lavender-50 rounded-lg">
              <p className="text-gray-700">
                <strong>โครงงานคอมพิวเตอร์ โรงเรียนสตรีศึกษา</strong><br />
                อีเมล: webadmin@strisuksa.ac.th<br />
                โทร: 043-511-202, 043-51410<br />
                ที่อยู่: โรงเรียนสตรีศึกษา จังหวัดร้อยเอ็ด
              </p>
            </div>
          </section>

          <div className="border-t pt-6 mt-8">
            <p className="text-sm text-gray-500 text-center">
              อัปเดตล่าสุด: {new Date().toLocaleDateString('th-TH')}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center"
      >
        <Link 
          href="/"
          className="inline-flex items-center px-6 py-3 bg-lavender-600 text-white rounded-lg hover:bg-lavender-700 transition-colors"
        >
          ← กลับสู่หน้าแรก
        </Link>
      </motion.div>
    </div>
  )
} 