// models/Flightmodel.js
import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    required: true,
  },
  departureCity: {
    type: String,
    required: true,
  },
  arrivalCity: {
    type: String,
    required: true,
  },
  departureTime: {
    type: String,
    required: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  stops: {
    type: Number,
    required: true,
  },
  price: {
    adult: {
      type: Number,
      required: true,
    },
    child: {
      type: Number,
      required: true,
    },
    disabled: {
      type: Number,
      required: true,
    },
  },
  logo: {
    type: String,
    required: true,
  },
  fly: {
    type: String,
    required: true,
  },
  arive: {
    type: String,
    required: true,
  },
});

const Flight = mongoose.model("Flight", flightSchema);

export default Flight;
