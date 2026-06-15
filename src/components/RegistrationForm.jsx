import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // #region agent log
    fetch('http://127.0.0.1:7286/ingest/63d9a51f-c999-40b7-a920-6d161500def8',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'89d76c'},body:JSON.stringify({sessionId:'89d76c',location:'RegistrationForm.jsx:handleSubmit:entry',message:'Form submit started',data:{hasName:!!name,hasEmail:!!email,phoneLen:phone?.length},timestamp:Date.now(),hypothesisId:'E'})}).catch(()=>{});
    // #endregion

    if (!name || !email || !phone) {
      toast.error("All fields are required");
      return;
    }

    if (phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      // #region agent log
      fetch('http://127.0.0.1:7286/ingest/63d9a51f-c999-40b7-a920-6d161500def8',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'89d76c'},body:JSON.stringify({sessionId:'89d76c',location:'RegistrationForm.jsx:handleSubmit:pre-request',message:'Validation passed, sending POST',data:{url:'/api/enquiry'},timestamp:Date.now(),hypothesisId:'E'})}).catch(()=>{});
      // #endregion

      const response = await axios.post("/api/enquiry", {
        name,
        email,
        phone,
      });

      // #region agent log
      fetch('http://127.0.0.1:7286/ingest/63d9a51f-c999-40b7-a920-6d161500def8',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'89d76c'},body:JSON.stringify({sessionId:'89d76c',location:'RegistrationForm.jsx:handleSubmit:success',message:'API response received',data:{status:response?.status,success:response?.data?.success,contentType:response?.headers?.['content-type']},timestamp:Date.now(),hypothesisId:'B'})}).catch(()=>{});
      // #endregion

      toast.success("Registration successful! We'll contact you soon.");

      setName("");
      setEmail("");
      setPhone("");
    } catch (error) {
      console.error("Submission error:", error?.response?.data || error.message);
      // #region agent log
      const respData = error?.response?.data;
      const dataPreview = typeof respData === 'string' ? respData.slice(0,80) : respData;
      fetch('http://127.0.0.1:7286/ingest/63d9a51f-c999-40b7-a920-6d161500def8',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'89d76c'},body:JSON.stringify({sessionId:'89d76c',location:'RegistrationForm.jsx:handleSubmit:error',message:'API request failed',data:{status:error?.response?.status,contentType:error?.response?.headers?.['content-type'],dataPreview,errMessage:error?.message},timestamp:Date.now(),hypothesisId:'A,B,C'})}).catch(()=>{});
      // #endregion
      const errMsg = error?.response?.data?.error || error?.response?.data?.message || "Failed to submit form. Try again.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-100 py-16">
      <Toaster />

      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-8">
          Register Now
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border p-3 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border p-3 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Enter your phone number"
            className="w-full border p-3 rounded-lg"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default RegistrationForm;