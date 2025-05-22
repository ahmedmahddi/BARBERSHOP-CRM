import { Database } from "../../common/types/supabase.types";

export type Booking = Database["public"]["Tables"]["bookings"]["Row"];
export type BookingInsert = Database["public"]["Tables"]["bookings"]["Insert"];
export type BookingUpdate = Database["public"]["Tables"]["bookings"]["Update"];

export interface BookingWithDetails extends Booking {
  barber_name?: string;
  service_name?: string;
  service_duration?: number;
  service_price?: number;
}
