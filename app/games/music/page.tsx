'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as Tone from 'tone'

interface Note {
  key: string
  note: string
  isBlack: boolean
}

const notes: Note[] = [
  { key: 'a', note: 'C4', isBlack: false },
  { key: 'w', note: 'C#4', isBlack: true },
  { key: 's', note: 'D4', isBlack: false },
  { key: 'e', note: 'D#4', isBlack: true },
  { key: 'd', note: 'E4', isBlack: false },
  { key: 'f', note: 'F4', isBlack: false },
  { key: 't', note: 'F#4', isBlack: true },
  { key: 'g', note: 'G4', isBlack: false },
  { key: 'y', note: 'G#4', isBlack: true },
  { key: 'h', note: 'A4', isBlack: false },
  { key: 'u', note: 'A#4', isBlack: true },
  { key: 'j', note: 'B4', isBlack: false },
  { key: 'k', note: 'C5', isBlack: false }
]

export default function MusicGame() {
  const [activeNotes, setActiveNotes] = useState<string[]>([])
  const [sampler, setSampler] = useState<Tone.Sampler | null>(null)

  useEffect(() => {
    // สร้าง sampler สำหรับเสียง kalimba
    const newSampler = new Tone.Sampler({
      urls: {
        "C4": "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        "A4": "A4.mp3",
      },
      baseUrl: "https://tonejs.github.io/audio/salamander/",
      onload: () => {
        console.log('Kalimba samples loaded')
      }
    }).toDestination()

    setSampler(newSampler)

    return () => {
      newSampler.dispose()
    }
  }, [])

  const playNote = (note: string) => {
    if (sampler) {
      sampler.triggerAttackRelease(note, '0.5')
      setActiveNotes(prev => [...prev, note])
      setTimeout(() => {
        setActiveNotes(prev => prev.filter(n => n !== note))
      }, 500)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    const note = notes.find(n => n.key === e.key.toLowerCase())
    if (note && !activeNotes.includes(note.note)) {
      playNote(note.note)
    }
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12"
      tabIndex={0}
      onKeyDown={handleKeyPress}
    >
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">เกมดนตรี</h1>
          <p className="text-lg text-gray-600">เล่นดนตรีด้วยคีย์บอร์ดของคุณ</p>
        </motion.div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="relative h-64 mb-8">
            {notes.map((note, index) => (
              <motion.button
                key={note.note}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => playNote(note.note)}
                className={`absolute h-48 ${
                  note.isBlack
                    ? 'bg-gray-800 w-12 z-10'
                    : 'bg-white border-2 border-gray-300 w-16'
                } rounded-b-lg ${
                  activeNotes.includes(note.note)
                    ? note.isBlack
                      ? 'bg-gray-600'
                      : 'bg-blue-100'
                    : ''
                }`}
                style={{
                  left: `${index * 4}rem`,
                  top: note.isBlack ? '0' : '0'
                }}
              >
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm font-medium">
                  {note.key.toUpperCase()}
                </div>
              </motion.button>
            ))}
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              วิธีการเล่น
            </h2>
            <p className="text-gray-600 mb-4">
              กดปุ่มบนคีย์บอร์ดหรือคลิกที่ปุ่มเปียโนเพื่อเล่นเสียง
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {notes.map(note => (
                <div
                  key={note.note}
                  className="bg-gray-100 rounded-lg p-3 text-center"
                >
                  <span className="font-medium">{note.key.toUpperCase()}</span>
                  <span className="text-gray-500 ml-2">{note.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg p-6 mt-8 shadow-lg"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            ประโยชน์ของการเล่นดนตรี
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>ช่วยลดความเครียดและความวิตกกังวล</li>
            <li>พัฒนาความจำและสมาธิ</li>
            <li>เพิ่มความคิดสร้างสรรค์</li>
            <li>ช่วยให้จิตใจสงบและผ่อนคลาย</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
} 