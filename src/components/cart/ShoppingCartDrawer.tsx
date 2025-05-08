import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CartItem } from "./FloatingCartButton";

interface ShoppingCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  totalPrice: number;
}

export default function ShoppingCartDrawer({
  isOpen,
  onClose,
  cartItems,
  removeFromCart,
  updateQuantity,
  totalPrice,
}: ShoppingCartDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/70" onClick={onClose}></div>
      <div className="fixed right-0 top-0 h-full w-full max-w-md overflow-auto bg-zinc-900/95 p-6 backdrop-blur-md border-l border-gold-400/20 shadow-gold-lg">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-8 h-1 bg-gold-400 mr-3"></div>
            <h2 className="text-2xl font-bold bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
              Your Cart
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-zinc-800 border border-gold-400/20 text-gold-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto mb-4 text-gold-400/50"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <p className="text-zinc-400 mb-6">Your cart is empty</p>
            <Button
              className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold"
              onClick={onClose}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 border-b border-zinc-700/50 pb-4"
                >
                  <Link
                    href={`/shop/${item.id}`}
                    className="h-16 w-16 overflow-hidden rounded-xl bg-zinc-800 border border-gold-400/10"
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
                    <p className="text-sm text-gold-400">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-6 w-6 rounded-full border border-zinc-600 flex items-center justify-center text-zinc-400 hover:bg-zinc-800 hover:text-gold-400 hover:border-gold-400"
                    >
                      -
                    </button>
                    <span className="text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-6 w-6 rounded-full border border-zinc-600 flex items-center justify-center text-zinc-400 hover:bg-zinc-800 hover:text-gold-400 hover:border-gold-400"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-zinc-500 hover:text-gold-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl border border-gold-400/10">
                <span className="text-zinc-300">Total</span>
                <span className="text-xl font-bold bg-gold-gradient from-gold-300 to-gold-500 bg-clip-text text-transparent">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <Link href="/checkout" className="block w-full">
                <Button className="w-full bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold py-6">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
