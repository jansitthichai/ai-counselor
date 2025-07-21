import { NextRequest, NextResponse } from 'next/server'
import { Article } from '@/lib/types'
import { articles, getArticleById, updateArticle, deleteArticle } from '@/lib/articles-data'

// GET /api/articles/[id] - ดึงบทความตาม ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const article = getArticleById(id)
    
    if (!article) {
      return NextResponse.json(
        { success: false, error: 'ไม่พบบทความที่ต้องการ' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: article
    })
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาดในการดึงข้อมูลบทความ' },
      { status: 500 }
    )
  }
}

// PUT /api/articles/[id] - แก้ไขบทความ
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
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
    
    const existingArticle = getArticleById(id)
    
    if (!existingArticle) {
      return NextResponse.json(
        { success: false, error: 'ไม่พบบทความที่ต้องการแก้ไข' },
        { status: 404 }
      )
    }
    
    // Update article
    const updatedArticle: Article = {
      ...existingArticle,
      title,
      content,
      source,
      url,
      imageUrl: imageUrl || '',
      category,
      author: author || 'ทีม AI เพื่อนที่ปรึกษา',
      tags: tags || [],
      readTime: Math.ceil(content.length / 200) // Recalculate read time
    }
    
    updateArticle(id, updatedArticle)
    
    return NextResponse.json({
      success: true,
      data: updatedArticle,
      message: 'แก้ไขลิงก์บทความสำเร็จ'
    })
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาดในการแก้ไขลิงก์บทความ' },
      { status: 500 }
    )
  }
}

// DELETE /api/articles/[id] - ลบบทความ
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const existingArticle = getArticleById(id)
    
    if (!existingArticle) {
      return NextResponse.json(
        { success: false, error: 'ไม่พบบทความที่ต้องการลบ' },
        { status: 404 }
      )
    }
    
    deleteArticle(id)
    
    return NextResponse.json({
      success: true,
      data: existingArticle,
      message: 'ลบลิงก์บทความสำเร็จ'
    })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาดในการลบลิงก์บทความ' },
      { status: 500 }
    )
  }
} 