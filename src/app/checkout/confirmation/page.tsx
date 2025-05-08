"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ConfirmationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we have any orders to redirect to the most recent one
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");

    if (orders.length > 0) {
      // Get the most recent order
      const mostRecentOrder = orders[orders.length - 1];
      // Redirect to the order-specific confirmation page
      router.push(`/checkout/confirmation/${mostRecentOrder.id}`);
    } else {
      // No orders found, stay on this page
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-800 text-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-1 bg-gold-400 mb-4"></div>
          <p className="text-gold-400">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-800 text-white">
      {/* Navigation */}
      <Header />

      <main className="flex-1 container py-12">
        <div className="flex flex-col items-center justify-center space-y-8 text-center py-16 relative">
          <div className="absolute inset-0 bg-gold-radial opacity-30"></div>

          <div className="relative z-10">
            <div className="w-24 h-24 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-full flex items-center justify-center mb-6 mx-auto border border-gold-400/20 shadow-gold animate-pulse">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-gold-400 text-4xl"
              />
            </div>

            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-1 bg-gold-400 mr-4"></div>
              <h1 className="text-3xl font-bold tracking-wider bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                ORDER CONFIRMED
              </h1>
              <div className="w-12 h-1 bg-gold-400 ml-4"></div>
            </div>

            <p className="text-zinc-400 max-w-md mx-auto">
              Thank you for your purchase. Your order has been confirmed and
              will be shipped shortly. We've sent a confirmation email with your
              order details.
            </p>

            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
              <Link href="/shop">
                <Button className="bg-zinc-900 border border-gold-400/20 hover:bg-zinc-800 hover:border-gold-400 text-gold-400 !rounded-button shadow-gold-lg px-8">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/">
                <Button className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold px-8">
                  Return Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
