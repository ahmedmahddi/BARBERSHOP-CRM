import { Request, Response, NextFunction } from "express";
import { ProductsService } from "./products.service";
import { CreateProductDto, UpdateProductDto } from "./products.dto";

const productsService = new ProductsService();

/** Get all products */
export async function getProducts(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const products = await productsService.getAllProducts();
    res.json({ data: products });
  } catch (err) {
    next(err);
  }
}

/** Get product by ID */
export async function getProductById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const product = await productsService.getProductById(id);
    res.json({ data: product });
  } catch (err) {
    next(err);
  }
}

/** Create a new product */
export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const dto: CreateProductDto = req.body;
    const product = await productsService.createProduct(dto);
    res.status(201).json({ data: product });
  } catch (err) {
    next(err);
  }
}

/** Update an existing product */
export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const dto: UpdateProductDto = req.body;
    const product = await productsService.updateProduct(id, dto);
    res.json({ data: product });
  } catch (err) {
    next(err);
  }
}

/** Delete a product */
export async function deleteProduct(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    await productsService.deleteProduct(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

/** Update product stock */
export async function updateProductStock(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (typeof quantity !== "number") {
      res.status(400).json({ error: "Quantity must be a number" });
      return;
    }

    const product = await productsService.updateProductStock(id, quantity);
    res.json({ data: product });
  } catch (err) {
    next(err);
  }
}
