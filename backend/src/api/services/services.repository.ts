import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../core/supabase.client";
import { Service, ServiceInsert, ServiceUpdate } from "./services.types";
import { createError } from "../../core/error.middleware";

export class ServicesRepository {
  async findAll(): Promise<Service[]> {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("name");

    if (error) {
      throw createError(`Failed to fetch services: ${error.message}`, 500);
    }

    return data as Service[];
  }

  async findById(id: string): Promise<Service> {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        throw createError(`Service with ID ${id} not found`, 404);
      }
      throw createError(`Failed to fetch service: ${error.message}`, 500);
    }

    return data as Service;
  }

  async create(service: ServiceInsert): Promise<Service> {
    const newService: ServiceInsert = {
      ...service,
      id: uuidv4(),
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("services")
      .insert(newService)
      .select()
      .single();

    if (error) {
      throw createError(`Failed to create service: ${error.message}`, 500);
    }

    return data as Service;
  }

  async update(id: string, service: ServiceUpdate): Promise<Service> {
    const updateData: ServiceUpdate = {
      ...service,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("services")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        throw createError(`Service with ID ${id} not found`, 404);
      }
      throw createError(`Failed to update service: ${error.message}`, 500);
    }

    return data as Service;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("services").delete().eq("id", id);

    if (error) {
      if (error.code === "PGRST116") {
        throw createError(`Service with ID ${id} not found`, 404);
      }
      throw createError(`Failed to delete service: ${error.message}`, 500);
    }
  }
}
