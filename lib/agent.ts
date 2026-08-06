import { analyzeEmotion, emotionToMoodValue } from './emotion'
import { assessRisk, detectStress } from './stress-risk'
import { getMotivation, getRecommendations } from './recommendations'
import { detectCrisis } from './crisis'
import type { AgentAction, AgentResult } from './wellbeing-types'

/**
 * Agentic AI orchestrator:
 * analyze emotion → stress/risk → recommendations → emergency flag → motivation
 * Does NOT diagnose medical conditions.
 */
export function runWellbeingAgent(text: string): AgentResult {
  const actionsTaken: AgentAction[] = ['analyze_emotion']
  const emotion = analyzeEmotion(text)
  const stress = detectStress(text, emotion)
  const risk = assessRisk(text, stress, emotion)
  const recommendations = getRecommendations(emotion.primary, risk.level)
  const shouldShowEmergency =
    detectCrisis(text) || risk.level === 'high' || stress.level === 'high'

  actionsTaken.push('log_mood', 'recommend')
  if (shouldShowEmergency) actionsTaken.push('show_emergency')
  if (emotion.primary === 'sad' || emotion.primary === 'lonely') {
    actionsTaken.push('suggest_journal')
  }
  actionsTaken.push('encourage')

  return {
    emotion,
    stress,
    risk,
    recommendations,
    actionsTaken,
    motivation: getMotivation(text),
    shouldShowEmergency,
  }
}

export function agentMoodSnapshot(text: string) {
  const emotion = analyzeEmotion(text)
  return {
    mood: emotionToMoodValue(emotion.primary),
    emotion: emotion.primary,
    label: emotion.thaiLabel,
    timestamp: new Date().toISOString(),
  }
}
