export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<User, 'id' | 'created_at'>>
      }
      projects: {
        Row: {
          id: string
          name: string
          description?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          description?: string
        }
        Update: Partial<{
          name: string
          description?: string
        }>
      }
    }
  }
}