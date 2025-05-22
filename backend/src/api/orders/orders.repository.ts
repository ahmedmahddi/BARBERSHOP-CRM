import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../core/supabase.client";
import {
  Order,
  OrderInsert,
  OrderUpdate,
  OrderItem,
  OrderItemInsert,
  OrderItemCreate,
  OrderWithItems,
  OrderItemWithProduct,
} from "./orders.types";
import { createError } from "../../core/error.middleware";

export class OrdersRepository {
  async findAll(): Promise<OrderWithItems[]> {
    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw createError(`Failed to fetch orders: ${error.message}`, 500);
    }

    // Get items for each order
    const ordersWithItems = await Promise.all(
      orders.map(async order => {
        const items = await this.findOrderItems(order.id);
        return { ...order, items };
      })
    );

    return ordersWithItems as OrderWithItems[];
  }

  async findById(id: string): Promise<OrderWithItems> {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        throw createError(`Order with ID ${id} not found`, 404);
      }
      throw createError(`Failed to fetch order: ${error.message}`, 500);
    }

    // Get order items
    const items = await this.findOrderItems(id);

    return { ...data, items } as OrderWithItems;
  }

  async create(
    order: OrderInsert,
    orderItems: OrderItemCreate[]
  ): Promise<OrderWithItems> {
    // Start a transaction
    const { error: txError } = await supabase.rpc("begin_transaction");
    if (txError) {
      throw createError(`Failed to start transaction: ${txError.message}`, 500);
    }

    try {
      // Insert order
      const newOrder: OrderInsert = {
        ...order,
        id: uuidv4(),
        created_at: new Date().toISOString(),
      };

      const { data: createdOrder, error: orderError } = await supabase
        .from("orders")
        .insert(newOrder)
        .select()
        .single();

      if (orderError) {
        await supabase.rpc("rollback_transaction");
        throw createError(`Failed to create order: ${orderError.message}`, 500);
      }

      // Insert order items
      const itemsWithOrderId = orderItems.map(item => ({
        ...item,
        id: uuidv4(),
        order_id: createdOrder.id,
        created_at: new Date().toISOString(),
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(itemsWithOrderId);

      if (itemsError) {
        await supabase.rpc("rollback_transaction");
        throw createError(
          `Failed to create order items: ${itemsError.message}`,
          500
        );
      }

      // Commit transaction
      const { error: commitError } = await supabase.rpc("commit_transaction");
      if (commitError) {
        await supabase.rpc("rollback_transaction");
        throw createError(
          `Failed to commit transaction: ${commitError.message}`,
          500
        );
      }

      // Get the created order with items
      return this.findById(createdOrder.id);
    } catch (error) {
      // Ensure transaction is rolled back
      await supabase.rpc("rollback_transaction");
      throw error;
    }
  }

  async update(id: string, order: OrderUpdate): Promise<OrderWithItems> {
    const updateData: OrderUpdate = {
      ...order,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("orders")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        throw createError(`Order with ID ${id} not found`, 404);
      }
      throw createError(`Failed to update order: ${error.message}`, 500);
    }

    // Get updated order with items
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    // Start a transaction
    const { error: txError } = await supabase.rpc("begin_transaction");
    if (txError) {
      throw createError(`Failed to start transaction: ${txError.message}`, 500);
    }

    try {
      // Delete order items first
      const { error: itemsError } = await supabase
        .from("order_items")
        .delete()
        .eq("order_id", id);

      if (itemsError) {
        await supabase.rpc("rollback_transaction");
        throw createError(
          `Failed to delete order items: ${itemsError.message}`,
          500
        );
      }

      // Delete order
      const { error } = await supabase.from("orders").delete().eq("id", id);

      if (error) {
        await supabase.rpc("rollback_transaction");
        if (error.code === "PGRST116") {
          throw createError(`Order with ID ${id} not found`, 404);
        }
        throw createError(`Failed to delete order: ${error.message}`, 500);
      }

      // Commit transaction
      const { error: commitError } = await supabase.rpc("commit_transaction");
      if (commitError) {
        await supabase.rpc("rollback_transaction");
        throw createError(
          `Failed to commit transaction: ${commitError.message}`,
          500
        );
      }
    } catch (error) {
      // Ensure transaction is rolled back
      await supabase.rpc("rollback_transaction");
      throw error;
    }
  }

  private async findOrderItems(
    orderId: string
  ): Promise<OrderItemWithProduct[]> {
    const { data, error } = await supabase
      .from("order_items")
      .select(
        `
        *,
        products:product_id (name, image_url)
      `
      )
      .eq("order_id", orderId);

    if (error) {
      throw createError(`Failed to fetch order items: ${error.message}`, 500);
    }

    // Transform data to include flattened product properties
    const itemsWithProduct = data.map(item => {
      const product = item.products as {
        name: string;
        image_url: string | null;
      };

      return {
        ...item,
        products: undefined,
        product_name: product?.name,
        product_image_url: product?.image_url,
      };
    });

    return itemsWithProduct as OrderItemWithProduct[];
  }
}
