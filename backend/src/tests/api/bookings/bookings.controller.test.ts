import { describe, it, expect } from "vitest";
import * as controller from "../../../api/bookings/bookings.controller";

describe("Bookings Controller", () => {
  describe("Structure", () => {
    it("should export the required functions", () => {
      expect(controller.getBookings).toBeDefined();
      expect(typeof controller.getBookings).toBe("function");

      expect(controller.getBookingById).toBeDefined();
      expect(typeof controller.getBookingById).toBe("function");

      expect(controller.createBooking).toBeDefined();
      expect(typeof controller.createBooking).toBe("function");

      expect(controller.updateBooking).toBeDefined();
      expect(typeof controller.updateBooking).toBe("function");

      expect(controller.updateBookingStatus).toBeDefined();
      expect(typeof controller.updateBookingStatus).toBe("function");

      expect(controller.deleteBooking).toBeDefined();
      expect(typeof controller.deleteBooking).toBe("function");
    });
  });
});
