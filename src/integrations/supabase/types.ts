export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      challenges: {
        Row: {
          created_at: string | null
          description: string
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          id: string
          title: string
          type: Database["public"]["Enums"]["challenge_type"]
          xp_reward: number
        }
        Insert: {
          created_at?: string | null
          description: string
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          title: string
          type: Database["public"]["Enums"]["challenge_type"]
          xp_reward?: number
        }
        Update: {
          created_at?: string | null
          description?: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          title?: string
          type?: Database["public"]["Enums"]["challenge_type"]
          xp_reward?: number
        }
        Relationships: []
      }
      highlight_challenges: {
        Row: {
          challenge_id: string | null
          id: string
          statement: string
        }
        Insert: {
          challenge_id?: string | null
          id?: string
          statement: string
        }
        Update: {
          challenge_id?: string | null
          id?: string
          statement?: string
        }
        Relationships: [
          {
            foreignKeyName: "highlight_challenges_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      highlight_texts: {
        Row: {
          explanation: string
          highlight_id: string | null
          id: string
          text: string
        }
        Insert: {
          explanation: string
          highlight_id?: string | null
          id?: string
          text: string
        }
        Update: {
          explanation?: string
          highlight_id?: string | null
          id?: string
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "highlight_texts_highlight_id_fkey"
            columns: ["highlight_id"]
            isOneToOne: false
            referencedRelation: "highlight_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      matching_challenges: {
        Row: {
          challenge_id: string | null
          id: string
        }
        Insert: {
          challenge_id?: string | null
          id?: string
        }
        Update: {
          challenge_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "matching_challenges_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      matching_pairs: {
        Row: {
          claim: string
          evidence: string
          id: string
          matching_id: string | null
        }
        Insert: {
          claim: string
          evidence: string
          id?: string
          matching_id?: string | null
        }
        Update: {
          claim?: string
          evidence?: string
          id?: string
          matching_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matching_pairs_matching_id_fkey"
            columns: ["matching_id"]
            isOneToOne: false
            referencedRelation: "matching_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      standard_challenge_options: {
        Row: {
          challenge_id: string | null
          explanation: string
          id: string
          is_correct: boolean
          text: string
        }
        Insert: {
          challenge_id?: string | null
          explanation: string
          id?: string
          is_correct?: boolean
          text: string
        }
        Update: {
          challenge_id?: string | null
          explanation?: string
          id?: string
          is_correct?: boolean
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "standard_challenge_options_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      word_selection_challenges: {
        Row: {
          challenge_id: string | null
          id: string
          passage: string
        }
        Insert: {
          challenge_id?: string | null
          id?: string
          passage: string
        }
        Update: {
          challenge_id?: string | null
          id?: string
          passage?: string
        }
        Relationships: [
          {
            foreignKeyName: "word_selection_challenges_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      word_selection_keywords: {
        Row: {
          explanation: string
          id: string
          word: string
          word_selection_id: string | null
        }
        Insert: {
          explanation: string
          id?: string
          word: string
          word_selection_id?: string | null
        }
        Update: {
          explanation?: string
          id?: string
          word?: string
          word_selection_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "word_selection_keywords_word_selection_id_fkey"
            columns: ["word_selection_id"]
            isOneToOne: false
            referencedRelation: "word_selection_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user" | "tester"
      challenge_pathway: "truth_explorer" | "fact_finder" | "digital_guardian"
      challenge_type:
        | "headline"
        | "fallacy"
        | "media"
        | "source"
        | "word-selection"
        | "matching"
        | "highlight"
      difficulty_level: "beginner" | "intermediate" | "advanced"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
