import { describe, it, expect, vi, beforeEach } from "vitest";
import { Request, Response } from "express";
import { validateBooking } from "../../common/middleware/booking-validation.middleware";
import { supabase } from "../../core/supabase.client";
import * as dateUtils from "../../common/utils/date.utils";

// Mock the isTimeSlotAvailable function
vi.mock("../../common/utils/date.utils", () => ({
  isTimeSlotAvailable: vi.fn(),
}));

// Mock the request, response and next function
const mockRequest = (body = {}) => {
  return {
    body: {
      barberId: "test-barber-id",
      serviceId: "test-service-id",
      date: "2023-05-15",
      time: "10:00",
      ...body,
    },
  } as Request;
};

const mockResponse = () => {
  const res = {} as Response;
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

const mockNext = vi.fn();

describe("Booking Validation Middleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call next() when booking is valid", async () => {
    // Mock Supabase responses
    (supabase.from as any).mockImplementation((table: string) => {
      if (table === "services") {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({
            data: { duration: 30 },
            error: null,
          }),
        };
      } else if (table === "barbers") {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({
            data: { id: "test-barber-id" },
            error: null,
          }),
        };
      }
      return { select: vi.fn().mockReturnThis() };
    });

    // Mock isTimeSlotAvailable to return true
    (dateUtils.isTimeSlotAvailable as any).mockResolvedValue(true);

    const req = mockRequest();
    const res = mockResponse();

    await validateBooking(req, res, mockNext);

    // Check that next was called
    expect(mockNext).toHaveBeenCalled();
    // Check that status and json were not called
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should return 400 when service is invalid", async () => {
    // Mock Supabase response for invalid service
    (supabase.from as any).mockImplementation((table: string) => {
      if (table === "services") {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({
            data: null,
            error: { message: "Service not found" },
          }),
        };
      }
      return { select: vi.fn().mockReturnThis() };
    });

    const req = mockRequest();
    const res = mockResponse();

    await validateBooking(req, res, mockNext);

    // Check that status and json were called with the correct arguments
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid service ID" });
    // Check that next was not called
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should return 400 when barber is invalid", async () => {
    // Mock Supabase responses
    (supabase.from as any).mockImplementation((table: string) => {
      if (table === "services") {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({
            data: { duration: 30 },
            error: null,
          }),
        };
      } else if (table === "barbers") {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({
            data: null,
            error: { message: "Barber not found" },
          }),
        };
      }
      return { select: vi.fn().mockReturnThis() };
    });

    const req = mockRequest();
    const res = mockResponse();

    await validateBooking(req, res, mockNext);

    // Check that status and json were called with the correct arguments
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid barber ID" });
    // Check that next was not called
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should return 400 when time slot is not available", async () => {
    // Mock Supabase responses
    (supabase.from as any).mockImplementation((table: string) => {
      if (table === "services") {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({
            data: { duration: 30 },
            error: null,
          }),
        };
      } else if (table === "barbers") {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({
            data: { id: "test-barber-id" },
            error: null,
          }),
        };
      }
      return { select: vi.fn().mockReturnThis() };
    });

    // Mock isTimeSlotAvailable to return false
    (dateUtils.isTimeSlotAvailable as any).mockResolvedValue(false);

    const req = mockRequest();
    const res = mockResponse();

    await validateBooking(req, res, mockNext);

    // Check that status and json were called with the correct arguments
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Time slot not available for this barber",
    });
    // Check that next was not called
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should return 500 when validation throws an error", async () => {
    // Mock Supabase to throw an error
    (supabase.from as any).mockImplementation(() => {
      throw new Error("Internal error");
    });

    const req = mockRequest();
    const res = mockResponse();

    // Mock console.error to prevent test output noise
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await validateBooking(req, res, mockNext);

    // Check that status and json were called with the correct arguments
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Internal server error during booking validation",
    });
    // Check that next was not called
    expect(mockNext).not.toHaveBeenCalled();

    // Restore console.error
    consoleSpy.mockRestore();
  });
});
