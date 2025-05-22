import { supabase } from "../../core/supabase.client";

/** Checks if a time slot is available for a barber */
export async function isTimeSlotAvailable(
  barberId: string,
  date: string,
  time: string,
  duration: number
): Promise<boolean> {
  try {
    // Convert input time to Date object
    const startTime = new Date(`${date}T${time}`);
    const endTime = new Date(startTime.getTime() + duration * 60 * 1000);

    // Get all bookings for the barber on the specified date
    const { data, error } = await supabase
      .from("bookings")
      .select("date, time, service_id")
      .eq("barber_id", barberId)
      .eq("date", date)
      .in("status", ["confirmed", "pending"]);

    if (error) {
      console.error("Error checking availability:", error);
      throw new Error(`Failed to check availability: ${error.message}`);
    }

    // Check for overlapping bookings
    for (const booking of data || []) {
      // Get service duration for the booking
      const { data: service } = await supabase
        .from("services")
        .select("duration")
        .eq("id", booking.service_id)
        .single();

      const bookingStart = new Date(`${booking.date}T${booking.time}`);
      const bookingEnd = new Date(
        bookingStart.getTime() + (service?.duration || 30) * 60 * 1000
      );

      // Check if time slots overlap
      if (startTime < bookingEnd && endTime > bookingStart) {
        return false;
      }
    }

    // Check if time is within business hours (e.g., 9 AM to 7 PM)
    const hour = startTime.getHours();
    if (hour < 9 || hour >= 19) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in isTimeSlotAvailable:", error);
    return false;
  }
}

/** Format date string to YYYY-MM-DD */
export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

/** Format time string to HH:MM */
export function formatTime(date: Date): string {
  return date.toTimeString().substring(0, 5);
}

/** Get available time slots for a barber on a specific date */
export async function getAvailableTimeSlots(
  barberId: string,
  date: string,
  serviceDuration: number
): Promise<string[]> {
  // Business hours: 9 AM to 7 PM
  const startHour = 9;
  const endHour = 19;
  const slotInterval = 30; // minutes

  const availableSlots: string[] = [];

  // Generate all possible time slots
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += slotInterval) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;

      // Check if slot is available
      const isAvailable = await isTimeSlotAvailable(
        barberId,
        date,
        timeString,
        serviceDuration
      );

      if (isAvailable) {
        availableSlots.push(timeString);
      }
    }
  }

  return availableSlots;
}
