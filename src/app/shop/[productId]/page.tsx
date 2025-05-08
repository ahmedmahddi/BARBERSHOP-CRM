"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCartPlus,
  faStar,
  faShoppingBag,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useToast } from "@/components/ui/use-toast";
import { mockProducts, type Product } from "@/lib/utils";
import {
  FloatingCartButton,
  ShoppingCartDrawer,
  CartItem,
} from "@/components/cart";

// Extended product info for details page
interface ProductDetails extends Product {
  rating: number;
  reviews: number;
  category: string;
  inStock: boolean;
  details: {
    volume: string;
    ingredients: string[];
    instructions: string;
  };
  related: number[];
  discountPrice?: number;
}

// Mapping from product IDs to more detailed info
const PRODUCT_DETAILS: { [key: number]: Omit<ProductDetails, keyof Product> } =
  {
    1: {
      // Premium Hair Pomade
      rating: 4.7,
      reviews: 76,
      category: "styling",
      inStock: true,
      discountPrice: 15.99,
      details: {
        volume: "100g",
        ingredients: [
          "Beeswax",
          "Shea Butter",
          "Coconut Oil",
          "Essential Oils",
          "Vitamin E",
        ],
        instructions:
          "Apply a small amount to palms, rub together and work through dry or damp hair. Style as desired.",
      },
      related: [6, 8, 2],
    },
    2: {
      // Beard Oil
      rating: 4.9,
      reviews: 89,
      category: "beard",
      inStock: true,
      details: {
        volume: "50ml",
        ingredients: [
          "Jojoba Oil",
          "Argan Oil",
          "Vitamin E",
          "Essential Oils",
          "Almond Oil",
        ],
        instructions:
          "Apply 3-5 drops to palm, rub hands together, and massage into beard.",
      },
      related: [5, 7, 1],
    },
    3: {
      // Shaving Cream
      rating: 4.8,
      reviews: 64,
      category: "shaving",
      inStock: true,
      details: {
        volume: "150ml",
        ingredients: [
          "Water",
          "Stearic Acid",
          "Myristic Acid",
          "Potassium Hydroxide",
          "Coconut Oil",
        ],
        instructions:
          "Apply to wet face with a shaving brush in circular motions to create lather.",
      },
      related: [7, 4, 2],
    },
    4: {
      // Hair Scissors
      rating: 4.6,
      reviews: 52,
      category: "tools",
      inStock: true,
      details: {
        volume: "N/A",
        ingredients: ["Stainless Steel"],
        instructions:
          "Use to trim hair when dry. Clean after each use and oil pivot area occasionally.",
      },
      related: [1, 6, 8],
    },
    5: {
      // Beard Brush
      rating: 4.7,
      reviews: 58,
      category: "tools",
      inStock: true,
      details: {
        volume: "N/A",
        ingredients: ["Boar Bristle", "Beechwood Handle"],
        instructions:
          "Use daily to style beard and distribute oils evenly through facial hair.",
      },
      related: [2, 7, 3],
    },
    6: {
      // Styling Clay
      rating: 4.8,
      reviews: 72,
      category: "styling",
      inStock: true,
      details: {
        volume: "85g",
        ingredients: [
          "Bentonite Clay",
          "Beeswax",
          "Lanolin",
          "Essential Oils",
          "Kaolin Clay",
        ],
        instructions:
          "Apply small amount to palms and work through dry hair for best results.",
      },
      related: [1, 8, 4],
    },
    7: {
      // Aftershave Balm
      rating: 4.9,
      reviews: 108,
      category: "skincare",
      inStock: false,
      details: {
        volume: "100ml",
        ingredients: [
          "Witch Hazel",
          "Aloe Vera",
          "Glycerin",
          "Chamomile Extract",
          "Menthol",
        ],
        instructions: "Apply to face and neck after shaving.",
      },
      related: [3, 2, 6],
    },
    8: {
      // Styling Gel
      rating: 4.5,
      reviews: 62,
      category: "styling",
      inStock: true,
      discountPrice: 13.95,
      details: {
        volume: "250ml",
        ingredients: [
          "Water",
          "PVP",
          "VP/VA Copolymer",
          "Panthenol",
          "Glycerin",
          "Fragrance",
        ],
        instructions: "Apply to damp or dry hair. Style as desired.",
      },
      related: [1, 6, 4],
    },
  };

