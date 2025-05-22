import { Database } from "../../common/types/supabase.types";

export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"];
export type OrderUpdate = Database["public"]["Tables"]["orders"]["Update"];

export type OrderItem = Database["public"]["Tables"]["order_items"]["Row"];
export type OrderItemInsert =
  Database["public"]["Tables"]["order_items"]["Insert"];
export type OrderItemUpdate =
  Database["public"]["Tables"]["order_items"]["Update"];

// Type for creating order items in service layer (without order_id)
export type OrderItemCreate = Omit<OrderItemInsert, "order_id"> & {
  order_id?: string;
};

export interface OrderWithItems extends Order {
  items?: OrderItemWithProduct[];
}

export interface OrderItemWithProduct extends OrderItem {
  product_name?: string;
  product_image_url?: string | null;
}
