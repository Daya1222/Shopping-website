import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import oauthRoutes from "./routes/auth/oauthRoutes.js";
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
app.set("view engine", "ejs");
app.use(cookieParser());

// Route Mount
app.use("/api/auth", authRoutes);
app.use("/oauth", oauthRoutes);
app.use("/api/service", serviceRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);

export default app;
