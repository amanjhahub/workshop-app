const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
console.log("ENV FILE CHECK");
console.log("MONGO_URI =", process.env.MONGO_URI);
console.log("ENV KEYS:", Object.keys(process.env));
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Enquiry = require("./models/Enquiry");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
console.log("MONGO_URI:", process.env.MONGO_URI);
// 🔥 MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB CONNECTION FAILED");
    console.log(err.message);
  });

// 🧪 Test Route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// 📩 CREATE Enquiry (SAVE DATA)
app.post("/api/enquiry", async (req, res) => {
  try {
    console.log("🔥 Request received:", req.body);

    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const newEnquiry = await Enquiry.create({
      name,
      email,
      phone
    });

    console.log("✅ Enquiry saved:", newEnquiry);

    return res.status(201).json({
      success: true,
      message: "Enquiry saved successfully",
      data: newEnquiry
    });

  } catch (error) {
    console.log("❌ ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

// 📊 GET ALL Enquiries
app.get("/api/enquiries", async (req, res) => {
  try {
    const data = await Enquiry.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🗑 DELETE Enquiry 
app.delete("/api/enquiry/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Enquiry.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found"
      });
    }

    res.json({
      success: true,
      message: "Enquiry deleted successfully"
    });

  } catch (error) {
    console.log("❌ DELETE ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

// 🚀 Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});