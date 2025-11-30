// src/pages/Apply.jsx
import { useState } from "react";
import { Send } from "lucide-react";

export default function Apply() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    product: "",
    amount: "",
    consent: false,
  });

  // Loan Products (English + Marathi)
  const loanOptions = [
    { en: "Flat Purchase Loan", mr: "फ्लॅट खरेदी कर्ज" },
    { en: "House Purchase Loan", mr: "घर खरेदी कर्ज" },
    { en: "Construction Loan", mr: "बांधकाम कर्ज" },
    { en: "Plot Purchase Loan", mr: "प्लॉट खरेदी कर्ज" },
    { en: "Takeover Top-up Loan", mr: "टेकओव्हर टॉप-अप कर्ज" },
    { en: "Loan Against Property", mr: "मालमत्तेवरील कर्ज" },
    { en: "Education Loan", mr: "शैक्षणिक कर्ज" },
    { en: "Project Loan", mr: "प्रकल्प कर्ज" },
    { en: "Machine Loan", mr: "यंत्रसामग्री कर्ज" },
    { en: "Doctor Loan", mr: "डॉक्टर कर्ज" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // WhatsApp Submission
  const sendToWhatsApp = () => {
    const message = `
📌 *New Loan Application*
────────────────────
👤 *Name:* ${form.name}
📞 *Phone:* ${form.phone}
🏦 *Loan Type:* ${form.product}
💰 *Required Amount:* ₹${form.amount}
    `;

    const whatsappURL =
      "https://wa.me/919850366753?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.consent) {
      alert("Please agree to the terms before submitting.");
      return;
    }

    sendToWhatsApp();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-3">
          Apply for a Loan
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Fast approval • Trusted partner • Simple documentation
        </p>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 
                           focus:ring-orange-400 focus:outline-none bg-gray-50"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="Enter your mobile number"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 
                           focus:ring-orange-400 bg-gray-50"
              />
            </div>

            {/* Loan Type Dropdown */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Select Loan Type
              </label>
              <select
                name="product"
                value={form.product}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 
                           focus:ring-orange-400 bg-gray-50"
              >
                <option value="">Select Loan Type</option>
                {loanOptions.map((loan, i) => (
                  <option key={i} value={loan.en}>
                    {loan.en} — {loan.mr}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Loan Amount
              </label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                required
                placeholder="Enter required amount"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 
                           focus:ring-orange-400 bg-gray-50"
              />
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={handleChange}
                className="mt-1 w-5 h-5"
              />
              <p className="text-gray-700 text-sm leading-5">
                I agree that Tirupati Agencies can contact me regarding loan processing 
                and documentation.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-orange-600 
                         text-white py-3 rounded-xl text-lg font-semibold 
                         hover:bg-orange-700 transition-all shadow-md hover:shadow-lg"
            >
              <Send className="w-5 h-5" /> Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
