import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mogodb.js";
import authRouter from "./routes/authRoutes.js"; // Authentication routes
import userRouter from "./routes/userRoutes.js";
import flightRouter from "./routes/flightRoutes.js"; // Flight routes
import seatRoutes from "./routes/seatRoutes.js"; // Seat routes
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import paypalRoutes from "./routes/paypal.js";

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
//Api Endpoints
app.get("/", (req, res) => res.send("Api working"));
app.use("/api/auth", authRouter); // Authentication routes
app.use("/api/user", userRouter); // Authentication routes
app.use("/api/flight", flightRouter);
app.use("/api/seats", seatRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/paypal", paypalRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import userModel from "./models/userModel.js";
import bcrypt from "bcrypt";

// ❗ One-time admin creation route (delete after use)
app.get("/create-admin", async (req, res) => {
  try {
    const existingAdmin = await userModel.findOne({
      email: "admin@example.com",
    });
    if (existingAdmin) {
      return res.send("Admin already exists");
    }

    const hashedPassword = await bcrypt.hash("admin5321", 10);

    const admin = new userModel({
      name: "Admin",
      email: "adminAwais@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    res.send("✅ Admin created successfully");
  } catch (err) {
    res.status(500).send("❌ Error creating admin: " + err.message);
  }
});
