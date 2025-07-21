import { Article } from '@/lib/types'

// Mock database - ใช้ข้อมูลร่วมกันระหว่าง API routes
export let articles: Article[] = [
  {
    id: '1',
    title: 'รู้จัก 4 สารแห่งความสุข เปลี่ยนอารมณ์-สุขภาพใจให้ดีขึ้นได้',
    content: 'สารแห่งความสุขคือสารเคมีธรรมชาติที่สมองหลั่งออกมาเพื่อควบคุมอารมณ์ ความรู้สึก และภาวะจิตใจของเรา...',
    source: 'Gourmet & Cuisine',
    url: 'https://www.sanook.com/health/37349',
    imageUrl: 'https://s.isanook.com/he/0/ud/7/37349/dopamine.jpg?ip/crop/w1200h700/q80/webp',
    category: 'อาหารเพื่อสุขภาพจิต',
    date: '2024-03-15',
    author: 'ทีม AI เพื่อนที่ปรึกษา',
    tags: ['สารแห่งความสุข', 'สุขภาพจิต', 'อาหาร'],
    readTime: 5
  },
  {
    id: '2',
    title: 'โรคซึมเศร้าในวัยรุ่น',
    content: 'อาการที่บอกถึง โรคซึมเศร้าในวัยรุ่น และแนวทางเยียวยาใจ',
    source: 'Depression',
    url: 'https://ooca.co/blog/teen-depression',
    imageUrl: 'https://ooca.co/blog/wp-content/uploads/2024/03/0204-%E0%B8%AB%E0%B8%B1%E0%B8%A7%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%97%E0%B8%B5%E0%B9%88-11-12-01.webp',
    category: 'รู้ทันอาการซึมเศร้า',
    date: '2024-03-18',
    author: 'ทีม AI เพื่อนที่ปรึกษา',
    tags: ['วัยรุ่น', 'โรคซึมเศร้า', 'สุขภาพจิต'],
    readTime: 4
  },
  {
    id: '3',
    title: 'คิดมากเกินไป หยุดคิดไม่ได้',
    content: 'คิดมากเกินไป หยุดคิดไม่ได้ อยากปล่อยวางทำยังไงดี มาหาคำตอบกัน!...',
    source: 'Sleep & Health',
    url: 'https://ooca.co/blog/overthinking',
    imageUrl: 'https://ooca.co/blog/wp-content/uploads/2025/06/overthinking.webp',
    category: 'การจัดการความเครียด',
    date: '2025-06-10',
    author: 'ทีม AI เพื่อนที่ปรึกษา',
    tags: ['คิดมาก', 'ความเครียด', 'การผ่อนคลาย'],
    readTime: 6
  },
  {
    id: '4',
    title: 'วิธีจัดการความเครียดในชีวิตประจำวัน',
    content: 'ความเครียดเป็นส่วนหนึ่งของชีวิตที่หลีกเลี่ยงไม่ได้ แต่เราสามารถเรียนรู้วิธีจัดการกับมันได้...',
    source: 'Health & Wellness',
    url: 'https://www.healthline.com/mental-health/stress-management',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    category: 'การจัดการความเครียด',
    date: '2024-03-20',
    author: 'ทีม AI เพื่อนที่ปรึกษา',
    tags: ['ความเครียด', 'สุขภาพจิต', 'การผ่อนคลาย'],
    readTime: 7
  },
  {
    id: '5',
    title: 'เทคนิคการนอนหลับให้ดีขึ้น',
    content: 'การนอนหลับที่มีคุณภาพเป็นสิ่งสำคัญสำหรับสุขภาพกายและใจ...',
    source: 'Sleep Foundation',
    url: 'https://www.sleepfoundation.org/sleep-hygiene',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800',
    category: 'การนอนหลับ',
    date: '2024-03-22',
    author: 'ทีม AI เพื่อนที่ปรึกษา',
    tags: ['การนอนหลับ', 'สุขภาพ', 'การผ่อนคลาย'],
    readTime: 6
  },
  {
    id: '6',
    title: 'การฝึกสมาธิเบื้องต้น',
    content: 'การฝึกสมาธิเป็นวิธีที่ดีในการพัฒนาสุขภาพจิตและลดความเครียด...',
    source: 'Mindful',
    url: 'https://www.mindful.org/how-to-meditate/',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    category: 'การฝึกสมาธิ',
    date: '2024-03-25',
    author: 'ทีม AI เพื่อนที่ปรึกษา',
    tags: ['สมาธิ', 'การผ่อนคลาย', 'สุขภาพจิต'],
    readTime: 8
  },
  {
    id: '7',
    title: 'การรับมือกับความวิตกกังวล',
    content: 'ความวิตกกังวลเป็นความรู้สึกที่เกิดขึ้นได้กับทุกคน แต่เมื่อมันรบกวนชีวิตประจำวัน...',
    source: 'Anxiety & Depression Association',
    url: 'https://adaa.org/living-with-anxiety/managing-anxiety',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    category: 'การจัดการความวิตกกังวล',
    date: '2024-03-28',
    author: 'ทีม AI เพื่อนที่ปรึกษา',
    tags: ['ความวิตกกังวล', 'สุขภาพจิต', 'การจัดการอารมณ์'],
    readTime: 9
  },
  {
    id: '1753111552372',
    title: 'รู้สึกเศร้า อยากร้องไห้บ่อย ๆ แก้ไขได้!',
    content: 'รู้สึกเศร้า อยากร้องไห้ ไม่มีสาเหตุ? อารมณ์ดิ่ง อยากร้องไห้บ่อยๆ จนรู้สึกไม่มีความสุข อาจเป็นสัญญาณเตือนของโรคซึมเศร้า มาทำความเข้าใจและเรียนรู้วิธีรับมือกับความรู้สึกเหล่านี้ไปด้วยกัน',
    source: 'xx',
    url: 'https://ooca.co/blog/sad-for-no-reason/',
    imageUrl: 'https://ooca.co/blog/wp-content/uploads/2025/01/%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%AA%E0%B8%B6%E0%B8%81%E0%B9%80%E0%B8%A8%E0%B8%A3%E0%B9%89%E0%B8%B2-01-2048x2048.jpg',
    category: 'การจัดการอารมณ์',
    date: '2025-07-21',
    author: 'ทีม AI เพื่อนที่ปรึกษา',
    tags: ['xx'],
    readTime: 1
  }
]

// Helper functions
export const addArticle = (article: Article) => {
  articles.push(article)
}

export const updateArticle = (id: string, updatedArticle: Article) => {
  const index = articles.findIndex(article => article.id === id)
  if (index !== -1) {
    articles[index] = updatedArticle
  }
}

export const deleteArticle = (id: string) => {
  const index = articles.findIndex(article => article.id === id)
  if (index !== -1) {
    articles.splice(index, 1)
  }
}

export const getArticleById = (id: string) => {
  return articles.find(article => article.id === id)
} 