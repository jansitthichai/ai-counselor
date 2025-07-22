'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateResponse, getExpertAnalysis, testConversationHistory } from '../../lib/gemini'
import { HiOutlineUser, HiOutlineSparkles } from 'react-icons/hi2'
import { MdOutlineDeleteSweep } from 'react-icons/md'

interface Message {
  role: 'user' | 'assistant'
  content: string
  expertInfo?: {
    source: 'rule' | 'prompt' | 'gemini'
    category: string
    confidence: number
  }
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: 'สวัสดีครับ/ค่ะ ผมเป็น AI เพื่อนที่ปรึกษา ยินดีที่จะพูดคุยและให้คำแนะนำกับคุณ\nคุณสามารถปรึกษาเรื่องสุขภาพจิต, เรื่องเทคโนโลยี, เรื่องการเรียน หรือ เรื่องทั่วไปได้ มีอะไรให้ช่วยเหลือไหมครับ?',
  expertInfo: {
    source: 'rule',
    category: 'general',
    confidence: 1.0
  }
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Memoize conversation history
  const conversationHistory = useMemo(() => {
    return messages
      .slice(1) // Skip initial message
      .map(msg => ({
        role: msg.role,
        content: msg.content
      }))
      .filter(msg => msg.content && msg.content.trim() !== '')
  }, [messages])

  useEffect(() => {
    console.log('Chat page loaded')
    console.log('API Key exists:', !!process.env.GOOGLE_AI_API_KEY)
    
    // Focus input after component mounts
    const timer = setTimeout(() => {
      inputRef.current?.focus()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // ฟังก์ชันสำหรับ scroll ไปที่ล่างสุดแบบเรียบง่าย
  const scrollToBottom = useCallback(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    })
  }, [])

  // Typewriter effect แบบ ChatGPT


  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { 
      role: 'user', 
      content: input
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    // Scroll ไปที่ล่างสุดเมื่อส่งข้อความใหม่
    setTimeout(() => {
      scrollToBottom()
    }, 100)

    try {
      console.log('Sending message:', input)
      
      const expertAnalysis = getExpertAnalysis(input)
      console.log('Expert analysis:', expertAnalysis)
      
      console.log('Conversation history:', conversationHistory)
      testConversationHistory(conversationHistory)
      
      const response = await generateResponse(input, conversationHistory)
      console.log('Received response:', response)
      
      const aiResponse: Message = {
        role: 'assistant',
        content: response, // แสดงข้อความเต็มทันที
        expertInfo: {
          source: expertAnalysis.source,
          category: expertAnalysis.category,
          confidence: expertAnalysis.confidence
        }
      }
      
      setMessages(prev => [...prev, aiResponse])
      
      // Scroll ไปที่ล่างสุดเมื่อ AI ตอบเสร็จ
      setTimeout(() => {
        scrollToBottom()
      }, 100)
      
    } catch (error) {
      console.error('Error in handleSubmit:', error)
      const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ'
      setError(errorMessage)
      
      const errorResponse: Message = {
        role: 'assistant',
        content: `ขออภัยครับ/ค่ะ ${errorMessage}`,
        expertInfo: {
          source: 'gemini',
          category: 'error',
          confidence: 0
        }
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, conversationHistory, scrollToBottom])

  // ฟังก์ชันสำหรับจัดการการกดปุ่มใน textarea
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // ถ้ากด Enter โดยไม่กด Shift ให้ส่งข้อความ
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!isLoading && input.trim()) {
        handleSubmit(e as any)
      }
    }
    // ถ้ากด Shift+Enter ให้ขึ้นบรรทัดใหม่
    else if (e.key === 'Enter' && e.shiftKey) {
      // ไม่ต้องทำอะไร ให้ขึ้นบรรทัดใหม่ตามปกติ
    }
  }, [input, isLoading, handleSubmit])

  // ฟังก์ชันสำหรับปรับขนาด textarea อัตโนมัติ
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setInput(value)
    
    // ปรับขนาด textarea อัตโนมัติ
    const textarea = e.target
    textarea.style.height = 'auto'
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px' // จำกัดความสูงสูงสุดที่ 120px
  }, [])

  const clearChat = useCallback(() => {
    setMessages([INITIAL_MESSAGE])
    setError(null)
    setIsLoading(false)
  }, [])

  // Memoized helper functions
  const getSourceLabel = useCallback((source: string) => {
    switch (source) {
      case 'rule': return 'กฎการตอบ'
      case 'prompt': return 'คำแนะนำ'
      case 'gemini': return 'AI Gemini'
      default: return source
    }
  }, [])

  const getCategoryLabel = useCallback((category: string) => {
    switch (category) {
      case 'general': return 'ทั่วไป'
      case 'stress': return 'ความเครียด'
      case 'depression': return 'ภาวะซึมเศร้า'
      case 'anxiety': return 'ความวิตกกังวล'
      case 'relationship': return 'ความสัมพันธ์'
      case 'study': return 'การเรียน'
      case 'family': return 'ครอบครัว'
      case 'error': return 'ข้อผิดพลาด'
      default: return category
    }
  }, [])



  // Memoized message components
  const messageComponents = useMemo(() => {
    return messages.map((message, index) => {
      console.log(`Message ${index}:`, message.role, message.content.substring(0, 50))
      
      if (message.role === 'user') {
        return (
          <div key={index} data-message-index={index} className="flex justify-end">
            <div className="max-w-[80%] flex items-end space-x-3">
              <div className="bg-purple-600 text-white px-4 py-2 rounded-2xl max-w-full">
                <div className="whitespace-pre-wrap break-words">
                  {message.content}
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                <HiOutlineUser className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div key={index} data-message-index={index} className="flex justify-start">
            <div className="w-full flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <HiOutlineSparkles className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 max-w-[80%]">
                <div className="bg-gray-50 px-4 py-3 rounded-2xl">
                  <div className="whitespace-pre-wrap break-words text-gray-900">
                    {message.content}
                  </div>
                </div>
                {message.role === 'assistant' && message.expertInfo && (
                  <div className="mt-2 text-xs text-gray-500 flex items-center space-x-2">
                    <span>{getSourceLabel(message.expertInfo.source)}</span>
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                      {getCategoryLabel(message.expertInfo.category)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      }
    })
  }, [messages, getSourceLabel, getCategoryLabel])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header - เหมือน ChatGPT */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-900">
            AI เพื่อนที่ปรึกษา
          </h1>
          <button
            onClick={clearChat}
            className="text-red-600 hover:text-red-700 text-sm px-3 py-2 rounded-lg hover:bg-red-50 border border-red-200 hover:border-red-300 transition-colors font-medium"
          >
            ล้างการสนทนา
          </button>
        </div>
      </div>
      
      {/* Messages area - เหมือน ChatGPT */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 space-y-6 pb-32">
        <AnimatePresence>
          {messageComponents}
        </AnimatePresence>
        {isLoading && (
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <HiOutlineSparkles className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 flex items-center space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
        {error && (
          <div className="text-red-500 text-center text-sm">
            {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input form - เหมือน ChatGPT */}
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10"
      >
        <div className="max-w-4xl mx-auto flex items-center space-x-3">
          <div className="flex-1">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="ส่งข้อความ..."
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent chat-textarea"
              style={{ accentColor: 'transparent' }}
              disabled={isLoading}
              rows={1}
              style={{ 
                minHeight: '44px',
                maxHeight: '120px'
              }}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-purple-600 text-white px-4 py-3 rounded-2xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors h-[52px] min-h-[52px] flex items-center justify-center flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}