const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes"); 

app.use(express.json());

app.use("/api/users", userRoutes);
app.use('/api/products', productRoutes);

app.get("/", (req, res) => {
    res.send("running");
});

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    });