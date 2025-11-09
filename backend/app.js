import dotenv from "dotenv";
dotenv.config(); // ✅ Load env first — before anything else

import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import oauthRoutes from "./routes/auth/oauthRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
import dbConnect from "./config/dbConnect.js";

// Connect to the database
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

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/oauth", oauthRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/product", productRoutes);
app.use("/api/images", imageRoutes);
// app.use("/api/order", orderRoutes);

const __dirname = path.resolve();
app.use(
    "/images",
    express.static(path.join(__dirname, process.env.IMAGE_DIR || "images")),
);

// app.use("/api/users", userRoutes);

export default app;
