import express from "express";
import {
  getAllDirectorate,
  getDirectorateById,
  createDirectorate,
  updateDirectorate,
  deleteDirectorate
} from "../controllers/directorate.controller.js";

const router = express.Router();

// CRUD routes
router.get("/", getAllDirectorate);
router.get("/:id", getDirectorateById);
router.post("/", createDirectorate);
router.put("/:id", updateDirectorate);
router.delete("/:id", deleteDirectorate);

export default router;
