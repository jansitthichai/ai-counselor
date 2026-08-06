import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '../../../../lib/auth'
import { getArticles, saveArticles } from '../../../../lib/storage'

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const articles = await getArticles()
    const article = articles.find((item) => item.id === params.id)

    if (!article) {
      return NextResponse.json({ error: 'ไม่พบบทความนี้' }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error('Error reading article:', error)
    return NextResponse.json(
      { error: 'ไม่สามารถดึงข้อมูลบทความได้' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const articleIndex = articles.findIndex((item) => item.id === params.id)

    if (articleIndex === -1) {
      return NextResponse.json({ error: 'ไม่พบบทความนี้' }, { status: 404 })
    }

    articles[articleIndex] = {
      ...articles[articleIndex],
      title,
      content,
      source,
      url,
      imageUrl: imageUrl || '',
      category,
      date,
      updatedAt: new Date().toISOString(),
    }

    await saveArticles(articles)
    return NextResponse.json(articles[articleIndex])
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json(
      { error: 'ไม่สามารถแก้ไขบทความได้' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const unauthorized = requireAdmin(request)
  if (unauthorized) return unauthorized

  try {
    const articles = await getArticles()
    const articleIndex = articles.findIndex((item) => item.id === params.id)

    if (articleIndex === -1) {
      return NextResponse.json({ error: 'ไม่พบบทความนี้' }, { status: 404 })
    }

    articles.splice(articleIndex, 1)
    await saveArticles(articles)

    return NextResponse.json({ message: 'ลบบทความสำเร็จ' })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json(
      { error: 'ไม่สามารถลบบทความได้' },
      { status: 500 }
    )
  }
}
