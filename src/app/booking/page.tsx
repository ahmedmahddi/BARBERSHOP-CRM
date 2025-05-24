"use client";

import React, { useState, useEffect } from "react";
import {
  getAllBarbers,
  getAvailableBarbers,
  BarberData,
} from "@/api/services/barberService";
import { useBooking } from "@/hooks/useBooking";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudUploadAlt,
  faCalendarAlt,
  faUserAlt,
  faInfoCircle,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

// Define types
interface Service {
  id: string;
  name: string;
}

// Using BarberData interface from barberService.ts

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  barber: string;
  dateTime: string;
  comments: string;
  imageUrl: string;
  agreement: boolean;
}

// Mock data
const SERVICES: Service[] = [
  { id: "440130fb-bcb0-4481-8534-c433dcc0dca4", name: "Shave" },
  { id: "67e14468-2554-40e1-8a4b-398687e421f9", name: "Beard Trim" },
  { id: "b47fbfde-265f-4e34-bf68-cba201612762", name: "Haircut" },
  { id: "facecare", name: "Face Care" },
];

// Barbers will be fetched from the API

// Default time slots for barbers (used when no specific schedule is defined)
const DEFAULT_TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

// Barber schedules will be fetched from the API
// This is a fallback for testing
const BARBER_SCHEDULE: Record<string, Record<string, string[]>> = {
  // Example fallback schedule for specific barbers
  "143a0b5d-7fbb-4036-9f10-7fe420e2dd46": {
    "2025-05-15": [
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
      "01:00 PM",
      "02:00 PM",
      "03:00 PM",
      "04:00 PM",
    ],
  },
  "d7456438-fa8a-4526-b3cc-b58819169cb9": {
    "2025-05-16": [
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
      "01:00 PM",
      "02:00 PM",
      "03:00 PM",
      "04:00 PM",
      "05:00 PM",
    ],
  },
  bradley: {
    "2025-05-15": [
      "09:30 AM",
      "10:30 AM",
      "11:30 AM",
      "01:30 PM",
      "02:30 PM",
      "03:30 PM",
      "04:30 PM",
    ],
  },
  megan: {
    "2025-05-15": [
      "09:30 AM",
      "10:30 AM",
      "11:30 AM",
      "01:00 PM",
      "02:00 PM",
      "03:30 PM",
      "04:30 PM",
    ],
  },
  matthew: {
    "2025-05-15": [
      "09:30 AM",
      "10:30 AM",
      "11:30 AM",
      "12:30 PM",
      "01:30 PM",
      "02:30 PM",
      "03:30 PM",
      "04:00 PM",
    ],
  },
};

// Function to get working hours for a barber on a specific date
function getWorkingHours(barber: string, date: Date): string {
  const formattedDate = format(date, "yyyy-MM-dd");
  const schedule =
    BARBER_SCHEDULE[barber]?.[formattedDate] ?? DEFAULT_TIME_SLOTS;

  if (!schedule || schedule.length === 0) {
    return "Not available on this day";
  }

  const firstSlot = schedule[0];
  const lastSlot = schedule[schedule.length - 1];

  return `${firstSlot} - ${lastSlot}`;
}

