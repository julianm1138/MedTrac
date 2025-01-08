import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "your-default-mongodb-uri";
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

connectDB();

const medicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  schedule: { type: String, required: true },
});

const Medication = mongoose.model("Medication", medicationSchema);

// Routes
app.get("/api/medications", async (req, res) => {
  try {
    console.log(req);
    const medications = await Medication.find();
    res.json(medications);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.post("/api/medications", async (req, res) => {
  const { name, dosage, schedule } = req.body;
  try {
    const newMedication = new Medication({ name, dosage, schedule });
    await newMedication.save();
    res.status(201).json(newMedication);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.delete("/api/medications/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Medication.findByIdAndDelete(id);
    res.status(200).json({ message: "Medication successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleteing medication" });
    console.log(error);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
