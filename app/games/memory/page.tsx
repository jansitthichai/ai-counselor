'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Card {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼']

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const duplicatedEmojis = [...emojis, ...emojis]
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
  }

  const handleCardClick = (clickedId: number) => {
    if (flippedCards.length === 2) return
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
  }

  const checkGameOver = () => {
    const allMatched = cards.every(card => card.isMatched)
    if (allMatched) {
      setGameOver(true)
    }
  }

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
          <p className="text-xl text-gray-700 mb-4">จำนวนการพลิก: {moves}</p>
          <button
            onClick={initializeGame}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            เริ่มเกมใหม่
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.05 }}
              className={`aspect-square cursor-pointer rounded-lg shadow-lg flex items-center justify-center text-4xl
                ${card.isFlipped || card.isMatched
                  ? 'bg-white'
                  : 'bg-blue-500'
                }
                ${card.isMatched ? 'opacity-50' : ''}
                transition-all duration-300`}
              onClick={() => handleCardClick(card.id)}
            >
              {(card.isFlipped || card.isMatched) && card.emoji}
            </motion.div>
          ))}
        </div>

        {gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <div className="bg-white p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">ยินดีด้วย!</h2>
              <p className="text-lg text-gray-600 mb-4">
                คุณใช้ {moves} ครั้งในการจับคู่ภาพทั้งหมด
              </p>
              <button
                onClick={initializeGame}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                เล่นอีกครั้ง
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 