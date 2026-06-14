import { useState } from "react";
import axios from "axios";
import toast,{ Toaster } from 'react-hot-toast';
function RegistrationForm() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);
const[error,setError]=useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if(!name || !email || !phone){
      toast.error("All fields are required");
      return;
    }
    if (phone.length !== 10) {
  toast.error("Phone number must contain exactly 10 digits.");
  return;
}
if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
toast.error("Please enter a valid email address.");
  return;
}
    setLoading(true);

    axios.post("/api/enquiry", {
  name,
  email,
  phone
})
    .then((response) => {
      setLoading(false);
  console.log(response.data);

toast.success(response.data.message);

  setName("");
  setEmail("");
  setPhone("");
})
    
    .catch((error) => {
      setLoading(false);
      console.error("Error:", error);
    });
  };

  return (
    <section className="bg-gray-100 py-16">
    <Toaster /> 

      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h2 className="text-3xl font-bold mb-8">
          Register Now
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

         <input
          type="text"
          placeholder="Enter your name"
        className="w-full border p-3 rounded-lg"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onFocus={() => setMessage("")}
/>

        <input
  type="email"
  placeholder="Enter your email"
  className="w-full border p-3 rounded-lg"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  onFocus={() => setMessage("")}
/>  

       <input
  type="tel"
  placeholder="Enter your phone number"
  className="w-full border p-3 rounded-lg"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  onFocus={() => setMessage("")}
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