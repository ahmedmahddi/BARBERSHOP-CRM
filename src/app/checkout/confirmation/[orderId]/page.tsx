"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faArrowLeft,
  faEnvelope,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { CartItem } from "@/components/cart";

interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    zip: string;
    country: string;
  };
  payment: {
    method: string;
    last4?: string;
  };
}

export default function OrderConfirmationPage({
  params,
}: {
  params: { orderId: string };
}) {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call to get order details
    // For now, we'll mock it with localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const foundOrder = orders.find((o: Order) => o.id === params.orderId);

    if (foundOrder) {
      setOrder(foundOrder);
    }

    setLoading(false);
  }, [params.orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-800 text-white flex items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <div className="w-16 h-16 border-4 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="text-2xl font-bold bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
            Loading order details...
          </h2>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-zinc-800 text-white flex items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <h2 className="text-3xl font-bold bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
            Order Not Found
          </h2>
          <p className="text-zinc-400 max-w-md mx-auto">
            The order you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => router.push("/shop")}
            className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-800 text-white overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24">
          <div className="container mx-auto px-4">
            {/* Success Message */}
            <div className="text-center mb-16">
              <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 rounded-full bg-green-500/30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-2xl text-white">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent mb-4">
                Order Confirmed
              </h1>
              <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                Thank you for your purchase! Your order has been confirmed and
                will be shipped soon.
              </p>
              <p className="text-sm text-zinc-500 mt-2">
                Order #{order.id} • {order.date}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Order Summary */}
                <div className="md:col-span-2">
                  <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-gold-400/10 shadow-gold p-6">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-30"></div>
                    <h2 className="text-xl font-bold bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent mb-6">
                      ORDER SUMMARY
                    </h2>

                    <div className="space-y-4">
                      {order.items.map(item => (
                        <div
                          key={item.id}
                          className="flex border-b border-zinc-700 pb-4"
                        >
                          <Link 
                            href={`/shop/${item.id}`}
                            className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-gold-400/10 hover:border-gold-400/30 transition-all"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </Link>
                          <div className="ml-4 flex-1">
                            <Link 
                              href={`/shop/${item.id}`} 
                              className="font-medium text-white hover:text-gold-400 transition-colors"
                            >
                              {item.name}
                            </Link>
                            <p className="text-zinc-400 text-sm">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-zinc-500 text-sm">
                              ${item.price.toFixed(2)} each
                            </p>
                          </div>
                        </div>
                      ))}

                      <div className="mt-6 pt-4 border-t border-zinc-700">
                        <div className="flex justify-between mb-2">
                          <span className="text-zinc-400">Subtotal</span>
                          <span className="text-white">
                            ${order.subtotal.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-zinc-400">Shipping</span>
                          <span className="text-white">
                            ${order.shipping.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-zinc-700">
                          <span className="text-white">Total</span>
                          <span className="text-gold-400">
                            ${order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="space-y-6">
                  <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-gold-400/10 shadow-gold p-6">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-30"></div>
                    <h2 className="text-xl font-bold bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent mb-4">
                      SHIPPING DETAILS
                    </h2>
                    <div className="space-y-2 text-sm">
                      <p className="text-white">{order.customer.name}</p>
                      <p className="text-zinc-400">{order.customer.address}</p>
                      <p className="text-zinc-400">
                        {order.customer.city}, {order.customer.zip}
                      </p>
                      <p className="text-zinc-400">{order.customer.country}</p>
                    </div>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-gold-400/10 shadow-gold p-6">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-30"></div>
                    <h2 className="text-xl font-bold bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent mb-4">
                      PAYMENT METHOD
                    </h2>
                    <div className="text-sm">
                      <p className="text-white">
                        {order.payment.method}
                        {order.payment.last4 &&
                          ` ending in ${order.payment.last4}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Status and Buttons */}
              <div className="mt-12 text-center space-y-6">
                <p className="text-zinc-400">
                  We'll send a confirmation email to{" "}
                  <span className="text-white">{order.customer.email}</span>{" "}
                  with the order details and tracking information once your
                  order ships.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Button
                    onClick={() => router.push("/shop")}
                    className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold"
                  >
                    <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
                    Continue Shopping
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gold-400 text-gold-400 hover:bg-gold-400/10 !rounded-button"
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                    Email Receipt
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
