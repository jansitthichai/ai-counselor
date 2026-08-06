export type EmotionLabel =
  | 'happy'
  | 'sad'
  | 'angry'
  | 'stress'
  | 'lonely'
  | 'burnout'
  | 'anxious'
  | 'calm'
  | 'neutral'

export type EmotionResult = {
  primary: EmotionLabel
  confidence: number
  scores: Record<EmotionLabel, number>
  thaiLabel: string
}

export type StressResult = {
  level: 'low' | 'medium' | 'high'
  score: number // 0-100
  signals: string[]
}

export type RiskLevel = 'low' | 'medium' | 'high'

export type RiskResult = {
  level: RiskLevel
  score: number
  disclaimer: string
  selfCareTips: string[]
}

export type RecommendationItem = {
  id: string
  type: 'music' | 'meditation' | 'book' | 'video' | 'activity' | 'article' | 'podcast'
  title: string
  description: string
  href?: string
  reason: string
}

export type AgentAction =
  | 'analyze_emotion'
  | 'log_mood'
  | 'recommend'
  | 'show_emergency'
  | 'suggest_journal'
  | 'encourage'

export type AgentResult = {
  emotion: EmotionResult
  stress: StressResult
  risk: RiskResult
  recommendations: RecommendationItem[]
  actionsTaken: AgentAction[]
  motivation: string
  shouldShowEmergency: boolean
}
