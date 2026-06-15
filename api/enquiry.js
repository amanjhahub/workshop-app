import mongoose from "mongoose";

// 👇 FIX: safe CommonJS import inside ES module
import EnquiryModule from "../models/Enquiry.js";
const Enquiry = EnquiryModule || EnquiryModule.default;

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("MongoDB Connected");
};

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Only POST allowed" });
    }

    await connectDB();

    const { name, email, phone } = req.body;

    console.log("🔥 Request received:", req.body);

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const data = await Enquiry.create({ name, email, phone });

    return res.status(200).json({
      success: true,
      data
    });

  } catch (err) {
    console.log("❌ ERROR:", err.message);

    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}