// Components/BannerSlider.jsx
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Shield, 
  Clock, 
  Users, 
  Target, 
  ArrowRight, 
  CheckCircle,
  Home,
  Building,
  GraduationCap,
  Briefcase,
  FileText,
  Percent,
  Phone,
  Calculator
} from 'lucide-react';

const BannerSlider = ({ services = [], autoChangeInterval = 15000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Default professional services with single reliable image for each
  const defaultServices = [
    {
      id: 1,
      title: "Home Loans",
      description: "Get your dream home with competitive rates starting at 8.5% and flexible repayment up to 30 years.",
      icon: Home,
      features: ["Low Interest Rates", "Quick Processing", "Top-up Loans", "Balance Transfer"],
      stats: [
        { label: "Max Amount", value: "₹5 Crores" },
        { label: "Rate", value: "8.5%" },
        { label: "Processing", value: "3-5 Days" }
      ],
      ctaText: "Apply Now",
      color: "bg-gradient-to-r from-orange-600 to-amber-600",
      imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    },
    {
      id: 2,
      title: "Business Loans",
      description: "Grow your business with collateral-free loans up to ₹2 Crores, approved within 48 hours.",
      icon: Briefcase,
      features: ["Collateral Free", "Digital Process", "Flexible Tenure", "Quick Approval"],
      stats: [
        { label: "Max Amount", value: "₹2 Crores" },
        { label: "Tenure", value: "1-5 Years" },
        { label: "Approval", value: "48 Hours" }
      ],
      ctaText: "Get Loan",
      color: "bg-gradient-to-r from-blue-600 to-cyan-600",
      imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    },
    {
      id: 3,
      title: "Education Loans",
      description: "100% finance for higher education in India and abroad with flexible repayment options.",
      icon: GraduationCap,
      features: ["100% Finance", "Tax Benefits", "Moratorium Period", "Low Rates"],
      stats: [
        { label: "Coverage", value: "100%" },
        { label: "Max Limit", value: "₹50 Lakhs" },
        { label: "Processing", value: "5-7 Days" }
      ],
      ctaText: "Apply Now",
      color: "bg-gradient-to-r from-purple-600 to-pink-600",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    },
    {
      id: 4,
      title: "Loan Against Property",
      description: "Unlock your property's value for business or personal needs with high loan-to-value ratio.",
      icon: Building,
      features: ["High Loan Value", "Long Tenure", "Low Interest", "Multipurpose"],
      stats: [
        { label: "LTV Ratio", value: "Up to 70%" },
        { label: "Tenure", value: "15 Years" },
        { label: "Processing", value: "7-10 Days" }
      ],
      ctaText: "Check Eligibility",
      color: "bg-gradient-to-r from-emerald-600 to-teal-600",
      imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    },
    {
      id: 5,
      title: "Mortgage Services",
      description: "Professional mortgage registration, documentation and property verification services.",
      icon: FileText,
      features: ["Expert Guidance", "Fast Processing", "Online Tracking", "Legal Support"],
      stats: [
        { label: "Services", value: "50+" },
        { label: "Duration", value: "1-3 Days" },
        { label: "Success", value: "100%" }
      ],
      ctaText: "View Services",
      color: "bg-gradient-to-r from-red-600 to-orange-600",
      imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    }
  ];

  const enhancedServices = services.length > 0 ? services : defaultServices;

  // Reset image loaded state when slide changes
  useEffect(() => {
    setImgLoaded(false);
    
    // Preload next image
    const nextIndex = (currentSlide + 1) % enhancedServices.length;
    const nextService = enhancedServices[nextIndex];
    if (nextService.imageUrl) {
      const img = new Image();
      img.src = nextService.imageUrl;
    }
  }, [currentSlide, enhancedServices]);

  // Auto slide change with progress bar
  useEffect(() => {
    if (enhancedServices.length === 0 || isHovering) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % enhancedServices.length);
      setProgress(0);
    }, autoChangeInterval);

    // Update progress bar
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed % autoChangeInterval) / autoChangeInterval * 100;
      setProgress(newProgress);
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [enhancedServices.length, autoChangeInterval, isHovering, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % enhancedServices.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + enhancedServices.length) % enhancedServices.length);
    setProgress(0);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const currentService = enhancedServices[currentSlide];
  const Icon = currentService.icon;

  // Handle image error
  const handleImageError = (e) => {
    console.warn(`Image failed to load: ${currentService.imageUrl}`);
    // Use gradient background as fallback
    e.target.style.display = 'none';
    setImgLoaded(true);
  };

  // Mobile responsive breakpoints
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div 
      className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        {/* Gradient fallback */}
        <div 
          className={`absolute inset-0 ${currentService.color} transition-opacity duration-500 ${
            imgLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
        
        {/* Main Image */}
        <img
          src={currentService.imageUrl}
          alt={currentService.title}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          loading="eager"
          onLoad={() => setImgLoaded(true)}
          onError={handleImageError}
        />
        
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>

      {/* Content - Responsive Layout */}
      <div className="relative h-full flex items-center">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              {/* Left Content - Main Info */}
              <div className="text-white">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 backdrop-blur-sm border border-white/20">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-semibold">Featured Service</span>
                </div>

                {/* Title & Description */}
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 leading-tight">
                    {currentService.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-white/90 mb-4 sm:mb-6 max-w-2xl leading-relaxed">
                    {currentService.description}
                  </p>
                </div>

                {/* Stats Row - Responsive */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6 max-w-md">
                  {currentService.stats?.map((stat, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 border border-white/20">
                      <div className="text-xs sm:text-sm text-white/70 mb-1">{stat.label}</div>
                      <div className="text-base sm:text-lg font-bold text-white">{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* Features List - Stack on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6 max-w-xl">
                  {currentService.features?.slice(0, isMobile ? 2 : 4).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                      </div>
                      <span className="text-xs sm:text-sm text-white/95">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons - Stack on mobile */}
                {/* <div className="flex flex-col sm:flex-row gap-3">
                  <button className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md">
                    <span>{currentService.ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform" />
                  </button>
                  
                  <a 
                    href="tel:9850366753"
                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-medium hover:bg-white/20 transition border border-white/20"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Now</span>
                  </a>
                </div> */}
              </div>

              {/* Right Content - Why Choose Us (Hidden on mobile, shown on desktop) */}
              <div className="hidden lg:block">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 max-w-md ml-auto">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Why Choose Us?</h3>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {[
                      { icon: Shield, title: "Trusted Partner", desc: "10+ years in financial services" },
                      { icon: Clock, title: "Quick Processing", desc: "Fast approvals & minimal docs" },
                      { icon: Users, title: "Expert Support", desc: "Dedicated relationship manager" },
                      { icon: Percent, title: "Best Rates", desc: "Lowest interest rates" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-white/20 to-white/10 flex items-center justify-center flex-shrink-0 border border-white/20">
                          <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-base sm:text-lg mb-0.5 sm:mb-1">{item.title}</h4>
                          <p className="text-white/80 text-xs sm:text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Benefits Bar (Shown only on mobile) */}
      {isMobile && (
        <div className="absolute bottom-20 left-0 right-0 px-4">
          {/* <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-white" />
                <span className="text-xs text-white">Trusted</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-white" />
                <span className="text-xs text-white">Quick Process</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-white" />
                <span className="text-xs text-white">Expert Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-white" />
                <span className="text-xs text-white">Best Rates</span>
              </div>
            </div>
          </div> */}
        </div>
      )}

      {/* Navigation Controls - Responsive */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-4">
        <button
          onClick={prevSlide}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-sm hover:scale-110 border border-white/30 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Slide Dots - Responsive */}
        <div className="flex gap-2 sm:gap-3">
          {enhancedServices.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="group relative"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className={`w-8 h-1.5 sm:w-10 md:w-12 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}>
                {index === currentSlide && (
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </div>
              {/* Slide number tooltip on hover (desktop only) */}
              {!isMobile && (
                <div className={`absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-medium transition-all whitespace-nowrap ${
                  index === currentSlide 
                    ? 'text-white opacity-100' 
                    : 'text-white/50 opacity-0 group-hover:opacity-100'
                }`}>
                  {index + 1}
                </div>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-sm hover:scale-110 border border-white/30 shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Slide Counter - Responsive */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
        <div className="bg-white/20 backdrop-blur-md rounded-lg sm:rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 border border-white/30">
          <div className="text-white text-xs sm:text-sm font-semibold">
            <span className="text-lg sm:text-xl md:text-2xl">{currentSlide + 1}</span>
            <span className="text-white/70">/{enhancedServices.length}</span>
          </div>
        </div>
      </div>

      {/* Auto-play Indicator - Responsive */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20">
        <div className="bg-black/30 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-1.5">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isHovering ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
            <span className="text-[10px] sm:text-xs text-white font-medium">
              {isHovering ? 'Paused' : 'Auto'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Service Selector (Desktop only) */}
      {/* <div className="absolute bottom-4 left-4 z-20 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/20">
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/80 font-medium">Browse:</span>
            <div className="flex gap-1">
              {enhancedServices.slice(0, 3).map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => goToSlide(index)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                    index === currentSlide
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div> */}

      {/* Add loading spinner style */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BannerSlider;