import mongoose from "mongoose";

// MongoDB Schema
const EnquirySchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
  },
  { timestamps: true }
);

// Prevent model overwrite in dev
const Enquiry =
  mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema);

// DB connect function
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect(process.env.MONGO_URI);
};

export default async function handler(req, res) {
  await connectDB();

  // GET all enquiries
  if (req.method === "GET") {
    const data = await Enquiry.find();
    return res.status(200).json(data);
  }

  // POST enquiry
  if (req.method === "POST") {
    const { name, email, phone } = req.body;

    const newEnquiry = await Enquiry.create({
      name,
      email,
      phone,
    });

    return res.status(201).json({
      success: true,
      message: "Enquiry saved",
      data: newEnquiry,
    });
  }

  // DELETE enquiry
  if (req.method === "DELETE") {
    const { id } = req.query;

    await Enquiry.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  }

  res.status(405).json({ message: "Method not allowed" });
}