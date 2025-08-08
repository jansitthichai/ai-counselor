'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaClock, FaUserGraduate, FaUserMd, FaHospital, FaPhoneAlt } from 'react-icons/fa'
import { formatPhoneNumber, isValidPhoneNumber } from '../../lib/utils'

interface ContactInfo {
  id: string
  title: string
  description: string
  phone?: string
  email?: string
  website?: string
  address?: string
  hours?: string
  icon: React.ReactNode
  category: 'guidance' | 'psychologist' | 'hotline' | 'hospital'
}

const contactData: ContactInfo[] = [
  // ครูแนะแนว
  {
    id: '1',
    title: 'ครูแนะแนวในโรงเรียน',
    description: 'ครูแนะแนวในโรงเรียนของคุณสามารถให้คำแนะนำเกี่ยวกับการศึกษาและปัญหาส่วนตัวได้',
    phone: '0934662923, 0611611374',
    hours: 'จันทร์-ศุกร์ 8:00-16:00 น.',
    icon: <FaUserGraduate className="text-2xl" />,
    category: 'guidance'
  },
  {
    id: '2',
    title: 'ศูนย์แนะแนวการศึกษา',
    description: 'ศูนย์การพัฒนาระบบการแนะแนวการศึกษาของ สพฐ, ให้บริการปรึกษาเรื่องการศึกษาและอาชีพ',
    phone: '02-2885753',
    website: 'http://www.guidestudent.obec.go.th',
    email: 'obeccareer@gmail.com',
    hours: 'จันทร์-ศุกร์ 9:00-17:00 น.',
    icon: <FaUserGraduate className="text-2xl" />,
    category: 'guidance'
  },

  // นักจิตวิทยา
  {
    id: '3',
    title: 'สมาคมนักจิตวิทยาแห่งประเทศไทย',
    description: 'ให้บริการปรึกษาปัญหาสุขภาพจิตและแนะนำนักจิตวิทยาที่เหมาะสม',
    phone: '094 4400 494',
    email: 'tpa.thailand@hotmail.com',
    website: 'https://thaipsychological.com',
    hours: 'จันทร์-ศุกร์ 9:00-17:00 น.',
    icon: <FaUserMd className="text-2xl" />,
    category: 'psychologist'
  },
  {
    id: '4',
    title: 'สมาคมจิตวิทยาการปรึกษาแห่งประเทศไทย',
    description: 'ให้บริการปรึกษาปัญหาสุขภาพจิตและแนะนำนักจิตวิทยาที่เหมาะสม',
    phone: '091 730 3297',
    email: 'thaicounseling@gmail.com',
    website: 'https://www.thaicounseling.org',
    hours: 'จันทร์-อาทิตย์ 9:00-20:00 น.',
    icon: <FaUserMd className="text-2xl" />,
    category: 'psychologist'
  },

  // สายด่วนสุขภาพจิต
  {
    id: '5',
    title: 'สายด่วนสุขภาพจิต 1323',
    description: 'สายด่วนให้คำปรึกษาปัญหาสุขภาพจิต 24 ชั่วโมง',
    phone: '1323',
    hours: '24 ชั่วโมง',
    icon: <FaPhoneAlt className="text-2xl" />,
    category: 'hotline'
  },
  {
    id: '6',
    title: 'สายด่วนกรมสุขภาพจิต 1667',
    description: 'สายด่วนกรมสุขภาพจิตให้คำปรึกษาปัญหาสุขภาพจิต',
    phone: '1667',
    hours: '24 ชั่วโมง',
    icon: <FaPhoneAlt className="text-2xl" />,
    category: 'hotline'
  },
  {
    id: '7',
    title: 'สายด่วนป้องกันการฆ่าตัวตาย 02-713-6793',
    description: 'สายด่วนเฉพาะกิจสำหรับผู้ที่มีความคิดฆ่าตัวตาย',
    phone: '02-713-6793',
    hours: '24 ชั่วโมง',
    icon: <FaPhoneAlt className="text-2xl" />,
    category: 'hotline'
  },

  // โรงพยาบาลจิตเวช
  {
    id: '8',
    title: 'โรงพยาบาลศรีธัญญา',
    description: 'โรงพยาบาลจิตเวชของรัฐ ให้บริการรักษาผู้ป่วยจิตเวช',
    phone: '02 528 7800',
    address: 'ถนนติวานนท์ อำเภอเมือง จังหวัดนนทบุรี',
    email: 'srithany@srithanya.go.th',
    website: 'https://www.srithanya.go.th',
    hours: 'จันทร์-ศุกร์ 8:00-16:00 น.',
    icon: <FaHospital className="text-2xl" />,
    category: 'hospital'
  },
  {
    id: '9',
    title: 'โรงพยาบาลสมเด็จเจ้าพระยา',
    description: 'โรงพยาบาลจิตเวชของรัฐ ให้บริการรักษาผู้ป่วยจิตเวช',
    phone: '02-442-2500',
    address: 'ถนนสมเด็จเจ้าพระยา เขตคลองสาน กรุงเทพฯ',
    website: 'https://www.somdet.go.th',
    email: 'somdet_chaopraya@somdet.go.th',
    hours: 'จันทร์-ศุกร์ 8:00-16:00 น.',
    icon: <FaHospital className="text-2xl" />,
    category: 'hospital'
  },
  {
    id: '10',
    title: 'โรงพยาบาลจิตเวชขอนแก่นราชนครินทร์',
    description: 'โรงพยาบาลจิตเวชในภาคอีสาน ให้บริการรักษาผู้ป่วยจิตเวช',
    phone: '043 209 999',
    address: 'อำเภอเมือง จังหวัดขอนแก่น',
    hours: 'จันทร์-ศุกร์ 8:00-16:00 น.',
    icon: <FaHospital className="text-2xl" />,
    category: 'hospital'
  },
  {
    id: '11',
    title: 'โรงพยาบาลศรีมหาโพธิ์',
    description: 'โรงพยาบาลจิตเวชในจังหวัดอุบลราชธานี ให้บริการรักษาผู้ป่วยจิตเวช',
    phone: '037-279203, 037-279204',
    address: 'อำเภอเมือง จังหวัดอุบลราชธานี',
    website: 'https://smphospital.go.th',
    email: 'director.smph@gmail.com',
    hours: 'จันทร์-ศุกร์ 8:00-16:00 น.',
    icon: <FaHospital className="text-2xl" />,
    category: 'hospital'
  }
]

