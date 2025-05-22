import { Request, Response, NextFunction } from "express";
import { supabase } from "../../core/supabase.client";
import { isTimeSlotAvailable } from "../utils/date.utils";

/** Validates booking time slot and barber availability */
export async function validateBooking(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { barberId, date, time, serviceId } = req.body;

    // Validate service exists and get duration
    const { data: service, error: serviceError } = await supabase
      .from("services")
      .select("duration")
      .eq("id", serviceId)
      .single();

    if (serviceError || !service) {
      res.status(400).json({ error: "Invalid service ID" });
      return;
    }

    // Validate barber exists
    const { data: barber, error: barberError } = await supabase
      .from("barbers")
      .select("id")
      .eq("id", barberId)
      .single();

    if (barberError || !barber) {
      res.status(400).json({ error: "Invalid barber ID" });
      return;
    }

    // Check if time slot is available
    const isAvailable = await isTimeSlotAvailable(
      barberId,
      date,
      time,
      service.duration
    );
    if (!isAvailable) {
      res
        .status(400)
        .json({ error: "Time slot not available for this barber" });
      return;
    }

    next();
  } catch (error) {
    console.error("Error validating booking:", error);
    res
      .status(500)
      .json({ error: "Internal server error during booking validation" });
  }
}