export default function BookingPage() {
  const { toast } = useToast();
  const router = useRouter();
  const methods = useForm<BookingFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      barber: "",
      dateTime: "",
      comments: "",
      imageUrl: "",
      agreement: false,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch,
  } = methods;

  const { submitBooking } = useBooking();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // State for barbers from API
  const [barbers, setBarbers] = useState<BarberData[]>([]);
  const [loadingBarbers, setLoadingBarbers] = useState(false);
  const [availableBarbers, setAvailableBarbers] = useState<BarberData[]>([]);

  const selectedBarber = watch("barber");

  // Fetch all barbers when component mounts
  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        setLoadingBarbers(true);
        const barbersData = await getAllBarbers();
        setBarbers(barbersData);
        console.log("Fetched barbers:", barbersData);
      } catch (error) {
        console.error("Error fetching barbers:", error);
        toast({
          title: "Error",
          description: "Could not load barbers. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoadingBarbers(false);
      }
    };

    fetchBarbers();
  }, [toast]);

  // Update available time slots when date or barber changes
  useEffect(() => {
    if (selectedBarber && selectedDate) {
      setCheckingAvailability(true);
      const formattedDate = format(selectedDate, "yyyy-MM-dd");

      // Get time slots for this barber on this date
      // First check if the selected barber has working hours in their profile
      const selectedBarberData = barbers.find(b => b.id === selectedBarber);

      // Get working hours for this barber (either from their profile or use default)
      const allPossibleSlots =
        selectedBarberData?.workingHours
          ?.find(wh => wh.day === format(selectedDate, "EEEE").toLowerCase())
          ?.hours.split(",") ??
        BARBER_SCHEDULE[selectedBarber]?.[formattedDate] ??
        DEFAULT_TIME_SLOTS;

      // Fetch available barbers for the selected date
      const fetchAvailableBarbers = async () => {
        try {
          const formattedTime = selectedTime ?? "";
          if (formattedDate && formattedTime) {
            const availableBarbers = await getAvailableBarbers(
              formattedDate,
              formattedTime
            );
            setAvailableBarbers(availableBarbers);
            console.log(
              "Available barbers for",
              formattedDate,
              formattedTime,
              ":",
              availableBarbers
            );
          }
        } catch (error) {
          console.error("Error fetching available barbers:", error);
        }
      };

      // Only fetch available barbers if we have both date and time
      if (selectedTime) {
        fetchAvailableBarbers();
      }

      // Get existing bookings from localStorage
      const existingBookings = JSON.parse(
        localStorage.getItem("bookings") ?? "[]"
      );

      // Find bookings for this barber on this date
      const bookedSlots = existingBookings
        .filter((booking: any) => {
          return (
            booking.barber === selectedBarber &&
            booking.formattedDate === formattedDate
          );
        })
        .map((booking: any) => booking.selectedTime);

      // Filter out booked slots to get available slots
      const availableSlots = allPossibleSlots.filter(
        (slot: string) => !bookedSlots.includes(slot)
      );

      // Simulate a bit of delay to show loading state (remove in production)
      setTimeout(() => {
        setAvailableTimeSlots(availableSlots);
        setSelectedTime(null); // Reset selected time when date or barber changes
        setCheckingAvailability(false);
      }, 500);
    } else {
      setAvailableTimeSlots([]);
      setSelectedTime(null);
      setCheckingAvailability(false);
    }
  }, [selectedDate, selectedBarber]);

  // Set the dateTime value when both date and time are selected
  useEffect(() => {
    if (selectedDate && selectedTime) {
      const formattedDate = format(selectedDate, "MMMM d, yyyy");
      setValue("dateTime", `${formattedDate} - ${selectedTime}`);
    } else {
      setValue("dateTime", "");
    }
  }, [selectedDate, selectedTime, setValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setPreviewUrl("");
      setSelectedFile(null);
      return;
    }

    const file = e.target.files[0];
    console.log("File selected:", file.name, file.type, file.size);
    setSelectedFile(file);

    // Show preview
    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      try {
        if (typeof reader.result === "string") {
          setPreviewUrl(reader.result);
          // Display the preview somewhere in the UI
          console.log("Preview URL generated, length:", reader.result.length);
        }
      } catch (err) {
        console.error("Error processing image:", err);
        toast({
          title: "Error",
          description: "Failed to process image",
          variant: "destructive",
        });
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Helper function to convert time from 12-hour to 24-hour format
  const convertTo24HourFormat = (timeStr: string): string => {
    if (!timeStr) return "";

    const [timePart, modifier] = timeStr.split(" ");
    let [hours, minutes] = timePart.split(":");
    let hoursNum = parseInt(hours, 10);

    // Convert to 24-hour format
    if (modifier === "PM" && hoursNum < 12) {
      hoursNum += 12;
    } else if (modifier === "AM" && hoursNum === 12) {
      hoursNum = 0;
    }

    // Ensure two digits
    const formattedHours = hoursNum.toString().padStart(2, "0");
    return `${formattedHours}:${minutes}`;
  };

  const onSubmit = async (data: BookingFormData) => {
    try {
      if (!selectedDate || !selectedTime) {
        toast({
          title: "Error",
          description: "Please select a date and time",
          variant: "destructive",
        });
        return;
      }

      // Format date as YYYY-MM-DD
      const formattedDate = format(selectedDate, "yyyy-MM-dd");

      // Convert time to 24-hour format (HH:MM)
      const formattedTime = convertTo24HourFormat(selectedTime);

      console.log("Sending time format:", formattedTime);

      // Create final form data with explicit date and time fields
      const bookingData = {
        ...data,
        // Override dateTime with properly formatted values
        date: formattedDate,
        time: formattedTime,
      };
      console.log("Booking data:", bookingData);

      // Log file information before submission
      if (selectedFile) {
        console.log("Submitting file:", {
          name: selectedFile.name,
          type: selectedFile.type,
          size: selectedFile.size,
          lastModified: new Date(selectedFile.lastModified).toISOString(),
        });
      } else {
        console.log("No file selected for upload");
      }

      // Submit to backend using our booking service
      const response = await submitBooking(
        bookingData,
        selectedFile ?? undefined
      );

      // Show success toast
      toast({
        title: "Booking Confirmed",
        description: "Your appointment has been scheduled successfully!",
      });

      // Redirect to confirmation page with the actual booking ID
      router.push(`/booking/confirmation/${response.id}`);
    } catch (error: any) {
      console.error("Error submitting booking:", error);
      toast({
        title: "Booking Failed",
        description:
          error.message ??
          "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-800 text-white overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-12">
              <div className="w-12 h-1 bg-gold-400 mr-4"></div>
              <h1 className="text-3xl font-bold tracking-wider bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                BOOK AN APPOINTMENT
              </h1>
              <div className="w-12 h-1 bg-gold-400 ml-4"></div>
            </div>

            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
              >
                {/* Appointment Details */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-gold-400/10 shadow-gold p-6">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-30"></div>
                  <div className="flex items-center mb-6">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="text-gold-400 mr-3"
                    />
                    <h2 className="text-xl font-bold bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                      APPOINTMENT DETAILS
                    </h2>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="service-select"
                        className="block text-sm mb-2 text-zinc-300"
                      >
                        Service
                      </label>
                      <Select
                        onValueChange={value => setValue("service", value)}
                      >
                        <SelectTrigger
                          id="service-select"
                          className="bg-zinc-800/70 border border-zinc-700 text-white rounded-lg h-12 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors hover:border-gold-400/30"
                        >
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border border-gold-400/20 text-white">
                          {SERVICES.map(service => (
                            <SelectItem key={service.id} value={service.id}>
                              {service.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.service && (
                        <span className="text-red-500 text-sm">
                          Service is required
                        </span>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="barber-select"
                        className="block text-sm mb-2 text-zinc-300"
                      >
                        Barber
                      </label>
                      <Select
                        onValueChange={value => setValue("barber", value)}
                        disabled={loadingBarbers}
                      >
                        <SelectTrigger
                          id="barber-select"
                          className="bg-zinc-800/70 border border-zinc-700 text-white rounded-lg h-12 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors hover:border-gold-400/30"
                        >
                          <SelectValue
                            placeholder={
                              loadingBarbers
                                ? "Loading barbers..."
                                : "Choose your barber"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border border-gold-400/20 text-white">
                          {barbers.length > 0 ? (
                            barbers.map(barber => (
                              <SelectItem key={barber.id} value={barber.id}>
                                {barber.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-barbers" disabled>
                              {loadingBarbers
                                ? "Loading..."
                                : "No barbers available"}
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      {errors.barber && (
                        <span className="text-red-500 text-sm">
                          Barber is required
                        </span>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="date-picker"
                        className="block text-sm mb-2 text-zinc-300"
                      >
                        Select Date
                      </label>
                      <div className="bg-zinc-800/70 border border-zinc-700 rounded-lg p-4 focus-within:border-gold-400 focus-within:ring-1 focus-within:ring-gold-400 transition-colors hover:border-gold-400/30">
                        <style>{`
                          .rdp {
                            --rdp-cell-size: 40px;
                            --rdp-accent-color: #d4af37;
                            --rdp-background-color: rgba(212, 175, 55, 0.2);
                            --rdp-accent-color-dark: #d4af37;
                            --rdp-background-color-dark: rgba(
                              212,
                              175,
                              55,
                              0.2
                            );
                            --rdp-outline: 2px solid var(--rdp-accent-color);
                            --rdp-outline-selected: 2px solid
                              var(--rdp-accent-color);
                            margin: 0;
                          }
                          .rdp-months {
                            justify-content: center;
                          }
                          .rdp-day_selected,
                          .rdp-day_selected:focus-visible,
                          .rdp-day_selected:hover {
                            background-color: var(--rdp-accent-color);
                            color: white;
                          }
                          .rdp-button:hover:not([disabled]):not(
                              .rdp-day_selected
                            ) {
                            background-color: rgba(212, 175, 55, 0.1);
                          }
                          .rdp-day {
                            color: #e4e4e7;
                          }
                          .rdp-head_cell {
                            color: #a1a1aa;
                            font-weight: 600;
                          }
                          .rdp-nav_button:hover {
                            background-color: rgba(212, 175, 55, 0.1);
                          }
                        `}</style>
                        <DayPicker
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          className="text-white"
                          fromMonth={new Date()}
                          disabled={{ before: new Date() }}
                          id="date-picker"
                        />
                      </div>
                      {!selectedDate && errors.dateTime && (
                        <span className="text-red-500 text-sm">
                          Date is required
                        </span>
                      )}
                    </div>

                    {selectedDate && selectedBarber && (
                      <>
                        <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-3 mb-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FontAwesomeIcon
                                icon={faCalendarAlt}
                                className="text-gold-400 mr-2"
                              />
                              <span className="text-sm text-zinc-300">
                                Barber's Schedule
                              </span>
                            </div>
                            <span className="text-sm text-gold-400 font-medium">
                              {getWorkingHours(selectedBarber, selectedDate)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="time-slots"
                            className="block text-sm mb-2 text-zinc-300"
                          >
                            <div className="flex items-center">
                              <FontAwesomeIcon
                                icon={faClock}
                                className="text-gold-400 mr-2"
                              />
                              <span>Available Time Slots</span>
                            </div>
                          </label>

                          {checkingAvailability ? (
                            <div className="text-center py-8 px-3 bg-zinc-800/50 border border-zinc-700 rounded-lg">
                              <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-gold-400 border-r-transparent"></div>
                              <p className="mt-2 text-sm text-zinc-400">
                                Checking availability...
                              </p>
                            </div>
                          ) : (
                            <div
                              id="time-slots"
                              className="grid grid-cols-2 gap-2 mt-2"
                            >
                              {availableTimeSlots.length > 0 ? (
                                availableTimeSlots.map(time => (
                                  <Button
                                    key={time}
                                    type="button"
                                    variant="outline"
                                    className={`border border-zinc-700 hover:border-gold-400/30 ${
                                      selectedTime === time
                                        ? "bg-gold-gradient from-gold-400 to-gold-500 text-white"
                                        : "bg-zinc-800/70 text-white hover:bg-zinc-700/50"
                                    }`}
                                    onClick={() => setSelectedTime(time)}
                                  >
                                    {time}
                                  </Button>
                                ))
                              ) : (
                                <div className="col-span-2 text-center py-4 px-3 text-zinc-400 bg-zinc-800/50 border border-zinc-700 rounded-lg">
                                  <p className="text-rose-400 mb-1">
                                    All slots are booked for this date
                                  </p>
                                  <p className="text-sm">
                                    Please select another date or barber
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {errors.dateTime &&
                            !selectedTime &&
                            !checkingAvailability && (
                              <span className="text-red-500 text-sm block mt-2">
                                Time slot is required
                              </span>
                            )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Style Preference */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-gold-400/10 shadow-gold p-6">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-30"></div>
                  <div className="flex items-center mb-6">
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-gold-400 mr-3"
                    />
                    <h2 className="text-xl font-bold bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                      STYLE PREFERENCE
                    </h2>
                  </div>
                  <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center h-[300px] flex flex-col items-center justify-center group hover:border-gold-400/30 transition-colors bg-zinc-900/30">
                    {previewUrl ? (
                      <div className="w-full h-full relative flex flex-col items-center">
                        <div className="relative w-full h-[200px] mb-4">
                          <img
                            src={previewUrl}
                            alt="Style preview"
                            className="w-full h-full object-contain rounded"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          className="border border-zinc-700 hover:border-rose-400/30 text-rose-400 bg-zinc-800/70"
                          onClick={() => {
                            setPreviewUrl(null);
                            setSelectedFile(null);
                          }}
                        >
                          Remove image
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="text-5xl mb-4 text-zinc-600 group-hover:text-gold-400 transition-colors">
                          <FontAwesomeIcon icon={faCloudUploadAlt} />
                        </div>
                        <p className="text-lg text-zinc-400 mb-2">
                          Drag & Drop your image here
                        </p>
                        <p className="text-sm text-zinc-600 mb-4">OR</p>
                        <input
                          type="file"
                          id="image"
                          accept=".jpg,.png,.gif"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <Button
                          type="button"
                          className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold"
                          onClick={() =>
                            document.getElementById("image")?.click()
                          }
                          disabled={uploading}
                        >
                          {uploading ? "Uploading..." : "Browse images"}
                        </Button>
                        <p className="text-xs text-zinc-600 mt-4">
                          Supported formats: JPG, PNG and GIF
                        </p>
                        <p className="text-xs text-zinc-600">Max size: 10mb</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Customer Information */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-gold-400/10 shadow-gold p-6">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-30"></div>
                  <div className="flex items-center mb-6">
                    <FontAwesomeIcon
                      icon={faUserAlt}
                      className="text-gold-400 mr-3"
                    />
                    <h2 className="text-xl font-bold bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                      CUSTOMER INFORMATION
                    </h2>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm mb-2 text-zinc-300"
                      >
                        Full name
                      </label>
                      <Input
                        id="name"
                        {...register("name", { required: "Name is required" })}
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white text-sm focus:border-gold-400 focus:ring-1 focus:ring-gold-400 h-12 transition-colors"
                        placeholder="Your name & surname"
                      />
                      {errors.name && (
                        <span className="text-red-500 text-sm">
                          {errors.name.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm mb-2 text-zinc-300"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email",
                          },
                        })}
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white text-sm focus:border-gold-400 focus:ring-1 focus:ring-gold-400 h-12 transition-colors"
                        placeholder="Your email address"
                      />
                      {errors.email && (
                        <span className="text-red-500 text-sm">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm mb-2 text-zinc-300"
                      >
                        Phone number
                      </label>
                      <Input
                        id="phone"
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9+\-\s]+$/,
                            message: "Invalid phone number",
                          },
                        })}
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white text-sm focus:border-gold-400 focus:ring-1 focus:ring-gold-400 h-12 transition-colors"
                        placeholder="Your mobile phone number"
                      />
                      {errors.phone && (
                        <span className="text-red-500 text-sm">
                          {errors.phone.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="comments"
                        className="block text-sm mb-2 text-zinc-300"
                      >
                        Comments (optional)
                      </label>
                      <Textarea
                        id="comments"
                        {...register("comments")}
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white text-sm focus:border-gold-400 focus:ring-1 focus:ring-gold-400 min-h-[100px] transition-colors"
                        placeholder="Any extra requirements?"
                      />
                    </div>
                    <div className="mt-6">
                      <div className="flex items-center mb-4">
                        <input
                          type="checkbox"
                          id="agreement"
                          {...register("agreement", {
                            required: "You must agree to proceed",
                          })}
                          className="mr-2 w-5 h-5 rounded bg-zinc-800 border-zinc-700 focus:ring-gold-400 text-gold-400"
                        />
                        <label
                          htmlFor="agreement"
                          className="text-sm text-zinc-400"
                        >
                          I agree to the processing of personal data
                        </label>
                      </div>
                      {errors.agreement && (
                        <span className="text-red-500 text-sm">
                          {errors.agreement.message}
                        </span>
                      )}
                      <Button
                        type="submit"
                        className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white w-full h-12 text-lg !rounded-button shadow-gold"
                        disabled={
                          isSubmitting ||
                          !isValid ||
                          !selectedDate ||
                          !selectedTime
                        }
                      >
                        {isSubmitting ? "Submitting..." : "Confirm appointment"}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-zinc-900 relative overflow-hidden mt-16">
          <div className="absolute inset-0 bg-gold-radial opacity-50"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-30"></div>
          <div className="container relative px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-12 h-1 bg-gold-400 mr-4"></div>
                  <h2 className="text-3xl font-bold tracking-wider bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                    PREMIUM GROOMING PRODUCTS
                  </h2>
                  <div className="w-12 h-1 bg-gold-400 ml-4"></div>
                </div>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our selection of high-quality grooming products to
                  maintain your style at home.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/shop">
                  <Button
                    size="lg"
                    className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold px-8 py-6 text-lg"
                  >
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
