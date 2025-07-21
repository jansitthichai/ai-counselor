'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

type Player = 'X' | 'O' | null
type Difficulty = 'easy' | 'medium' | 'hard'

interface GameState {
  board: Player[]
  currentPlayer: 'X' | 'O'
  winner: Player
  isDraw: boolean
  gameStarted: boolean
  difficulty: Difficulty
}

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
]

export default function TicTacToeGame() {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
    gameStarted: false,
    difficulty: 'easy'
  })

  const checkWinner = (board: Player[]): Player => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }
    return null
  }

  const checkDraw = (board: Player[]): boolean => {
    return board.every(cell => cell !== null)
  }

  const getAvailableMoves = (board: Player[]): number[] => {
    return board.map((cell, index) => cell === null ? index : -1).filter(index => index !== -1)
  }

  const makeAIMoveDirectly = useCallback((board: Player[], difficulty: Difficulty) => {
    const availableMoves = getAvailableMoves(board)
    
    if (availableMoves.length === 0) return -1

    switch (difficulty) {
      case 'easy':
        // Random move
        return availableMoves[Math.floor(Math.random() * availableMoves.length)]
      
      case 'medium':
        // 50% chance of making best move, 50% random
        if (Math.random() < 0.5) {
          return findBestMove(board)
        } else {
          return availableMoves[Math.floor(Math.random() * availableMoves.length)]
        }
      
      case 'hard':
        // Always make best move
        return findBestMove(board)
      
      default:
        return availableMoves[Math.floor(Math.random() * availableMoves.length)]
    }
  }, [])

  const handleAIMove = useCallback(() => {
    console.log('AI move triggered:', { 
      currentPlayer: gameState.currentPlayer, 
      winner: gameState.winner, 
      isDraw: gameState.isDraw,
      difficulty: gameState.difficulty 
    })
    
    if (gameState.currentPlayer === 'O' && !gameState.winner && !gameState.isDraw) {
      const aiMove = makeAIMoveDirectly(gameState.board, gameState.difficulty)
      console.log('AI move calculated:', aiMove)
      
      if (aiMove !== -1) {
        const newBoard = [...gameState.board]
        newBoard[aiMove] = 'O'
        
        const winner = checkWinner(newBoard)
        const isDraw = checkDraw(newBoard)
        
        setGameState(prev => ({
          ...prev,
          board: newBoard,
          currentPlayer: 'X',
          winner,
          isDraw
        }))
      }
    }
  }, [gameState.board, gameState.currentPlayer, gameState.difficulty, gameState.winner, gameState.isDraw, makeAIMoveDirectly])

  const findBestMove = (board: Player[]): number => {
    let bestScore = -Infinity
    let bestMove = -1

    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'O'
        const score = minimax(board, 0, false)
        board[i] = null
        
        if (score > bestScore) {
          bestScore = score
          bestMove = i
        }
      }
    }

    return bestMove
  }

  const minimax = (board: Player[], depth: number, isMaximizing: boolean): number => {
    const winner = checkWinner(board)
    
    if (winner === 'O') return 1
    if (winner === 'X') return -1
    if (checkDraw(board)) return 0

    if (isMaximizing) {
      let bestScore = -Infinity
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'O'
          const score = minimax(board, depth + 1, false)
          board[i] = null
          bestScore = Math.max(score, bestScore)
        }
      }
      return bestScore
    } else {
      let bestScore = Infinity
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'X'
          const score = minimax(board, depth + 1, true)
          board[i] = null
          bestScore = Math.min(score, bestScore)
        }
      }
      return bestScore
    }
  }

  const handleCellClick = (index: number) => {
    if (gameState.board[index] || gameState.winner || gameState.isDraw || gameState.currentPlayer === 'O') {
      return
    }

    const newBoard = [...gameState.board]
    newBoard[index] = gameState.currentPlayer

    const winner = checkWinner(newBoard)
    const isDraw = checkDraw(newBoard)

    setGameState(prev => ({
      ...prev,
      board: newBoard,
      currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
      winner,
      isDraw
    }))
  }

  const startGame = (difficulty: Difficulty) => {
    setGameState({
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      isDraw: false,
      gameStarted: true,
      difficulty
    })
  }

  const resetGame = () => {
    setGameState({
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      isDraw: false,
      gameStarted: false,
      difficulty: 'easy'
    })
  }

  // AI move effect
  useEffect(() => {
    if (gameState.gameStarted && gameState.currentPlayer === 'O' && !gameState.winner && !gameState.isDraw) {
      const timer = setTimeout(() => {
        handleAIMove()
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [gameState.currentPlayer, gameState.gameStarted, handleAIMove, gameState.winner, gameState.isDraw])

  const getDifficultyText = (difficulty: Difficulty): string => {
    switch (difficulty) {
      case 'easy': return 'ง่าย'
      case 'medium': return 'ปานกลาง'
      case 'hard': return 'ยาก'
      default: return 'ง่าย'
    }
  }

  const getDifficultyColor = (difficulty: Difficulty): string => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500'
      case 'medium': return 'bg-yellow-500'
      case 'hard': return 'bg-red-500'
      default: return 'bg-green-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4 font-sarabun">เกม XO (Tic Tac Toe)</h1>
          <p className="text-lg text-gray-600">เล่นกับ AI ที่สามารถเลือกระดับความยากได้</p>
        </motion.div>

        {!gameState.gameStarted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center font-sarabun">เลือกระดับความยาก</h2>
            <div className="space-y-4">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => startGame(difficulty)}
                  className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-colors ${getDifficultyColor(difficulty)} hover:opacity-90`}
                >
                  {getDifficultyText(difficulty)}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            {/* Game Info */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-600">ระดับความยาก:</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium ${getDifficultyColor(gameState.difficulty)}`}>
                    {getDifficultyText(gameState.difficulty)}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">ผู้เล่นปัจจุบัน:</p>
                  <span className="text-lg font-bold text-blue-600">
                    {gameState.currentPlayer === 'X' ? 'คุณ (X)' : 'AI (O)'}
                  </span>
                </div>
              </div>

              {/* Game Status */}
              {gameState.winner && (
                <div className="text-center py-3 bg-green-100 rounded-lg">
                  <p className="text-lg font-semibold text-green-800">
                    {gameState.winner === 'X' ? 'คุณชนะ! 🎉' : 'AI ชนะ! 🤖'}
                  </p>
                </div>
              )}
              {gameState.isDraw && !gameState.winner && (
                <div className="text-center py-3 bg-yellow-100 rounded-lg">
                  <p className="text-lg font-semibold text-yellow-800">เสมอ! 🤝</p>
                </div>
              )}
            </div>

            {/* Game Board */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="grid grid-cols-3 gap-2 w-64 h-64 mx-auto">
                {gameState.board.map((cell, index) => (
                  <button
                    key={index}
                    onClick={() => handleCellClick(index)}
                    disabled={cell !== null || gameState.winner !== null || gameState.isDraw || gameState.currentPlayer === 'O'}
                    className="w-20 h-20 border-2 border-gray-300 rounded-lg text-3xl font-bold transition-colors hover:bg-gray-50 disabled:hover:bg-white disabled:cursor-not-allowed"
                  >
                    {cell === 'X' && <span className="text-blue-600">X</span>}
                    {cell === 'O' && <span className="text-red-600">O</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <div className="text-center mt-6">
              <button
                onClick={resetGame}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                เริ่มเกมใหม่
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 