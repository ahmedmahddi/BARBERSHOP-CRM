import dotenv from "dotenv";
import { vi } from "vitest";

// Extend global namespace
declare global {
  var mockFile: () => {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  };
}

// Load environment variables from .env.test if it exists
dotenv.config({ path: ".env.test" });

// Mock Supabase client
vi.mock("../core/supabase.client", () => {
  return {
    supabase: {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      in: vi.fn().mockReturnThis(),
      gte: vi.fn().mockReturnThis(),
      lte: vi.fn().mockReturnThis(),
      storage: {
        from: vi.fn().mockReturnValue({
          upload: vi
            .fn()
            .mockResolvedValue({ data: { path: "test-path" }, error: null }),
          getPublicUrl: vi.fn().mockReturnValue({
            data: { publicUrl: "https://test-url.com/test-path" },
          }),
          remove: vi.fn().mockResolvedValue({ error: null }),
        }),
      },
      auth: {
        getUser: vi.fn(),
      },
      rpc: vi.fn().mockResolvedValue({ error: null }),
    },
  };
});

// Mock multer file
global.mockFile = () => ({
  fieldname: "image",
  originalname: "test-image.jpg",
  encoding: "7bit",
  mimetype: "image/jpeg",
  buffer: Buffer.from("test image content"),
  size: 1024,
});
