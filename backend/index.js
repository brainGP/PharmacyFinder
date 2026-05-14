import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes.js";
import pharmacyRoutes from "./routes/pharmacyRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import adRoutes from "./routes/adRoutes.js";
import discountRoutes from "./routes/discountRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/pharmacies", pharmacyRoutes);
app.use("/api/products", productRoutes);
app.use("/api/ads", adRoutes);
app.use("/api/discounts", discountRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ error: "Server Error" });
});

if (!MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI is not defined.");
  process.exit(1);
}

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
