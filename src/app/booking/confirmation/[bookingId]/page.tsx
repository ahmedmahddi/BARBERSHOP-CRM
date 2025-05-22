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
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { useToast } from "@/components/ui/use-toast";
import { getBookingById, BookingData } from "@/api/services/bookingService";
import { format } from "date-fns";

// BookingData interface is now imported from bookingService

// Service and barber names will come from the API response
// We'll use the actual data from the backend instead of these mappings

export default function ConfirmationPage({
  params,
}: {
  params: { bookingId: string };
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBookingDetails() {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch booking from backend API
        const bookingData = await getBookingById(params.bookingId);
        setBooking(bookingData);
      } catch (err: any) {
        console.error('Error fetching booking:', err);
        setError(err.message ?? 'Failed to load booking details');
        toast({
          title: 'Error',
          description: 'Could not load booking details',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }
    
    if (params.bookingId) {
      fetchBookingDetails();
    }
  }, [params.bookingId, toast]);

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

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-800 text-white flex items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <FontAwesomeIcon 
            icon={faExclamationTriangle} 
            className="text-5xl text-gold-400 mb-4" 
          />
          <h2 className="text-3xl font-bold bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
            Error Loading Booking
          </h2>
          <p className="text-zinc-400">
            {error}
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
                        {booking.serviceId}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Barber</p>
                      <p className="text-white">
                        {booking.barberId}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Date & Time</p>
                      <p className="text-white">
                        {`${booking.date} at ${booking.time}`}
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
                      className="w-full h-full object-contain"
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
