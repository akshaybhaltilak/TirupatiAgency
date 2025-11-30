// src/pages/Gallery.jsx
import { useState } from "react";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const awards = [
    {
      id: 1,
      title: "Best Financial Services Provider 2023",
      image: "/api/placeholder/400/300",
      description: "Awarded for excellence in customer service and loan processing",
      year: "2023"
    },
    {
      id: 2,
      title: "Top Performing Agency Award",
      image: "/api/placeholder/400/300",
      description: "Recognized for outstanding performance in loan disbursement",
      year: "2022"
    },
    {
      id: 3,
      title: "Customer Excellence Certificate",
      image: "/api/placeholder/400/300",
      description: "Certificate for maintaining highest customer satisfaction standards",
      year: "2023"
    },
    {
      id: 4,
      title: "Business Growth Achievement",
      image: "/api/placeholder/400/300",
      description: "Award for remarkable business growth and expansion",
      year: "2022"
    }
  ];

  const certificates = [
    {
      id: 1,
      title: "ISO 9001:2015 Certified",
      image: "/api/placeholder/400/300",
      description: "Quality Management System Certification",
      issuer: "International Standards Organization"
    },
    {
      id: 2,
      title: "RBI Registered NBFC",
      image: "/api/placeholder/400/300",
      description: "Registered with Reserve Bank of India",
      issuer: "Reserve Bank of India"
    },
    {
      id: 3,
      title: "MSME Registered",
      image: "/api/placeholder/400/300",
      description: "Government recognized MSME enterprise",
      issuer: "Ministry of MSME"
    },
    {
      id: 4,
      title: "Digital India Certified",
      image: "/api/placeholder/400/300",
      description: "Certified for digital transformation excellence",
      issuer: "Digital India Corporation"
    }
  ];

  const teamPhotos = [
    {
      id: 1,
      title: "Our Head Office Team",
      image: "/api/placeholder/400/300",
      description: "Dedicated team at our Akola head office"
    },
    {
      id: 2,
      title: "Branch Inauguration",
      image: "/api/placeholder/400/300",
      description: "Grand opening of our Yavatmal branch"
    },
    {
      id: 3,
      title: "Training Session",
      image: "/api/placeholder/400/300",
      description: "Team training for financial products"
    },
    {
      id: 4,
      title: "Customer Service Team",
      image: "/api/placeholder/400/300",
      description: "Our dedicated customer support staff"
    }
  ];

  const events = [
    {
      id: 1,
      title: "Financial Literacy Camp",
      image: "/api/placeholder/400/300",
      description: "Educating customers about financial planning",
      date: "March 2024"
    },
    {
      id: 2,
      title: "Loan Mela 2023",
      image: "/api/placeholder/400/300",
      description: "Special loan campaign event",
      date: "December 2023"
    },
    {
      id: 3,
      title: "Bank Partnership Meet",
      image: "/api/placeholder/400/300",
      description: "Meeting with partner bank officials",
      date: "January 2024"
    },
    {
      id: 4,
      title: "Community Outreach Program",
      image: "/api/placeholder/400/300",
      description: "Supporting local community initiatives",
      date: "February 2024"
    }
  ];

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent mb-6">
            Our Gallery & Achievements
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrating our journey, achievements, and the moments that define our commitment to excellence in financial services.
          </p>
        </div>

        {/* Awards Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Awards & Recognition</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Honored for our outstanding performance and commitment to customer satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {awards.map((award) => (
              <div 
                key={award.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden group cursor-pointer"
                onClick={() => openModal(award)}
              >
                <div className="h-48 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center relative overflow-hidden">
                  <div className="text-white text-6xl">🏆</div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-sm font-semibold">{award.year}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                    {award.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {award.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certificates Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Certifications</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Officially certified and recognized by regulatory bodies and industry organizations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certificates.map((certificate) => (
              <div 
                key={certificate.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden group cursor-pointer"
                onClick={() => openModal(certificate)}
              >
                <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center relative overflow-hidden">
                  <div className="text-white text-6xl">📜</div>
                  <div className="absolute bottom-4 left-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                    <span className="text-white text-sm font-semibold text-center block">
                      {certificate.issuer}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                    {certificate.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {certificate.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Photos Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated professionals who make Tirupati Finance a trusted name in financial services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamPhotos.map((photo) => (
              <div 
                key={photo.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden group cursor-pointer"
                onClick={() => openModal(photo)}
              >
                <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center relative overflow-hidden">
                  <div className="text-white text-6xl">👥</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {photo.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Events Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Events & Activities</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Engaging with communities and creating memorable experiences for our customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {events.map((event) => (
              <div 
                key={event.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden group cursor-pointer"
                onClick={() => openModal(event)}
              >
                <div className="h-48 bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center relative overflow-hidden">
                  <div className="text-white text-6xl">🎉</div>
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-sm font-semibold">{event.date}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-12 text-white shadow-2xl text-center">
          <h2 className="text-3xl font-bold mb-8">Our Journey in Numbers</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <p className="text-indigo-100">Years of Excellence</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <p className="text-indigo-100">Happy Customers</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">8+</div>
              <p className="text-indigo-100">Branches</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <p className="text-indigo-100">Awards & Recognitions</p>
            </div>
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">{selectedImage.title}</h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-gray-500 text-lg">Image: {selectedImage.title}</span>
                </div>
                <p className="text-gray-600 mb-4">{selectedImage.description}</p>
                {selectedImage.year && (
                  <p className="text-sm text-gray-500">Year: {selectedImage.year}</p>
                )}
                {selectedImage.issuer && (
                  <p className="text-sm text-gray-500">Issued by: {selectedImage.issuer}</p>
                )}
                {selectedImage.date && (
                  <p className="text-sm text-gray-500">Date: {selectedImage.date}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}