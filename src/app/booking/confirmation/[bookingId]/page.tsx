"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCalendarAlt,
  faUserAlt,
  faInfoCircle,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

interface BookingData {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  barber: string;
  dateTime: string;
  comments: string;
  imageUrl: string;
}

// Mock data mapping (in a real app, this would come from an API)
const SERVICE_NAMES: { [key: string]: string } = {
  haircut: "Haircut",
  beard: "Beard Trim",
  styling: "Styling",
  facecare: "Face Care",
};

const BARBER_NAMES: { [key: string]: string } = {
  james: "James",
  bradley: "Bradley",
  megan: "Megan",
  matthew: "Matthew",
};

const DATETIME_MAP: { [key: string]: string } = {
  "1": "April 15, 2025 - 10:00 AM",
  "2": "April 15, 2025 - 11:00 AM",
  "3": "April 15, 2025 - 2:00 PM",
  "4": "April 15, 2025 - 3:00 PM",
};

export default function ConfirmationPage({
  params,
}: {
  params: { bookingId: string };
}) {
  const router = useRouter();
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get booking data from localStorage
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const foundBooking = bookings.find(
      (b: BookingData) => b.id === params.bookingId
    );

    if (foundBooking) {
      setBooking(foundBooking);
    }
    setLoading(false);
  }, [params.bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-800 text-white flex items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <div className="w-16 h-16 border-4 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="text-2xl font-bold bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
            Loading confirmation...
          </h2>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-zinc-800 text-white flex items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <h2 className="text-3xl font-bold bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
            Booking Not Found
          </h2>
          <p className="text-zinc-400">
            The requested booking could not be found.
          </p>
          <Button
            onClick={() => router.push("/booking")}
            className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold"
          >
            Back to Booking
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-800 text-white overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-12">
              <div className="w-12 h-1 bg-gold-400 mr-4"></div>
              <h1 className="text-3xl font-bold tracking-wider bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                BOOKING CONFIRMED
              </h1>
              <div className="w-12 h-1 bg-gold-400 ml-4"></div>
            </div>

            <div className="max-w-3xl mx-auto">
              {/* Success Message */}
              <div className="text-center mb-12">
                <div className="text-6xl text-gold-400 mb-4">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Thank you for your booking!
                </h2>
                <p className="text-zinc-400">
                  We've sent a confirmation email to {booking.email}
                </p>
              </div>

              {/* Booking Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-zinc-400">Service</p>
                      <p className="text-white">
                        {SERVICE_NAMES[booking.service]}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Barber</p>
                      <p className="text-white">
                        {BARBER_NAMES[booking.barber]}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Date & Time</p>
                      <p className="text-white">
                        {DATETIME_MAP[booking.dateTime]}
                      </p>
                    </div>
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
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-zinc-400">Name</p>
                      <p className="text-white">{booking.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Email</p>
                      <p className="text-white">{booking.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Phone</p>
                      <p className="text-white">{booking.phone}</p>
                    </div>
                    {booking.comments && (
                      <div>
                        <p className="text-sm text-zinc-400">Comments</p>
                        <p className="text-white">{booking.comments}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Style Reference */}
              {booking.imageUrl && (
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-gold-400/10 shadow-gold p-6 mt-8">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-30"></div>
                  <div className="flex items-center mb-6">
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-gold-400 mr-3"
                    />
                    <h2 className="text-xl font-bold bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                      STYLE REFERENCE
                    </h2>
                  </div>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={booking.imageUrl}
                      alt="Style reference"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                <Button
                  onClick={() => router.push("/booking")}
                  variant="outline"
                  className="border-gold-400 text-gold-400 hover:bg-gold-400/10 !rounded-button"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                  Book Another Appointment
                </Button>
                <Link href="/shop">
                  <Button className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold">
                    Browse Products
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
