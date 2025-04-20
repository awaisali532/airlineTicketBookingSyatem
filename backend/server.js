import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mogodb.js";
import authRouter from "./routes/authRoutes.js"; // Authentication routes
import userRouter from "./routes/userRoutes.js";
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);

const allowedOrigins = ["http://localhost:5173"];
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5174"],
    credentials: true,
  })
);
//Api Endpoints
app.get("/", (req, res) => res.send("Api working"));
app.use("/api/auth", authRouter); // Authentication routes
app.use("/api/user", userRouter); // Authentication routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
