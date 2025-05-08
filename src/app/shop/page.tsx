"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { mockProducts, type Product } from "@/lib/utils";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { faCartShopping, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FloatingCartButton,
  ShoppingCartDrawer,
  CartItem,
} from "@/components/cart";

export default function ShopPage() {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart items from localStorage when component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Add to cart function
  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id
      );

      let updatedItems;
      if (existingItemIndex > -1) {
        // Item exists, update quantity
        updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
      } else {
        // Item doesn't exist, add new item
        updatedItems = [...prevItems, { ...product, quantity: 1 }];
      }

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return updatedItems;
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  // Remove from cart function
  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  // Update quantity function
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col min-h-screen bg-zinc-800 text-white overflow-x-hidden">
      {/* Navigation */}
      <Header />

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-12 h-1 bg-gold-400 mr-4"></div>
                  <h1 className="text-4xl font-bold tracking-wider bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                    PREMIUM PRODUCTS
                  </h1>
                  <div className="w-12 h-1 bg-gold-400 ml-4"></div>
                </div>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our selection of high-quality grooming products to
                  maintain your style at home.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-12">
              {mockProducts.map((product: Product) => (
                <div
                  key={product.id}
                  className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-gold-lg"
                >
                  <div className="absolute inset-0 bg-gold-radial opacity-10"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-50"></div>
                  <div className="p-6">
                    <Link href={`/shop/${product.id}`} className="block">
                      <div className="relative mb-6 rounded-xl overflow-hidden group-hover:shadow-gold">
                        <div className="absolute inset-0 bg-gradient-to-br from-gold-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-64 object-cover object-center rounded-xl transform transition-transform group-hover:scale-105"
                        />
                      </div>
                      <h3 className="text-xl font-bold mb-2 bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                        {product.name}
                      </h3>
                      <div className="flex items-center mb-2">
                        <div className="ml-auto flex items-center">
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-gold-400 mr-1 text-sm"
                          />
                          <span className="text-zinc-400 text-sm">
                            {product.stock > 50
                              ? "4.8"
                              : product.stock > 20
                              ? "4.5"
                              : "4.2"}
                          </span>
                        </div>
                      </div>
                      <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                    </Link>
                    <div className="flex justify-between items-center backdrop-blur-sm p-3 rounded-xl bg-zinc-800/30">
                      <span className="text-xl font-bold bg-gold-gradient from-gold-300 to-gold-500 bg-clip-text text-transparent">
                        ${product.price.toFixed(2)}
                      </span>
                      <Button
                        onClick={() => addToCart(product)}
                        disabled={product.stock <= 0}
                        className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold"
                      >
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          className="mr-2"
                        />
                        {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gold-radial opacity-50"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-30"></div>

          <div className="container relative px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-12 h-1 bg-gold-400 mr-4"></div>
                  <h2 className="text-3xl font-bold tracking-wider bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                    BOOK YOUR NEXT APPOINTMENT
                  </h2>
                  <div className="w-12 h-1 bg-gold-400 ml-4"></div>
                </div>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Experience our professional grooming services and leave
                  looking your best.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/booking">
                  <Button
                    size="lg"
                    className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold px-8 py-6 text-lg"
                  >
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Cart Button - Using reusable component */}
      <FloatingCartButton
        cartItems={cartItems}
        onClick={() => setIsCartOpen(true)}
      />

      {/* Shopping Cart Drawer - Using reusable component */}
      <ShoppingCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        totalPrice={totalPrice}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
