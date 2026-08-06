'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ColorCard {
  id: number
  color: string
  isFlipped: boolean
  isMatched: boolean
}

const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F']

export default function ColorMatchGame() {
  const [cards, setCards] = useState<ColorCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const gameColors = [...colors.slice(0, 6), ...colors.slice(0, 6)] // 6 pairs
    const shuffledColors = gameColors.sort(() => Math.random() - 0.5)
    
    const newCards: ColorCard[] = shuffledColors.map((color, index) => ({
      id: index,
      color,
      isFlipped: false,
      isMatched: false
    }))
    
    setCards(newCards)
    setFlippedCards([])
    setScore(0)
    setMoves(0)
    setGameComplete(false)
  }

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2 || cards[cardId].isFlipped || cards[cardId].isMatched) {
      return
    }

    const newCards = [...cards]
    newCards[cardId].isFlipped = true
    setCards(newCards)

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1)
      
      const [firstId, secondId] = newFlippedCards
      const firstCard = newCards[firstId]
      const secondCard = newCards[secondId]

      if (firstCard.color === secondCard.color) {
        // Match found
        newCards[firstId].isMatched = true
        newCards[secondId].isMatched = true
        setCards(newCards)
        setScore(prev => prev + 10)
        setFlippedCards([])

        // Check if game is complete
        if (newCards.every(card => card.isMatched)) {
          setGameComplete(true)
        }
      } else {
        // No match
        setTimeout(() => {
          newCards[firstId].isFlipped = false
          newCards[secondId].isFlipped = false
          setCards(newCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4 font-sarabun">เกมจับคู่สี</h1>
          <p className="text-lg text-gray-600 mb-6">จับคู่สีที่เหมือนกันให้ถูกต้อง</p>
          
          <div className="flex justify-center gap-8 mb-6">
            <div className="bg-white px-4 py-2 rounded-lg shadow">
              <span className="text-sm text-gray-600">คะแนน: </span>
              <span className="font-bold text-blue-600">{score}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow">
              <span className="text-sm text-gray-600">การเดิน: </span>
              <span className="font-bold text-green-600">{moves}</span>
            </div>
          </div>

          <button
            onClick={initializeGame}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            เริ่มเกมใหม่
          </button>
        </motion.div>

        {gameComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white p-8 rounded-xl text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">ยินดีด้วย!</h2>
              <p className="text-lg mb-4">คุณเล่นเกมสำเร็จแล้ว</p>
              <p className="mb-6">คะแนน: {score} | การเดิน: {moves}</p>
              <button
                onClick={initializeGame}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                เล่นอีกครั้ง
              </button>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square rounded-lg cursor-pointer transition-all duration-300 ${
                card.isFlipped || card.isMatched
                  ? 'shadow-lg'
                  : 'bg-gradient-to-br from-gray-300 to-gray-400 shadow-md'
              }`}
              style={{
                backgroundColor: card.isFlipped || card.isMatched ? card.color : undefined,
                transform: card.isFlipped || card.isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {!card.isFlipped && !card.isMatched && (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-2xl">❓</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 