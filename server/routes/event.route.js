import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";
import { adminOnly } from "../middleware/adminOnly.js";

const router = express.Router();

router
  .route("/")
  .get(getEvents) // Public: Fetch all events
  .post(verifyToken, adminOnly, createEvent); // Admin only

router
  .route("/:id")
  .get(getEventById) // Public: Fetch single event
  .put(verifyToken, adminOnly, updateEvent) // Admin only
  .delete(verifyToken, adminOnly, deleteEvent); // Admin only

export default router;
