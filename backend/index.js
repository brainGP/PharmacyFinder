import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;


app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ error: "Server Error" });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });
