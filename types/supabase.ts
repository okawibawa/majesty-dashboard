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
      customizations: {
        Row: {
          base_price: number
          created_at: string
          id: number
          name: string
          selling_price: number
        }
        Insert: {
          base_price: number
          created_at?: string
          id?: number
          name: string
          selling_price: number
        }
        Update: {
          base_price?: number
          created_at?: string
          id?: number
          name?: string
          selling_price?: number
        }
        Relationships: []
      }
      menu_customizations: {
        Row: {
          created_at: string
          customization_id: number
          id: number
          menu_id: number
        }
        Insert: {
          created_at?: string
          customization_id: number
          id?: number
          menu_id: number
        }
        Update: {
          created_at?: string
          customization_id?: number
          id?: number
          menu_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "menu_customizations_customization_id_fkey"
            columns: ["customization_id"]
            isOneToOne: false
            referencedRelation: "customizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menu_customizations_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
        ]
      }
      menus: {
        Row: {
          base_price: number
          category: Database["public"]["Enums"]["category"]
          created_at: string
          description: string
          id: number
          name: string
          selling_price: number
          updated_at: string
        }
        Insert: {
          base_price: number
          category: Database["public"]["Enums"]["category"]
          created_at?: string
          description: string
          id?: number
          name: string
          selling_price: number
          updated_at?: string
        }
        Update: {
          base_price?: number
          category?: Database["public"]["Enums"]["category"]
          created_at?: string
          description?: string
          id?: number
          name?: string
          selling_price?: number
          updated_at?: string
        }
        Relationships: []
      }
      order_detail: {
        Row: {
          created_at: string
          id: number
          menu_id: number
          note: string | null
          order_id: number
          qty: number
          subtotal: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          menu_id: number
          note?: string | null
          order_id: number
          qty: number
          subtotal: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          menu_id?: number
          note?: string | null
          order_id?: number
          qty?: number
          subtotal?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_detail_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_detail_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_detail_customization: {
        Row: {
          created_at: string
          customization_id: number
          id: number
          order_detail_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customization_id: number
          id?: number
          order_detail_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          customization_id?: number
          id?: number
          order_detail_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_detail_customization_customization_id_fkey"
            columns: ["customization_id"]
            isOneToOne: false
            referencedRelation: "customizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_detail_customization_order_detail_id_fkey"
            columns: ["order_detail_id"]
            isOneToOne: false
            referencedRelation: "order_detail"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_name: string
          id: number
          note: string | null
          payment_method: string
          total: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_name: string
          id?: number
          note?: string | null
          payment_method: string
          total: number
          updated_at: string
        }
        Update: {
          created_at?: string
          customer_name?: string
          id?: number
          note?: string | null
          payment_method?: string
          total?: number
          updated_at?: string
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
      category:
        | "beef_burger"
        | "chicken_burger"
        | "chicken_wingsside_dish"
        | "drink"
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
