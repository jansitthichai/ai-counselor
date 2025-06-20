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
              <p>ข้อมูลที่คุณบันทึกจะถูกใช้เพื่อ:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>แสดงสถิติและกราฟอารมณ์ของคุณในหน้า Mood Tracker</li>
                <li>ช่วยให้คุณติดตามแนวโน้มอารมณ์และสุขภาพจิตของตัวเอง</li>
                <li>ให้บริการฟีเจอร์ต่างๆ ภายในแอปพลิเคชัน</li>
              </ul>
              <div className="mt-4 p-4 bg-lavender-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>หมายเหตุ:</strong> ข้อมูลทั้งหมดจะถูกประมวลผลเฉพาะในอุปกรณ์ของคุณเท่านั้น 
                  เราไม่มีการส่งหรือประมวลผลข้อมูลบนเซิร์ฟเวอร์
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaLock className="mr-2 text-lavender-600" />
              การปกป้องข้อมูล
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>เราใช้มาตรการความปลอดภัยดังนี้:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>ข้อมูลทั้งหมดถูกเก็บในอุปกรณ์ของคุณเท่านั้น (localStorage)</li>
                <li>ไม่มีการส่งข้อมูลไปยังเซิร์ฟเวอร์หรือบุคคลที่สาม</li>
                <li>ใช้ HTTPS สำหรับการเชื่อมต่อที่ปลอดภัย</li>
                <li>ไม่มีการเก็บข้อมูลส่วนตัวในฐานข้อมูลของเรา</li>
              </ul>
              <div className="mt-4 p-4 bg-lavender-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>หมายเหตุ:</strong> ความปลอดภัยของข้อมูลขึ้นอยู่กับการตั้งค่าความปลอดภัยของอุปกรณ์ของคุณ 
                  เราแนะนำให้ใช้รหัสผ่านหรือการยืนยันตัวตนบนอุปกรณ์
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaEye className="mr-2 text-lavender-600" />
              การแชร์ข้อมูล
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>เราไม่แชร์ข้อมูลของคุณกับบุคคลที่สาม เนื่องจาก:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>ข้อมูลทั้งหมดถูกเก็บในอุปกรณ์ของคุณเท่านั้น</li>
                <li>เราไม่มีการเข้าถึงข้อมูลที่คุณบันทึก</li>
                <li>ไม่มีการใช้ third-party analytics หรือ tracking tools</li>
                <li>ไม่มีการส่งข้อมูลไปยังเซิร์ฟเวอร์ของเรา</li>
              </ul>
              <div className="mt-4 p-4 bg-lavender-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>หมายเหตุ:</strong> ข้อมูลที่คุณบันทึกจะไม่ถูกแชร์กับใครเลย 
                  ยกเว้นกรณีที่คุณแชร์ข้อมูลเองผ่านอุปกรณ์ของคุณ
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaEyeSlash className="mr-2 text-lavender-600" />
              สิทธิ์ของคุณ
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>คุณมีสิทธิ์ในการควบคุมข้อมูลของคุณ:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>เข้าถึงและดูข้อมูลที่คุณบันทึกได้ทุกเมื่อ</li>
                <li>แก้ไขหรือลบข้อมูลที่ไม่ถูกต้องได้ทันที</li>
                <li>ล้างข้อมูลทั้งหมดได้ด้วยปุ่ม "ล้างข้อมูล" ในหน้า Mood Tracker</li>
                <li>หยุดใช้งานแอปพลิเคชันได้ทุกเมื่อ</li>
                <li>ลบแอปพลิเคชันออกจากอุปกรณ์เพื่อลบข้อมูลทั้งหมด</li>
              </ul>
              <div className="mt-4 p-4 bg-lavender-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>หมายเหตุ:</strong> เนื่องจากข้อมูลถูกเก็บในอุปกรณ์ของคุณเท่านั้น 
                  การควบคุมข้อมูลจึงอยู่ในมือของคุณโดยสมบูรณ์
                </p>
              </div>
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