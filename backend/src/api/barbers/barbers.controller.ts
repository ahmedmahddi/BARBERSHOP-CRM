import { Request, Response, NextFunction } from "express";
import { BarbersService } from "./barbers.service";
import {
  CreateBarberDto,
  UpdateBarberDto,
  GetBarberAvailabilityDto,
} from "./barbers.dto";

const barbersService = new BarbersService();

/** Handles barber-related HTTP requests */
export async function getBarbers(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const barbers = await barbersService.getAllBarbers();
    res.json({ data: barbers });
  } catch (err) {
    next(err);
  }
}

/** Get barber by ID */
export async function getBarberById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const barber = await barbersService.getBarberById(id);
    res.json({ data: barber });
  } catch (err) {
    next(err);
  }
}

/** Create a new barber */
export async function createBarber(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const dto: CreateBarberDto = req.body;
    const barber = await barbersService.createBarber(dto);
    res.status(201).json({ data: barber });
  } catch (err) {
    next(err);
  }
}

/** Update an existing barber */
export async function updateBarber(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const dto: UpdateBarberDto = req.body;
    const barber = await barbersService.updateBarber(id, dto);
    res.json({ data: barber });
  } catch (err) {
    next(err);
  }
}

/** Delete a barber */
export async function deleteBarber(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    await barbersService.deleteBarber(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

/** Get barber availability */
export async function getBarberAvailability(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const { date, serviceId } =
      req.query as unknown as GetBarberAvailabilityDto;

    const availability = await barbersService.getBarberAvailability(
      id,
      date,
      serviceId
    );

    res.json({ data: availability });
  } catch (err) {
    next(err);
  }
}
