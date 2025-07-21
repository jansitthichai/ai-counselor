import { NextRequest, NextResponse } from 'next/server'
import { Article } from '@/lib/types'
import { articles, addArticle } from '@/lib/articles-data'

// GET /api/articles - ดึงบทความทั้งหมด
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    
    let filteredArticles = [...articles]
    
    // Filter by category
    if (category && category !== 'ทั้งหมด') {
      filteredArticles = filteredArticles.filter(article => 
        article.category === category
      )
    }
    
    // Filter by search
    if (search) {
      filteredArticles = filteredArticles.filter(article =>
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.content.toLowerCase().includes(search.toLowerCase()) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())))
      )
    }
    
    return NextResponse.json({
      success: true,
      data: filteredArticles,
      total: filteredArticles.length
    })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาดในการดึงข้อมูลบทความ' },
      { status: 500 }
    )
  }
}

// POST /api/articles - เพิ่มลิงก์บทความใหม่
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, source, url, imageUrl, category, author, tags } = body
    
    // Validation
    if (!title || !content || !source || !url || !category) {
      return NextResponse.json(
        { success: false, error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      )
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      return NextResponse.json(
        { success: false, error: 'URL ไม่ถูกต้อง' },
        { status: 400 }
      )
    }
    
    // Create new article
    const newArticle: Article = {
      id: Date.now().toString(), // Simple ID generation
      title,
      content,
      source,
      url,
      imageUrl: imageUrl || '',
      category,
      date: new Date().toISOString().split('T')[0],
      author: author || 'ทีม AI เพื่อนที่ปรึกษา',
      tags: tags || [],
      readTime: Math.ceil(content.length / 200) // Estimate read time
    }
    
    addArticle(newArticle)
    
    return NextResponse.json({
      success: true,
      data: newArticle,
      message: 'เพิ่มลิงก์บทความสำเร็จ'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาดในการเพิ่มลิงก์บทความ' },
      { status: 500 }
    )
  }
} 