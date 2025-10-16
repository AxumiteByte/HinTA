import express from "express";
import {
  createProgram,
  getPrograms,
  getProgramById,
  updateProgram,
  deleteProgram,
} from "../controllers/program.controller.js";

import { verifyToken } from "../middleware/verifyToken.js"; // <-- import this
import { adminOnly } from "../middleware/adminOnly.js";

const router = express.Router();

router.get("/", getPrograms);
router.get("/:id", getProgramById);

// Protect admin routes with both verifyToken and adminOnly
router.post("/", verifyToken, adminOnly, createProgram);
router.put("/:id", verifyToken, adminOnly, updateProgram);
router.delete("/:id", verifyToken, adminOnly, deleteProgram);

export default router;
