'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateResponse, getExpertAnalysis } from '../../lib/gemini'

interface Message {
  role: 'user' | 'assistant'
  content: string
  expertInfo?: {
    source: 'rule' | 'prompt' | 'gemini'
    category: string
    confidence: number
  }
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'สวัสดีครับ/ค่ะ ผมเป็น AI เพื่อนที่ปรึกษา ยินดีที่จะพูดคุยและให้คำแนะนำกับคุณ\nคุณสามารถถามคำถามเกี่ยวกับสุขภาพจิต เทคโนโลยี การศึกษาต่อหรือเรื่องทั่วไปได้เลยครับ',
      expertInfo: {
        source: 'rule',
        category: 'general',
        confidence: 1.0
      }
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    console.log('Chat page loaded')
    console.log('API Key exists:', !!process.env.GOOGLE_AI_API_KEY)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      console.log('Sending message:', input)
      
      const expertAnalysis = getExpertAnalysis(input)
      console.log('Expert analysis:', expertAnalysis)
      
      const response = await generateResponse(input)
      console.log('Received response:', response)
      
      const aiResponse: Message = {
        role: 'assistant',
        content: response,
        expertInfo: {
          source: expertAnalysis.source,
          category: expertAnalysis.category,
          confidence: expertAnalysis.confidence
        }
      }
      
      setMessages(prev => [...prev, aiResponse])
    } catch (error) {
      console.error('Error in handleSubmit:', error)
      const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ'
      setError(errorMessage)
      
      const errorResponse: Message = {
        role: 'assistant',
        content: errorMessage,
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
  }

  if (error) {
    console.error('Error state:', error)
  }

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'rule': return 'คำตอบจากฐานข้อมูล'
      case 'prompt': return 'คำตอบจาก AI ผู้เชี่ยวชาญ'
      case 'gemini': return 'คำตอบจาก AI ทั่วไป'
      default: return 'คำตอบจากระบบ'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'medical': return 'สุขภาพจิต'
      case 'education': return 'การศึกษา'
      case 'technical': return 'เทคโนโลยี'
      case 'general': return 'ทั่วไป'
      default: return category
    }
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.8
              }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className={`max-w-[70%] rounded-lg p-4 shadow-md ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.content.split('\n').map((line, lineIndex) => (
                  <motion.div
                    key={lineIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: lineIndex * 0.15,
                      duration: 0.5,
                      ease: "easeOut"
                    }}
                    className="mb-2 last:mb-0"
                  >
                    {line || <br />}
                  </motion.div>
                ))}
                
                {message.role === 'assistant' && message.expertInfo && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500"
                  >
                    <div className="flex items-center justify-between">
                      <span>{getSourceLabel(message.expertInfo.source)}</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {getCategoryLabel(message.expertInfo.category)}
                      </span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 rounded-lg p-4 shadow-md">
              <div className="flex space-x-2">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.4, ease: "easeInOut" }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.8, ease: "easeInOut" }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-red-500 text-center text-sm mt-2"
          >
            {error}
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <motion.form
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onSubmit={handleSubmit}
        className="p-4 border-t"
      >
        <div className="flex space-x-4">
          <motion.input
            ref={inputRef}
            whileFocus={{ scale: 1.01 }}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="พิมพ์ข้อความของคุณ..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            disabled={isLoading}
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'กำลังส่ง...' : 'ส่ง'}
          </motion.button>
        </div>
      </motion.form>
    </div>
  )
} 