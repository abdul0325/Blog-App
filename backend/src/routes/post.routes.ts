import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/post.controller";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// Create + Get all posts
router.route("/").post(protect, createPost).get(getAllPosts);

// Get single, update, delete
router
  .route("/:id")
  .get(getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

export default router;
