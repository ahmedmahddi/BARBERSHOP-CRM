import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { type Product } from "@/lib/utils";

// Cart item type definition
export type CartItem = Product & {
  quantity: number;
};

interface FloatingCartButtonProps {
  cartItems: CartItem[];
  onClick: () => void;
}

export default function FloatingCartButton({
  cartItems,
  onClick,
}: FloatingCartButtonProps) {
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={onClick}
        className="relative flex items-center justify-center w-16 h-16 bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 rounded-full shadow-gold-lg transform transition-all duration-300 hover:scale-110 focus:outline-none animate-cart-pulse"
        aria-label="Open shopping cart"
      >
        <FontAwesomeIcon icon={faCartShopping} className="text-white text-xl" />
        {cartItems.length > 0 && (
          <div className="absolute -top-2 -right-2 bg-zinc-900 text-gold-400 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 border-gold-400 animate-glow">
            {totalItems}
          </div>
        )}
      </button>
    </div>
  );
}
