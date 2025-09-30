import express from "express";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";

//Connect database

dbConnect();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: `http://localhost:5173`,
    credentials: true,
  }),
);

// Route Mount
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.status(200).json({ msg: "test seccess" });
});
// app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);

export default app;
