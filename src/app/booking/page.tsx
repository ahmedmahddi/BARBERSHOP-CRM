"use client";

import React, { useState } from "react";
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

// Define types
interface Service {
  id: string;
  name: string;
}

interface Barber {
  id: string;
  name: string;
}

interface DateTime {
  id: string;
  time: string;
}

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
  { id: "haircut", name: "Haircut" },
  { id: "beard", name: "Beard Trim" },
  { id: "styling", name: "Styling" },
  { id: "facecare", name: "Face Care" },
];

const BARBERS: Barber[] = [
  { id: "james", name: "James" },
  { id: "bradley", name: "Bradley" },
  { id: "megan", name: "Megan" },
  { id: "matthew", name: "Matthew" },
];

const DATETIMES: DateTime[] = [
  { id: "1", time: "April 15, 2025 - 10:00 AM" },
  { id: "2", time: "April 15, 2025 - 11:00 AM" },
  { id: "3", time: "April 15, 2025 - 2:00 PM" },
  { id: "4", time: "April 15, 2025 - 3:00 PM" },
];

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

  const [uploading, setUploading] = useState(false);
  const selectedService = watch("service");
  const selectedBarber = watch("barber");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        // Convert file to data URL
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;

          // Store in localStorage
          const bookingImages = JSON.parse(
            localStorage.getItem("booking-images") || "[]"
          );
          const imagePath = `uploads/${Date.now()}-${file.name}`;
          bookingImages.push({ path: imagePath, data: base64data });
          localStorage.setItem("booking-images", JSON.stringify(bookingImages));

          // Set the image URL in the form
          setValue("imageUrl", base64data);
          toast({ description: "Image uploaded successfully!" });
          setUploading(false);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        toast({
          title: "Upload Error",
          description:
            error instanceof Error ? error.message : "Failed to upload image",
          variant: "destructive",
        });
        setUploading(false);
      }
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    try {
      // Store booking data in localStorage
      const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      const bookingId = Date.now().toString();
      const newBooking = { id: bookingId, ...data };
      bookings.push(newBooking);
      localStorage.setItem("bookings", JSON.stringify(bookings));

      toast({
        title: "Appointment Booked!",
        description: "Your appointment has been scheduled.",
      });
      router.push(`/booking/confirmation/${bookingId}`);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An error occurred",
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
                      <label className="block text-sm mb-2 text-zinc-300">
                        Service
                      </label>
                      <Select
                        onValueChange={value => setValue("service", value)}
                      >
                        <SelectTrigger className="bg-zinc-800/70 border border-zinc-700 text-white rounded-lg h-12 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors hover:border-gold-400/30">
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
                      <label className="block text-sm mb-2 text-zinc-300">
                        Barber
                      </label>
                      <Select
                        onValueChange={value => setValue("barber", value)}
                      >
                        <SelectTrigger className="bg-zinc-800/70 border border-zinc-700 text-white rounded-lg h-12 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors hover:border-gold-400/30">
                          <SelectValue placeholder="Choose your barber" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border border-gold-400/20 text-white">
                          {BARBERS.map(barber => (
                            <SelectItem key={barber.id} value={barber.id}>
                              {barber.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.barber && (
                        <span className="text-red-500 text-sm">
                          Barber is required
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm mb-2 text-zinc-300">
                        Date & Time
                      </label>
                      <Select
                        onValueChange={value => setValue("dateTime", value)}
                      >
                        <SelectTrigger className="bg-zinc-800/70 border border-zinc-700 text-white rounded-lg h-12 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors hover:border-gold-400/30">
                          <SelectValue placeholder="Select date and time" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border border-gold-400/20 text-white">
                          {DATETIMES.map(dt => (
                            <SelectItem key={dt.id} value={dt.id}>
                              {dt.time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.dateTime && (
                        <span className="text-red-500 text-sm">
                          Date and time are required
                        </span>
                      )}
                    </div>
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
                      onClick={() => document.getElementById("image")?.click()}
                      disabled={uploading}
                    >
                      {uploading ? "Uploading..." : "Browse images"}
                    </Button>
                    <p className="text-xs text-zinc-600 mt-4">
                      Supported formats: JPG, PNG and GIF
                    </p>
                    <p className="text-xs text-zinc-600">Max size: 10mb</p>
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
                        disabled={isSubmitting || !isValid}
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
