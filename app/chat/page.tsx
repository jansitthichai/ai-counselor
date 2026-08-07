'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { HiOutlineUser, HiOutlineSparkles } from 'react-icons/hi2'
import { APP_CONFIG } from '../../lib/constants'
import { appendEmotionLog } from '../../lib/wellbeing-storage'
import type { RecommendationItem } from '../../lib/wellbeing-types'

interface AgentPanel {
  emotionLabel: string
  stressLevel: string
  riskLevel: string
  recommendations: RecommendationItem[]
  motivation: string
  actionsTaken: string[]
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  expertInfo?: {
    source: 'rule' | 'prompt' | 'gemini'
    category: string
    confidence: number
  }
  isCrisis?: boolean
  agent?: AgentPanel
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content:
    'สวัสดีครับ/ค่ะ ผมคือ เพื่อนคู่ใจมายด์แคร์ — เพื่อนสุขภาวะทางอารมณ์ของคุณ\nเมื่อคุณเล่าอะไร ผมจะช่วยวิเคราะห์อารมณ์ แนะนำกิจกรรม และเชื่อมต่อความช่วยเหลือเมื่อเหมาะสม (ไม่ใช่การวินิจฉัยโรค)\nวันนี้รู้สึกอย่างไรครับ?',
  expertInfo: {
    source: 'rule',
    category: 'general',
    confidence: 1.0,
  },
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showCrisisBanner, setShowCrisisBanner] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const conversationHistory = useMemo(() => {
    return messages
      .slice(1)
      .map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))
      .filter((msg) => msg.content && msg.content.trim() !== '')
  }, [messages])

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100)
    return () => clearTimeout(timer)
  }, [])

  const scrollToBottom = useCallback(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!input.trim() || isLoading) return

      const userMessage: Message = { role: 'user', content: input }
      setMessages((prev) => [...prev, userMessage])
      setInput('')
      setIsLoading(true)
      setError(null)
      setTimeout(scrollToBottom, 100)

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: userMessage.content,
            conversationHistory,
          }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'เกิดข้อผิดพลาดในการสนทนา')
        if (!data.message?.trim()) throw new Error('AI ไม่ส่งคำตอบกลับมา')

        if (data.isCrisis || data.agent?.shouldShowEmergency) {
          setShowCrisisBanner(true)
        }

        if (data.agent?.emotion) {
          appendEmotionLog({
            primary: data.agent.emotion.primary,
            thaiLabel: data.agent.emotion.thaiLabel,
            stressScore: data.agent.stress.score,
            riskLevel: data.agent.risk.level,
            happinessProxy: data.happinessProxy ?? 50,
            sleepProxy: data.sleepProxy ?? 50,
            source: 'agent-chat',
            createdAt: new Date().toISOString(),
          })
        }

        const aiResponse: Message = {
          role: 'assistant',
          content: data.message,
          expertInfo: data.expertInfo,
          isCrisis: Boolean(data.isCrisis),
          agent: data.agent
            ? {
                emotionLabel: data.agent.emotion.thaiLabel,
                stressLevel: data.agent.stress.level,
                riskLevel: data.agent.risk.level,
                recommendations: data.agent.recommendations || [],
                motivation: data.agent.motivation,
                actionsTaken: data.agent.actionsTaken || [],
              }
            : undefined,
        }

        setMessages((prev) => [...prev, aiResponse])
        setTimeout(scrollToBottom, 100)
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ'
        setError(errorMessage)
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `ขออภัยครับ/ค่ะ ${errorMessage}`,
            expertInfo: { source: 'gemini', category: 'error', confidence: 0 },
          },
        ])
      } finally {
        setIsLoading(false)
      }
    },
    [input, isLoading, conversationHistory, scrollToBottom]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        if (!isLoading && input.trim()) {
          handleSubmit(e as unknown as React.FormEvent)
        }
      }
    },
    [input, isLoading, handleSubmit]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value)
      const textarea = e.target
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
    },
    []
  )

  const clearChat = useCallback(() => {
    setMessages([INITIAL_MESSAGE])
    setError(null)
    setIsLoading(false)
    setShowCrisisBanner(false)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50/80 via-white to-sky-50/40 flex flex-col -mx-4 sm:-mx-6 lg:-mx-8 -my-4 md:-my-8">
      <div className="bg-white/90 backdrop-blur border-b border-brand-100 p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-lg font-semibold text-slate-800">
              เพื่อนคู่ใจมายด์แคร์
            </h1>
            <p className="text-xs text-brand-700">เพื่อนสุขภาวะทางอารมณ์ · Agentic chat</p>
          </div>
          <button
            onClick={clearChat}
            className="text-coral-700 hover:text-coral-800 text-sm px-3 py-2 rounded-xl hover:bg-coral-50 border border-coral-200"
          >
            ล้างการสนทนา
          </button>
        </div>
      </div>

      {showCrisisBanner && (
        <div className="bg-coral-600 text-white px-4 py-3 sticky top-[65px] z-10">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-sm font-medium">
              หากคุณกำลังอยู่ในภาวะอันตราย กรุณาติดต่อความช่วยเหลือทันที
            </p>
            <div className="flex gap-2">
              <a
                href={`tel:${APP_CONFIG.contact.hotline}`}
                className="inline-flex items-center justify-center bg-white text-coral-700 font-semibold px-4 py-2 rounded-lg text-sm"
              >
                โทร {APP_CONFIG.contact.hotline}
              </a>
              <Link
                href="/emergency"
                className="inline-flex items-center justify-center border border-white px-4 py-2 rounded-lg text-sm"
              >
                Emergency
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 space-y-6 pb-36">
        <AnimatePresence>
          {messages.map((message, index) =>
            message.role === 'user' ? (
              <div key={index} className="flex justify-end">
                <div className="max-w-[80%] flex items-end space-x-3">
                  <div className="bg-gradient-to-br from-coral-400 to-sky-400 text-white px-4 py-2.5 rounded-2xl shadow-sm">
                    <div className="whitespace-pre-wrap break-words">
                      {message.content}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-coral-100 flex items-center justify-center flex-shrink-0">
                    <HiOutlineUser className="w-5 h-5 text-coral-600" />
                  </div>
                </div>
              </div>
            ) : (
              <div key={index} className="flex justify-start">
                <div className="w-full flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                    <HiOutlineSparkles className="w-5 h-5 text-brand-700" />
                  </div>
                  <div className="flex-1 max-w-[85%] space-y-3">
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.isCrisis
                          ? 'bg-coral-50 border border-coral-200'
                          : 'bg-white/90 border border-brand-100 shadow-sm'
                      }`}
                    >
                      <div className="whitespace-pre-wrap break-words text-slate-800">
                        {message.content}
                      </div>
                    </div>
                    {message.agent && (
                      <div className="rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50/80 to-sky-50/60 p-3 text-sm space-y-2">
                        <p className="font-semibold text-brand-900">
                          Agent actions
                        </p>
                        <p className="text-brand-900">
                          อารมณ์: {message.agent.emotionLabel} · Stress:{' '}
                          {message.agent.stressLevel} · Risk:{' '}
                          {message.agent.riskLevel}
                        </p>
                        <p className="text-brand-800 italic">
                          “{message.agent.motivation}”
                        </p>
                        {message.agent.recommendations.length > 0 && (
                          <ul className="space-y-1">
                            {message.agent.recommendations.map((r) => (
                              <li key={r.id}>
                                {r.href ? (
                                  <Link
                                    href={r.href}
                                    className="text-brand-700 underline"
                                  >
                                    {r.title}
                                  </Link>
                                ) : (
                                  r.title
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </AnimatePresence>
        {isLoading && (
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
              <HiOutlineSparkles className="w-5 h-5 text-brand-700" />
            </div>
            <div className="flex items-center space-x-1 pt-2">
              <div className="w-2 h-2 bg-brand-300 rounded-full animate-bounce" />
              <div
                className="w-2 h-2 bg-sky-300 rounded-full animate-bounce"
                style={{ animationDelay: '0.1s' }}
              />
              <div
                className="w-2 h-2 bg-coral-300 rounded-full animate-bounce"
                style={{ animationDelay: '0.2s' }}
              />
            </div>
          </div>
        )}
        {error && <div className="text-coral-600 text-center text-sm">{error}</div>}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-brand-100 p-4 z-10"
      >
        <div className="max-w-4xl mx-auto flex items-center space-x-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="เล่าความรู้สึกได้เลย เช่น ผมสอบตกครับ..."
            className="flex-1 border border-brand-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white"
            style={{ minHeight: '44px', maxHeight: '120px' }}
            disabled={isLoading}
            rows={1}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-brand-600 text-white px-4 py-3 rounded-2xl hover:bg-brand-700 disabled:opacity-50 h-[52px] shadow-sm"
          >
            ส่ง
          </button>
        </div>
        <p className="max-w-4xl mx-auto mt-2 text-xs text-slate-500 text-center">
          STRMindCare อาจมีข้อผิดพลาด · ไม่ใช่การวินิจฉัยโรค · สายด่วน{' '}
          {APP_CONFIG.contact.hotline}
        </p>
      </form>
    </div>
  )
}
