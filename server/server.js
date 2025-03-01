import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import foodRouter from "./routes/food.route.js";
import userRouter from "./routes/user.route.js";
import { cartRouter } from "./routes/cart.route.js";

// App Config
dotenv.config();
const app = express();
const port = 4000;

// Middleware
app.use(cors()); // Allow all origins

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test API
app.get("/", (req, res) => {
  res.send("API working");
});

// Database Connection
connectDB();

// Routes
app.use("/api/food", foodRouter);
app.use("/auth", userRouter);
app.use("/cart", cartRouter);

app.use("/images", express.static("uploads"));

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
