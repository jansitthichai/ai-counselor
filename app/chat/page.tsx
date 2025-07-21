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
  isTyping?: boolean
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
    console.log('API Key exists:', !!process.env.GOOGLE_GEMINI_API_KEY)
    
    // Focus input after component mounts
    const timer = setTimeout(() => {
      inputRef.current?.focus()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // Optimized typewriter effect
  const typewriterEffect = useCallback((text: string, messageIndex: number) => {
    const lines = text.split('\n')
    let currentLineIndex = 0
    let currentCharIndex = 0
    let displayText = ''
    let isComplete = false

    const typeNextChar = () => {
      if (currentLineIndex < lines.length) {
        if (currentCharIndex < lines[currentLineIndex].length) {
          displayText += lines[currentLineIndex][currentCharIndex]
          currentCharIndex++
        } else {
          displayText += '\n'
          currentLineIndex++
          currentCharIndex = 0
        }

        setMessages(prev => prev.map((msg, idx) => 
          idx === messageIndex && msg.role === 'assistant'
            ? { ...msg, content: displayText, isTyping: !isComplete }
            : msg
        ))

        if (currentLineIndex < lines.length || currentCharIndex > 0) {
          let delay = 30
          
          if (lines[currentLineIndex] && lines[currentLineIndex][currentCharIndex - 1]) {
            const char = lines[currentLineIndex][currentCharIndex - 1]
            if (['.', '!', '?', ':', ';'].includes(char)) {
              delay = 200
            } else if ([' ', '\t'].includes(char)) {
              delay = 15
            } else if (['\n'].includes(char)) {
              delay = 100
            }
          }
          
          setTimeout(typeNextChar, delay)
        } else {
          isComplete = true
          setMessages(prev => prev.map((msg, idx) => 
            idx === messageIndex && msg.role === 'assistant'
              ? { ...msg, isTyping: false }
              : msg
          ))
        }
      } else {
        isComplete = true
        setMessages(prev => prev.map((msg, idx) => 
          idx === messageIndex && msg.role === 'assistant'
            ? { ...msg, isTyping: false }
            : msg
        ))
      }
    }

    typeNextChar()
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { 
      role: 'user', 
      content: input,
      isTyping: false
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    // Scroll to bottom after adding user message
    setTimeout(scrollToBottom, 100)

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
        content: response,
        expertInfo: {
          source: expertAnalysis.source,
          category: expertAnalysis.category,
          confidence: expertAnalysis.confidence
        },
        isTyping: true
      }
      
      setMessages(prev => [...prev, aiResponse])
      
      setTimeout(scrollToBottom, 100)
      
      // Start typewriter effect for AI message
      setTimeout(() => {
        typewriterEffect(response, messages.length)
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
  }, [input, isLoading, conversationHistory, scrollToBottom, typewriterEffect, messages.length])

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

  const renderMessageContent = useCallback((content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
  }, [])

  // Memoized message components
  const messageComponents = useMemo(() => {
    return messages.map((message, index) => {
      console.log(`Message ${index}:`, message.role, message.content.substring(0, 50))
      
      if (message.role === 'user') {
        return (
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
          >
            <div className="flex justify-end">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="max-w-[40%] sm:max-w-[30%] flex items-end gap-2 flex-row-reverse"
              >
                <div className="bubble-user-small">
                  {message.content.split('\n').map((line, lineIndex) => (
                    <motion.div
                      key={lineIndex}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: lineIndex * 0.05,
                        duration: 0.2,
                        ease: "easeOut"
                      }}
                      className="mb-1 last:mb-0 leading-relaxed"
                      dangerouslySetInnerHTML={{ 
                        __html: renderMessageContent(line) || '<br />' 
                      }}
                    />
                  ))}
                </div>
                <div className="mb-1">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-blue-300 to-violet-200 shadow">
                    <HiOutlineUser className="text-lg text-blue-700" />
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )
      } else {
        return (
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
          >
            <div className="flex justify-start">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-full flex items-start gap-3"
              >
                <div className="mb-1 mt-1">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-violet-200 to-blue-100 shadow">
                    <HiOutlineSparkles className="text-xl text-violet-700" />
                  </span>
                </div>
                <div className="bubble-ai-full flex-1">
                  {message.content.split('\n').map((line, lineIndex) => (
                    <motion.div
                      key={lineIndex}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: lineIndex * 0.1,
                        duration: 0.3,
                        ease: "easeOut"
                      }}
                      className="mb-2 last:mb-0 leading-relaxed"
                      dangerouslySetInnerHTML={{ 
                        __html: renderMessageContent(line) || '<br />' 
                      }}
                    />
                  ))}
                  {message.role === 'assistant' && message.expertInfo && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.5,
                        duration: 0.4,
                        ease: "easeOut"
                      }}
                      className="mt-2 pt-2 border-t border-violet-100 text-xs text-gray-500 flex justify-between items-center gap-2"
                    >
                      <span>{getSourceLabel(message.expertInfo.source)}</span>
                      <span className="bg-violet-100 text-violet-800 px-2 py-1 rounded-full text-xs">
                        {getCategoryLabel(message.expertInfo.category)}
                      </span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )
      }
    })
  }, [messages, renderMessageContent, getSourceLabel, getCategoryLabel])

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-violet-100 p-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-lg sm:text-xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent"
          >
            AI เพื่อนที่ปรึกษา
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearChat}
            className="btn-calm-danger flex items-center gap-1 text-xs px-2 py-1"
          >
            <MdOutlineDeleteSweep className="text-sm" />
            <span className="hidden sm:inline">ล้างการสนทนา</span>
          </motion.button>
        </div>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-3 pb-2 max-h-[calc(100vh-280px)]">
        <AnimatePresence>
          {messageComponents}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-start"
          >
            <div className="w-full flex items-start gap-3">
              <div className="mb-1 mt-1">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-violet-200 to-blue-100 shadow">
                  <HiOutlineSparkles className="text-xl text-violet-700" />
                </span>
              </div>
              <div className="bubble-ai-full flex-1 flex items-center gap-1">
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"
                />
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="w-2 h-2 bg-violet-300 rounded-full animate-bounce"
                />
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="w-2 h-2 bg-violet-200 rounded-full animate-bounce"
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

      {/* Input form */}
      <motion.form
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onSubmit={handleSubmit}
        className="p-3 bg-white/95 shadow-lg backdrop-blur-sm rounded-2xl mx-3 mb-4"
      >
        <div className="flex gap-3 items-end max-w-4xl mx-auto">
          <div className="relative flex-1">
            <motion.textarea
              ref={inputRef}
              whileFocus={{ scale: 1.01 }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="พิมพ์ข้อความของคุณ..."
              className="input-calm w-full text-sm resize-none rounded-2xl border-2 border-violet-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-200 px-4 py-3 h-12 leading-relaxed"
              disabled={isLoading}
              rows={1}
              style={{ 
                height: '3rem'
              }}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isLoading}
            className="btn-calm text-sm px-6 py-3 rounded-2xl h-12 flex items-center justify-center"
          >
            {isLoading ? '...' : 'ส่ง'}
          </motion.button>
        </div>
      </motion.form>
    </div>
  )
}