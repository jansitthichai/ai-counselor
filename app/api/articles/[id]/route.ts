import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'articles.json')

// สร้างโฟลเดอร์ data ถ้ายังไม่มี
const ensureDataDirectory = () => {
  const dataDir = path.dirname(dataFilePath)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// อ่านข้อมูลบทความ
const readArticles = () => {
  ensureDataDirectory()
  if (!fs.existsSync(dataFilePath)) {
    return []
  }
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading articles:', error)
    return []
  }
}

// เขียนข้อมูลบทความ
const writeArticles = (articles: any[]) => {
  ensureDataDirectory()
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(articles, null, 2))
  } catch (error) {
    console.error('Error writing articles:', error)
    throw error
  }
}

// GET - ดึงข้อมูลบทความเฉพาะ
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const articles = readArticles()
    const article = articles.find((article: any) => article.id === id)

    if (!article) {
      return NextResponse.json(
        { error: 'ไม่พบบทความนี้' },
        { status: 404 }
      )
    }

    return NextResponse.json(article)
  } catch (error) {
    return NextResponse.json(
      { error: 'ไม่สามารถดึงข้อมูลบทความได้' },
      { status: 500 }
    )
  }
}

// PUT - แก้ไขบทความ
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { title, content, source, url, imageUrl, category, date } = body

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!title || !content || !source || !url || !category || !date) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      )
    }

    const articles = readArticles()
    const articleIndex = articles.findIndex((article: any) => article.id === id)

    if (articleIndex === -1) {
      return NextResponse.json(
        { error: 'ไม่พบบทความนี้' },
        { status: 404 }
      )
    }

    // อัปเดตบทความ
    articles[articleIndex] = {
      ...articles[articleIndex],
      title,
      content,
      source,
      url,
      imageUrl: imageUrl || '',
      category,
      date,
      updatedAt: new Date().toISOString()
    }

    // บันทึกข้อมูล
    writeArticles(articles)

    return NextResponse.json(articles[articleIndex])
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json(
      { error: 'ไม่สามารถแก้ไขบทความได้' },
      { status: 500 }
    )
  }
}

// DELETE - ลบบทความ
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const articles = readArticles()
    const articleIndex = articles.findIndex((article: any) => article.id === id)

    if (articleIndex === -1) {
      return NextResponse.json(
        { error: 'ไม่พบบทความนี้' },
        { status: 404 }
      )
    }

    // ลบบทความ
    articles.splice(articleIndex, 1)

    // บันทึกข้อมูล
    writeArticles(articles)

    return NextResponse.json({ message: 'ลบบทความสำเร็จ' })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json(
      { error: 'ไม่สามารถลบบทความได้' },
      { status: 500 }
    )
  }
} 