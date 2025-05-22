import { Database } from "../../common/types/supabase.types";

export type Barber = Database["public"]["Tables"]["barbers"]["Row"];
export type BarberInsert = Database["public"]["Tables"]["barbers"]["Insert"];
export type BarberUpdate = Database["public"]["Tables"]["barbers"]["Update"];

export interface BarberWithAvailability extends Barber {
  availableTimeSlots?: string[];
}
