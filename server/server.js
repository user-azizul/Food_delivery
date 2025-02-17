import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/food.route.js";

// app config

const app = express();
const port = 4000;

// middleware

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Api working");
});
// Database connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
// listen

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
