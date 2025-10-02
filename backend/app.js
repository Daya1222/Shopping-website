import express from "express";
import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";

//Connect database

dbConnect();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
// Route Mount
app.use("/api/auth", authRoutes);
app.use("/api/service", serviceRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);

export default app;
