import express from "express";
import {
  createSeats,
  getSeatsByAirline,
  updateSeatAvailability,
} from "../controllers/seatController.js";

const router = express.Router();

// POST /api/seats/create
router.post("/create", createSeats);

// GET /api/seats/:airline
router.get("/:airline", getSeatsByAirline);

// PATCH /api/seats/update
router.patch("/update", updateSeatAvailability);

export default router;
