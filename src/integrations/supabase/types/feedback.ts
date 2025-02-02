export interface FeedbackTypes {
  Tables: {
    challenge_feedback: {
      Row: {
        id: string
        user_id: string
        challenge_id: string
        rating: number
        feedback_text: string | null
        created_at: string | null
      }
      Insert: {
        id?: string
        user_id: string
        challenge_id: string
        rating: number
        feedback_text?: string | null
        created_at?: string | null
      }
      Update: {
        id?: string
        user_id?: string
        challenge_id?: string
        rating?: number
        feedback_text?: string | null
        created_at?: string | null
      }
    }
  }
}