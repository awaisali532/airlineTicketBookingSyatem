// controllers/flightController.js
import Flight from "../models/Flightmodel.js"; // ✅ Make sure file name matches exactly

// Controller to add a new flight
export const addFlight = async (req, res) => {
  try {
    const {
      airline,
      departureCity,
      arrivalCity,
      departureTime,
      arrivalTime,
      duration,
      stops,
      price,
      logo,
      fly,
      arive,
    } = req.body;

    // ✅ Basic validation
    if (
      !airline ||
      !departureCity ||
      !arrivalCity ||
      !departureTime ||
      !arrivalTime ||
      !duration ||
      stops === undefined ||
      !price ||
      !price.adult ||
      !logo
    ) {
      return res.status(400).json({ error: "Missing required flight fields" });
    }

    // ✅ Convert departureTime and arrivalTime to Date objects
    const flight = new Flight({
      airline,
      departureCity,
      arrivalCity,
      departureTime: new Date(departureTime), // Convert to Date object
      arrivalTime: new Date(arrivalTime), // Convert to Date object
      duration,
      stops,
      price,
      logo,
      fly,
      arive,
    });
    await flight.save();
    res.status(201).json({ message: "Flight added successfully", flight });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add flight", details: err.message });
  }
};

// Update flight by ID
export const updateFlight = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(id, req.body, {
      new: true, // return the updated document
      runValidators: true, // ensure schema rules apply
    });

    if (!updatedFlight) {
      return res.status(404).json({ error: "Flight not found" });
    }

    res.json({ message: "Flight updated successfully", flight: updatedFlight });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update flight", details: err.message });
  }
};
// Delete flight by ID
export const deleteFlight = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteFlight = await Flight.findByIdAndDelete(id);

    if (!deleteFlight) {
      return res.status(404).json({ error: "Flight not found" });
    }

    res.json({ message: "Flight Deleted successfully", flight: deleteFlight });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to Deleted flight", details: err.message });
  }
};

// Controller to get all flights
export const getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch flights", details: err.message });
  }
};

// Search flights based on user input
export const searchFlights = async (req, res) => {
  try {
    const { from, to, date } = req.body;

    if (!from || !to || !date) {
      return res.status(400).json({ error: "Missing search parameters" });
    }

    // Convert date string to Date object (and remove time part)
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const flights = await Flight.find({
      departureCity: { $regex: new RegExp(from, "i") },
      arrivalCity: { $regex: new RegExp(to, "i") },
      fly: { $gte: selectedDate, $lt: nextDay }, // match only that date
    });

    res.json(flights);
  } catch (err) {
    res.status(500).json({ error: "Search failed", details: err.message });
  }
};

// controllers/flightController.js

export const getAvailableCities = async (req, res) => {
  try {
    const flights = await Flight.find({}, "departureCity arrivalCity");
    const allCities = new Set();

    flights.forEach((flight) => {
      allCities.add(flight.departureCity);
      allCities.add(flight.arrivalCity);
    });

    res.json([...allCities]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cities" });
  }
};
