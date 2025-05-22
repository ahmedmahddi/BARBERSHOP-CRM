import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../core/supabase.client";
import { Barber, BarberInsert, BarberUpdate } from "./barbers.types";
import { createError } from "../../core/error.middleware";

export class BarbersRepository {
  async findAll(): Promise<Barber[]> {
    const { data, error } = await supabase
      .from("barbers")
      .select("*")
      .order("name");

    if (error) {
      throw createError(`Failed to fetch barbers: ${error.message}`, 500);
    }

    return data as Barber[];
  }

  async findById(id: string): Promise<Barber> {
    const { data, error } = await supabase
      .from("barbers")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        throw createError(`Barber with ID ${id} not found`, 404);
      }
      throw createError(`Failed to fetch barber: ${error.message}`, 500);
    }

    return data as Barber;
  }

  async create(barber: BarberInsert): Promise<Barber> {
    const newBarber: BarberInsert = {
      ...barber,
      id: uuidv4(),
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("barbers")
      .insert(newBarber)
      .select()
      .single();

    if (error) {
      throw createError(`Failed to create barber: ${error.message}`, 500);
    }

    return data as Barber;
  }

  async update(id: string, barber: BarberUpdate): Promise<Barber> {
    const updateData: BarberUpdate = {
      ...barber,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("barbers")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        throw createError(`Barber with ID ${id} not found`, 404);
      }
      throw createError(`Failed to update barber: ${error.message}`, 500);
    }

    return data as Barber;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("barbers").delete().eq("id", id);

    if (error) {
      if (error.code === "PGRST116") {
        throw createError(`Barber with ID ${id} not found`, 404);
      }
      throw createError(`Failed to delete barber: ${error.message}`, 500);
    }
  }
}
