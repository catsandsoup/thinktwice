export interface ProfileTypes {
  Tables: {
    profiles: {
      Row: {
        id: string
        display_name: string | null
        bio: string | null
        avatar_url: string | null
        email_notifications: boolean | null
        push_notifications: boolean | null
        theme: string | null
        created_at: string
        enterprise_id: string | null
        two_factor_enabled: boolean | null
      }
      Insert: {
        id: string
        display_name?: string | null
        bio?: string | null
        avatar_url?: string | null
        email_notifications?: boolean | null
        push_notifications?: boolean | null
        theme?: string | null
        created_at?: string
        enterprise_id?: string | null
        two_factor_enabled?: boolean | null
      }
      Update: {
        id?: string
        display_name?: string | null
        bio?: string | null
        avatar_url?: string | null
        email_notifications?: boolean | null
        push_notifications?: boolean | null
        theme?: string | null
        created_at?: string
        enterprise_id?: string | null
        two_factor_enabled?: boolean | null
      }
    }
  }
}