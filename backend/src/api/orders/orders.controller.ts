import { Request, Response, NextFunction } from "express";
import { OrdersService } from "./orders.service";
import {
  CreateOrderDto,
  UpdateOrderDto,
  UpdateOrderStatusDto,
} from "./orders.dto";

const ordersService = new OrdersService();

/** Get all orders */
export async function getOrders(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const orders = await ordersService.getAllOrders();
    res.json({ data: orders });
  } catch (err) {
    next(err);
  }
}

/** Get order by ID */
export async function getOrderById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const order = await ordersService.getOrderById(id);
    res.json({ data: order });
  } catch (err) {
    next(err);
  }
}

/** Create a new order */
export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const dto: CreateOrderDto = req.body;
    const order = await ordersService.createOrder(dto);
    res.status(201).json({ data: order });
  } catch (err) {
    next(err);
  }
}

/** Update an existing order */
export async function updateOrder(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const dto: UpdateOrderDto = req.body;
    const order = await ordersService.updateOrder(id, dto);
    res.json({ data: order });
  } catch (err) {
    next(err);
  }
}

/** Update order status */
export async function updateOrderStatus(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const dto: UpdateOrderStatusDto = req.body;
    const order = await ordersService.updateOrderStatus(id, dto);
    res.json({ data: order });
  } catch (err) {
    next(err);
  }
}

/** Delete an order */
export async function deleteOrder(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    await ordersService.deleteOrder(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
