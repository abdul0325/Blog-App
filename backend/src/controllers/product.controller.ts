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
      views,
      clicks,
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
        views,
        clicks,
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
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Search products
export const searchProducts = async (req: Request, res: Response) => {
  try {
    const { name, brand, category, tags, minPrice, maxPrice, rating } =
      req.query;

    // dynamic filter object
    const filters: any = {};

    if (name) {
      filters.name = { contains: String(name), mode: "insensitive" };
    }

    if (brand) {
      filters.brand = { contains: String(brand), mode: "insensitive" };
    }

    if (category) {
      filters.category = { contains: String(category), mode: "insensitive" };
    }

    if (tags) {
      // this will convert comma-separated string to array
      const tagArray = String(tags)
        .split(",")
        .map((tag) => tag.trim());
      filters.tags = { hasSome: tagArray };
    }

    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.gte = parseFloat(String(minPrice));
      if (maxPrice) filters.price.lte = parseFloat(String(maxPrice));
    }

    if (rating) {
      filters.rating = { gte: parseFloat(String(rating)) };
    }

    const products = await prisma.product.findMany({
      where: filters,
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!products.length) {
      return res.status(404).json({
        success: false,
        message: "No products found matching your criteria.",
      });
    }

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error: any) {
    console.error("Error searching products:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to search products",
      error: error.message,
    });
  }
};
