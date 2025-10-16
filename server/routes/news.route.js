import express from "express";
import {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
} from "../controllers/news.controller.js";

const router = express.Router();

// CRUD routes
router.post("/", createNews);
router.get("/", getAllNews);
router.get("/:id", getNewsById);
router.put("/:id", updateNews);
router.delete("/:id", deleteNews);

export default router;
