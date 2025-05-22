// Database types based on updated ER diagram

export type Barber = {
  barber_id: number;
  name: string;
  bio: string;
  rating: number;
  created_at: string;
};

export type Service = {
  service_id: number;
  name: string;
  description: string;
  price: number;
  duration: number; // minutes
  created_at: string;
};

export type Customer = {
  customer_id: number;
  name: string;
  email: string; // Unique
  phone: string;
  loyalty_points: number;
  referral_count: number;
  total_spent: number;
  created_at: string;
};

export type Product = {
  product_id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  sales: number;
  created_at: string;
};

export type Appointment = {
  appointment_id: number;
  customer_id: number;
  service_id: number;
  barber_id: number;
  discount_id: number | null;
  appointment_date: string;
  appointment_time: string;
  price: number;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  email_reminder: boolean;
  comments: string | null;
  image_url: string | null;
  created_at: string;
};

export type Order = {
  order_id: number;
  customer_id: number;
  discount_id: number | null;
  order_date: string;
  subtotal: number;
  shipping: number;
  total: number;
  payment_method: string;
  payment_last4: string | null;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  created_at: string;
};

export type OrderItem = {
  order_item_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
};

export type PurchaseHistory = {
  purchase_id: number;
  customer_id: number;
  product_id: number;
  purchase_date: string;
  price: number;
  created_at: string;
};

export type Admin = {
  admin_id: number;
  name: string;
  email: string;
  password_hash: string;
  role: string;
  created_at: string;
};

export type Gallery = {
  gallery_id: number;
  url: string;
  alt_text: string;
  created_at: string;
};

export type Testimonial = {
  testimonial_id: number;
  customer_id: number;
  name: string;
  text: string;
  rating: number;
  created_at: string;
};

export type Discount = {
  discount_id: number;
  code: string;
  description: string;
  amount: number;
  type: string; // percentage, fixed
  valid_from: string;
  valid_until: string;
  created_at: string;
};

export type Schedule = {
  schedule_id: number;
  barber_id: number;
  schedule_date: string;
  start_time: string;
  end_time: string;
  status: string;
  created_at: string;
};

export type InventoryTransaction = {
  transaction_id: number;
  product_id: number;
  quantity: number;
  type: string;
  order_id: number | null;
  transaction_date: string;
  created_at: string;
};

export type LoyaltyTransaction = {
  transaction_id: number;
  customer_id: number;
  points: number;
  type: string;
  appointment_id: number | null;
  order_id: number | null;
  transaction_date: string;
  created_at: string;
};

export type AuditLog = {
  log_id: number;
  admin_id: number;
  action: string;
  entity_type: string;
  entity_id: number;
  details: string;
  log_date: string;
  created_at: string;
};
