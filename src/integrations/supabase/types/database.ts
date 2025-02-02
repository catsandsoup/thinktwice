import { AuthTypes } from './auth'
import { ChallengeTypes } from './challenges'
import { FeedbackTypes } from './feedback'
import { ProfileTypes } from './profiles'

export type Database = {
  public: AuthTypes["Tables"] & 
          ChallengeTypes["Tables"] & 
          FeedbackTypes["Tables"] & 
          ProfileTypes["Tables"] & {
    Enums: {
      app_role: "admin" | "user" | "tester"
      challenge_type: "headline" | "fallacy" | "media" | "source" | "word-selection" | "matching" | "highlight"
      difficulty_level: "beginner" | "intermediate" | "advanced"
      journey_type: "finance" | "science" | "critical_thinking" | "argument" | "beginner"
    }
  }
}

export type Tables<T extends keyof Database['public']> = Database['public'][T]
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]