"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { mockProducts, type Product } from "@/lib/utils";

export default function ProductsPage() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleUpdateStock = (id: number, newStock: number) => {
    if (newStock < 0) return;

    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, stock: newStock } : product
      )
    );

    toast({
      title: "Stock Updated",
      description: `Product stock has been updated.`,
    });
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingProduct) return;

    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === editingProduct.id ? editingProduct : product
      )
    );

    toast({
      title: "Product Updated",
      description: `${editingProduct.name} has been updated.`,
    });

    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Math.max(...products.map(p => p.id), 0) + 1,
      name: "",
      description: "",
      price: 0,
      image: "/images/products/pomade.svg",
      stock: 0,
      sales: 0,
    };
    setEditingProduct(newProduct);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-1 bg-amber-400 mr-4"></div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
            Store Products
          </h2>
        </div>
        <Button
          onClick={handleAddProduct}
          className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-zinc-900 font-medium rounded-lg shadow-[0_0_10px_rgba(251,191,36,0.3)]"
        >
          Add New Product
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map(product => (
          <div
            key={product.id}
            className="rounded-xl border border-amber-400/20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 shadow-[0_0_15px_rgba(251,191,36,0.15)] overflow-hidden"
          >
            <div className="aspect-square overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10"></div>
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {product.name}
                </h3>
                <p className="text-sm text-zinc-400">{product.description}</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-amber-400">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm text-zinc-400">
                  Sales: {product.sales}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-zinc-300">
                    Stock: {product.stock}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 border-amber-400/30 text-amber-400 hover:bg-amber-400/10"
                      onClick={() =>
                        handleUpdateStock(product.id, product.stock - 1)
                      }
                    >
                      -
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 border-amber-400/30 text-amber-400 hover:bg-amber-400/10"
                      onClick={() =>
                        handleUpdateStock(product.id, product.stock + 1)
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
              <Button
                variant="default"
                className="w-full border-amber-400/30 text-white hover:bg-amber-400/10"
                onClick={() => handleEditProduct(product)}
              >
                Edit Product
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-amber-400/20 rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.2)] p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
              {editingProduct?.id ? "Edit Product" : "Add New Product"}
            </h3>
            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1 text-zinc-300"
                >
                  Product Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={editingProduct?.name ?? ""}
                  onChange={e =>
                    setEditingProduct(prev =>
                      prev ? { ...prev, name: e.target.value } : null
                    )
                  }
                  className="w-full rounded-md border border-amber-400/30 bg-zinc-800/80 px-4 py-2 text-sm text-white focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-1 text-zinc-300"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={editingProduct?.description ?? ""}
                  onChange={e =>
                    setEditingProduct(prev =>
                      prev ? { ...prev, description: e.target.value } : null
                    )
                  }
                  className="w-full rounded-md border border-amber-400/30 bg-zinc-800/80 px-4 py-2 text-sm text-white focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium mb-1 text-zinc-300"
                >
                  Price ($)
                </label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={editingProduct?.price ?? 0}
                  onChange={e =>
                    setEditingProduct(prev =>
                      prev
                        ? { ...prev, price: parseFloat(e.target.value) }
                        : null
                    )
                  }
                  className="w-full rounded-md border border-amber-400/30 bg-zinc-800/80 px-4 py-2 text-sm text-white focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium mb-1 text-zinc-300"
                >
                  Stock
                </label>
                <input
                  id="stock"
                  type="number"
                  min="0"
                  value={editingProduct?.stock ?? 0}
                  onChange={e =>
                    setEditingProduct(prev =>
                      prev ? { ...prev, stock: parseInt(e.target.value) } : null
                    )
                  }
                  className="w-full rounded-md border border-amber-400/30 bg-zinc-800/80 px-4 py-2 text-sm text-white focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="sales"
                  className="block text-sm font-medium mb-1 text-zinc-300"
                >
                  Total Sales
                </label>
                <input
                  id="sales"
                  type="number"
                  min="0"
                  value={editingProduct?.sales ?? 0}
                  onChange={e =>
                    setEditingProduct(prev =>
                      prev ? { ...prev, sales: parseInt(e.target.value) } : null
                    )
                  }
                  className="w-full rounded-md border border-amber-400/30 bg-zinc-800/80 px-4 py-2 text-sm text-white focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="border-amber-400/30 text-zinc-300 hover:bg-zinc-800"
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingProduct(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-zinc-900 font-medium rounded-lg shadow-[0_0_10px_rgba(251,191,36,0.3)]"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
