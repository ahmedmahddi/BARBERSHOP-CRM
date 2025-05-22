import {
  vi,
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from "vitest";
import request from "supertest";
import app from "../../../core/app";
import { supabase } from "../../../core/supabase.client";
import { v4 as uuidv4 } from "uuid";
import * as dateUtils from "../../../common/utils/date.utils";
import { Request, Response, NextFunction } from "express";

// Mock booking validation middleware
vi.mock("../../../common/middleware/booking-validation.middleware", () => ({
  validateBooking: vi.fn((req, res, next) => next()),
}));

// Mock file validation middleware
vi.mock("../../../common/middleware/file-validation.middleware", () => ({
  validateFile: vi.fn((req, res, next) => next()),
}));

// Mock validate dto middleware
vi.mock("../../../common/middleware/validate.middleware", () => ({
  validateDto: () => (req: Request, res: Response, next: NextFunction) =>
    next(),
}));

// Mock date utils
vi.mock("../../../common/utils/date.utils", () => {
  return {
    isTimeSlotAvailable: vi.fn().mockResolvedValue(true),
    formatDate: vi.fn(date => {
      if (date instanceof Date) {
        return date.toISOString().split("T")[0];
      }
      return date;
    }),
    formatTime: vi.fn(date => {
      if (date instanceof Date) {
        return date.toTimeString().substring(0, 5);
      }
      return date;
    }),
    getAvailableTimeSlots: vi.fn(),
  };
});

// Mock Supabase client
vi.mock("../../../core/supabase.client", async () => {
  const actual = (await vi.importActual(
    "../../../core/supabase.client"
  )) as Record<string, any>;

  const mockSupabase = {
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
  };

  return {
    ...actual,
    supabase: mockSupabase,
  };
});

describe("Bookings API Integration Tests", () => {
  const mockBookingId = uuidv4();
  const mockBarberId = uuidv4();
  const mockServiceId = uuidv4();
  const mockAdminToken = "test-admin-token";

  // Define the basic booking without joined fields
  const mockBasicBooking = {
    id: mockBookingId,
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    barber_id: mockBarberId,
    service_id: mockServiceId,
    date: "2023-05-15",
    time: "10:00",
    comments: "Test booking",
    status: "pending",
    created_at: new Date().toISOString(),
    updated_at: null,
  };

  // Define the full booking with joined fields for admin views
  const mockFullBooking = {
    ...mockBasicBooking,
    barber_name: "Test Barber",
    service_name: "Test Service",
    service_duration: 30,
    service_price: 25,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GET /api/bookings/:id", () => {
    it("should return a booking by ID", async () => {
      // Mock Supabase response
      const mockFromSelect = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: mockBasicBooking, // Use the basic booking without joined fields
          error: null,
        }),
      };
      (supabase.from as any).mockReturnValue(mockFromSelect);

      const response = await request(app).get(`/api/bookings/${mockBookingId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ data: mockBasicBooking });
    });

    it("should return 404 when booking is not found", async () => {
      // Mock Supabase response for not found
      const mockFromSelect = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: null,
          error: { code: "PGRST116", message: "Not found" },
        }),
      };
      (supabase.from as any).mockReturnValue(mockFromSelect);

      const response = await request(app).get(`/api/bookings/${uuidv4()}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("POST /api/bookings", () => {
    it.skip("should create a new booking", async () => {
      // Test moved to bookings.post.test.ts
    });

    it.skip("should return 400 when validation fails", async () => {
      // Test moved to bookings.post.test.ts
    });
  });

  describe("GET /api/bookings (protected)", () => {
    it("should return 401 when no token is provided", async () => {
      const response = await request(app).get("/api/bookings");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error");
    });

    it("should return bookings when valid token is provided", async () => {
      // Mock auth middleware
      (supabase.auth.getUser as any).mockResolvedValueOnce({
        data: {
          user: { id: "admin-user-id", email: "admin@example.com" },
        },
        error: null,
      });

      // Create a mock response that matches the repository's transformation
      const mockRepositoryResponse = {
        data: [
          {
            ...mockBasicBooking,
            barbers: { name: "Test Barber" },
            services: { name: "Test Service", duration: 30, price: 25 },
          },
        ],
        error: null,
      };

      // Mock the findAll repository method's behavior
      (supabase.from as any).mockImplementation((table: string) => {
        if (table === "bookings") {
          return {
            select: vi.fn().mockReturnThis(),
            order: vi.fn().mockReturnThis(),
            then: vi.fn().mockImplementation(callback => {
              callback(mockRepositoryResponse);
              return Promise.resolve(mockRepositoryResponse);
            }),
          };
        }
        return {
          select: vi.fn().mockReturnThis(),
        };
      });

      const response = await request(app)
        .get("/api/bookings")
        .set("Authorization", `Bearer ${mockAdminToken}`);

      expect(response.status).toBe(200);
      // Just check that we get an array with a booking that has the expected ID
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data[0]).toHaveProperty("id", mockBookingId);
    });
  });

  describe("PUT /api/bookings/:id (protected)", () => {
    it("should update a booking when valid token is provided", async () => {
      // Mock auth middleware
      (supabase.auth.getUser as any).mockResolvedValueOnce({
        data: {
          user: { id: "admin-user-id", email: "admin@example.com" },
        },
        error: null,
      });

      // Mock update response
      const mockFromUpdate = {
        select: vi.fn().mockReturnThis(),
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: { ...mockBasicBooking, name: "Updated Name" },
          error: null,
        }),
      };
      (supabase.from as any).mockReturnValue(mockFromUpdate);

      const updateData = { name: "Updated Name" };
      const response = await request(app)
        .put(`/api/bookings/${mockBookingId}`)
        .set("Authorization", `Bearer ${mockAdminToken}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.data.name).toBe("Updated Name");
    });
  });

  describe("PATCH /api/bookings/:id/status (protected)", () => {
    it("should update booking status when valid token is provided", async () => {
      // Mock auth middleware
      (supabase.auth.getUser as any).mockResolvedValueOnce({
        data: {
          user: { id: "admin-user-id", email: "admin@example.com" },
        },
        error: null,
      });

      // Mock update status response
      const mockFromUpdate = {
        select: vi.fn().mockReturnThis(),
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: { ...mockBasicBooking, status: "confirmed" },
          error: null,
        }),
      };
      (supabase.from as any).mockReturnValue(mockFromUpdate);

      const statusData = { status: "confirmed" };
      const response = await request(app)
        .patch(`/api/bookings/${mockBookingId}/status`)
        .set("Authorization", `Bearer ${mockAdminToken}`)
        .send(statusData);

      expect(response.status).toBe(200);
      expect(response.body.data.status).toBe("confirmed");
    });
  });

  describe("DELETE /api/bookings/:id (protected)", () => {
    it("should delete a booking when valid token is provided", async () => {
      // Mock auth middleware
      (supabase.auth.getUser as any).mockResolvedValueOnce({
        data: {
          user: { id: "admin-user-id", email: "admin@example.com" },
        },
        error: null,
      });

      // Mock delete response with immediate resolution
      const mockFromDelete = {
        delete: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnValue({
          then: vi.fn().mockImplementation(callback => {
            callback({ error: null });
            return Promise.resolve({ error: null });
          }),
        }),
      };
      (supabase.from as any).mockReturnValue(mockFromDelete);

      const response = await request(app)
        .delete(`/api/bookings/${mockBookingId}`)
        .set("Authorization", `Bearer ${mockAdminToken}`);

      expect(response.status).toBe(204);
    });
  });
});
