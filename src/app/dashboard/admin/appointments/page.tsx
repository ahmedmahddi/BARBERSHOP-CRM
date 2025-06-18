"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Define status type alias
type BookingStatus = "confirmed" | "pending" | "cancelled";

// Booking data type
interface BookingFormData {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  barber: string;
  dateTime: string;
  formattedDate: string;
  selectedTime: string;
  comments: string;
  imageUrl: string;
  agreement: boolean;
  status: BookingStatus;
  emailReminder: boolean;
  discountApplied: number;
}

const SERVICES_MAP: Record<string, string> = {
  haircut: "Haircut",
  beard: "Beard Trim",
  styling: "Styling",
  facecare: "Face Care",
};

const BARBERS_MAP: Record<string, string> = {
  james: "James",
  bradley: "Bradley",
  megan: "Megan",
  matthew: "Matthew",
};

const getStatusClassName = (status: BookingStatus): string => {
  switch (status) {
    case "confirmed":
      return "bg-emerald-950 text-emerald-400 border border-emerald-500/30";
    case "pending":
      return "bg-amber-950 text-amber-400 border border-amber-500/30";
    case "cancelled":
      return "bg-rose-950 text-rose-400 border border-rose-500/30";
    default:
      return "bg-zinc-800 text-zinc-400 border border-zinc-700";
  }
};

export default function AppointmentsPage() {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<BookingFormData[]>([]);
  const [filter, setFilter] = useState("all");

  // Load bookings from localStorage
  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem("bookings") ?? "[]");
    // Add default status/emailReminder/discount if missing (for legacy data)
    const mappedBookings = bookings.map((booking: any) => ({
      ...booking,
      status: booking.status ?? "pending",
      emailReminder: booking.emailReminder ?? false,
      discountApplied: booking.discountApplied ?? 0,
    }));
    setAppointments(mappedBookings);
    toast({
      title: "Appointments Loaded",
      description: `Loaded ${mappedBookings.length} appointments from localStorage.`,
    });
  }, [toast]);

  const filteredAppointments = appointments.filter(appointment => {
    if (filter === "all") return true;
    return appointment.status === filter;
  });

  // Update status in state and localStorage
  const updateStatus = (id: string, newStatus: BookingStatus) => {
    setAppointments(prev =>
      prev.map(app => (app.id === id ? { ...app, status: newStatus } : app))
    );
    // Update in localStorage
    const bookings = JSON.parse(localStorage.getItem("bookings") ?? "[]");
    const updated = bookings.map((app: any) =>
      app.id === id ? { ...app, status: newStatus } : app
    );
    localStorage.setItem("bookings", JSON.stringify(updated));
    toast({
      title: "Status Updated",
      description: `Appointment status updated to ${newStatus}.`,
    });
  };

  // Toggle email reminder in state only
  const toggleEmailReminder = (id: string) => {
    setAppointments(prev =>
      prev.map(app =>
        app.id === id ? { ...app, emailReminder: !app.emailReminder } : app
      )
    );
    toast({
      title: "Email Reminder Updated",
      description: "Email reminder settings have been updated.",
    });
  };

  // Apply discount in state only
  const applyDiscount = (id: string, discountPercent: number) => {
    setAppointments(prev =>
      prev.map(app =>
        app.id === id ? { ...app, discountApplied: discountPercent } : app
      )
    );
    toast({
      title: "Discount Applied",
      description: `${discountPercent}% discount has been applied to the appointment.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-1 bg-amber-400 mr-4"></div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
            Manage Appointments
          </h2>
        </div>
        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="rounded-md border border-amber-400/30 bg-zinc-800 px-4 py-2 text-sm text-white focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
          >
            <option value="all">All Appointments</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-amber-400/20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white shadow-[0_0_15px_rgba(251,191,36,0.15)] overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b border-amber-400/20">
                <th className="h-12 px-4 text-left align-middle font-medium text-amber-400">
                  Customer Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-amber-400">
                  Contact (Email/Phone)
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-amber-400">
                  Service
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-amber-400">
                  Barber
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-amber-400">
                  Date & Time
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-amber-400">
                  {/* Price */}
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-amber-400">
                  Image Preview
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-amber-400">
                  Comments
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-amber-400">
                  Status
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-amber-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-4 text-center text-zinc-400">
                    No appointments found in localStorage or matching filter.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map(appointment => (
                  <tr
                    key={appointment.id}
                    className="border-b border-zinc-700/50 transition-colors hover:bg-zinc-800/50"
                  >
                    <td className="p-4 align-middle font-medium break-words">
                      {appointment.name}
                    </td>
                    <td className="p-4 align-middle break-words">
                      <div>{appointment.email}</div>
                      <div className="text-zinc-400">{appointment.phone}</div>
                    </td>
                    <td className="p-4 align-middle break-words">
                      {SERVICES_MAP[appointment.service] || appointment.service}
                    </td>
                    <td className="p-4 align-middle break-words">
                      {BARBERS_MAP[appointment.barber] || appointment.barber}
                    </td>
                    <td className="p-4 align-middle break-words">
                      {appointment.formattedDate && appointment.selectedTime
                        ? `${appointment.formattedDate} - ${appointment.selectedTime}`
                        : appointment.dateTime}
                    </td>
                    <td className="p-4 align-middle break-words">
                      {/* Price logic removed */}
                    </td>
                    <td className="p-4 align-middle">
                      {appointment.imageUrl ? (
                        <img
                          src={appointment.imageUrl}
                          alt="Style preference"
                          className="h-16 w-16 object-cover rounded-md"
                          onError={e =>
                            (e.currentTarget.style.display = "none")
                          }
                        />
                      ) : (
                        <span className="text-zinc-400">No image</span>
                      )}
                    </td>
                    <td className="p-4 align-middle whitespace-pre-wrap max-w-xs truncate">
                      {appointment.comments || "N/A"}
                    </td>
                    <td className="p-4 align-middle">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusClassName(
                          appointment.status
                        )}`}
                      >
                        {appointment.status.charAt(0).toUpperCase() +
                          appointment.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex flex-col space-y-2">
                        {appointment.status !== "confirmed" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateStatus(appointment.id, "confirmed")
                            }
                            className="h-8 px-2 text-xs border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300"
                          >
                            Confirm
                          </Button>
                        )}
                        {appointment.status !== "cancelled" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateStatus(appointment.id, "cancelled")
                            }
                            className="h-8 px-2 text-xs border-rose-500/30 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
                          >
                            Cancel
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleEmailReminder(appointment.id)}
                          className={`h-8 px-2 text-xs border-amber-400/30 ${
                            appointment.emailReminder
                              ? "text-amber-400 hover:bg-amber-400/10"
                              : "text-zinc-400 hover:text-zinc-300"
                          }`}
                        >
                          {appointment.emailReminder
                            ? "Reminder On"
                            : "Reminder Off"}
                        </Button>
                        {appointment.discountApplied === 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => applyDiscount(appointment.id, 10)}
                            className="h-8 px-2 text-xs border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300"
                          >
                            Apply Discount
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
