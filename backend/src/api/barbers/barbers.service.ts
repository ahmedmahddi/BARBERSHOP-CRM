import { BarbersRepository } from "./barbers.repository";
import { Barber, BarberWithAvailability } from "./barbers.types";
import { CreateBarberDto, UpdateBarberDto } from "./barbers.dto";
import { getAvailableTimeSlots } from "../../common/utils/date.utils";
import { supabase } from "../../core/supabase.client";
import { createError } from "../../core/error.middleware";

export class BarbersService {
  private repository: BarbersRepository;

  constructor() {
    this.repository = new BarbersRepository();
  }

  async getAllBarbers(): Promise<Barber[]> {
    return this.repository.findAll();
  }

  async getBarberById(id: string): Promise<Barber> {
    return this.repository.findById(id);
  }

  async createBarber(dto: CreateBarberDto): Promise<Barber> {
    const barberData = {
      name: dto.name,
      email: dto.email || null,
      phone: dto.phone || null,
      description: dto.description || null,
      photo_url: dto.photoUrl || null,
    };

    return this.repository.create(barberData);
  }

  async updateBarber(id: string, dto: UpdateBarberDto): Promise<Barber> {
    const barberData = {
      ...(dto.name && { name: dto.name }),
      ...(dto.email !== undefined && { email: dto.email }),
      ...(dto.phone !== undefined && { phone: dto.phone }),
      ...(dto.description !== undefined && { description: dto.description }),
      ...(dto.photoUrl !== undefined && { photo_url: dto.photoUrl }),
    };

    return this.repository.update(id, barberData);
  }

  async deleteBarber(id: string): Promise<void> {
    // Check if barber has any bookings
    const { count, error } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("barber_id", id);

    if (error) {
      throw createError(
        `Failed to check barber bookings: ${error.message}`,
        500
      );
    }

    if (count && count > 0) {
      throw createError(
        `Cannot delete barber with ID ${id} because they have ${count} bookings`,
        400
      );
    }

    return this.repository.delete(id);
  }

  async getBarberAvailability(
    barberId: string,
    date: string,
    serviceId: string
  ): Promise<BarberWithAvailability> {
    // Get barber details
    const barber = await this.repository.findById(barberId);

    // Get service duration
    const { data: service, error } = await supabase
      .from("services")
      .select("duration")
      .eq("id", serviceId)
      .single();

    if (error || !service) {
      throw createError(`Service with ID ${serviceId} not found`, 404);
    }

    // Get available time slots
    const availableTimeSlots = await getAvailableTimeSlots(
      barberId,
      date,
      service.duration
    );

    return {
      ...barber,
      availableTimeSlots,
    };
  }
}
