import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  searchProducts
} from "../controllers/product.controller";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/search", searchProducts);
router.get("/:id", getProductById);

export default router;
