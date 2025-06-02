import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: ["Mr", "Mrs", "Miss", "Dr", "Prof", "Others"],
      required: true,
    },
    name: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    nationality: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    postalCode: { type: String, required: true },
    email: { type: String, required: true },
    mealType: {
      type: String,
      enum: ["Veg", "Non-Veg", "Vegan", "Kosher", "Halal", "None"],
      default: "None",
    },
    seatNumber: { type: String, required: true },
    classType: {
      type: String,
      enum: ["economy", "business", "first"],
      required: true,
    },
  },
  { _id: false }
);

export default passengerSchema;
