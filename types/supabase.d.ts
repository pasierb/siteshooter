export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      api_keys: {
        Row: {
          created_at: string
          id: string
          key: string
          last_used_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          last_used_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          last_used_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      shots: {
        Row: {
          api_key_id: string
          config: Json
          created_at: string
          id: string
          image_key: string
          image_url: string
          user_id: string
        }
        Insert: {
          api_key_id: string
          config: Json
          created_at?: string
          id?: string
          image_key: string
          image_url: string
          user_id: string
        }
        Update: {
          api_key_id?: string
          config?: Json
          created_at?: string
          id?: string
          image_key?: string
          image_url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shots_api_key_id_fkey"
            columns: ["api_key_id"]
            referencedRelation: "api_keys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shots_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

