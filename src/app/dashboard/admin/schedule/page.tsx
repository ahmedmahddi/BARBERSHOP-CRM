"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faClock,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  isSameDay,
} from "date-fns";

// Define types
interface Barber {
  id: string;
  name: string;
  color: string; // Added color property
}

interface Booking {
  id: string;
  barber: string;
  formattedDate: string;
  selectedTime: string;
}

// Mock data (consistent with BookingPage.tsx, with added colors)
const BARBERS: Barber[] = [
  { id: "james", name: "James", color: "green-400" }, // Amber for James
  { id: "bradley", name: "Bradley", color: "blue-400" }, // Emerald for Bradley
  { id: "megan", name: "Megan", color: "rose-400" }, // Rose for Megan
  { id: "matthew", name: "Matthew", color: "red-400" }, // Blue for Matthew
];

// Default time slots (consistent with BookingPage.tsx)
const DEFAULT_TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

// Specific barber schedules (consistent with BookingPage.tsx)
const BARBER_SCHEDULE: Record<string, Record<string, string[]>> = {
  james: {
    "2025-05-15": [
      "9:00 AM",
      "10:00 AM",
      "11:00 AM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
      "4:00 PM",
    ],
    "2025-05-16": [
      "9:00 AM",
      "10:00 AM",
      "11:00 AM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
      "4:00 PM",
      "5:00 PM",
    ],
  },
  bradley: {
    "2025-05-15": [
      "9:30 AM",
      "10:30 AM",
      "11:30 AM",
      "1:30 PM",
      "2:30 PM",
      "3:30 PM",
      "4:30 PM",
    ],
  },
  megan: {
    "2025-05-15": [
      "9:30 AM",
      "10:30 AM",
      "11:30 AM",
      "1:00 PM",
      "2:00 PM",
      "3:30 PM",
      "4:30 PM",
    ],
  },
  matthew: {
    "2025-05-15": [
      "9:30 AM",
      "10:30 AM",
      "11:30 AM",
      "12:30 PM",
      "1:30 PM",
      "2:30 PM",
      "3:30 PM",
      "4:00 PM",
    ],
  },
};