const categories = [
  { id: 'all', name: 'ทั้งหมด', icon: <FaPhoneAlt /> },
  { id: 'guidance', name: 'ครูแนะแนว', icon: <FaUserGraduate /> },
  { id: 'psychologist', name: 'นักจิตวิทยา', icon: <FaUserMd /> },
  { id: 'hotline', name: 'สายด่วน', icon: <FaPhoneAlt /> },
  { id: 'hospital', name: 'โรงพยาบาล', icon: <FaHospital /> }
]

export default function HelpPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredContacts = contactData.filter(contact => 
    selectedCategory === 'all' || contact.category === selectedCategory
  )

  const getCategoryName = useCallback((category: string) => {
    switch (category) {
      case 'guidance': return 'ครูแนะแนว'
      case 'psychologist': return 'นักจิตวิทยา'
      case 'hotline': return 'สายด่วน'
      case 'hospital': return 'โรงพยาบาล'
      default: return category
    }
  }, [])

  // Function to render phone numbers as clickable links
  const renderPhoneNumber = useCallback((phone: string) => {
    // Handle multiple phone numbers separated by commas
    const phoneNumbers = phone.split(',').map(p => p.trim())
    
    return phoneNumbers.map((phoneNumber, index) => {
      const cleanPhone = phoneNumber.replace(/[-\s]/g, '')
      const isEmergency = ['1323', '1667', '1669', '191', '199'].includes(cleanPhone)
      const isSuicideHotline = cleanPhone === '027136793'
      
      let linkClass = 'text-blue-600 hover:text-blue-800 font-medium underline cursor-pointer'
      let title = `โทรหา ${phoneNumber}`
      
      if (isEmergency) {
        linkClass = 'text-red-600 hover:text-red-800 font-bold underline cursor-pointer'
        title = `โทรฉุกเฉิน ${phoneNumber}`
      } else if (isSuicideHotline) {
        linkClass = 'text-red-700 hover:text-red-900 font-bold underline cursor-pointer'
        title = `สายด่วนป้องกันการฆ่าตัวตาย ${phoneNumber}`
      }
      
      return (
        <span key={index}>
          {index > 0 && ', '}
          <a
            href={`tel:${cleanPhone}`}
            className={linkClass}
            title={title}
            onClick={(e) => {
              e.preventDefault()
              window.location.href = `tel:${cleanPhone}`
            }}
          >
            {phoneNumber}
          </a>
        </span>
      )
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4 font-sarabun">ต้องการความช่วยเหลือ</h1>
          <p className="text-lg text-gray-600">ติดต่อผู้เชี่ยวชาญและหน่วยงานที่พร้อมให้ความช่วยเหลือคุณ</p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Emergency Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8"
        >
          <div className="flex items-center mb-3">
            <FaPhoneAlt className="text-red-500 text-xl mr-3" />
            <h3 className="text-lg font-semibold text-red-800">กรณีฉุกเฉิน</h3>
          </div>
          <p className="text-red-700 mb-3">
            หากคุณหรือคนใกล้ตัวมีความคิดฆ่าตัวตาย หรือต้องการความช่วยเหลือเร่งด่วน:
          </p>
          <div className="space-y-2">
            <p className="text-red-700 font-medium">
              สายด่วนป้องกันการฆ่าตัวตาย: 
              <a 
                href="tel:027136793" 
                className="text-red-700 hover:text-red-900 font-bold underline cursor-pointer ml-2"
                title="สายด่วนป้องกันการฆ่าตัวตาย"
              >
                02-713-6793
              </a>
            </p>
            <p className="text-red-700 font-medium">
              สายด่วนสุขภาพจิต: 
              <a 
                href="tel:1323" 
                className="text-red-700 hover:text-red-900 font-bold underline cursor-pointer ml-2"
                title="สายด่วนสุขภาพจิต"
              >
                1323
              </a>
            </p>
            <p className="text-red-700 font-medium">
              รถพยาบาลฉุกเฉิน: 
              <a 
                href="tel:1669" 
                className="text-red-700 hover:text-red-900 font-bold underline cursor-pointer ml-2"
                title="รถพยาบาลฉุกเฉิน"
              >
                1669
              </a>
            </p>
          </div>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 text-blue-600">
                  {contact.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">{contact.title}</h3>
                <p className="text-gray-600 text-center mb-4">{contact.description}</p>
                
                                 <div className="space-y-2">
                   {contact.phone && contact.id === '1' && (
                     <div className="space-y-2">
                                               <div className="flex items-center text-sm text-gray-600">
                          <FaPhone className="mr-2 text-blue-500 flex-shrink-0" />
                          <span className="font-medium">ครูสิริรัตน์ ฤทธิแสง: </span>
                          <a
                            href="tel:0934662923"
                            className="text-blue-600 hover:text-blue-800 font-medium underline cursor-pointer ml-1"
                            title="โทรหาครูสิริรัตน์"
                          >
                            0934662923
                          </a>
                        </div>
                       <div className="flex items-center text-sm text-gray-600">
                         <FaPhone className="mr-2 text-blue-500 flex-shrink-0" />
                         <span className="font-medium">ครูจิดาภา โคตรุฉิน: </span>
                         <a
                           href="tel:0611611374"
                           className="text-blue-600 hover:text-blue-800 font-medium underline cursor-pointer ml-1"
                           title="โทรหาครูจิดาภา"
                         >
                           0611611374
                         </a>
                       </div>
                     </div>
                   )}
                   {contact.phone && contact.id !== '1' && (
                     <div className="flex items-center text-sm text-gray-600">
                       <FaPhone className="mr-2 text-blue-500 flex-shrink-0" />
                       <span className="font-medium">
                         {renderPhoneNumber(contact.phone)}
                       </span>
                     </div>
                   )}
                  {contact.email && (
                    <div className="flex items-center text-sm text-gray-600">
                      <FaEnvelope className="mr-2 text-blue-500 flex-shrink-0" />
                      <a 
                        href={`mailto:${contact.email}`}
                        className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
                        title={`ส่งอีเมลถึง ${contact.email}`}
                      >
                        {contact.email}
                      </a>
                    </div>
                  )}
                  {contact.website && (
                    <div className="flex items-center text-sm text-gray-600">
                      <FaGlobe className="mr-2 text-blue-500 flex-shrink-0" />
                      <a 
                        href={contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline cursor-pointer break-all"
                        title={`เปิดเว็บไซต์ ${contact.website}`}
                      >
                        {contact.website}
                      </a>
                    </div>
                  )}
                  {contact.address && (
                    <div className="flex items-start text-sm text-gray-600">
                      <FaMapMarkerAlt className="mr-2 mt-1 text-blue-500 flex-shrink-0" />
                      <span>{contact.address}</span>
                    </div>
                  )}
                  {contact.hours && (
                    <div className="flex items-center text-sm text-gray-600">
                      <FaClock className="mr-2 text-blue-500 flex-shrink-0" />
                      <span>{contact.hours}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {getCategoryName(contact.category)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white rounded-lg p-6 mt-8 shadow-lg"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            คำแนะนำในการติดต่อ
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>เตรียมข้อมูลปัญหาที่ชัดเจนก่อนติดต่อ</li>
            <li>หากเป็นกรณีฉุกเฉิน ให้โทรสายด่วนทันที</li>
            <li>สำหรับปัญหาการศึกษา แนะนำให้ติดต่อครูแนะแนวในโรงเรียนก่อน</li>
            <li>หากต้องการปรึกษาปัญหาสุขภาพจิต แนะนำให้ติดต่อนักจิตวิทยาหรือจิตแพทย์</li>
            <li>ข้อมูลติดต่ออาจมีการเปลี่ยนแปลง กรุณาตรวจสอบกับหน่วยงานที่เกี่ยวข้อง</li>
            <li className="font-medium text-blue-600">💡 เคล็ดลับ: คลิกที่เบอร์โทรศัพท์เพื่อโทรออกได้ทันที!</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
} 