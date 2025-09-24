const express = require(express)
const express = require("express");
const authRoutes = require("./routes/authRoutes.js");
const cors = require("cors");
const dbConnect = require("./config/dbConnect.js");

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
// app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);
