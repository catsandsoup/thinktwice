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
          analysis_skill: string | null
          created_at: string | null
          critical_thinking_tip: string | null
          description: string
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          id: string
          pathway: Database["public"]["Enums"]["challenge_pathway"]
          practical_tip: string | null
          real_world_application: string | null
          skill_development: string | null
          title: string
          type: Database["public"]["Enums"]["challenge_type"]
          updated_at: string | null
          xp_reward: number
        }
        Insert: {
          analysis_skill?: string | null
          created_at?: string | null
          critical_thinking_tip?: string | null
          description: string
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          id: string
          pathway: Database["public"]["Enums"]["challenge_pathway"]
          practical_tip?: string | null
          real_world_application?: string | null
          skill_development?: string | null
          title: string
          type: Database["public"]["Enums"]["challenge_type"]
          updated_at?: string | null
          xp_reward: number
        }
        Update: {
          analysis_skill?: string | null
          created_at?: string | null
          critical_thinking_tip?: string | null
          description?: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          pathway?: Database["public"]["Enums"]["challenge_pathway"]
          practical_tip?: string | null
          real_world_application?: string | null
          skill_development?: string | null
          title?: string
          type?: Database["public"]["Enums"]["challenge_type"]
          updated_at?: string | null
          xp_reward?: number
        }
        Relationships: []
      }
      highlight_challenges: {
        Row: {
          challenge_id: string
          statement: string
        }
        Insert: {
          challenge_id: string
          statement: string
        }
        Update: {
          challenge_id?: string
          statement?: string
        }
        Relationships: [
          {
            foreignKeyName: "highlight_challenges_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: true
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      highlight_texts: {
        Row: {
          challenge_id: string | null
          explanation: string
          id: number
          text: string
        }
        Insert: {
          challenge_id?: string | null
          explanation: string
          id?: number
          text: string
        }
        Update: {
          challenge_id?: string | null
          explanation?: string
          id?: number
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "highlight_texts_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "highlight_challenges"
            referencedColumns: ["challenge_id"]
          },
        ]
      }
      matching_challenges: {
        Row: {
          challenge_id: string
        }
        Insert: {
          challenge_id: string
        }
        Update: {
          challenge_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "matching_challenges_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: true
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      matching_pairs: {
        Row: {
          best_evidence: string
          challenge_id: string | null
          claim: string
          explanation: string | null
          id: number
        }
        Insert: {
          best_evidence: string
          challenge_id?: string | null
          claim: string
          explanation?: string | null
          id?: number
        }
        Update: {
          best_evidence?: string
          challenge_id?: string | null
          claim?: string
          explanation?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "matching_pairs_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "matching_challenges"
            referencedColumns: ["challenge_id"]
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
          id: string
          is_correct: boolean
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
      word_selection_challenges: {
        Row: {
          challenge_id: string
          passage: string
        }
        Insert: {
          challenge_id: string
          passage: string
        }
        Update: {
          challenge_id?: string
          passage?: string
        }
        Relationships: [
          {
            foreignKeyName: "word_selection_challenges_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: true
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      word_selection_keywords: {
        Row: {
          challenge_id: string | null
          explanation: string
          id: number
          word: string
        }
        Insert: {
          challenge_id?: string | null
          explanation: string
          id?: number
          word: string
        }
        Update: {
          challenge_id?: string | null
          explanation?: string
          id?: number
          word?: string
        }
        Relationships: [
          {
            foreignKeyName: "word_selection_keywords_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "word_selection_challenges"
            referencedColumns: ["challenge_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      challenge_pathway: "truth_explorer" | "fact_finder" | "digital_guardian"
      challenge_type:
        | "standard"
        | "word-selection"
        | "matching"
        | "highlight"
        | "analysis-construction"
        | "argument-construction"
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
