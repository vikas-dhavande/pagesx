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
      files: {
        Row: {
          id: string
          user_id: string | null
          uploader_id: string | null
          file_id: string
          file_name: string
          file_url: string
          file_type: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          uploader_id?: string | null
          file_id: string
          file_name: string
          file_url: string
          file_type: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          uploader_id?: string | null
          file_id?: string
          file_name?: string
          file_url?: string
          file_type?: string
          created_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          email: string
          role: "user" | "admin" | "super_user" | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          email: string
          role?: "user" | "admin" | "super_user" | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          role?: "user" | "admin" | "super_user" | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
