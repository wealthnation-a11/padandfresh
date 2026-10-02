export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      campaigns: {
        Row: {
          created_at: string
          featured: boolean
          focus_areas: Json
          headline: string | null
          id: string
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: string
          summary: string | null
          support_amount: number | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          featured?: boolean
          focus_areas?: Json
          headline?: string | null
          id?: string
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: string
          summary?: string | null
          support_amount?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          featured?: boolean
          focus_areas?: Json
          headline?: string | null
          id?: string
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: string
          summary?: string | null
          support_amount?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      community_members: {
        Row: {
          consent_updates: boolean
          created_at: string
          email: string
          first_name: string
          id: string
          interests: Json
          last_name: string
          member_type: string
          organization: string | null
          phone: string | null
          status: string
        }
        Insert: {
          consent_updates?: boolean
          created_at?: string
          email: string
          first_name: string
          id?: string
          interests?: Json
          last_name: string
          member_type: string
          organization?: string | null
          phone?: string | null
          status?: string
        }
        Update: {
          consent_updates?: boolean
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          interests?: Json
          last_name?: string
          member_type?: string
          organization?: string | null
          phone?: string | null
          status?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          interest: string | null
          message: string
          name: string
          organization: string | null
          phone: string | null
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          interest?: string | null
          message: string
          name: string
          organization?: string | null
          phone?: string | null
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          interest?: string | null
          message?: string
          name?: string
          organization?: string | null
          phone?: string | null
          subject?: string
        }
        Relationships: []
      }
      content_items: {
        Row: {
          audience: Json
          collection: string
          created_at: string
          format: string
          id: string
          potential_speakers: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          sort_order: number
          status: string
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          audience?: Json
          collection: string
          created_at?: string
          format?: string
          id?: string
          potential_speakers?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          sort_order?: number
          status?: string
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          audience?: Json
          collection?: string
          created_at?: string
          format?: string
          id?: string
          potential_speakers?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          sort_order?: number
          status?: string
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: number
          boys_count: number
          created_at: string
          display_publicly: boolean
          donation_type: string
          donor_name: string | null
          email: string | null
          girls_count: number
          id: string
          is_anonymous: boolean
          is_recurring: boolean
          payment_reference: string
          payment_status: string
          phone: string | null
          receive_updates: boolean
        }
        Insert: {
          amount: number
          boys_count?: number
          created_at?: string
          display_publicly?: boolean
          donation_type: string
          donor_name?: string | null
          email?: string | null
          girls_count?: number
          id?: string
          is_anonymous?: boolean
          is_recurring?: boolean
          payment_reference: string
          payment_status?: string
          phone?: string | null
          receive_updates?: boolean
        }
        Update: {
          amount?: number
          boys_count?: number
          created_at?: string
          display_publicly?: boolean
          donation_type?: string
          donor_name?: string | null
          email?: string | null
          girls_count?: number
          id?: string
          is_anonymous?: boolean
          is_recurring?: boolean
          payment_reference?: string
          payment_status?: string
          phone?: string | null
          receive_updates?: boolean
        }
        Relationships: []
      }
      event_registrations: {
        Row: {
          attendance: string
          created_at: string
          email: string
          event_id: string | null
          event_slug: string | null
          first_name: string
          id: string
          interests: Json
          last_name: string
          organization: string | null
          phone: string | null
          profession: string
          status: string
        }
        Insert: {
          attendance: string
          created_at?: string
          email: string
          event_id?: string | null
          event_slug?: string | null
          first_name: string
          id?: string
          interests?: Json
          last_name: string
          organization?: string | null
          phone?: string | null
          profession: string
          status?: string
        }
        Update: {
          attendance?: string
          created_at?: string
          email?: string
          event_id?: string | null
          event_slug?: string | null
          first_name?: string
          id?: string
          interests?: Json
          last_name?: string
          organization?: string | null
          phone?: string | null
          profession?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_schedule_items: {
        Row: {
          audience: Json
          day_number: number | null
          description: string | null
          event_id: string
          id: string
          sort_order: number
          status: string
          subtitle: string | null
          title: string
          topics: Json
        }
        Insert: {
          audience?: Json
          day_number?: number | null
          description?: string | null
          event_id: string
          id?: string
          sort_order?: number
          status?: string
          subtitle?: string | null
          title: string
          topics?: Json
        }
        Update: {
          audience?: Json
          day_number?: number | null
          description?: string | null
          event_id?: string
          id?: string
          sort_order?: number
          status?: string
          subtitle?: string | null
          title?: string
          topics?: Json
        }
        Relationships: [
          {
            foreignKeyName: "event_schedule_items_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_speakers: {
        Row: {
          event_id: string
          session_title: string | null
          speaker_id: string
        }
        Insert: {
          event_id: string
          session_title?: string | null
          speaker_id: string
        }
        Update: {
          event_id?: string
          session_title?: string | null
          speaker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_speakers_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_speakers_speaker_id_fkey"
            columns: ["speaker_id"]
            isOneToOne: false
            referencedRelation: "speakers"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          capacity: number | null
          category: string
          created_at: string
          date_label: string
          description: string | null
          ends_at: string | null
          featured: boolean
          format: string
          id: string
          image_url: string | null
          location: string | null
          registration_status: string
          seo_description: string | null
          seo_title: string | null
          slug: string
          starts_at: string | null
          status: string
          subtitle: string | null
          summary: string | null
          title: string
          updated_at: string
          venue: string | null
          venue_label: string
        }
        Insert: {
          capacity?: number | null
          category: string
          created_at?: string
          date_label?: string
          description?: string | null
          ends_at?: string | null
          featured?: boolean
          format?: string
          id?: string
          image_url?: string | null
          location?: string | null
          registration_status?: string
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          starts_at?: string | null
          status?: string
          subtitle?: string | null
          summary?: string | null
          title: string
          updated_at?: string
          venue?: string | null
          venue_label?: string
        }
        Update: {
          capacity?: number | null
          category?: string
          created_at?: string
          date_label?: string
          description?: string | null
          ends_at?: string | null
          featured?: boolean
          format?: string
          id?: string
          image_url?: string | null
          location?: string | null
          registration_status?: string
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          starts_at?: string | null
          status?: string
          subtitle?: string | null
          summary?: string | null
          title?: string
          updated_at?: string
          venue?: string | null
          venue_label?: string
        }
        Relationships: []
      }
      impact_metrics: {
        Row: {
          context: string | null
          id: string
          is_public: boolean
          label: string
          metric_key: string
          metric_type: string
          sort_order: number
          suffix: string | null
          updated_at: string
          value: number
        }
        Insert: {
          context?: string | null
          id?: string
          is_public?: boolean
          label: string
          metric_key: string
          metric_type?: string
          sort_order?: number
          suffix?: string | null
          updated_at?: string
          value?: number
        }
        Update: {
          context?: string | null
          id?: string
          is_public?: boolean
          label?: string
          metric_key?: string
          metric_type?: string
          sort_order?: number
          suffix?: string | null
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      partners: {
        Row: {
          created_at: string
          description: string | null
          id: string
          logo_url: string | null
          name: string
          partnership_type: string
          sort_order: number
          status: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          partnership_type: string
          sort_order?: number
          status?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          partnership_type?: string
          sort_order?: number
          status?: string
          website_url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          job_title: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          job_title?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          job_title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      speakers: {
        Row: {
          biography: string | null
          category: string
          created_at: string
          id: string
          name: string
          organization: string | null
          photo_url: string | null
          role: string | null
          social_links: Json
          status: string
          updated_at: string
        }
        Insert: {
          biography?: string | null
          category: string
          created_at?: string
          id?: string
          name?: string
          organization?: string | null
          photo_url?: string | null
          role?: string | null
          social_links?: Json
          status?: string
          updated_at?: string
        }
        Update: {
          biography?: string | null
          category?: string
          created_at?: string
          id?: string
          name?: string
          organization?: string | null
          photo_url?: string | null
          role?: string | null
          social_links?: Json
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      volunteers: {
        Row: {
          availability: string | null
          created_at: string
          email: string
          id: string
          interest_area: string
          message: string | null
          name: string
          phone: string | null
        }
        Insert: {
          availability?: string | null
          created_at?: string
          email: string
          id?: string
          interest_area: string
          message?: string | null
          name: string
          phone?: string | null
        }
        Update: {
          availability?: string | null
          created_at?: string
          email?: string
          id?: string
          interest_area?: string
          message?: string | null
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor"],
    },
  },
} as const
