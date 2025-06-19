'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'

interface Card {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'] as const

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // Memoized game state
  const gameState = useMemo(() => ({
    isGameOver: gameOver,
    totalMoves: moves,
    matchedPairs: cards.filter(card => card.isMatched).length / 2,
    totalPairs: EMOJIS.length
  }), [gameOver, moves, cards])

  const initializeGame = useCallback(() => {
    const duplicatedEmojis = [...EMOJIS, ...EMOJIS]
    const shuffledEmojis = duplicatedEmojis.sort(() => Math.random() - 0.5)
    const newCards = shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false
    }))
    setCards(newCards)
    setFlippedCards([])
    setMoves(0)
    setGameOver(false)
    setIsPlaying(true)
  }, [])

  const checkGameOver = useCallback(() => {
    const allMatched = cards.every(card => card.isMatched)
    if (allMatched) {
      setGameOver(true)
      setIsPlaying(false)
    }
  }, [cards])

  const handleCardClick = useCallback((clickedId: number) => {
    if (!isPlaying || flippedCards.length === 2) return
    if (cards[clickedId].isMatched) return
    if (flippedCards.includes(clickedId)) return

    const newFlippedCards = [...flippedCards, clickedId]
    setFlippedCards(newFlippedCards)

    const newCards = cards.map(card =>
      card.id === clickedId ? { ...card, isFlipped: true } : card
    )
    setCards(newCards)

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1)
      const [first, second] = newFlippedCards
      
      if (cards[first].emoji === cards[second].emoji) {
        // Match found
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === first || card.id === second
                ? { ...card, isMatched: true }
                : card
            )
          )
          setFlippedCards([])
          checkGameOver()
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === first || card.id === second
                ? { ...card, isFlipped: false }
                : card
            )
          )
          setFlippedCards([])
        }, 1000)
      }
    }
  }, [cards, flippedCards, isPlaying, checkGameOver])

  // Initialize game on mount
  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  // Memoized card components
  const cardComponents = useMemo(() => {
    return cards.map((card) => (
      <motion.div
        key={card.id}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`aspect-square cursor-pointer rounded-lg shadow-lg flex items-center justify-center text-4xl transition-all duration-300 ${
          card.isFlipped || card.isMatched
            ? 'bg-white'
            : 'bg-blue-500'
        } ${
          card.isMatched ? 'opacity-50' : ''
        }`}
        onClick={() => handleCardClick(card.id)}
      >
        {(card.isFlipped || card.isMatched) && card.emoji}
      </motion.div>
    ))
  }, [cards, handleCardClick])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">เกมจับคู่ภาพ</h1>
          <p className="text-lg text-gray-600">ฝึกความจำและสมาธิผ่านการจับคู่ภาพที่เหมือนกัน</p>
        </motion.div>

        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-8 mb-4">
            <div className="text-xl text-gray-700">
              จำนวนการพลิก: {gameState.totalMoves}
            </div>
            <div className="text-xl text-gray-700">
              คู่ที่จับได้: {gameState.matchedPairs}/{gameState.totalPairs}
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={initializeGame}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            เริ่มเกมใหม่
          </motion.button>
        </div>

        <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
          {cardComponents}
        </div>

        {gameState.isGameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">ยินดีด้วย!</h2>
              <p className="text-gray-600 mb-6">
                คุณจับคู่ภาพได้ครบแล้วใน {gameState.totalMoves} ครั้ง
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={initializeGame}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                เล่นอีกครั้ง
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 