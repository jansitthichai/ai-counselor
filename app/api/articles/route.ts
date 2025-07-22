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

// GET - ดึงข้อมูลบทความทั้งหมด
export async function GET() {
  try {
    const articles = readArticles()
    return NextResponse.json(articles)
  } catch (error) {
    return NextResponse.json(
      { error: 'ไม่สามารถดึงข้อมูลบทความได้' },
      { status: 500 }
    )
  }
}

// POST - เพิ่มบทความใหม่
export async function POST(request: NextRequest) {
  try {
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

    // สร้าง ID ใหม่
    const newId = Date.now().toString()

    // สร้างบทความใหม่
    const newArticle = {
      id: newId,
      title,
      content,
      source,
      url,
      imageUrl: imageUrl || '',
      category,
      date,
      createdAt: new Date().toISOString()
    }

    // เพิ่มบทความใหม่
    articles.push(newArticle)

    // บันทึกข้อมูล
    writeArticles(articles)

    return NextResponse.json(newArticle, { status: 201 })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: 'ไม่สามารถเพิ่มบทความได้' },
      { status: 500 }
    )
  }
} 