import { useState } from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/buda bar 2.jpg";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await new Promise((res) => setTimeout(res, 1000));
      setStatus("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("Failed to send message, please try again.");
      throw error;
    }
  };

  return (
    <div className="relative h-screen">
      {/* Hero Section */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="max-w-3xl w-full mx-6 p-6 bg-[#f9fafa] rounded-lg shadow-[0_10px_25px_-5px_rgba(242,177,67,0.4)]">
          <Link to="/" className="text-[#f2b143] text-sm hover:underline">
            / HOME
          </Link>
          <h1 className="text-4xl font-bold mb-6 text-[#255876] text-center">
            Contact Us
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-300 mb-1 font-semibold"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
                className="w-full pl-3 pr-3 py-2 
                bg-[#d5d8d9] 
                rounded-lg border border-[#255876] 
                text-[#255876] placeholder-[#255876] 
                focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
                transition duration-200"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-300 mb-1 font-semibold"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                className="w-full pl-3 pr-3 py-2 
                bg-[#d5d8d9] 
                rounded-lg border border-[#255876] 
                text-[#255876] placeholder-[#255876] 
                focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
                transition duration-200"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-gray-300 mb-1 font-semibold"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Write your message here..."
                className="w-full pl-3 pr-3 py-2 
                bg-[#d5d8d9] 
                rounded-lg border border-[#255876] 
                text-[#255876] placeholder-[#255876] 
                focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
                transition duration-200"
              />
            </div>

            {status && (
              <p
                className={`text-center ${
                  status.includes("successfully")
                    ? "text-[#f2b143]"
                    : "text-red-500"
                }`}
              >
                {status}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#f2b143] text-[#255876] font-bold rounded-lg shadow-md hover:bg-[#d5d8d9] hover:text-[#255876] focus:outline-none focus:ring-2 focus:ring-[#f2b143] transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
