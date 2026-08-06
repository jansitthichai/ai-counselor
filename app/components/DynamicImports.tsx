'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import LoadingSpinner from './LoadingSpinner'

// Dynamic imports for heavy components
export const DynamicChart = dynamic(
  () => import('react-chartjs-2').then((mod) => mod.Line),
  {
    loading: () => <LoadingSpinner text="กำลังโหลดกราฟ..." />,
    ssr: false,
  }
)

export const DynamicBarChart = dynamic(
  () => import('react-chartjs-2').then((mod) => mod.Bar),
  {
    loading: () => <LoadingSpinner text="กำลังโหลดกราฟ..." />,
    ssr: false,
  }
)

export const DynamicPieChart = dynamic(
  () => import('react-chartjs-2').then((mod) => mod.Pie),
  {
    loading: () => <LoadingSpinner text="กำลังโหลดกราฟ..." />,
    ssr: false,
  }
)

// Dynamic import for Tone.js (audio library) - removed due to type issues
// export const DynamicTone = dynamic(
//   () => import('tone').then((mod) => ({ default: mod })),
//   {
//     loading: () => <LoadingSpinner text="กำลังโหลดเสียง..." />,
//     ssr: false,
//   }
// )

// Dynamic import for heavy game components
export const DynamicMemoryGame = dynamic(
  () => import('../games/memory/page'),
  {
    loading: () => <LoadingSpinner text="กำลังโหลดเกม..." />,
    ssr: false,
  }
)

export const DynamicBrainGame = dynamic(
  () => import('../games/brain/page'),
  {
    loading: () => <LoadingSpinner text="กำลังโหลดเกม..." />,
    ssr: false,
  }
)

// Wrapper component for dynamic imports with error boundary
export function DynamicComponentWrapper({ 
  children, 
  fallback = <LoadingSpinner text="กำลังโหลด..." />
}: { 
  children: React.ReactNode
  fallback?: React.ReactNode 
}) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  )
} 