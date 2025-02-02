import { Database } from './database'

export interface ChallengeTypes {
  Tables: {
    challenges: {
      Row: {
        id: string
        title: string
        description: string
        type: Database["public"]["Enums"]["challenge_type"]
        difficulty: Database["public"]["Enums"]["difficulty_level"]
        xp_reward: number
        created_at: string | null
        journey_id: string | null
      }
      Insert: {
        id?: string
        title: string
        description: string
        type: Database["public"]["Enums"]["challenge_type"]
        difficulty: Database["public"]["Enums"]["difficulty_level"]
        xp_reward?: number
        created_at?: string | null
        journey_id?: string | null
      }
      Update: {
        id?: string
        title?: string
        description?: string
        type?: Database["public"]["Enums"]["challenge_type"]
        difficulty?: Database["public"]["Enums"]["difficulty_level"]
        xp_reward?: number
        created_at?: string | null
        journey_id?: string | null
      }
    }
  }
}