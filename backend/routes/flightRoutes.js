// routes/flightRoutes.js
import express from "express";
import {
  addFlight,
  getFlights,
  updateFlight,
  deleteFlight,
} from "../controllers/flightController.js"; // Import controller functions

const router = express.Router();

// POST - Add new flight
router.post("/add", addFlight); // Use controller function
router.put("/update/:id", updateFlight);
router.delete("/delete/:id", deleteFlight);

// GET - Fetch all flights
router.get("/", getFlights); // Use controller function

export default router;
