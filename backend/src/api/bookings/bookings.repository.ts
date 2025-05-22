import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../core/supabase.client";
import {
  Booking,
  BookingInsert,
  BookingUpdate,
  BookingWithDetails,
} from "./bookings.types";
import { createError } from "../../core/error.middleware";

export class BookingsRepository {
  async findAll(): Promise<BookingWithDetails[]> {
    const { data, error } = await supabase
      .from("bookings")
      .select(
        `
        *,
        barbers:barber_id (name),
        services:service_id (name, duration, price)
      `
      )
      .order("date", { ascending: true })
      .order("time", { ascending: true });

    if (error) {
      throw createError(`Failed to fetch bookings: ${error.message}`, 500);
    }

    // Transform data to include flattened properties
    const bookingsWithDetails = data.map(booking => {
      const barber = booking.barbers as { name: string };
      const service = booking.services as {
        name: string;
        duration: number;
        price: number;
      };

      return {
        ...booking,
        barbers: undefined,
        services: undefined,
        barber_name: barber?.name,
        service_name: service?.name,
        service_duration: service?.duration,
        service_price: service?.price,
      };
    });

    return bookingsWithDetails as BookingWithDetails[];
  }

  async findById(id: string): Promise<BookingWithDetails> {
    const { data, error } = await supabase
      .from("bookings")
      .select(
        `
        *,
        barbers:barber_id (name),
        services:service_id (name, duration, price)
      `
      )
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        throw createError(`Booking with ID ${id} not found`, 404);
      }
      throw createError(`Failed to fetch booking: ${error.message}`, 500);
    }

    // Transform data to include flattened properties
    const barber = data.barbers as { name: string };
    const service = data.services as {
      name: string;
      duration: number;
      price: number;
    };

    const bookingWithDetails = {
      ...data,
      barbers: undefined,
      services: undefined,
      barber_name: barber?.name,
      service_name: service?.name,
      service_duration: service?.duration,
      service_price: service?.price,
    };

    return bookingWithDetails as BookingWithDetails;
  }

  async create(booking: BookingInsert): Promise<Booking> {
    const newBooking: BookingInsert = {
      ...booking,
      id: uuidv4(),
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("bookings")
      .insert(newBooking)
      .select()
      .single();

    if (error) {
      throw createError(`Failed to create booking: ${error.message}`, 500);
    }

    return data as Booking;
  }

  async update(id: string, booking: BookingUpdate): Promise<Booking> {
    const updateData: BookingUpdate = {
      ...booking,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("bookings")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        throw createError(`Booking with ID ${id} not found`, 404);
      }
      throw createError(`Failed to update booking: ${error.message}`, 500);
    }

    return data as Booking;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("bookings").delete().eq("id", id);

    if (error) {
      if (error.code === "PGRST116") {
        throw createError(`Booking with ID ${id} not found`, 404);
      }
      throw createError(`Failed to delete booking: ${error.message}`, 500);
    }
  }

  async findByDateRange(
    startDate: string,
    endDate: string
  ): Promise<BookingWithDetails[]> {
    const { data, error } = await supabase
      .from("bookings")
      .select(
        `
        *,
        barbers:barber_id (name),
        services:service_id (name, duration, price)
      `
      )
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date", { ascending: true })
      .order("time", { ascending: true });

    if (error) {
      throw createError(
        `Failed to fetch bookings by date range: ${error.message}`,
        500
      );
    }

    // Transform data to include flattened properties
    const bookingsWithDetails = data.map(booking => {
      const barber = booking.barbers as { name: string };
      const service = booking.services as {
        name: string;
        duration: number;
        price: number;
      };

      return {
        ...booking,
        barbers: undefined,
        services: undefined,
        barber_name: barber?.name,
        service_name: service?.name,
        service_duration: service?.duration,
        service_price: service?.price,
      };
    });

    return bookingsWithDetails as BookingWithDetails[];
  }

  async findByBarberId(barberId: string): Promise<BookingWithDetails[]> {
    const { data, error } = await supabase
      .from("bookings")
      .select(
        `
        *,
        barbers:barber_id (name),
        services:service_id (name, duration, price)
      `
      )
      .eq("barber_id", barberId)
      .order("date", { ascending: true })
      .order("time", { ascending: true });

    if (error) {
      throw createError(
        `Failed to fetch bookings by barber ID: ${error.message}`,
        500
      );
    }

    // Transform data to include flattened properties
    const bookingsWithDetails = data.map(booking => {
      const barber = booking.barbers as { name: string };
      const service = booking.services as {
        name: string;
        duration: number;
        price: number;
      };

      return {
        ...booking,
        barbers: undefined,
        services: undefined,
        barber_name: barber?.name,
        service_name: service?.name,
        service_duration: service?.duration,
        service_price: service?.price,
      };
    });

    return bookingsWithDetails as BookingWithDetails[];
  }
}
