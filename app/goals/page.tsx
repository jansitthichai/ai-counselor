'use client'

import { useEffect, useState } from 'react'
import {
  GoalItem,
  HabitItem,
  loadGoals,
  loadHabits,
  saveGoals,
  saveHabits,
} from '../../lib/wellbeing-storage'

export default function GoalsHabitsPage() {
  const [goals, setGoals] = useState<GoalItem[]>([])
  const [habits, setHabits] = useState<HabitItem[]>([])
  const [goalTitle, setGoalTitle] = useState('')
  const [habitTitle, setHabitTitle] = useState('')

  useEffect(() => {
    setGoals(loadGoals())
    setHabits(loadHabits())
  }, [])

  const addGoal = () => {
    if (!goalTitle.trim()) return
    const next = [
      {
        id: Date.now().toString(),
        title: goalTitle.trim(),
        progress: 0,
        createdAt: new Date().toISOString(),
      },
      ...goals,
    ]
    setGoals(next)
    saveGoals(next)
    setGoalTitle('')
  }

  const bumpGoal = (id: string) => {
    const next = goals.map((g) =>
      g.id === id ? { ...g, progress: Math.min(100, g.progress + 10) } : g
    )
    setGoals(next)
    saveGoals(next)
  }

  const addHabit = () => {
    if (!habitTitle.trim()) return
    const next = [
      {
        id: Date.now().toString(),
        title: habitTitle.trim(),
        streak: 0,
        createdAt: new Date().toISOString(),
      },
      ...habits,
    ]
    setHabits(next)
    saveHabits(next)
    setHabitTitle('')
  }

  const checkHabit = (id: string) => {
    const today = new Date().toISOString().slice(0, 10)
    const next = habits.map((h) => {
      if (h.id !== id) return h
      if (h.lastDone === today) return h
      return { ...h, streak: h.streak + 1, lastDone: today }
    })
    setHabits(next)
    saveHabits(next)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 font-sarabun">
          AI Goal & Habit
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          ตั้งเป้าหมายและสร้างนิสัยดูแลใจอย่างต่อเนื่อง
        </p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
        <h2 className="font-semibold text-slate-800">AI Goal</h2>
        <div className="flex gap-2">
          <input
            value={goalTitle}
            onChange={(e) => setGoalTitle(e.target.value)}
            placeholder="เช่น นอนก่อน 22:00 สัปดาห์นี้"
            className="flex-1 rounded-xl border border-slate-300 px-3 py-2"
          />
          <button
            onClick={addGoal}
            className="rounded-xl bg-teal-700 text-white px-4 py-2 text-sm"
          >
            เพิ่ม
          </button>
        </div>
        {goals.map((g) => (
          <div key={g.id} className="border-t border-slate-100 pt-3">
            <div className="flex justify-between text-sm mb-1">
              <span>{g.title}</span>
              <button
                onClick={() => bumpGoal(g.id)}
                className="text-teal-700 font-medium"
              >
                +10%
              </button>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-teal-500"
                style={{ width: `${g.progress}%` }}
              />
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
        <h2 className="font-semibold text-slate-800">AI Habit</h2>
        <div className="flex gap-2">
          <input
            value={habitTitle}
            onChange={(e) => setHabitTitle(e.target.value)}
            placeholder="เช่น หายใจลึก 3 นาทีทุกเช้า"
            className="flex-1 rounded-xl border border-slate-300 px-3 py-2"
          />
          <button
            onClick={addHabit}
            className="rounded-xl bg-teal-700 text-white px-4 py-2 text-sm"
          >
            เพิ่ม
          </button>
        </div>
        {habits.map((h) => (
          <div
            key={h.id}
            className="flex items-center justify-between border-t border-slate-100 pt-3 text-sm"
          >
            <div>
              <p className="font-medium text-slate-800">{h.title}</p>
              <p className="text-slate-500">streak {h.streak} วัน</p>
            </div>
            <button
              onClick={() => checkHabit(h.id)}
              className="rounded-lg border border-teal-300 px-3 py-1.5 text-teal-800"
            >
              ทำวันนี้แล้ว
            </button>
          </div>
        ))}
      </section>
    </div>
  )
}
