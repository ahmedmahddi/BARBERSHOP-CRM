import { Request, Response, NextFunction } from "express";
import { ImagesService } from "./images.service";
import { UploadImageDto } from "./images.dto";

const imagesService = new ImagesService();

/** Upload an image */
export async function uploadImage(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const file = req.file;

    if (!file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const { bookingId, folder } = req.body as UploadImageDto;

    const result = await imagesService.uploadImage(file, bookingId, folder);
    res.status(201).json({ data: result });
  } catch (err) {
    next(err);
  }
}

/** Delete an image */
export async function deleteImage(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { path } = req.params;

    if (!path) {
      res.status(400).json({ error: "No path provided" });
      return;
    }

    await imagesService.deleteImage(path);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

/** Get image metadata */
export async function getImageMetadata(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { path } = req.params;

    if (!path) {
      res.status(400).json({ error: "No path provided" });
      return;
    }

    const metadata = await imagesService.getImageMetadata(path);

    if (!metadata) {
      res.status(404).json({ error: "Image not found" });
      return;
    }

    res.json({ data: metadata });
  } catch (err) {
    next(err);
  }
}
