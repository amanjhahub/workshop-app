const mongoose = require("mongoose");
const Enquiry = require("../models/enquiry");

// MongoDB connection helper
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect(process.env.MONGO_URI);
};

module.exports = async (req, res) => {
  try {
    await connectDB();

    // CREATE (POST)
    if (req.method === "POST") {
      const { name, email, phone } = req.body;

      const newEnquiry = await Enquiry.create({
        name,
        email,
        phone,
      });

      return res.status(201).json({
        success: true,
        message: "Registration successful",
        data: newEnquiry,
      });
    }

    // GET
    if (req.method === "GET") {
      const data = await Enquiry.find().sort({ createdAt: -1 });
      return res.status(200).json(data);
    }

    return res.status(405).json({ message: "Method not allowed" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};