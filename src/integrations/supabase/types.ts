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
      mock_tests: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          difficulty: string
          duration: number
          id: string
          is_active: boolean
          subject: string
          title: string
          total_marks: number
          total_questions: number
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          difficulty: string
          duration: number
          id?: string
          is_active?: boolean
          subject: string
          title: string
          total_marks: number
          total_questions: number
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          difficulty?: string
          duration?: number
          id?: string
          is_active?: boolean
          subject?: string
          title?: string
          total_marks?: number
          total_questions?: number
        }
        Relationships: []
      }
      questions: {
        Row: {
          book_name: string | null
          chapter: string | null
          correct_option: string
          created_at: string
          created_by: string
          explanation: string | null
          id: string
          marks: number
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question_text: string
          source_id: string | null
          source_type: string
          subject: string
          year: number | null
        }
        Insert: {
          book_name?: string | null
          chapter?: string | null
          correct_option: string
          created_at?: string
          created_by: string
          explanation?: string | null
          id?: string
          marks?: number
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question_text: string
          source_id?: string | null
          source_type: string
          subject: string
          year?: number | null
        }
        Update: {
          book_name?: string | null
          chapter?: string | null
          correct_option?: string
          created_at?: string
          created_by?: string
          explanation?: string | null
          id?: string
          marks?: number
          option_a?: string
          option_b?: string
          option_c?: string
          option_d?: string
          question_text?: string
          source_id?: string | null
          source_type?: string
          subject?: string
          year?: number | null
        }
        Relationships: []
      }
      test_attempts: {
        Row: {
          completed_at: string
          correct_answers: number
          id: string
          percentage: number
          score: number
          test_id: string
          time_taken: number
          total_marks: number
          total_questions: number
          user_id: string
        }
        Insert: {
          completed_at?: string
          correct_answers: number
          id?: string
          percentage: number
          score: number
          test_id: string
          time_taken: number
          total_marks: number
          total_questions: number
          user_id: string
        }
        Update: {
          completed_at?: string
          correct_answers?: number
          id?: string
          percentage?: number
          score?: number
          test_id?: string
          time_taken?: number
          total_marks?: number
          total_questions?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_attempts_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "mock_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      user_answers: {
        Row: {
          attempt_id: string
          id: string
          is_correct: boolean
          marks_obtained: number
          question_id: string
          selected_option: string | null
        }
        Insert: {
          attempt_id: string
          id?: string
          is_correct: boolean
          marks_obtained: number
          question_id: string
          selected_option?: string | null
        }
        Update: {
          attempt_id?: string
          id?: string
          is_correct?: boolean
          marks_obtained?: number
          question_id?: string
          selected_option?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_answers_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "test_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_scores: {
        Row: {
          average_score: number
          correct_answers: number
          id: string
          last_rank_change: string | null
          rank_position: number | null
          tests_taken: number
          total_points: number
          total_questions: number
          updated_at: string
          user_id: string
        }
        Insert: {
          average_score?: number
          correct_answers?: number
          id?: string
          last_rank_change?: string | null
          rank_position?: number | null
          tests_taken?: number
          total_points?: number
          total_questions?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          average_score?: number
          correct_answers?: number
          id?: string
          last_rank_change?: string | null
          rank_position?: number | null
          tests_taken?: number
          total_points?: number
          total_questions?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_user_rankings: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
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