export default function SchedulePage() {
  const { toast } = useToast();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schedules, setSchedules] = useState<
    Record<string, { available: string[]; booked: string[] }>
  >({});
  const [bookedDates, setBookedDates] = useState<Map<string, string>>(
    new Map()
  );
  const [loading, setLoading] = useState(false);

  // Generate days for the current month
  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start, end });

  // Handle month navigation
  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  // Fetch booked dates for highlighting
  useEffect(() => {
    const existingBookings: Booking[] = JSON.parse(
      localStorage.getItem("bookings") || "[]"
    );
    const bookedMap = new Map<string, string>();
    existingBookings.forEach(booking => {
      if (selectedBarber === "all") {
        // For "All Barbers," use a neutral color if not already set
        if (!bookedMap.has(booking.formattedDate)) {
          bookedMap.set(booking.formattedDate, "amber-400");
        }
      } else if (booking.barber === selectedBarber) {
        // Use the barber's specific color
        const barber = BARBERS.find(b => b.id === selectedBarber);
        if (barber) {
          bookedMap.set(booking.formattedDate, barber.color);
        }
      }
    });
    setBookedDates(bookedMap);
  }, [selectedBarber]);

  // Fetch schedules when a date is selected
  useEffect(() => {
    if (selectedDate) {
      setLoading(true);
      const formattedDate = format(selectedDate, "yyyy-MM-dd");

      // Get existing bookings from localStorage
      const existingBookings: Booking[] = JSON.parse(
        localStorage.getItem("bookings") || "[]"
      );

      // Build schedules for each barber
      const newSchedules: Record<
        string,
        { available: string[]; booked: string[] }
      > = {};

      BARBERS.forEach(barber => {
        // Get time slots for this barber (use default if no specific schedule)
        const allPossibleSlots =
          BARBER_SCHEDULE[barber.id]?.[formattedDate] || DEFAULT_TIME_SLOTS;

        // Get booked slots for this barber on this date
        const bookedSlots = existingBookings
          .filter(
            booking =>
              booking.barber === barber.id &&
              booking.formattedDate === formattedDate
          )
          .map(booking => booking.selectedTime);

        // Available slots are those not booked
        const availableSlots = allPossibleSlots.filter(
          slot => !bookedSlots.includes(slot)
        );

        newSchedules[barber.id] = {
          available: availableSlots,
          booked: bookedSlots,
        };
      });

      setSchedules(newSchedules);
      setLoading(false);
    } else {
      setSchedules({});
    }
  }, [selectedDate]);

  // Function to block a time slot
  const blockTimeSlot = (barberId: string, time: string) => {
    if (!selectedDate) return;

    const formattedDate = format(selectedDate, "yyyy-MM-dd");

    // Update BARBER_SCHEDULE in memory
    const updatedSchedule = { ...BARBER_SCHEDULE };
    if (!updatedSchedule[barberId]) {
      updatedSchedule[barberId] = {};
    }
    if (!updatedSchedule[barberId][formattedDate]) {
      updatedSchedule[barberId][formattedDate] = [...DEFAULT_TIME_SLOTS];
    }

    // Remove the time slot from the schedule
    updatedSchedule[barberId][formattedDate] = updatedSchedule[barberId][
      formattedDate
    ].filter(slot => slot !== time);

    // Update localStorage with the new schedule
    localStorage.setItem("barberSchedules", JSON.stringify(updatedSchedule));

    // Update local state
    setSchedules(prev => ({
      ...prev,
      [barberId]: {
        ...prev[barberId],
        available: prev[barberId].available.filter(slot => slot !== time),
      },
    }));

    toast({
      title: "Time Slot Blocked",
      description: `Blocked ${time} for ${
        BARBERS.find(b => b.id === barberId)?.name
      } on ${formattedDate}.`,
    });
  };

  // Function to unblock a time slot
  const unblockTimeSlot = (barberId: string, time: string) => {
    if (!selectedDate) return;

    const formattedDate = format(selectedDate, "yyyy-MM-dd");

    // Update BARBER_SCHEDULE in memory
    const updatedSchedule = { ...BARBER_SCHEDULE };
    if (!updatedSchedule[barberId]) {
      updatedSchedule[barberId] = {};
    }
    if (!updatedSchedule[barberId][formattedDate]) {
      updatedSchedule[barberId][formattedDate] = [];
    }

    // Add the time slot back to the schedule
    if (!updatedSchedule[barberId][formattedDate].includes(time)) {
      updatedSchedule[barberId][formattedDate].push(time);
      updatedSchedule[barberId][formattedDate].sort((a, b) =>
        a.localeCompare(b)
      );
    }

    // Update localStorage with the new schedule
    localStorage.setItem("barberSchedules", JSON.stringify(updatedSchedule));

    // Update local state
    setSchedules(prev => ({
      ...prev,
      [barberId]: {
        ...prev[barberId],
        available: [...prev[barberId].available, time].sort((a, b) =>
          a.localeCompare(b)
        ),
        booked: prev[barberId].booked.filter(slot => slot !== time),
      },
    }));

    toast({
      title: "Time Slot Unblocked",
      description: `Unblocked ${time} for ${
        BARBERS.find(b => b.id === barberId)?.name
      } on ${formattedDate}.`,
    });
  };

  // Handle date click
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-zinc-800 text-white p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-1 bg-amber-400 mr-4"></div>
            <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
              SCHEDULE
            </h2>
          </div>

          <div className="mb-6">
            <Select
              value={selectedBarber}
              onValueChange={value => setSelectedBarber(value)}
            >
              <SelectTrigger className="bg-zinc-800/70 border border-zinc-700 text-white rounded-lg h-12 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors hover:border-amber-400/30 w-full max-w-xs">
                <SelectValue placeholder="Select barber" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border border-amber-400/20 text-white">
                <SelectItem value="all">All Barbers</SelectItem>
                {BARBERS.map(barber => (
                  <SelectItem key={barber.id} value={barber.id}>
                    {barber.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Barber Selection */}

        {/* Calendar */}
        <div className="bg-zinc-900 rounded-lg shadow-lg p-6 border border-amber-400/20">
          <div className="flex justify-between items-center mb-4">
            <Button
              onClick={handlePrevMonth}
              variant="outline"
              className="border-amber-400/30 text-amber-400 hover:bg-amber-400/10"
            >
              Previous
            </Button>
            <h2 className="text-xl font-semibold text-zinc-300">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <Button
              onClick={handleNextMonth}
              variant="outline"
              className="border-amber-400/30 text-amber-400 hover:bg-amber-400/10"
            >
              Next
            </Button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-zinc-400">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <div key={day} className="font-semibold p-2">
                {day}
              </div>
            ))}
            {days.map(day => {
              const formattedDate = format(day, "yyyy-MM-dd");
              const bookedColor = bookedDates.get(formattedDate);
              return (
                <button
                  key={day.toString()}
                  onClick={() => handleDateClick(day)}
                  className={`p-2 h-12 rounded-md text-sm border border-transparent hover:bg-amber-400/10 ${
                    isToday(day) ? "bg-amber-400/20 border-amber-400/30" : ""
                  } ${
                    selectedDate && isSameDay(day, selectedDate)
                      ? "bg-amber-400 text-white"
                      : bookedColor
                      ? `bg-${bookedColor}/30`
                      : "bg-zinc-800"
                  } ${
                    new Date() > day ? "text-zinc-600 cursor-not-allowed" : ""
                  }`}
                  disabled={new Date() > day}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal for Schedules */}
        {isModalOpen && selectedDate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-zinc-900 rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto border border-amber-400/20">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                  {selectedBarber === "all"
                    ? `Schedules for ${format(selectedDate, "MMMM d, yyyy")}`
                    : `${
                        BARBERS.find(b => b.id === selectedBarber)?.name
                      }'s Schedule for ${format(selectedDate, "MMMM d, yyyy")}`}
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setIsModalOpen(false)}
                  className="text-amber-400 hover:text-amber-300"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              </div>
              {loading ? (
                <div className="text-center py-8 px-3 bg-zinc-800/50 border border-zinc-700 rounded-lg">
                  <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-amber-400 border-r-transparent"></div>
                  <p className="mt-2 text-sm text-zinc-400">
                    Loading schedules...
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {(selectedBarber === "all"
                    ? BARBERS
                    : [BARBERS.find(b => b.id === selectedBarber)!]
                  ).map(barber => (
                    <div
                      key={barber.id}
                      className="border-b border-zinc-700/50 pb-4"
                    >
                      <h3
                        className={`text-lg font-semibold text-${barber.color} mb-2`}
                      >
                        {barber.name}
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <p className="text-sm text-zinc-300 mb-2 flex items-center">
                            <FontAwesomeIcon
                              icon={faClock}
                              className={`text-${barber.color} mr-2`}
                            />
                            Available Time Slots
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {schedules[barber.id]?.available.length > 0 ? (
                              schedules[barber.id].available.map(time => (
                                <Button
                                  key={time}
                                  variant="outline"
                                  className={`border border-zinc-700 text-white hover:bg-${barber.color}/10 hover:border-${barber.color}/30`}
                                  onClick={() => blockTimeSlot(barber.id, time)}
                                >
                                  {time}{" "}
                                  <span className="ml-2 text-rose-400">
                                    Block
                                  </span>
                                </Button>
                              ))
                            ) : (
                              <p className="text-sm text-rose-400 col-span-2">
                                No available slots
                              </p>
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-zinc-300 mb-2 flex items-center">
                            <FontAwesomeIcon
                              icon={faClock}
                              className={`text-${barber.color} mr-2`}
                            />
                            Booked/Blocked Time Slots
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {schedules[barber.id]?.booked.length > 0 ? (
                              schedules[barber.id].booked.map(time => (
                                <Button
                                  key={time}
                                  variant="outline"
                                  className={`border border-zinc-700 text-white bg-rose-950/50 hover:bg-${barber.color}/10 hover:border-${barber.color}/30`}
                                  onClick={() =>
                                    unblockTimeSlot(barber.id, time)
                                  }
                                >
                                  {time}{" "}
                                  <span className="ml-2 text-emerald-400">
                                    Unblock
                                  </span>
                                </Button>
                              ))
                            ) : (
                              <p className="text-sm text-zinc-400 col-span-2">
                                No booked or blocked slots
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
