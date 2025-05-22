export interface ImageUploadResult {
  path: string;
  url: string;
  bucket: string;
  filename: string;
  mimetype: string;
  size: number;
  bookingId?: string;
}

export interface ImageMetadata {
  id: string;
  path: string;
  url: string;
  bucket: string;
  filename: string;
  mimetype: string;
  size: number;
  booking_id?: string;
  created_at: string;
}
