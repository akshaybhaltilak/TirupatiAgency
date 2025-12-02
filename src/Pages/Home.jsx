import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Users,
  Shield,
  Clock,
  Award,
  ArrowRight,
  Calculator,
  MessageCircle,
  ChevronRight,
  Check,
  TrendingUp,
  Sparkles,
  Home as HomeIcon,
  Phone,
  Menu,
  X
} from 'lucide-react';
import BankMarquee from '../Components/BankMarquee';
import BannerSlider from '../Components/BannerSlider';
import EmiCalculator from '../Components/EmiCalculator';
import loanDetails from '../data/loanDetails.json';

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeTab, setActiveTab] = useState('loans');
  const [showWhatsApp, setShowWhatsApp] = useState(true);
  const [showEmiPopup, setShowEmiPopup] = useState(false);
  const [isNavSticky, setIsNavSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const emiPrefill = useMemo(() => ({ amount: 500000, rate: 8.5, tenure: 60 }), []);
  const navRef = useRef(null);

  // Sticky navbar behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsNavSticky(true);
      } else {
        setIsNavSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Memoized services by category
  const { loanServices, mortgageServices, otherServices } = useMemo(() => {
    const services = Object.values(loanDetails);
    return {
      loanServices: services.filter(service => service.category === 'loan'),
      mortgageServices: services.filter(service => service.category === 'mortgage'),
      otherServices: services.filter(service => service.category === 'service')
    };
  }, []);

  // Stats with enhanced design
  const stats = useMemo(() => [
    { 
      number: "10+", 
      label: "Years Experience", 
      icon: Clock,
      color: "text-orange-500"
    },
    { 
      number: "5000+", 
      label: "Happy Customers", 
      icon: Users,
      color: "text-amber-500"
    },
    { 
      number: "15+", 
      label: "Loan Products", 
      icon: Award,
      color: "text-yellow-500"
    },
    { 
      number: "100%", 
      label: "Trust & Safety", 
      icon: Shield,
      color: "text-red-500"
    }
  ], []);

  // Icons mapping
  const customIcons = useMemo(() => ({
    "home-loan-flat-purchase": "https://cdn-icons-gif.flaticon.com/15586/15586092.gif",
    "home-loan-house-purchase": "https://cdn-icons-gif.flaticon.com/16677/16677925.gif",
    "home-loan-construction": "https://cdn-icons-gif.flaticon.com/15586/15586068.gif",
    "plot-purchase-loan": "https://cdn-icons-gif.flaticon.com/19020/19020075.gif",
    "takeover-topup-loan": "https://cdn-icons-gif.flaticon.com/15576/15576128.gif",
    "loan-against-property": "https://cdn-icons-gif.flaticon.com/17489/17489766.gif",
    "education-loan": "https://cdn-icons-gif.flaticon.com/12743/12743767.gif",
    "project-loan": "https://cdn-icons-gif.flaticon.com/19032/19032720.gif",
    "machine-loan": "https://cdn-icons-gif.flaticon.com/16158/16158485.gif",
    "doctor-loan": "https://cdn-icons-gif.flaticon.com/13099/13099871.gif",
    "mortgage-registration": "https://cdn-icons-gif.flaticon.com/19035/19035067.gif",
    "equitable-mortgage": "https://cdn-icons-gif.flaticon.com/12420/12420695.gif",
    "search-report": "https://cdn-icons-gif.flaticon.com/19018/19018144.gif",
    "valuation-report": "https://cdn-icons-gif.flaticon.com/19013/19013048.gif",
    "estimate-cross-verification": "https://cdn-icons-gif.flaticon.com/19028/19028420.gif",
    "construction-estimate": "https://cdn-icons-gif.flaticon.com/12420/12420719.gif",
    "ferfar-download": "https://cdn-icons-gif.flaticon.com/19021/19021456.gif",
    "property-card": "https://cdn-icons-gif.flaticon.com/14099/14099167.gif",
    "charge-creation": "https://cdn-icons-gif.flaticon.com/16678/16678014.gif",
    "electric-bill-transfer": "https://cdn-icons-gif.flaticon.com/16438/16438892.gif",
    "leave-license": "https://cdn-icons-gif.flaticon.com/15586/15586082.gif"
  }), []);

  const getCustomIcon = useCallback(
    (serviceId) => customIcons[serviceId] || "https://cdn-icons-png.flaticon.com/128/10307/10307931.png",
    [customIcons]
  );

  // Search handling
  const handleSearch = useCallback((e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length > 1) {
      const filtered = Object.values(loanDetails).filter(service =>
        service.name.toLowerCase().includes(query) ||
        service.marathiName.toLowerCase().includes(query) ||
        (service.description || '').toLowerCase().includes(query)
      );
      setSuggestions(filtered.slice(0, 6));
    } else {
      setSuggestions([]);
    }
  }, []);

  const handleSuggestionClick = useCallback(
    (service) => {
      navigate(`/loan/${service.id}`);
      setSearchQuery('');
      setSuggestions([]);
    },
    [navigate]
  );

  // Active services
  const activeServices = useMemo(() => {
    switch (activeTab) {
      case 'loans': return loanServices;
      case 'mortgage': return mortgageServices;
      case 'services': return otherServices;
      default: return loanServices;
    }
  }, [activeTab, loanServices, mortgageServices, otherServices]);

  const tabs = useMemo(() => [
    { 
      id: 'loans', 
      name: 'Loan Products', 
      count: loanServices.length,
      color: 'text-orange-600'
    },
    { 
      id: 'mortgage', 
      name: 'Mortgage Services', 
      count: mortgageServices.length,
      color: 'text-amber-600'
    },
    { 
      id: 'services', 
      name: 'Other Services', 
      count: otherServices.length,
      color: 'text-yellow-600'
    }
  ], [loanServices.length, mortgageServices.length, otherServices.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-amber-50 text-gray-800">
      {/* Sticky Navigation Bar */}
    

      {/* HERO Section */}
      <BannerSlider/>
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <BannerSlider services={[
          {
            title: "Home Loans",
            description: "Get your dream home with attractive interest rates starting from 8.5% with flexible tenure up to 30 years",
            icon: "🏠",
            gradient: "bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600",
            features: ["Lowest Interest Rates", "Quick Processing", "Minimal Documentation", "Balance Transfer"],
            ctaText: "Apply Now"
          },
          {
            title: "Business Loans",
            description: "Grow your business with flexible financing up to ₹5 Crores for expansion, working capital, or equipment",
            icon: "💼",
            gradient: "bg-gradient-to-r from-amber-600 to-orange-600",
            features: ["Collateral Free Options", "Digital Processing", "24-48 Hour Approval", "Customized Plans"],
            ctaText: "Explore Loans"
          },
          {
            title: "Education Loans",
            description: "Invest in your future with 100% finance for higher education in India and abroad",
            icon: "🎓",
            gradient: "bg-gradient-to-r from-yellow-600 to-amber-600",
            features: ["Cover Tuition & Living", "Moratorium Period", "Tax Benefits", "Co-applicant Options"],
            ctaText: "Learn More"
          }
        ]} />
      </section> */}

      <BankMarquee />

      {/* Search Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-semibold text-orange-700">Quick Search</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Find Your Perfect <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Financial Solution</span>
          </h2>
          <p className="text-gray-600">
            Search from our wide range of loan products and services
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl blur opacity-10"></div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for loans, services, or type in मराठी..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-orange-200 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 bg-white text-sm shadow-sm"
            />
          </div>

          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-orange-200 rounded-b-xl shadow-lg mt-1 z-50 max-h-64 overflow-y-auto">
              {suggestions.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleSuggestionClick(service)}
                  className="px-4 py-3 cursor-pointer flex items-center gap-3 hover:bg-orange-50 transition border-b border-orange-50 last:border-0"
                >
                  <img src={getCustomIcon(service.id)} className="w-8 h-8 rounded" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{service.name}</div>
                    <div className="text-xs text-gray-500">{service.marathiName}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-orange-400" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-50 to-amber-50 mb-4">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm font-medium text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Services Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Our <span className="text-orange-600">Financial Services</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive financial solutions tailored to meet your specific needs
          </p>
        </div>

        {/* Simple Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-300'
              }`}
            >
              {tab.name} ({tab.count})
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeServices.map((service) => {
            const iconUrl = getCustomIcon(service.id);

            return (
              <div
                key={service.id}
                onClick={() => navigate(`/loan/${service.id}`)}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center flex-shrink-0">
                    <img src={iconUrl} alt={service.name} className="w-8 h-8 object-contain" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{service.name}</h3>
                    <p className="text-sm text-gray-500">{service.marathiName}</p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

                {/* Simple Info Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.maxAmount && (
                    <span className="text-xs px-2 py-1 bg-orange-50 text-orange-700 rounded">
                      Max: {service.maxAmount}
                    </span>
                  )}
                  {service.tenure && (
                    <span className="text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded">
                      Tenure: {service.tenure}
                    </span>
                  )}
                  {service.duration && (
                    <span className="text-xs px-2 py-1 bg-yellow-50 text-yellow-700 rounded">
                      {service.duration}
                    </span>
                  )}
                </div>

                <button
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-medium hover:shadow-md transition"
                  onClick={(e) => { e.stopPropagation(); navigate(`/loan/${service.id}`); }}
                >
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {activeServices.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto rounded-full bg-orange-50 flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600">Try searching or browse other categories</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Need Financial Assistance?</h2>
          <p className="text-orange-100 text-lg mb-8">
            Our experts are ready to guide you through the process with personalized solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/apply" 
              className="px-8 py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition flex items-center gap-2"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a 
              href="tel:9850366753"
              className="px-8 py-3 border-2 border-white/30 text-white font-bold rounded-lg hover:bg-white/10 transition flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call: 9850366753
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>Transparent Process</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>Quick Approvals</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>Local Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
        <a
          href="https://wa.me/919850366753"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>

        <button
          onClick={() => setShowEmiPopup(true)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg hover:shadow-xl hover:scale-105 transition"
          title="EMI Calculator"
        >
          <Calculator className="w-6 h-6" />
        </button>
      </div>

      {/* EMI Calculator Popup */}
      <EmiCalculator
        visible={showEmiPopup}
        onClose={() => setShowEmiPopup(false)}
        initialAmount={emiPrefill.amount}
        initialRate={emiPrefill.rate}
        initialTenure={emiPrefill.tenure}
      />
    </div>
  );
}

export default Home;