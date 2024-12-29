import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";
import bookRoutes from "./routes/books.js";

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://saurabhraturi2000:8882719082@cluster0.xr6gnmp.mongodb.net/bookstore"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
