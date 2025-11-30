import React from "react";

const About = () => {
  return (
    <div
      className="min-h-screen py-16 relative"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/34935407/pexels-photo-34935407.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center mb-20 animate-fadeIn">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            About <span className="text-orange-500">Tirupati Finance</span>
          </h1>
          <p className="text-gray-900 text-lg max-w-3xl mx-auto">
            A trusted name in Maharashtra for fast, transparent and customer-first loan assistance.
            Our goal is simple — make finance easy, accessible and stress-free for every family.
          </p>
        </div>

        {/* Section 1 — Our Story */}
        <div className="bg-white/65 rounded-3xl shadow-lg border border-gray-100 p-10 mb-16 animate-slideUp">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Our Story
          </h2>
          <p className="text-gray-900 text-lg leading-relaxed mb-4">
            Tirupati Finance was founded with one mission — <span className="font-bold text-orange-500">to bring honest, reliable and
              fast loan services</span> to the people of Maharashtra. For years, we have assisted
            individuals, salaried employees, business owners and families in achieving
            their financial goals without confusion, frustration or hidden charges.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            What sets us apart is our <span className="font-bold text-orange-500">human approach.</span> Every customer is treated like
            family. We explain every document, every term, every EMI plan in a simple
            language you fully understand — because trust is our first priority.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Today, with thousands of successful loan cases, Tirupati Finance has become a
            symbol of <span className="font-bold text-orange-500">transparency, support and professionalism</span> in the loan consulting industry.
          </p>
        </div>

        {/* Section 2 — Why We Are Trusted */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-12">
            Why Thousands Trust Tirupati Finance
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Fast Loan Assistance",
                desc: "Quick approval guidance with strong banking experience.",
                icon: "⚡",
              },
              {
                title: "Complete Transparency",
                desc: "We explain everything clearly — no hidden charges ever.",
                icon: "🔒",
              },
              {
                title: "Personal Guidance",
                desc: "Every customer gets 1-to-1 support throughout the process.",
                icon: "🤝",
              },
              {
                title: "Document Support",
                desc: "Perfectly prepared files increase chances of approval.",
                icon: "📑",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-white/65 p-8 rounded-2xl shadow-md border border-gray-100 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3 — Founder Story */}
        <div className="bg-white/65 rounded-3xl shadow-lg border border-gray-100 p-10 mb-20 animate-slideUp">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">
            Founder Story
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Tirupati Finance is led by <span className="font-bold text-orange-500">Vaibhav Khumkar</span>, a dedicated financial
            consultant with deep experience in loan systems, banking processes and
            documentation handling.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Coming from a strong academic background in commerce & finance, he built
            Tirupati Finance on the principles of <span className="font-bold text-orange-500">trust, simplicity and honesty</span>. His
            clear communication style and customer-friendly approach have helped thousands
            of families secure the right loan without tension.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            His vision is simple — make <span className="font-bold text-orange-500">loan assistance stress-free, quick and transparent</span>
            for everyone in Maharashtra.
          </p>
        </div>

        {/* Section 4 — Awards & Certificates (You will upload images later) */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-12">
            Awards & Certificates
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
              <div
                className="h-48 rounded-lg border w-auto border-gray-300 flex items-center justify-center text-gray-500"
              >
               <img src="/m1.jpeg" alt="" className="h-48 " />
              </div>

               <div
                className="h-48 rounded-lg border w-auto border-gray-300 flex items-center justify-center text-gray-500"
              >
               <img src="/m2.jpeg" alt="" className="h-48 " />
              </div>

               <div
                className="h-48 rounded-lg border w-auto border-gray-300 flex items-center justify-center text-gray-500"
              >
               <img src="/m3.jpeg" alt="" className="h-48 " />
              </div>
          </div>
        </div>

        {/* Section 5 — Branches */}
        <div className="bg-white/65 rounded-3xl shadow-lg border border-gray-100 p-10 mb-20 animate-slideUp">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">
            Our Branches
          </h2>
          <div className="space-y-4">
            {[
              "Akola – Main Branch (Tower Chowk)",
              "Murtizapur",
              "Patur",
              "Akot",
              "Washim",
              "Shegaon",
            ].map((branch, index) => (
              <p key={index} className="text-gray-700 text-lg font-semibold">
                {branch}
              </p>
            ))}
          </div>
        </div>

        {/* Section 6 — CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Need Loan Assistance?
          </h2>
          <p className="text-gray-600 mb-8">
            Call us anytime. Our team is ready to guide you step-by-step with clarity.
          </p>
          <a
            href="tel:9850366753"
            className="px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold shadow-md hover:bg-orange-600 transition-all"
          >
            Contact Now
          </a>
        </div>

      </div>
    </div>
  );
};

export default About;
