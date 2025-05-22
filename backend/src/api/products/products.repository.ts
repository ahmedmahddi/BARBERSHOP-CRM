import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../core/supabase.client";
import { Product, ProductInsert, ProductUpdate } from "./products.types";
import { createError } from "../../core/error.middleware";

export class ProductsRepository {
  async findAll(): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("name");

    if (error) {
      throw createError(`Failed to fetch products: ${error.message}`, 500);
    }

    return data as Product[];
  }

  async findById(id: string): Promise<Product> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        throw createError(`Product with ID ${id} not found`, 404);
      }
      throw createError(`Failed to fetch product: ${error.message}`, 500);
    }

    return data as Product;
  }

  async create(product: ProductInsert): Promise<Product> {
    const newProduct: ProductInsert = {
      ...product,
      id: uuidv4(),
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("products")
      .insert(newProduct)
      .select()
      .single();

    if (error) {
      throw createError(`Failed to create product: ${error.message}`, 500);
    }

    return data as Product;
  }

  async update(id: string, product: ProductUpdate): Promise<Product> {
    const updateData: ProductUpdate = {
      ...product,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("products")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        throw createError(`Product with ID ${id} not found`, 404);
      }
      throw createError(`Failed to update product: ${error.message}`, 500);
    }

    return data as Product;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      if (error.code === "PGRST116") {
        throw createError(`Product with ID ${id} not found`, 404);
      }
      throw createError(`Failed to delete product: ${error.message}`, 500);
    }
  }

  async updateStock(id: string, quantity: number): Promise<Product> {
    // First get current stock
    const { data: product, error: fetchError } = await supabase
      .from("products")
      .select("stock")
      .eq("id", id)
      .single();

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        throw createError(`Product with ID ${id} not found`, 404);
      }
      throw createError(
        `Failed to fetch product stock: ${fetchError.message}`,
        500
      );
    }

    const newStock = (product?.stock || 0) + quantity;

    if (newStock < 0) {
      throw createError(`Insufficient stock for product with ID ${id}`, 400);
    }

    const { data, error } = await supabase
      .from("products")
      .update({
        stock: newStock,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw createError(
        `Failed to update product stock: ${error.message}`,
        500
      );
    }

    return data as Product;
  }
}
