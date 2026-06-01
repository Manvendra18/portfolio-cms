import { Router } from "express";
import { getPosts, getAllPosts, getPostBySlug, createPost, updatePost, deletePost } from "../controllers/blog.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getPosts);
router.get("/all", protect, getAllPosts);
router.get("/:slug", getPostBySlug);
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

export default router;