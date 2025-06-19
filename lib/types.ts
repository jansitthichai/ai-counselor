// TypeScript types and interfaces for the AI Companion app

// Chat related types
export interface Message {
  role: 'user' | 'assistant'
  content: string
  expertInfo?: {
    source: 'rule' | 'prompt' | 'gemini'
    category: string
    confidence: number
  }
  isTyping?: boolean
}

export interface ConversationHistory {
  role: 'user' | 'model'
  content: string
}

// Mood tracker types
export interface MoodEntry {
  id: string
  mood: number
  note: string
  timestamp: string
}

export interface MoodLabel {
  label: string
  icon: string
  color: string
  value: number
}

// PHQ-9 types
export interface PHQ9Question {
  id: number
  text: string
  options: {
    value: number
    label: string
  }[]
}

export interface PHQ9Answer {
  [key: number]: number
}

export interface PHQ9Severity {
  level: string
  color: string
  bgColor: string
  borderColor: string
}

// Game types
export interface Card {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

export interface Problem {
  question: string
  answer: number
  options: number[]
}

export interface Bubble {
  id: number
  x: number
  y: number
  size: number
  color: string
}

export interface Note {
  key: string
  note: string
  isBlack: boolean
}

export type Player = 'X' | 'O' | null
export type Difficulty = 'easy' | 'medium' | 'hard'

export interface GameState {
  board: Player[]
  currentPlayer: Player
  winner: Player
  isDraw: boolean
  gameStarted: boolean
  difficulty: Difficulty
}

// Resources types
export interface Article {
  id: string
  title: string
  content: string
  source: string
  url: string
  imageUrl: string
  category: string
  date: string
}

// Help/Contact types
export interface Contact {
  id: string
  title: string
  description: string
  phone?: string
  email?: string
  website?: string
  category: string
  icon: React.ReactNode
}

export interface Category {
  id: string
  name: string
  icon: React.ReactNode
}

// API types
export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ExpertAnalysis {
  source: 'rule' | 'prompt' | 'gemini'
  category: string
  confidence: number
}

// Navigation types
export interface NavigationItem {
  href: string
  label: string
  icon: string
}

// Storage types
export interface UserPreferences {
  theme: 'light' | 'dark'
  language: 'th' | 'en'
  notifications: boolean
  autoSave: boolean
}

export interface ChatHistory {
  messages: Message[]
  timestamp: string
  sessionId: string
}

export interface PHQ9Result {
  score: number
  severity: PHQ9Severity
  timestamp: string
  answers: PHQ9Answer
}

// Chart types
export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
    tension?: number
    fill?: boolean
  }[]
}

export interface ChartOptions {
  responsive: boolean
  plugins: {
    legend: {
      position?: 'top' | 'bottom' | 'left' | 'right'
      display?: boolean
    }
    title: {
      display: boolean
      text: string
    }
  }
  scales: {
    y: {
      min?: number
      max?: number
      beginAtZero?: boolean
      ticks?: {
        stepSize?: number
        callback?: (value: any) => string
      }
    }
  }
}

// Animation types
export interface AnimationConfig {
  duration: number
  ease: number[]
  spring: {
    type: string
    stiffness: number
    damping: number
  }
}

// Error types
export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: string
}

// Form types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio'
  required?: boolean
  validation?: {
    pattern?: RegExp
    minLength?: number
    maxLength?: number
    custom?: (value: any) => boolean | string
  }
  options?: {
    value: string | number
    label: string
  }[]
}

export interface FormData {
  [key: string]: any
}

export interface FormErrors {
  [key: string]: string
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

export type NonNullable<T> = T extends null | undefined ? never : T

// Event types
export interface KeyboardEvent {
  key: string
  code: string
  ctrlKey: boolean
  shiftKey: boolean
  altKey: boolean
  metaKey: boolean
}

export interface MouseEvent {
  clientX: number
  clientY: number
  target: EventTarget | null
}

// Component props types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
  id?: string
  style?: React.CSSProperties
}

export interface ButtonProps extends BaseComponentProps {
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
  size?: 'sm' | 'md' | 'lg'
}

export interface InputProps extends BaseComponentProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  required?: boolean
  disabled?: boolean
  error?: string
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

// Theme types
export interface Theme {
  name: string
  colors: {
    primary: string
    secondary: string
    background: string
    surface: string
    text: string
    textSecondary: string
    border: string
    error: string
    success: string
    warning: string
  }
  fonts: {
    body: string
    heading: string
    mono: string
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
    xl: string
  }
}

// Configuration types
export interface AppConfig {
  name: string
  description: string
  version: string
  author: string
  contact: {
    hotline: string
    email: string
  }
}

export interface APIConfig {
  baseUrl: string
  timeout: number
  retryAttempts: number
  retryDelay: number
}

// Localization types
export interface Locale {
  code: string
  name: string
  flag: string
  translations: {
    [key: string]: string
  }
}

// Analytics types
export interface AnalyticsEvent {
  name: string
  properties?: {
    [key: string]: any
  }
  timestamp: string
  userId?: string
  sessionId?: string
}

// Performance types
export interface PerformanceMetric {
  name: string
  value: number
  unit: string
  timestamp: string
  category: 'navigation' | 'resource' | 'paint' | 'layout' | 'interaction'
}

// Accessibility types
export interface AccessibilityProps {
  'aria-label'?: string
  'aria-describedby'?: string
  'aria-hidden'?: boolean
  'aria-expanded'?: boolean
  'aria-selected'?: boolean
  'aria-disabled'?: boolean
  role?: string
  tabIndex?: number
} 