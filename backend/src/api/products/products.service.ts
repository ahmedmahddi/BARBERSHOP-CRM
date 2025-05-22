import { ProductsRepository } from "./products.repository";
import { Product } from "./products.types";
import { CreateProductDto, UpdateProductDto } from "./products.dto";
import { supabase } from "../../core/supabase.client";
import { createError } from "../../core/error.middleware";

export class ProductsService {
  private repository: ProductsRepository;

  constructor() {
    this.repository = new ProductsRepository();
  }

  async getAllProducts(): Promise<Product[]> {
    return this.repository.findAll();
  }

  async getProductById(id: string): Promise<Product> {
    return this.repository.findById(id);
  }

  async createProduct(dto: CreateProductDto): Promise<Product> {
    const productData = {
      name: dto.name,
      description: dto.description || null,
      price: dto.price,
      image_url: dto.imageUrl || null,
      stock: dto.stock,
    };

    return this.repository.create(productData);
  }

  async updateProduct(id: string, dto: UpdateProductDto): Promise<Product> {
    const productData = {
      ...(dto.name && { name: dto.name }),
      ...(dto.description !== undefined && { description: dto.description }),
      ...(dto.price !== undefined && { price: dto.price }),
      ...(dto.imageUrl !== undefined && { image_url: dto.imageUrl }),
      ...(dto.stock !== undefined && { stock: dto.stock }),
    };

    return this.repository.update(id, productData);
  }

  async deleteProduct(id: string): Promise<void> {
    // Check if product is used in any order items
    const { count, error } = await supabase
      .from("order_items")
      .select("*", { count: "exact", head: true })
      .eq("product_id", id);

    if (error) {
      throw createError(`Failed to check product usage: ${error.message}`, 500);
    }

    if (count && count > 0) {
      throw createError(
        `Cannot delete product with ID ${id} because it's used in ${count} orders`,
        400
      );
    }

    return this.repository.delete(id);
  }

  async updateProductStock(id: string, quantity: number): Promise<Product> {
    return this.repository.updateStock(id, quantity);
  }
}
