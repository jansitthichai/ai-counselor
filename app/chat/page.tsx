'use client'

import { useState, useRef, useEffect } from 'react'
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
  isTyping?: boolean // เพิ่มสำหรับ typewriter effect
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'สวัสดีครับ/ค่ะ ผมเป็น AI เพื่อนที่ปรึกษา ยินดีที่จะพูดคุยและให้คำแนะนำกับคุณ\n\nมีอะไรให้ช่วยเหลือไหมครับ?',
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

  // Typewriter effect function
  const typewriterEffect = (text: string, messageIndex: number) => {
    const lines = text.split('\n')
    let currentLineIndex = 0
    let currentCharIndex = 0
    let displayText = ''

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
            ? { ...msg, content: displayText, isTyping: currentLineIndex < lines.length || currentCharIndex > 0 }
            : msg
        ))

        if (currentLineIndex < lines.length || currentCharIndex > 0) {
          setTimeout(typeNextChar, 30) // ความเร็วในการพิมพ์
        } else {
          setMessages(prev => prev.map((msg, idx) => 
            idx === messageIndex && msg.role === 'assistant'
              ? { ...msg, isTyping: false }
              : msg
          ))
        }
      }
    }

    typeNextChar()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { 
      role: 'user', 
      content: input,
      isTyping: false // User message ไม่ต้องผ่าน typewriter
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    // Scroll ไปที่ข้อความล่าสุด
    setTimeout(() => {
      scrollToBottom()
    }, 100)

    try {
      console.log('Sending message:', input)
      
      const expertAnalysis = getExpertAnalysis(input)
      console.log('Expert analysis:', expertAnalysis)
      
      // สร้าง conversation history จากข้อความก่อนหน้า (ไม่รวมข้อความเริ่มต้น)
      const conversationHistory = messages
        .slice(1) // ข้ามข้อความเริ่มต้น
        .map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user' as 'user' | 'model',
          content: msg.content
        }))
        .filter(msg => msg.content && msg.content.trim() !== '')
      
      console.log('Conversation history:', conversationHistory)
      
      // ทดสอบ conversation history (สำหรับ debug)
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
      
      // Scroll ไปที่ข้อความล่าสุด
      setTimeout(() => {
        scrollToBottom()
      }, 100)
      
      // เริ่ม typewriter effect สำหรับ AI message เท่านั้น
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
  }

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'สวัสดีครับ/ค่ะ ผมเป็น AI เพื่อนที่ปรึกษา ยินดีที่จะพูดคุยและให้คำแนะนำกับคุณ\n\nมีอะไรให้ช่วยเหลือไหมครับ?',
        expertInfo: {
          source: 'rule',
          category: 'general',
          confidence: 1.0
        }
      }
    ])
    setError(null)
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

  // ฟังก์ชันแปลงข้อความให้ลิงค์และเบอร์โทรศัพท์คลิกได้
  const renderMessageContent = (content: string) => {
    if (!content) return ''
    
    // แปลง URL ให้เป็นลิงค์ (รองรับ http, https, www)
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g
    // แปลงเบอร์โทรศัพท์ไทย (รองรับรูปแบบต่างๆ รวมถึงเบอร์ฉุกเฉิน)
    const phoneRegex = /(\d{2,4}[-\s]?\d{3,4}[-\s]?\d{3,4}|\d{10,11}|\d{3,4}|\d{2}[-\s]?\d{3,4}[-\s]?\d{3,4})/g
    // แปลงอีเมล
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g
    
    let processedContent = content
    
    // แปลงเบอร์โทรศัพท์ให้เป็นลิงค์โทร
    processedContent = processedContent.replace(phoneRegex, (match) => {
      const cleanPhone = match.replace(/[-\s]/g, '')
      // ตรวจสอบว่าเป็นเบอร์โทรศัพท์ที่ถูกต้อง (3-11 หลัก)
      if (cleanPhone.length >= 3 && cleanPhone.length <= 11) {
        // เบอร์ฉุกเฉิน (1323, 1669, 191, 199)
        const emergencyNumbers = ['1323', '1669', '191', '199']
        const isEmergency = emergencyNumbers.includes(cleanPhone)
        
        // เบอร์มือถือไทย (08, 09)
        const isMobile = cleanPhone.startsWith('08') || cleanPhone.startsWith('09')
        
        // เบอร์บ้าน (02)
        const isLandline = cleanPhone.startsWith('02')
        
        // เบอร์ต่างจังหวัด (03, 04, 05, 06, 07)
        const isProvince = /^0[3-7]/.test(cleanPhone)
        
        let linkClass = 'text-blue-600 hover:text-blue-800 font-medium underline'
        let title = `โทรหา ${match}`
        
        if (isEmergency) {
          linkClass = 'text-red-600 hover:text-red-800 font-bold underline'
          title = `โทรฉุกเฉิน ${match}`
        } else if (isMobile) {
          linkClass = 'text-green-600 hover:text-green-800 font-medium underline'
          title = `โทรมือถือ ${match}`
        } else if (isLandline) {
          linkClass = 'text-purple-600 hover:text-purple-800 font-medium underline'
          title = `โทรบ้าน ${match}`
        } else if (isProvince) {
          linkClass = 'text-orange-600 hover:text-orange-800 font-medium underline'
          title = `โทรต่างจังหวัด ${match}`
        }
        
        return `<a href="tel:${cleanPhone}" class="${linkClass}" title="${title}">${match}</a>`
      }
      return match
    })
    
    // แปลงอีเมลให้เป็นลิงค์
    processedContent = processedContent.replace(emailRegex, (match) => {
      return `<a href="mailto:${match}" class="text-green-600 hover:text-green-800 underline" title="ส่งอีเมลถึง ${match}">${match}</a>`
    })
    
    // แปลง URL ให้เป็นลิงค์
    processedContent = processedContent.replace(urlRegex, (match) => {
      let url = match
      // เพิ่ม https:// ถ้าไม่มี protocol
      if (match.startsWith('www.')) {
        url = 'https://' + match
      }
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline break-all" title="เปิดลิงค์ ${match}">${match}</a>`
    })
    
    return processedContent
  }

  return (
    <div className="h-screen bg-calm flex flex-col">
      {/* Header with clear chat button */}
      <div className="flex justify-between items-center p-4 border-b bg-white/80 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl text-calm"><HiOutlineSparkles /></span>
          <h1 className="text-xl font-bold text-calm tracking-tight">AI เพื่อนที่ปรึกษา</h1>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearChat}
          className="btn-calm-danger flex items-center gap-1"
        >
          <MdOutlineDeleteSweep className="text-lg" />
          <span className="hidden sm:inline">ล้างการสนทนา</span>
        </motion.button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => {
            console.log(`Message ${index}:`, message.role, message.content.substring(0, 50))
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
              {message.role === 'user' ? (
                // User message - แสดงผลเล็กๆ ด้านขวา
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
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: lineIndex * 0.15,
                            duration: 0.5,
                            ease: "easeOut"
                          }}
                          className="mb-2 last:mb-0"
                          dangerouslySetInnerHTML={{ 
                            __html: renderMessageContent(line) || '<br />' 
                          }}
                        />
                      ))}
                    </div>
                    <div className="mb-1">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-300 to-violet-200 shadow">
                        <HiOutlineUser className="text-xl text-blue-700" />
                      </span>
                    </div>
                  </motion.div>
                </div>
              ) : (
                // AI message - แสดงผลเต็มหน้าจอ
                <div className="flex justify-start">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="w-full flex items-start gap-3"
                  >
                    <div className="mb-1 mt-1">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-violet-200 to-blue-100 shadow">
                        <HiOutlineSparkles className="text-2xl text-violet-700" />
                      </span>
                    </div>
                    <div className="bubble-ai-full flex-1">
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
                          dangerouslySetInnerHTML={{ 
                            __html: renderMessageContent(line) || '<br />' 
                          }}
                        />
                      ))}
                      {message.role === 'assistant' && message.expertInfo && (
                        <div className="mt-3 pt-3 border-t border-violet-100 text-xs text-gray-500 flex justify-between items-center gap-2">
                          <span>{getSourceLabel(message.expertInfo.source)}</span>
                          <span className="bg-violet-100 text-violet-800 px-2 py-1 rounded-full text-xs">
                            {getCategoryLabel(message.expertInfo.category)}
                          </span>
                        </div>
                      )}
                      {/* Typewriter cursor - แสดงเฉพาะใน AI message */}
                      {message.role === 'assistant' && message.isTyping && (
                        <span className="inline-block w-2 h-5 bg-violet-500 animate-pulse ml-1" />
                      )}
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          )})}
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
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-violet-200 to-blue-100 shadow">
                  <HiOutlineSparkles className="text-2xl text-violet-700" />
                </span>
              </div>
              <div className="bubble-ai-full flex-1 flex items-center gap-2">
                <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-violet-300 rounded-full animate-bounce delay-100" />
                <span className="w-2 h-2 bg-violet-200 rounded-full animate-bounce delay-200" />
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
        className="p-4 border-t bg-white/80 shadow-inner"
      >
        <div className="flex gap-2 items-center">
          <motion.input
            ref={inputRef}
            whileFocus={{ scale: 1.01 }}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="พิมพ์ข้อความของคุณ..."
            className="input-calm flex-1"
            disabled={isLoading}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isLoading}
            className="btn-calm"
          >
            {isLoading ? '...' : 'ส่ง'}
          </motion.button>
        </div>
      </motion.form>
    </div>
  )
}