export default function ProductDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // Load cart items from localStorage
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }

    // Convert string productId to number for our mock data
    const productIdNum = parseInt(params.productId);
    if (isNaN(productIdNum)) {
      setLoading(false);
      return;
    }

    // Find the base product
    const baseProduct = mockProducts.find(p => p.id === productIdNum);

    if (baseProduct && PRODUCT_DETAILS[productIdNum]) {
      // Combine base product with extended details
      const fullProduct = {
        ...baseProduct,
        ...PRODUCT_DETAILS[productIdNum],
      };

      setProduct(fullProduct);

      // Get related products
      const related = mockProducts
        .filter(p => PRODUCT_DETAILS[productIdNum].related.includes(p.id))
        .slice(0, 3);

      setRelatedProducts(related);
    }

    setLoading(false);
  }, [params.productId]);

  const handleAddToCart = () => {
    if (!product) return;

    // Get existing cart or create new one
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if product already in cart
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.discountPrice || product.price,
        image: product.image,
        quantity: quantity,
        stock: product.stock, // Include stock for consistency
        description: product.description, // Include description for consistency
        sales: product.sales || 0, // Include sales for consistency
      });
    }

    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update local state
    setCartItems(cart);

    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart`,
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

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-800 text-white flex items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <div className="w-16 h-16 border-4 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="text-2xl font-bold bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
            Loading product...
          </h2>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-800 text-white flex items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <h2 className="text-3xl font-bold bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
            Product Not Found
          </h2>
          <p className="text-zinc-400 max-w-md mx-auto">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => router.push("/shop")}
            className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold"
          >
            Back to Shop
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
            {/* Back to shop link */}
            <Link
              href="/shop"
              className="inline-flex items-center text-gold-400 hover:text-gold-300 mb-8 group transition-colors"
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="mr-2 group-hover:-translate-x-1 transition-transform"
              />
              Back to shop
            </Link>

            {/* Product details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Product image */}
              <div className="relative rounded-2xl overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.discountPrice && (
                  <div className="absolute top-4 right-4 bg-gold-500 text-zinc-900 font-bold px-4 py-2 rounded-full">
                    SALE
                  </div>
                )}
              </div>

              {/* Product info */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center mb-2">
                    <p className="text-gold-400 text-sm uppercase tracking-wider">
                      {product.category}
                    </p>
                    <div className="flex items-center ml-auto">
                      <div className="text-gold-400 mr-2">
                        <FontAwesomeIcon icon={faStar} />
                      </div>
                      <p className="text-white text-sm">
                        {product.rating} ({product.reviews} reviews)
                      </p>
                    </div>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent mb-3">
                    {product.name}
                  </h1>
                  <p className="text-zinc-400 text-lg mb-6">
                    {product.description}
                  </p>
                  <div className="flex items-center mb-6">
                    {product.discountPrice ? (
                      <>
                        <p className="text-3xl font-bold text-white mr-3">
                          ${product.discountPrice.toFixed(2)}
                        </p>
                        <p className="text-xl line-through text-zinc-500">
                          ${product.price.toFixed(2)}
                        </p>
                      </>
                    ) : (
                      <p className="text-3xl font-bold text-white">
                        ${product.price.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Product details */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-gold-400/10 shadow-gold p-6">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-30"></div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-zinc-400">Volume</p>
                      <p className="text-white">{product.details.volume}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Key Ingredients</p>
                      <ul className="text-white list-disc list-inside">
                        {product.details.ingredients.map(
                          (ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                          )
                        )}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">How to Use</p>
                      <p className="text-white">
                        {product.details.instructions}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Add to cart */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    {product.inStock ? (
                      <div className="text-green-500 flex items-center text-sm">
                        <FontAwesomeIcon icon={faBoxOpen} className="mr-2" />
                        In Stock ({product.stock} available)
                      </div>
                    ) : (
                      <div className="text-red-500 flex items-center text-sm">
                        Out of Stock
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-zinc-900 rounded-lg flex items-center h-12">
                      <button
                        className="w-12 h-12 flex items-center justify-center text-xl text-zinc-400 hover:text-white"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-white">
                        {quantity}
                      </span>
                      <button
                        className="w-12 h-12 flex items-center justify-center text-xl text-zinc-400 hover:text-white"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <Button
                      className="flex-1 bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white h-12 px-6 !rounded-button shadow-gold"
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                    >
                      <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
                      Add to Cart
                    </Button>

                    <Button
                      className="bg-zinc-700 hover:bg-zinc-600 text-white h-12 !rounded-button shadow-md"
                      onClick={() => router.push("/checkout")}
                      disabled={!product.inStock}
                    >
                      <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Related products */}
            {relatedProducts.length > 0 && (
              <div className="mt-24">
                <h2 className="text-2xl font-bold bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent mb-8">
                  You may also like
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedProducts.map(relatedProduct => (
                    <Link
                      href={`/shop/${relatedProduct.id}`}
                      key={relatedProduct.id}
                      className="group"
                    >
                      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-gold-400/10 shadow-gold hover:border-gold-400/30 transition-colors">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-30"></div>
                        <div className="aspect-square">
                          <img
                            src={relatedProduct.image}
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-bold text-white">
                            {relatedProduct.name}
                          </h3>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-gold-400 font-bold">
                              $
                              {(
                                PRODUCT_DETAILS[relatedProduct.id]
                                  ?.discountPrice || relatedProduct.price
                              ).toFixed(2)}
                            </p>
                            <div className="flex items-center text-sm">
                              <FontAwesomeIcon
                                icon={faStar}
                                className="text-gold-400 mr-1"
                              />
                              <span className="text-zinc-400">
                                {PRODUCT_DETAILS[relatedProduct.id]?.rating ||
                                  4.5}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Floating Cart Button */}
      <FloatingCartButton
        cartItems={cartItems}
        onClick={() => setIsCartOpen(true)}
      />

      {/* Shopping Cart Drawer */}
      <ShoppingCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        totalPrice={totalPrice}
      />

      <Footer />
    </div>
  );
}
