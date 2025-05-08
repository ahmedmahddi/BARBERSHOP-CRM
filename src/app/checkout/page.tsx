"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { type Product } from "@/lib/utils";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { faShoppingBag, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartItem } from "@/components/cart";

export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  // Load cart items from localStorage when component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    setLoading(false);
  }, []);

  // Calculate total price
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 5.99;
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    // Create order object for storage/tracking
    const order = {
      id: generateOrderId(),
      date: new Date().toLocaleString(),
      items: cartItems,
      subtotal,
      shipping,
      total,
      customer: {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        zip: formData.postalCode,
        country: formData.country,
      },
      payment: {
        method: "Credit Card",
        last4: formData.cardNumber.slice(-4),
      },
    };

    // Save order to localStorage for retrieval in confirmation page
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Simulate payment processing
    setTimeout(() => {
      // Clear cart
      localStorage.removeItem("cart");

      toast({
        title: "Order Placed Successfully",
        description:
          "Thank you for your purchase! Your order has been confirmed.",
      });

      // Redirect to confirmation page with order ID
      router.push(`/checkout/confirmation/${order.id}`);
    }, 1500);
  };

  // Generate a simple order ID
  const generateOrderId = () => {
    return "ORD-" + Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-800 text-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-1 bg-gold-400 mb-4"></div>
          <p className="text-gold-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-zinc-800 text-white">
        {/* Navigation */}
        <Header />

        <main className="flex-1 container py-12">
          <div className="flex flex-col items-center justify-center space-y-8 text-center py-16">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-1 bg-gold-400 mr-3"></div>
              <h1 className="text-3xl font-bold bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                YOUR CART IS EMPTY
              </h1>
              <div className="w-8 h-1 bg-gold-400 ml-3"></div>
            </div>
            <p className="text-zinc-400 max-w-md">
              Looks like you haven't added any premium grooming products to your
              cart yet.
            </p>
            <Link href="/shop">
              <Button className="mt-4 bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold px-8 py-6">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-800 text-white">
      {/* Navigation */}
      <Header />

      <main className="flex-1 container py-12">
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-1 bg-gold-400 mr-4"></div>
          <h1 className="text-3xl font-bold tracking-wider bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
            CHECKOUT
          </h1>
          <div className="w-12 h-1 bg-gold-400 ml-4"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-gold-400/10 shadow-gold mb-6">
              <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-30"></div>
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <FontAwesomeIcon
                    icon={faShoppingBag}
                    className="text-gold-400 mr-3"
                  />
                  <h2 className="text-xl font-bold bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                    Order Summary
                  </h2>
                </div>
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-3 rounded-xl bg-zinc-800/50 border border-gold-400/5 hover:border-gold-400/20 transition-all"
                    >
                      <Link
                        href={`/shop/${item.id}`}
                        className="h-16 w-16 overflow-hidden rounded-lg bg-zinc-700 border border-gold-400/10"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </Link>
                      <div className="flex-1">
                        <Link
                          href={`/shop/${item.id}`}
                          className="font-medium text-white hover:text-gold-400 transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gold-400/80">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                      <div className="font-bold text-lg bg-gold-gradient from-gold-300 to-gold-500 bg-clip-text text-transparent">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-2 border-t border-zinc-700/50 pt-4">
                  <div className="flex justify-between p-2">
                    <span className="text-zinc-400">Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between p-2">
                    <span className="text-zinc-400">Shipping</span>
                    <span className="text-white">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg p-3 mt-2 bg-zinc-800/50 rounded-xl">
                    <span>Total</span>
                    <span className="text-xl font-bold bg-gold-gradient from-gold-300 to-gold-500 bg-clip-text text-transparent">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-1">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-gold-400/10 shadow-gold">
              <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-30"></div>
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <FontAwesomeIcon
                    icon={faCreditCard}
                    className="text-gold-400 mr-3"
                  />
                  <h2 className="text-xl font-bold bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                    Payment Information
                  </h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm text-zinc-300 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white text-sm focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm text-zinc-300 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white text-sm focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm text-zinc-300 mb-1"
                    >
                      Shipping Address
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white text-sm focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm text-zinc-300 mb-1"
                      >
                        City
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white text-sm focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="postalCode"
                        className="block text-sm text-zinc-300 mb-1"
                      >
                        Postal Code
                      </label>
                      <input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        required
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white text-sm focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm text-zinc-300 mb-1"
                    >
                      Country
                    </label>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white text-sm focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors"
                    />
                  </div>
                  <div className="border-t border-zinc-700/50 pt-4 mt-4">
                    <h3 className="text-md font-medium mb-2 text-gold-400">
                      Payment Details
                    </h3>
                    <div>
                      <label
                        htmlFor="cardNumber"
                        className="block text-sm text-zinc-300 mb-1"
                      >
                        Card Number
                      </label>
                      <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        required
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white text-sm focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label
                          htmlFor="cardExpiry"
                          className="block text-sm text-zinc-300 mb-1"
                        >
                          Expiry Date
                        </label>
                        <input
                          id="cardExpiry"
                          name="cardExpiry"
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white text-sm focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="cardCvc"
                          className="block text-sm text-zinc-300 mb-1"
                        >
                          CVC
                        </label>
                        <input
                          id="cardCvc"
                          name="cardCvc"
                          type="text"
                          required
                          placeholder="123"
                          value={formData.cardCvc}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white text-sm focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full mt-6 bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold py-6"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
