import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../core/supabase.client";
import { uploadFile, deleteFile } from "../../common/utils/file.utils";
import { ImageUploadResult, ImageMetadata } from "./images.types";
import { createError } from "../../core/error.middleware";

export class ImagesService {
  async uploadImage(
    file: Express.Multer.File,
    bookingId?: string,
    folder: string = "general"
  ): Promise<ImageUploadResult> {
    try {
      // Define the folder path
      const folderPath = bookingId ? `bookings/${bookingId}` : folder;

      // Upload file to Supabase storage
      const uploadResult = await uploadFile(file, "booking-images", folderPath);

      if (uploadResult.error || !uploadResult.url) {
        throw createError(`Failed to upload image: ${uploadResult.error}`, 500);
      }

      // Extract filename from path
      const pathParts = uploadResult.path.split("/");
      const filename = pathParts[pathParts.length - 1];

      // Create metadata
      const metadata: ImageUploadResult = {
        path: uploadResult.path,
        url: uploadResult.url,
        bucket: "booking-images",
        filename,
        mimetype: file.mimetype,
        size: file.size,
        bookingId,
      };

      // Store metadata in database if needed
      // This could be implemented if you want to track images separately

      return metadata;
    } catch (error) {
      console.error("Error in uploadImage:", error);
      throw createError("Failed to upload image", 500);
    }
  }

  async deleteImage(path: string): Promise<void> {
    try {
      const result = await deleteFile(path, "booking-images");

      if (!result.success) {
        throw createError(`Failed to delete image: ${result.error}`, 500);
      }
    } catch (error) {
      console.error("Error in deleteImage:", error);
      throw createError("Failed to delete image", 500);
    }
  }

  async getImageMetadata(path: string): Promise<ImageMetadata | null> {
    try {
      // Get file metadata from Supabase storage
      const { data } = await supabase.storage
        .from("booking-images")
        .getPublicUrl(path);

      if (!data) {
        return null;
      }

      // Extract filename from path
      const pathParts = path.split("/");
      const filename = pathParts[pathParts.length - 1];

      // Create metadata
      const metadata: ImageMetadata = {
        id: uuidv4(), // This would normally come from a database
        path,
        url: data.publicUrl,
        bucket: "booking-images",
        filename,
        mimetype: "", // Would need to be stored separately
        size: 0, // Would need to be stored separately
        created_at: new Date().toISOString(),
      };

      return metadata;
    } catch (error) {
      console.error("Error in getImageMetadata:", error);
      throw createError("Failed to get image metadata", 500);
    }
  }
}
