export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type AppRole = "admin" | "user" | "tester"

export interface AuthTypes {
  Tables: {
    user_roles: {
      Row: {
        id: string
        user_id: string
        role: AppRole
        created_at: string | null
      }
      Insert: {
        id?: string
        user_id: string
        role?: AppRole
        created_at?: string | null
      }
      Update: {
        id?: string
        user_id?: string
        role?: AppRole
        created_at?: string | null
      }
    }
  }
}