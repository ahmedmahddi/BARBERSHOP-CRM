import { Request, Response, NextFunction } from "express";
import { ServicesService } from "./services.service";
import { CreateServiceDto, UpdateServiceDto } from "./services.dto";

const servicesService = new ServicesService();

/** Handles service-related HTTP requests */
export async function getServices(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const services = await servicesService.getAllServices();
    res.json({ data: services });
  } catch (err) {
    next(err);
  }
}

/** Get service by ID */
export async function getServiceById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const service = await servicesService.getServiceById(id);
    res.json({ data: service });
  } catch (err) {
    next(err);
  }
}

/** Create a new service */
export async function createService(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const dto: CreateServiceDto = req.body;
    const service = await servicesService.createService(dto);
    res.status(201).json({ data: service });
  } catch (err) {
    next(err);
  }
}

/** Update an existing service */
export async function updateService(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const dto: UpdateServiceDto = req.body;
    const service = await servicesService.updateService(id, dto);
    res.json({ data: service });
  } catch (err) {
    next(err);
  }
}

/** Delete a service */
export async function deleteService(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    await servicesService.deleteService(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
