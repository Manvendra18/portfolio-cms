import { Router } from "express";
import { getProjects, createProject, updateProject, deleteProject } from "../controllers/project.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getProjects);
router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

export default router;