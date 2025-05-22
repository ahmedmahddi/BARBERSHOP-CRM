import { ServicesRepository } from "./services.repository";
import { Service } from "./services.types";
import { CreateServiceDto, UpdateServiceDto } from "./services.dto";
import { supabase } from "../../core/supabase.client";
import { createError } from "../../core/error.middleware";

export class ServicesService {
  private repository: ServicesRepository;

  constructor() {
    this.repository = new ServicesRepository();
  }

  async getAllServices(): Promise<Service[]> {
    return this.repository.findAll();
  }

  async getServiceById(id: string): Promise<Service> {
    return this.repository.findById(id);
  }

  async createService(dto: CreateServiceDto): Promise<Service> {
    const serviceData = {
      name: dto.name,
      description: dto.description || null,
      duration: dto.duration,
      price: dto.price,
      image_url: dto.imageUrl || null,
    };

    return this.repository.create(serviceData);
  }

  async updateService(id: string, dto: UpdateServiceDto): Promise<Service> {
    const serviceData = {
      ...(dto.name && { name: dto.name }),
      ...(dto.description !== undefined && { description: dto.description }),
      ...(dto.duration !== undefined && { duration: dto.duration }),
      ...(dto.price !== undefined && { price: dto.price }),
      ...(dto.imageUrl !== undefined && { image_url: dto.imageUrl }),
    };

    return this.repository.update(id, serviceData);
  }

  async deleteService(id: string): Promise<void> {
    // Check if service is used in any bookings
    const { count, error } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("service_id", id);

    if (error) {
      throw createError(
        `Failed to check service bookings: ${error.message}`,
        500
      );
    }

    if (count && count > 0) {
      throw createError(
        `Cannot delete service with ID ${id} because it's used in ${count} bookings`,
        400
      );
    }

    return this.repository.delete(id);
  }
}
