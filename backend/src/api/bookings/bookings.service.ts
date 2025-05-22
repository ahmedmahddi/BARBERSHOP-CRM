import { BookingsRepository } from "./bookings.repository";
import { BookingWithDetails } from "./bookings.types";
import {
  CreateBookingDto,
  UpdateBookingDto,
  UpdateBookingStatusDto,
} from "./bookings.dto";
import { uploadFile } from "../../common/utils/file.utils";

export class BookingsService {
  private readonly repository: BookingsRepository;

  constructor() {
    this.repository = new BookingsRepository();
  }

  async getAllBookings(): Promise<BookingWithDetails[]> {
    return this.repository.findAll();
  }

  async getBookingById(id: string): Promise<BookingWithDetails> {
    return this.repository.findById(id);
  }

  /**
   * Supports file upload from req.files[0] (multer.any) or req.file (multer.single)
   */
  async createBooking(
    dto: CreateBookingDto,
    image?: Express.Multer.File
  ): Promise<BookingWithDetails> {
    let imageUrl: string | null = null;

    // Upload image if provided
    if (image) {
      console.log('Service: Processing image upload:', {
        filename: image.originalname,
        mimetype: image.mimetype,
        size: image.size,
        buffer: image.buffer ? 'Buffer present' : 'No buffer'
      });
      
      try {
        const uploadResult = await uploadFile(
          image,
          "barbershop", // Updated to match the bucket name in Supabase
          "bookings"
        );
        
        console.log('Service: Upload result:', uploadResult);
        
        if (uploadResult.url) {
          imageUrl = uploadResult.url;
          console.log('Service: Image URL set to:', imageUrl);
        } else {
          console.error('Service: No URL returned from upload:', uploadResult);
        }
      } catch (error) {
        console.error('Service: Error uploading file:', error);
      }
    } else {
      console.log('Service: No image provided for upload');
    }

    // NOTE: v1 - keep in sync with frontend BookingFormData
    const bookingData = {
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      barber_id: dto.barberId,
      service_id: dto.serviceId,
      date: dto.date,
      time: dto.time,
      comments: dto.comments ?? null,
      status: dto.status ?? "pending",
      image_url: imageUrl ?? dto.imageUrl ?? null,
      agreement: dto.agreement ?? null,
    };

    const booking = await this.repository.create(bookingData);
    return this.repository.findById(booking.id);
  }

  async updateBooking(
    id: string,
    dto: UpdateBookingDto
  ): Promise<BookingWithDetails> {
    // NOTE: v1 - keep in sync with frontend BookingFormData
    const bookingData = {
      ...(dto.name && { name: dto.name }),
      ...(dto.email && { email: dto.email }),
      ...(dto.phone && { phone: dto.phone }),
      ...(dto.barberId && { barber_id: dto.barberId }),
      ...(dto.serviceId && { service_id: dto.serviceId }),
      ...(dto.date && { date: dto.date }),
      ...(dto.time && { time: dto.time }),
      ...(dto.comments !== undefined && { comments: dto.comments ?? null }),
      ...(dto.status && { status: dto.status ?? "pending" }),
      ...(dto.imageUrl && { image_url: dto.imageUrl }),
      ...(dto.agreement !== undefined && { agreement: dto.agreement }),
    };

    await this.repository.update(id, bookingData);
    return this.repository.findById(id);
  }

  async updateBookingStatus(
    id: string,
    dto: UpdateBookingStatusDto
  ): Promise<BookingWithDetails> {
    await this.repository.update(id, { status: dto.status });
    return this.repository.findById(id);
  }

  async deleteBooking(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  async getBookingsByDateRange(
    startDate: string,
    endDate: string
  ): Promise<BookingWithDetails[]> {
    return this.repository.findByDateRange(startDate, endDate);
  }

  async getBookingsByBarberId(barberId: string): Promise<BookingWithDetails[]> {
    return this.repository.findByBarberId(barberId);
  }
}
