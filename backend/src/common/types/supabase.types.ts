export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      barbers: {
        Row: {
          id: string;
          name: string;
          email: string | null;
          phone: string | null;
          photo_url: string | null;
          description: string | null;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          email?: string | null;
          phone?: string | null;
          photo_url?: string | null;
          description?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string | null;
          phone?: string | null;
          photo_url?: string | null;
          description?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      services: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          duration: number;
          price: number;
          image_url: string | null;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          duration: number;
          price: number;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          duration?: number;
          price?: number;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      bookings: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          barber_id: string;
          service_id: string;
          date: string;
          time: string;
          comments: string | null;
          image_url: string | null;
          status: "confirmed" | "pending" | "cancelled";
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          barber_id: string;
          service_id: string;
          date: string;
          time: string;
          comments?: string | null;
          image_url?: string | null;
          status?: "confirmed" | "pending" | "cancelled";
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          barber_id?: string;
          service_id?: string;
          date?: string;
          time?: string;
          comments?: string | null;
          image_url?: string | null;
          status?: "confirmed" | "pending" | "cancelled";
          created_at?: string;
          updated_at?: string | null;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          image_url: string | null;
          stock: number;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          price: number;
          image_url?: string | null;
          stock: number;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          price?: number;
          image_url?: string | null;
          stock?: number;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      orders: {
        Row: {
          id: string;
          customer_name: string;
          customer_email: string;
          customer_phone: string | null;
          status:
            | "pending"
            | "confirmed"
            | "shipped"
            | "delivered"
            | "cancelled";
          total: number;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          customer_name: string;
          customer_email: string;
          customer_phone?: string | null;
          status?:
            | "pending"
            | "confirmed"
            | "shipped"
            | "delivered"
            | "cancelled";
          total: number;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          customer_name?: string;
          customer_email?: string;
          customer_phone?: string | null;
          status?:
            | "pending"
            | "confirmed"
            | "shipped"
            | "delivered"
            | "cancelled";
          total?: number;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          quantity?: number;
          price?: number;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
