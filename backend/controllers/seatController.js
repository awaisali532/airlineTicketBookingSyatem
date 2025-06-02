import Seat from "../models/Seat.js";

// Create seats in bulk
export const createSeats = async (req, res) => {
  try {
    const { airline, seats } = req.body;

    // Add airline to each seat object
    const seatsWithAirline = seats.map((seat) => ({
      ...seat,
      airline,
    }));

    const createdSeats = await Seat.insertMany(seatsWithAirline);
    res.status(201).json(createdSeats);
  } catch (error) {
    res.status(500).json({ error: "Failed to create seats", details: error });
  }
};

// Get all seats for a specific airline
export const getSeatsByAirline = async (req, res) => {
  try {
    const { airline } = req.params;
    const seats = await Seat.find({ airline });
    res.status(200).json(seats);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch seats" });
  }
};

// Update seat availability
export const updateSeatAvailability = async (req, res) => {
  try {
    const { seatNumber, airline } = req.body;
    const seat = await Seat.findOneAndUpdate(
      { seatNumber, airline },
      { isAvailable: false },
      { new: true }
    );
    res.status(200).json(seat);
  } catch (err) {
    res.status(500).json({ error: "Failed to update seat" });
  }
};
