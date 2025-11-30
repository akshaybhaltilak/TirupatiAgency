import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Users,
  Shield,
  Clock,
  Award,
  ArrowRight
} from 'lucide-react';
import BankMarquee from '../Components/BankMarquee';
import BannerSlider from '../Components/BannerSlider';
import loanDetails from '../data/loanDetails.json';

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeTab, setActiveTab] = useState('loans');

  const [isSearchSticky, setIsSearchSticky] = useState(false);
  const searchWrapperRef = useRef(null);
  const stickySentinelRef = useRef(null);

  // ------------------------------
  // ⭐ REAL Sticky Behavior Using IntersectionObserver
  // ------------------------------
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSearchSticky(!entry.isIntersecting);
      },
      { threshold: 1 }
    );

    if (stickySentinelRef.current) {
      observer.observe(stickySentinelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // ------------------------------
  // Memoized services by category
  // ------------------------------
  const { loanServices, mortgageServices, otherServices } = useMemo(() => {
    const services = Object.values(loanDetails);
    return {
      loanServices: services.filter(service => service.category === 'loan'),
      mortgageServices: services.filter(service => service.category === 'mortgage'),
      otherServices: services.filter(service => service.category === 'service')
    };
  }, []);

  // ------------------------------
  // Stats
  // ------------------------------
  const stats = useMemo(() => [
    { number: "10+", label: "Years Experience", icon: Clock },
    { number: "5000+", label: "Happy Customers", icon: Users },
    { number: "15+", label: "Loan Products", icon: Award },
    { number: "100%", label: "Trust & Safety", icon: Shield }
  ], []);

  // ------------------------------
  // Icons
  // ------------------------------
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

  // ------------------------------
  // Search handling
  // ------------------------------
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

  // ------------------------------
  // Active services
  // ------------------------------
  const activeServices = useMemo(() => {
    switch (activeTab) {
      case 'loans': return loanServices;
      case 'mortgage': return mortgageServices;
      case 'services': return otherServices;
      default: return loanServices;
    }
  }, [activeTab, loanServices, mortgageServices, otherServices]);

  const tabs = useMemo(() => [
    { id: 'loans', name: 'Loan Products', count: loanServices.length },
    { id: 'mortgage', name: 'Mortgage Services', count: mortgageServices.length },
    { id: 'services', name: 'Other Services', count: otherServices.length }
  ], [loanServices.length, mortgageServices.length, otherServices.length]);

  // ------------------------------
  // UI Rendering
  // ------------------------------
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-4">
        <BannerSlider />
      </section>

      <BankMarquee />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6">

        {/* Invisible marker for sticky detection */}
        <div ref={stickySentinelRef}></div>

        {/* Search Wrapper */}
        <div
          ref={searchWrapperRef}
          className={`transition-all duration-300 mb-8 ${
            isSearchSticky
              ? "fixed top-0 left-0 right-0 bg-white z-50 shadow-md py-3"
              : ""
          }`}
        >
          <div className="max-w-4xl mx-auto">
            {!isSearchSticky && (
              <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                  Your Trusted Financial Partner in <span className="text-orange-600">Maharashtra</span>
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                  Practical loan solutions with transparent terms and fast local support. Select a category below or search to find the right product.
                </p>
              </div>
            )}

            {/* Search Bar */}
            <div className="relative mx-auto max-w-3xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search loans, services, keywords..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-200 focus:border-orange-300 bg-white text-sm shadow-sm"
              />

              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg mt-1 z-50 max-h-72 overflow-y-auto">
                  {suggestions.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleSuggestionClick(service)}
                      className="px-4 py-3 cursor-pointer flex items-center gap-3 hover:bg-gray-50 transition"
                    >
                      <img src={getCustomIcon(service.id)} className="w-8 h-8" />
                      <div className="flex-1">
                        <div className="font-medium">{service.name}</div>
                        <div className="text-xs text-gray-500">{service.marathiName}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Spacer to prevent layout shift */}
        {isSearchSticky && <div className="h-28"></div>}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="text-lg font-bold">{stat.number}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            );
          })}
        </div>

         {/* Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-shadow ${
                activeTab === tab.id
                  ? 'bg-white shadow-sm border border-gray-200 text-orange-600'
                  : 'bg-gray-50 text-gray-700 border border-gray-100 hover:shadow-sm'
              }`}
            >
              <span>{tab.name}</span>
              <span className="ml-2 inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Services grid */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
            {tabs.find(tab => tab.id === activeTab)?.name}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeServices.map((service) => {
              const iconUrl = getCustomIcon(service.id);

              return (
                <article
                  key={service.id}
                  onClick={() => navigate(`/loan/${service.id}`)}
                  className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 flex items-center justify-center">
                        <img src={iconUrl} alt={service.name} className="w-12 h-12 object-contain" />
                      </div>
                      <div>
                        <h3 className="text-md font-semibold text-gray-900">{service.name}</h3>
                        <div className="text-xs text-gray-500">{service.marathiName}</div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">{service.category}</div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{service.description}</p>

                  {/* Loan details row */}
                  {(service.interestRate || service.maxAmount || service.tenure) && (
                    <div className="grid grid-cols-3 gap-3 text-xs mb-4">
                      <div className="bg-gray-50 rounded-md p-2 text-center">
                        <div className="font-semibold text-gray-800 text-sm">{service.interestRate || '-'}</div>
                        <div className="text-xs text-gray-500">Rate</div>
                      </div>
                      <div className="bg-gray-50 rounded-md p-2 text-center">
                        <div className="font-semibold text-gray-800 text-sm">{service.maxAmount || '-'}</div>
                        <div className="text-xs text-gray-500">Max</div>
                      </div>
                      <div className="bg-gray-50 rounded-md p-2 text-center">
                        <div className="font-semibold text-gray-800 text-sm">{service.tenure || '-'}</div>
                        <div className="text-xs text-gray-500">Tenure</div>
                      </div>
                    </div>
                  )}

                  {/* Service details */}
                  {(service.duration || service.cost) && (
                    <div className="mb-4 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <div>{service.duration || ''}</div>
                        <div className="font-semibold">{service.cost || ''}</div>
                      </div>
                    </div>
                  )}

                  <div className="mt-2">
                    <button
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-orange-50 text-orange-600 text-sm font-semibold hover:bg-orange-100 transition"
                      onClick={(e) => { e.stopPropagation(); navigate(`/loan/${service.id}`); }}
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {activeServices.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-100 shadow-sm mt-6">
              <div className="mx-auto w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No services found</h3>
              <p className="text-sm text-gray-600">Try searching with a different keyword or browse other categories.</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to apply or need help?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Speak with our local advisors for quick guidance — minimal documentation, fast approvals and trusted local support.</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/apply" className="px-6 py-3 rounded-md bg-orange-600 text-white text-sm font-medium hover:bg-orange-700 transition">
              Apply Now
            </Link>

            <a href="tel:9850366753" className="px-6 py-3 rounded-md border border-gray-200 bg-white text-sm text-gray-700 hover:shadow-sm transition flex items-center justify-center gap-2">
              Call Us: <span className="font-semibold">9850366753</span>
            </a>
          </div>
        </div>

      </section>
    </div>
  );
}

export default Home;