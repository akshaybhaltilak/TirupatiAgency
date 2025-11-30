// src/pages/Contact.jsx
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Thank you! We will contact you shortly.");
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-10">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-5">
            <h2 className="text-xl font-semibold mb-2">Send Us a Message</h2>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full p-3 border rounded-lg"
            />

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Mobile Number"
              required
              className="w-full p-3 border rounded-lg"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your message..."
              rows="4"
              className="w-full p-3 border rounded-lg"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-gray-700 mb-2">📍 Akola, Maharashtra</p>
            <p className="text-gray-700 mb-2">📞 +91 98765 43210</p>
            <p className="text-gray-700 mb-6">📧 support@tirupatifinance.com</p>

            <iframe
              className="w-full h-64 rounded-xl shadow"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.6435576092356!2d77.003!3d19.123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA3JzI4LjIiTiA3N8KwMDAnMDcuMCJF!5e0!3m2!1sen!2sin!4v0000000000000"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}