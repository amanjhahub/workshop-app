import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

// Prevent multiple connections (VERY IMPORTANT in Vercel)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(MONGO_URI);
  isConnected = true;
}

// Schema
const EnquirySchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
  },
  { timestamps: true }
);

// Avoid model overwrite error in Vercel
const Enquiry =
  mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema);

export default async function handler(req, res) {
  try {
    await connectDB();

    // GET all enquiries
    if (req.method === "GET") {
      const data = await Enquiry.find().sort({ createdAt: -1 });
      return res.status(200).json(data);
    }

    // POST new enquiry
    if (req.method === "POST") {
      const newEnquiry = await Enquiry.create(req.body);
      return res.status(201).json(newEnquiry);
    }

    // DELETE enquiry
    if (req.method === "DELETE") {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ message: "ID required" });
      }

      await Enquiry.findByIdAndDelete(id);
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
}