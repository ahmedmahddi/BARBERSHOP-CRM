import { Request, Response, NextFunction } from "express";
import { BookingsService } from "./bookings.service";
import {
  CreateBookingDto,
  UpdateBookingDto,
  UpdateBookingStatusDto,
} from "./bookings.dto";

const bookingsService = new BookingsService();

/** Get all bookings */
export async function getBookings(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Handle query parameters for filtering
    const { startDate, endDate, barberId } = req.query;

    let bookings;

    if (startDate && endDate) {
      bookings = await bookingsService.getBookingsByDateRange(
        startDate as string,
        endDate as string
      );
    } else if (barberId) {
      bookings = await bookingsService.getBookingsByBarberId(
        barberId as string
      );
    } else {
      bookings = await bookingsService.getAllBookings();
    }

    res.json({ data: bookings });
  } catch (err) {
    next(err);
  }
}

/** Get booking by ID */
export async function getBookingById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const booking = await bookingsService.getBookingById(id);
    res.json({ data: booking });
  } catch (err) {
    next(err);
  }
}

/** Create a new booking */
export async function createBooking(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    console.log('Creating booking with body:', req.body);
    
    // Log file information
    if (Array.isArray(req.files) && req.files.length > 0) {
      console.log('File from req.files[0]:', {
        filename: req.files[0].originalname,
        mimetype: req.files[0].mimetype,
        size: req.files[0].size,
        fieldname: req.files[0].fieldname
      });
    } else if (req.file) {
      console.log('File from req.file:', {
        filename: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        fieldname: req.file.fieldname
      });
    } else {
      console.log('No file attached to request');
    }
    
    const dto: CreateBookingDto = req.body;
    // Support both multer.any() (req.files[0]) and multer.single() (req.file)
    const image = (Array.isArray(req.files) && req.files.length > 0) ? req.files[0] : req.file;

    const booking = await bookingsService.createBooking(dto, image);
    console.log('Booking created successfully:', {
      id: booking.id,
      imageUrl: booking.image_url,
      hasImage: !!booking.image_url
    });
    
    res.status(201).json({ data: booking });
  } catch (err) {
    console.error('Error creating booking:', err);
    next(err);
  }
}

/** Update an existing booking */
export async function updateBooking(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const dto: UpdateBookingDto = req.body;

    const booking = await bookingsService.updateBooking(id, dto);
    res.json({ data: booking });
  } catch (err) {
    next(err);
  }
}

/** Update booking status */
export async function updateBookingStatus(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const dto: UpdateBookingStatusDto = req.body;

    const booking = await bookingsService.updateBookingStatus(id, dto);
    res.json({ data: booking });
  } catch (err) {
    next(err);
  }
}

/** Delete a booking */
export async function deleteBooking(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    await bookingsService.deleteBooking(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
