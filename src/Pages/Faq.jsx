// src/pages/Faq.jsx
import { useState } from "react";

const faqs = [
  {
    q: "What documents are required to apply for a loan?",
    a: "Typically: ID proof (Aadhaar, PAN), address proof, income proof (salary slips or bank statements), and passport-size photos. Specific products may require property documents or business proof.",
  },
  {
    q: "How long does loan approval take?",
    a: "Approval time varies by product. Gold loans can be instant (within hours), while personal/business loans usually take 1–3 business days after document verification.",
  },
  {
    q: "What are the interest rates?",
    a: "Interest rates depend on the product and your credit profile. Typical ranges are shown on the product pages (e.g., personal loans 12–24% p.a., gold loans 9.5–13% p.a.). Contact our team for exact quotes.",
  },
  {
    q: "Can I prepay my loan?",
    a: "Yes — prepayment is allowed. Charges (if any) depend on the loan product and lender. Please consult your loan agreement or contact support for details.",
  },
  {
    q: "Do you offer business partnership / DSA programs?",
    a: "Yes — we have a Business Partner program with onboarding, training and lead support. Visit the Business Partner page to sign up or call our partner team.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  function toggle(i) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white rounded-xl shadow">
              <button
                onClick={() => toggle(i)}
                className="w-full text-left px-6 py-4 flex items-center justify-between"
              >
                <span className="font-medium">{f.q}</span>
                <span className="text-gray-500">{openIndex === i ? '−' : '+'}</span>
              </button>

              {openIndex === i && (
                <div className="px-6 pb-4 text-gray-700">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          Still have questions? <a href="/contact" className="text-blue-600">Contact our support team</a> or call <strong>+91 98765 43210</strong>.
        </div>
      </div>
    </div>
  );
}