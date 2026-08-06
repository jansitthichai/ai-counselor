import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '../../../lib/auth'
import { getArticles, saveArticles, ArticleRecord } from '../../../lib/storage'

export async function GET() {
  try {
    const articles = await getArticles()
    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error reading articles:', error)
    return NextResponse.json(
      { error: 'ไม่สามารถดึงข้อมูลบทความได้' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = requireAdmin(request)
  if (unauthorized) return unauthorized

  try {
    const body = await request.json()
    const { title, content, source, url, imageUrl, category, date } = body

    if (!title || !content || !source || !url || !category || !date) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      )
    }

    const articles = await getArticles()

    const newArticle: ArticleRecord = {
      id: Date.now().toString(),
      title,
      content,
      source,
      url,
      imageUrl: imageUrl || '',
      category,
      date,
      createdAt: new Date().toISOString(),
    }

    articles.push(newArticle)
    await saveArticles(articles)

    return NextResponse.json(newArticle, { status: 201 })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: 'ไม่สามารถเพิ่มบทความได้' },
      { status: 500 }
    )
  }
}
