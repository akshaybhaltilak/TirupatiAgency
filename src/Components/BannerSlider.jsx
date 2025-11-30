import React, { useState, useEffect,index } from 'react';
import { Link } from 'react-router-dom';

function BannerSlider() {
  const banners = [
    {
      id: 1,
      title: "Quick Loan Approval in Akola",
      subtitle: "24 hours approval with minimal documentation",
      image: "https://wallpapers.com/images/hd/black-white-business-wy7d5euvlnrz2swe.jpg",
      cta: "Apply Now",
      link: "/apply"
    },
    {
      id: 2,
      title: "Lowest Interest Rates",
      subtitle: "Competitive rates starting from 10.5% for all loans",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      cta: "Check Rates",
      link: "/services"
    },
    {
      id: 3,
      title: "Trusted by 5000+ Customers",
      subtitle: "Join our satisfied customers across Maharashtra",
      image: "https://images.pexels.com/photos/5491023/pexels-photo-5491023.jpeg",
      cta: "Learn More",
      link: "/about"
    }
  ];

  const [currentBanner, setCurrentBanner] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-sm border border-gray-200">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentBanner 
              ? 'opacity-100 translate-x-0' 
              : index < currentBanner 
                ? 'opacity-0 -translate-x-full' 
                : 'opacity-0 translate-x-full'
          }`}
        >
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${banner.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 text-white h-full flex items-center">
            <div className={`px-6 md:px-12 max-w-2xl transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <h2 className="text-2xl md:text-4xl font-bold mb-3 leading-tight">
                {banner.title}
              </h2>
              <p className="text-lg md:text-xl mb-6 opacity-90 leading-relaxed">
                {banner.subtitle}
              </p>
              <Link
                to={banner.link}
                className="inline-block bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {banner.cta}
              </Link>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Arrows */}
      {/* <button
        onClick={prevBanner}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextBanner}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button> */}
      
      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20 mt-5">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-5 h-1 rounded-full transition-all duration-300 ${
              index === currentBanner 
                ? 'bg-orange-500 scale-110 shadow-lg' 
                : 'bg-white/60 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div 
          className="h-full bg-orange-500 transition-all duration-1000 ease-linear"
          style={{ 
            width: index === currentBanner ? '100%' : '0%',
            transition: index === currentBanner ? 'width 5s linear' : 'none'
          }}
          key={currentBanner}
        />
      </div>
    </div>
  );
}

export default BannerSlider;