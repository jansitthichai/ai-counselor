'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaBookmark, FaShare, FaHeart } from 'react-icons/fa'

interface Article {
  id: string
  title: string
  content: string
  source: string
  url: string
  imageUrl: string
  category: string
  date: string
}

// ข้อมูลบทความจริงจากแหล่งที่น่าเชื่อถือ
const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'รู้จัก 4 สารแห่งความสุข เปลี่ยนอารมณ์-สุขภาพใจให้ดีขึ้นได้',
    content: 'สารแห่งความสุขคือสารเคมีธรรมชาติที่สมองหลั่งออกมาเพื่อควบคุมอารมณ์ ความรู้สึก และภาวะจิตใจของเรา...',
    source: 'Gourmet & Cuisine',
    url: 'https://www.sanook.com/health/37349',
    imageUrl: 'https://s.isanook.com/he/0/ud/7/37349/dopamine.jpg?ip/crop/w1200h700/q80/webp',
    category: 'อาหารเพื่อสุขภาพจิต',
    date: '2024-03-15'
  },
  {
    id: '2',
    title: 'โรคซึมเศร้าในวัยรุ่น',
    content: 'อาการที่บอกถึง โรคซึมเศร้าในวัยรุ่น และแนวทางเยียวยาใจ',
    source: 'Depression',
    url: 'https://ooca.co/blog/teen-depression',
    imageUrl: 'https://ooca.co/blog/wp-content/uploads/2024/03/0204-%E0%B8%AB%E0%B8%B1%E0%B8%A7%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%97%E0%B8%B5%E0%B9%88-11-12-01.webp',
    category: 'รู้ทันอาการซึมเศร้า',
    date: '2024-03-18'
  },
  {
    id: '3',
    title: 'คิดมากเกินไป หยุดคิดไม่ได้',
    content: 'คิดมากเกินไป หยุดคิดไม่ได้ อยากปล่อยวางทำยังไงดี มาหาคำตอบกัน!...',
    source: 'Sleep & Health',
    url: 'https://ooca.co/blog/overthinking',
    imageUrl: 'https://ooca.co/blog/wp-content/uploads/2025/06/overthinking.webp',
    category: 'การจัดการความเครียด',
    date: '2025-06-10'
  },
  {
    id: '4',
    title: 'ยาโรคซึมเศร้า หรือยาต้านเศร้า มีแบบไหนบ้าง มีผลข้างเคียงไหม',
    content: 'การใช้ยาต้านเศร้าเป็นแนวทางหนึ่งในการดูแลผู้ที่เผชิญกับโรคซึมเศร้า ช่วยปรับสมดุลสารเคมีในสมอง ฟื้นฟูอารมณ์...',
    source: 'Antidepressants',
    url: 'https://ooca.co/blog/antidepressants',
    imageUrl: 'https://ooca.co/blog/wp-content/uploads/2025/05/antidepressants-for-depression.webp',
    category: 'ยาต้านเศร้า',
    date: '2025-05-19'
  },
  {
    id: '5',
    title: 'รู้สึกเศร้า อยากร้องไห้บ่อย ๆ แก้ไขได้!',
    content: 'รู้สึกเศร้า อยากร้องไห้ ไม่มีสาเหตุ? อารมณ์ดิ่ง อยากร้องไห้บ่อยๆ จนรู้สึกไม่มีความสุข อาจเป็นสัญญาณเตือนของโรคซึมเศร้า...',
    source: 'Depression',
    url: 'https://ooca.co/blog/sad-for-no-reason',
    imageUrl: 'https://ooca.co/blog/wp-content/uploads/2025/01/%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%AA%E0%B8%B6%E0%B8%81%E0%B9%80%E0%B8%A8%E0%B8%A3%E0%B9%89%E0%B8%B2-01-2048x2048.jpg',
    category: 'รู้ทันอาการซึมเศร้า',
    date: '2025-01-10'
  },
  {
    id: '6',
    title: 'dTMS นวัตกรรมรักษาโรคซึมเศร้าและ OCD ปลอดภัย มีประสิทธิภาพ',
    content: 'ในยุคที่โรคทางจิตเวชเป็นปัญหาสำคัญทั่วโลก การค้นพบวิธีการรักษาใหม่ๆ ที่มีประสิทธิภาพและปลอดภัยจึงเป็นสิ่งที่น่าสนใจ หนึ่งในนวัตกรรมล่าสุดที่ได้รับความสนใจคือ dTMS หรือ Deep Transcranial Magnetic Stimulation...',
    source: 'Innovation',
    url: 'https://ooca.co/blog/dtms-treatment-depression-ocd',
    imageUrl: 'https://ooca.co/blog/wp-content/uploads/2024/07/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%82%E0%B8%A2%E0%B8%8A%E0%B8%99%E0%B9%8C%E0%B8%82%E0%B8%AD%E0%B8%87-dTMS-%E0%B9%83%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A3%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%88%E0%B8%B4%E0%B8%95-%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%81%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%81%E0%B8%9E%E0%B8%97%E0%B8%A2%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%A3%E0%B8%B9%E0%B9%89.webp',
    category: 'รู้ทันอาการซึมเศร้า',
    date: '2024-08-31'
  },
  {
    id: '7',
    title: 'วิธีการรักษาโรคซึมเศร้า มีกี่แบบ มีวิธีอะไรบ้าง',
    content: 'การรักษาโรคซึมเศร้ามีหลายวิธี เช่น การใช้ยาร่วมกับจิตบำบัด เช่น CBT หรือการกระตุ้นด้วยแม่เหล็กผ่าน TMS หรือ ECT ยังมียาแก้ซึมเศร้าต่าง ๆ...',
    source: 'Family & Health',
    url: 'https://ooca.co/blog/depression-treatments',
    imageUrl: 'https://ooca.co/blog/wp-content/uploads/2024/04/0202-%E0%B8%AB%E0%B8%B1%E0%B8%A7%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%97%E0%B8%B5%E0%B9%88-9-10-01.webp',
    category: 'ความสัมพันธ์',
    date: '2024-03-09'
  },
  {
    id: '8',
    title: 'การใช้สื่อโซเชียลอย่างมีสติ ในการรับมือกับสุขภาพจิต',
    content: 'ธีสำคัญในการบริหารเวลาและสร้างสุขภาพจิตที่ดี ใช้สื่อโซเชียลอย่างมีสติ อ่านบทความเพื่อรู้จักกับการกำหนดขอบเขตในการใช้งานโซเชียลมีเดีย...',
    source: 'Emotional Health',
    url: 'https://ooca.co/blog/social-media-mental-health-2',
    imageUrl: 'https://ooca.co/blog/wp-content/uploads/2023/08/0803-%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B8%AA%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B9%82%E0%B8%8B%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B8%A2%E0%B8%A5.06-01.webp',
    category: 'การจัดการอารมณ์',
    date: '2023-08-06'
  },
  {
    id: '9',
    title: 'การรับมือกับความเศร้าโศกและความสูญเสีย',
    content: 'พบวิธีการรับมือกับความเศร้าโศกและความสูญเสียที่ช่วยให้คุณสามารถฟื้นตัวและก้าวผ่านพ้นความเจ็บปวดได้อย่างมั่นใจ แล้วเริ่มต้นใหม่ไปพร้อมกัน ...',
    source: 'Depression',
    url: 'https://www.elderlyhealth.com/mental/505',
    imageUrl: 'https://ooca.co/blog/wp-content/uploads/2023/07/0621-%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B9%80%E0%B8%A8%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B9%82%E0%B8%A8%E0%B8%81-01.webp',
    category: 'รู้ทันอาการซึมเศร้า',
    date: '2023-07-01'
  },
  {
    id: '10',
    title: 'วิธีช่วยเพื่อนที่มีอาการซึมเศร้า: คำแนะนำและการสนับสนุน',
    content: 'เรียนรู้วิธีช่วยเหลือและสนับสนุนเพื่อนที่มีอาการซึมเศร้า (Depression) เพื่อให้พวกเขารู้สึกมีคุณค่าและได้รับการดูแลที่เหมาะสม...',
    source: 'Depression',
    url: 'https://ooca.co/blog/depressfriend',
    imageUrl: 'https://ooca.co/blog/wp-content/uploads/2021/07/SEO__SEO_Size1.webp',
    category: 'วิธีช่วยเพื่อน',
    date: '2021-07-16'
  }
]

export default function ResourcesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // จำลองการโหลดข้อมูล
    setTimeout(() => {
      setArticles(sampleArticles)
      setIsLoading(false)
    }, 1000)
  }, [])

  const categories = [
    'ทั้งหมด',
    'การจัดการความเครียด',
    'การฝึกสติ',
    'อาหารเพื่อสุขภาพจิต',
    'การออกกำลังกาย',
    'การนอนหลับ',
    'สุขภาพจิตวัยรุ่น',
    'ความสัมพันธ์',
    'การจัดการอารมณ์',
    'สุขภาพจิตผู้สูงอายุ',
    'สมดุลชีวิต'
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">แหล่งข้อมูลสุขภาพจิต</h1>
          <p className="text-lg text-gray-600">
            บทความและข้อมูลที่เป็นประโยชน์สำหรับการดูแลสุขภาพจิต
          </p>
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
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
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
                  <span>{article.source}</span>
                  <span>{new Date(article.date).toLocaleDateString('th-TH')}</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lavender-600 hover:text-lavender-700 font-medium"
                  >
                    อ่านเพิ่มเติม
                  </a>
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