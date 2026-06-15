import mongoose from "mongoose";

// MongoDB connection
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  if (!process.env.MONGO_URI) {
    throw new Error(
      "MONGO_URI environment variable is not configured. Add it in Vercel Project Settings → Environment Variables."
    );
  }

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
/*export default async function handler(req, res) {
  try {
    // #region agent log
    fetch('http://127.0.0.1:7286/ingest/63d9a51f-c999-40b7-a920-6d161500def8',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'89d76c'},body:JSON.stringify({sessionId:'89d76c',location:'api/enquiry.js:handler:entry',message:'API handler invoked',data:{method:req.method,mongoUriSet:!!process.env.MONGO_URI,bodyType:typeof req.body,bodyKeys:req.body?Object.keys(req.body):[]},timestamp:Date.now(),hypothesisId:'A,B,C'})}).catch(()=>{});
    // #endregion

    if (req.method !== "POST") {
      return res.status(405).json({ message: "Only POST allowed" });
    }

    await connectDB(); // ✅ NOW THIS WORKS

    // #region agent log
    fetch('http://127.0.0.1:7286/ingest/63d9a51f-c999-40b7-a920-6d161500def8',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'89d76c'},body:JSON.stringify({sessionId:'89d76c',location:'api/enquiry.js:handler:post-connect',message:'MongoDB connect succeeded',data:{readyState:mongoose.connection.readyState},timestamp:Date.now(),hypothesisId:'A,D'})}).catch(()=>{});
    // #endregion

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

    // #region agent log
    fetch('http://127.0.0.1:7286/ingest/63d9a51f-c999-40b7-a920-6d161500def8',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'89d76c'},body:JSON.stringify({sessionId:'89d76c',location:'api/enquiry.js:handler:catch',message:'API handler error',data:{errorName:err?.name,errorMessage:err?.message,mongoUriSet:!!process.env.MONGO_URI},timestamp:Date.now(),hypothesisId:'A,D'})}).catch(()=>{});
    // #endregion

    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}*/
export default async function handler(req, res) {
  try {
    await connectDB();

    // GET → Admin page
    if (req.method === "GET") {
      const data = await Enquiry.find({});
      return res.status(200).json(data);
    }

    // POST → Form submit
    if (req.method === "POST") {
      const { name, email, phone } = req.body;

      if (!name || !email || !phone) {
        return res.status(400).json({
          success: false,
          message: "All fields required"
        });
      }

      const data = await Enquiry.create({ name, email, phone });

      return res.status(201).json({
        success: true,
        data
      });
    }
    if (req.method === "DELETE") {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID is required"
        });
      }

      const deleted = await Enquiry.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "Deleted successfully",
        deleted
      });
    }
        // DELETE → remove enquiry
    if (req.method === "DELETE") {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID is required"
        });
      }

      const deleted = await Enquiry.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "Deleted successfully",
        deleted
      });
    }

    return res.status(405).json({ message: "Method not allowed" });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}