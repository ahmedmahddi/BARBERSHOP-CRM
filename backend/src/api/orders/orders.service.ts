import { OrdersRepository } from "./orders.repository";
import { OrderWithItems, OrderItemCreate } from "./orders.types";
import {
  CreateOrderDto,
  UpdateOrderDto,
  UpdateOrderStatusDto,
  OrderItemDto,
} from "./orders.dto";
import { ProductsService } from "../products/products.service";
import { createError } from "../../core/error.middleware";

export class OrdersService {
  private repository: OrdersRepository;
  private productsService: ProductsService;

  constructor() {
    this.repository = new OrdersRepository();
    this.productsService = new ProductsService();
  }

  async getAllOrders(): Promise<OrderWithItems[]> {
    return this.repository.findAll();
  }

  async getOrderById(id: string): Promise<OrderWithItems> {
    return this.repository.findById(id);
  }

  async createOrder(dto: CreateOrderDto): Promise<OrderWithItems> {
    // Calculate total price
    let total = 0;

    // Convert DTO items to order items and validate products
    const orderItems: OrderItemCreate[] = [];

    for (const item of dto.items) {
      // Verify product exists and has sufficient stock
      const product = await this.productsService.getProductById(item.productId);

      if (product.stock < item.quantity) {
        throw createError(
          `Insufficient stock for product ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`,
          400
        );
      }

      // Add to total
      total += item.price * item.quantity;

      // Add to order items
      orderItems.push({
        product_id: item.productId,
        quantity: item.quantity,
        price: item.price,
      });

      // Update product stock
      await this.productsService.updateProductStock(
        item.productId,
        -item.quantity
      );
    }

    // Create order data
    const orderData = {
      customer_name: dto.customerName,
      customer_email: dto.customerEmail,
      customer_phone: dto.customerPhone || null,
      status: dto.status || "pending",
      total,
    };

    // Create order with items
    return this.repository.create(orderData, orderItems);
  }

  async updateOrder(id: string, dto: UpdateOrderDto): Promise<OrderWithItems> {
    const orderData = {
      ...(dto.customerName && { customer_name: dto.customerName }),
      ...(dto.customerEmail && { customer_email: dto.customerEmail }),
      ...(dto.customerPhone !== undefined && {
        customer_phone: dto.customerPhone,
      }),
      ...(dto.status && { status: dto.status }),
    };

    return this.repository.update(id, orderData);
  }

  async updateOrderStatus(
    id: string,
    dto: UpdateOrderStatusDto
  ): Promise<OrderWithItems> {
    return this.repository.update(id, { status: dto.status });
  }

  async deleteOrder(id: string): Promise<void> {
    // Get order with items before deleting
    const order = await this.repository.findById(id);

    // Delete the order
    await this.repository.delete(id);

    // Restore product stock for each item
    if (order.items) {
      for (const item of order.items) {
        await this.productsService.updateProductStock(
          item.product_id,
          item.quantity
        );
      }
    }
  }
}
