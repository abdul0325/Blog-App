import { Request, Response } from "express";
import prisma from "../config/prisma.config";

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      brand,
      category,
      price,
      stockQuantity,
      variants,
      rating,
      totalReviews,
      tags,
      authorId,
    } = req.body;

    // Basic validation
    if (!name || !price || !stockQuantity || !authorId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        brand,
        category,
        price: parseFloat(price),
        stockQuantity: parseInt(stockQuantity),
        variants,
        rating,
        totalReviews,
        tags,
        authorId,
      },
    });

    res.status(201).json({ success: true, data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all products
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: { author: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({ success: true, data: products });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { author: { select: { id: true, name: true, email: true } } },
    });

    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
