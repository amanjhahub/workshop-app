import mongoose from "mongoose";

// MongoDB connection (ADD THIS)
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected");
};

// Model
const Enquiry =
  mongoose.models.Enquiry ||
  mongoose.model(
    "Enquiry",
    new mongoose.Schema(
      {
        name: String,
        email: String,
        phone: String
      },
      { timestamps: true }
    )
  );

// API handler
export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Only POST allowed" });
    }

    await connectDB(); // ✅ NOW THIS WORKS

    const { name, email, phone } = req.body;

    console.log("🔥 Request:", req.body);

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields required"
      });
    }

    const data = await Enquiry.create({ name, email, phone });

    return res.status(200).json({
      success: true,
      data
    });

  } catch (err) {
    console.log("❌ ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}