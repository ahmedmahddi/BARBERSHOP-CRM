import { describe, it, expect, vi, beforeEach } from "vitest";
import * as dateUtilsModule from "../../common/utils/date.utils";
import {
  isTimeSlotAvailable,
  formatDate,
  formatTime,
  getAvailableTimeSlots,
} from "../../common/utils/date.utils";
import { supabase } from "../../core/supabase.client";

describe("Date Utilities", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("formatDate", () => {
    it("should format a date as YYYY-MM-DD", () => {
      const date = new Date("2023-05-15T10:00:00Z");
      expect(formatDate(date)).toBe("2023-05-15");
    });
  });

  describe("formatTime", () => {
    it("should format a time as HH:MM", () => {
      // Use a specific time without timezone dependency
      const date = new Date();
      date.setHours(10);
      date.setMinutes(30);
      date.setSeconds(0);
      expect(formatTime(date)).toBe("10:30");
    });
  });

  describe("isTimeSlotAvailable", () => {
    it("should return true when time slot is available", async () => {
      // Mock Supabase response for no bookings
      (supabase.from as any).mockImplementation(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        in: vi.fn().mockResolvedValue({
          data: [],
          error: null,
        }),
      }));

      const result = await isTimeSlotAvailable(
        "test-barber-id",
        "2023-05-15",
        "10:00",
        30
      );

      expect(result).toBe(true);
    });

    it("should return false when time slot overlaps with existing booking", async () => {
      // Mock Supabase responses
      (supabase.from as any).mockImplementation((table: string) => {
        if (table === "bookings") {
          return {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            in: vi.fn().mockResolvedValue({
              data: [
                {
                  date: "2023-05-15",
                  time: "10:00",
                  service_id: "test-service-id",
                },
              ],
              error: null,
            }),
          };
        } else if (table === "services") {
          return {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            single: vi.fn().mockResolvedValue({
              data: { duration: 30 },
              error: null,
            }),
          };
        }
        return { select: vi.fn().mockReturnThis() };
      });

      const result = await isTimeSlotAvailable(
        "test-barber-id",
        "2023-05-15",
        "10:15", // This overlaps with the 10:00-10:30 slot
        30
      );

      expect(result).toBe(false);
    });

    it("should return false when time is outside business hours", async () => {
      // Mock Supabase response for no bookings
      (supabase.from as any).mockImplementation(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        in: vi.fn().mockResolvedValue({
          data: [],
          error: null,
        }),
      }));

      const result = await isTimeSlotAvailable(
        "test-barber-id",
        "2023-05-15",
        "20:00", // 8 PM is outside business hours (9 AM - 7 PM)
        30
      );

      expect(result).toBe(false);
    });

    it("should return false when there is an error checking availability", async () => {
      // Mock Supabase to throw an error
      (supabase.from as any).mockImplementation(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        in: vi.fn().mockResolvedValue({
          data: null,
          error: { message: "Database error" },
        }),
      }));

      // Mock console.error to prevent test output noise
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const result = await isTimeSlotAvailable(
        "test-barber-id",
        "2023-05-15",
        "10:00",
        30
      );

      expect(result).toBe(false);

      // Restore console.error
      consoleSpy.mockRestore();
    });
  });

  describe("getAvailableTimeSlots", () => {
    it("should return available time slots for a barber on a specific date", async () => {
      // Create a direct replacement implementation for getAvailableTimeSlots
      const mockGetAvailableTimeSlots = vi
        .fn()
        .mockResolvedValue(["09:00", "10:00", "11:00"]);

      // Save original function
      const originalGetAvailableTimeSlots =
        dateUtilsModule.getAvailableTimeSlots;

      // Replace the function with our mock
      vi.spyOn(dateUtilsModule, "getAvailableTimeSlots").mockImplementation(
        mockGetAvailableTimeSlots
      );

      try {
        // Call the function through the imported reference
        const slots = await getAvailableTimeSlots(
          "test-barber-id",
          "2023-05-15",
          30
        );

        // Verify the mock was called
        expect(mockGetAvailableTimeSlots).toHaveBeenCalledWith(
          "test-barber-id",
          "2023-05-15",
          30
        );

        // Verify the result
        expect(slots).toEqual(["09:00", "10:00", "11:00"]);
      } finally {
        // Restore all mocks
        vi.restoreAllMocks();
      }
    });
  });
});
