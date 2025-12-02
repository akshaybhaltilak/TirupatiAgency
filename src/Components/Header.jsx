import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Phone,
  ChevronDown,
  Menu,
  X,
  Home as HomeIcon,
  FileText,
  Building,
  Briefcase,
  ArrowRight
} from "lucide-react";
import loanData from "../data/loanDetails.json";

function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  const loans = Object.values(loanData || []);

  // Filter categories
  const loanList = loans.filter((item) => item.category === "loan");
  const mortgageList = loans.filter((item) => item.category === "mortgage");
  const serviceList = loans.filter((item) => item.category === "service");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
      if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('button[aria-label="Menu"]')) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLoanClick = (loan) => {
    navigate(`/loan/${loan.id}`);
    setDropdownOpen(null);
    setOpenMenu(false);
  };

  const toggleDropdown = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  // Get icon for category
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'loan': return Briefcase;
      case 'mortgage': return Building;
      case 'service': return FileText;
      default: return FileText;
    }
  };

  return (
    <nav 
      ref={dropdownRef}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-orange-100' 
          : 'bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo and Home */}
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                <HomeIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className={`font-bold text-lg ${
                  isScrolled ? 'text-gray-900' : 'text-orange-700'
                }`}>
                  Tirupati Agencies
                </h1>
                <p className={`text-xs ${
                  isScrolled ? 'text-gray-600' : 'text-orange-600'
                }`}>
                  Trusted Financial Partner
                </p>
              </div>
            </Link>

            {/* Home Button */}
            <Link
              to="/"
              className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isScrolled 
                  ? 'text-orange-600 hover:bg-orange-50' 
                  : 'text-orange-700 hover:bg-white/50'
              }`}
            >
              <HomeIcon className="w-4 h-4" />
              <span>Home</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">

            {/* About Button (desktop) */}
            <Link
              to="/about"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${isScrolled ? 'text-gray-700 hover:bg-orange-50 hover:text-orange-600' : 'text-orange-800 hover:bg-white/50'}`}
            >
              About
            </Link>

            {/* Dropdown 1 - Loans */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("loan")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  dropdownOpen === "loan"
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                    : isScrolled
                      ? 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                      : 'text-orange-800 hover:bg-white/50'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Loans</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen === "loan" ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen === "loan" && (
                <div className="absolute left-0 w-80 bg-white text-gray-900 shadow-2xl rounded-xl mt-2 p-4 border border-orange-100 animate-fadeIn">
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-orange-100">
                    <Briefcase className="w-5 h-5 text-orange-600" />
                    <h3 className="font-bold text-gray-900">Loan Products</h3>
                    <span className="ml-auto text-xs bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 px-2 py-1 rounded-full">
                      {loanList.length} options
                    </span>
                  </div>
                  <div className="grid gap-2 max-h-96 overflow-y-auto">
                    {loanList.map((loan) => (
                      <div
                        key={loan.id}
                        onClick={() => handleLoanClick(loan)}
                        className="group px-3 py-3 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 cursor-pointer transition-all duration-200 border border-transparent hover:border-orange-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 group-hover:text-orange-700">{loan.name}</p>
                            <p className="text-xs text-gray-500">{loan.marathiName}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-transform" />
                        </div>
                        {loan.maxAmount && (
                          <div className="mt-2 flex gap-2">
                            <span className="text-xs px-2 py-1 bg-orange-50 text-orange-700 rounded">
                              Max: {loan.maxAmount}
                            </span>
                            {loan.tenure && (
                              <span className="text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded">
                                Tenure: {loan.tenure}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown 2 - Mortgage */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("mortgage")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  dropdownOpen === "mortgage"
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                    : isScrolled
                      ? 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                      : 'text-orange-800 hover:bg-white/50'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>Mortgage</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen === "mortgage" ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen === "mortgage" && (
                <div className="absolute left-0 w-80 bg-white text-gray-900 shadow-2xl rounded-xl mt-2 p-4 border border-orange-100 animate-fadeIn">
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-orange-100">
                    <Building className="w-5 h-5 text-orange-600" />
                    <h3 className="font-bold text-gray-900">Mortgage Services</h3>
                    <span className="ml-auto text-xs bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 px-2 py-1 rounded-full">
                      {mortgageList.length} services
                    </span>
                  </div>
                  <div className="grid gap-2 max-h-96 overflow-y-auto">
                    {mortgageList.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleLoanClick(item)}
                        className="group px-3 py-3 rounded-lg hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 cursor-pointer transition-all duration-200 border border-transparent hover:border-amber-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 group-hover:text-amber-700">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.marathiName}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-transform" />
                        </div>
                        {item.duration && (
                          <div className="mt-2">
                            <span className="text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded">
                              Duration: {item.duration}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown 3 - Services */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("service")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  dropdownOpen === "service"
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                    : isScrolled
                      ? 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                      : 'text-orange-800 hover:bg-white/50'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen === "service" ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen === "service" && (
                <div className="absolute left-0 w-80 bg-white text-gray-900 shadow-2xl rounded-xl mt-2 p-4 border border-orange-100 animate-fadeIn">
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-orange-100">
                    <FileText className="w-5 h-5 text-orange-600" />
                    <h3 className="font-bold text-gray-900">Other Services</h3>
                    <span className="ml-auto text-xs bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 px-2 py-1 rounded-full">
                      {serviceList.length} services
                    </span>
                  </div>
                  <div className="grid gap-2 max-h-96 overflow-y-auto">
                    {serviceList.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleLoanClick(item)}
                        className="group px-3 py-3 rounded-lg hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 cursor-pointer transition-all duration-200 border border-transparent hover:border-yellow-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 group-hover:text-yellow-700">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.marathiName}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-yellow-500 group-hover:translate-x-1 transition-transform" />
                        </div>
                        {item.cost && (
                          <div className="mt-2">
                            <span className="text-xs px-2 py-1 bg-yellow-50 text-yellow-700 rounded">
                              Cost: {item.cost}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isScrolled 
                  ? 'bg-orange-50 text-orange-700' 
                  : 'bg-white/50 text-orange-800'
              }`}>
                <Phone className="w-4 h-4" />
                <a
                  href="tel:9850366753"
                  className="font-bold hover:text-orange-600 transition-colors"
                >
                  98503 66753
                </a>
              </div>

              {/* Apply Now */}
              <Link
                to="/apply"
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Apply Now
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            aria-label="Menu"
            className={`md:hidden p-2 rounded-lg transition-all ${
              isScrolled 
                ? 'bg-orange-50 text-orange-600' 
                : 'bg-white/50 text-orange-700'
            }`}
            onClick={() => setOpenMenu(!openMenu)}
          >
            {openMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {openMenu && (
        <div 
          ref={menuRef}
          className="md:hidden bg-white text-gray-900 shadow-xl border-t border-orange-100 animate-slideDown"
        >
          <div className="p-4 space-y-4">
            {/* Home */}
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 font-medium"
              onClick={() => setOpenMenu(false)}
            >
              <HomeIcon className="w-5 h-5" />
              <span>Home</span>
            </Link>

            {/* About (mobile) */}
            <Link
              to="/about"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 text-gray-700 font-medium"
              onClick={() => setOpenMenu(false)}
            >
              <FileText className="w-5 h-5" />
              <span>About</span>
            </Link>

            {/* Loans */}
            <div className="border border-orange-100 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleDropdown("loan")}
                className="flex justify-between w-full items-center px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 font-medium"
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  <span>Loans</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen === "loan" ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen === "loan" && (
                <div className="bg-white p-3 space-y-2 border-t border-orange-100">
                  {loanList.map((loan) => (
                    <div
                      key={loan.id}
                      onClick={() => handleLoanClick(loan)}
                      className="px-3 py-2 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors"
                    >
                      <p className="font-medium">{loan.name}</p>
                      <p className="text-xs text-gray-500">{loan.marathiName}</p>
                      {loan.maxAmount && (
                        <div className="mt-1 text-xs text-orange-600 font-medium">
                          Max: {loan.maxAmount}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mortgage */}
            <div className="border border-amber-100 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleDropdown("mortgage")}
                className="flex justify-between w-full items-center px-4 py-3 bg-gradient-to-r from-amber-50 to-yellow-50 font-medium"
              >
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  <span>Mortgage</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen === "mortgage" ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen === "mortgage" && (
                <div className="bg-white p-3 space-y-2 border-t border-amber-100">
                  {mortgageList.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => handleLoanClick(m)}
                      className="px-3 py-2 rounded-lg hover:bg-amber-50 cursor-pointer transition-colors"
                    >
                      <p className="font-medium">{m.name}</p>
                      <p className="text-xs text-gray-500">{m.marathiName}</p>
                      {m.duration && (
                        <div className="mt-1 text-xs text-amber-600 font-medium">
                          Duration: {m.duration}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Services */}
            <div className="border border-yellow-100 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleDropdown("service")}
                className="flex justify-between w-full items-center px-4 py-3 bg-gradient-to-r from-yellow-50 to-orange-50 font-medium"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  <span>Services</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen === "service" ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen === "service" && (
                <div className="bg-white p-3 space-y-2 border-t border-yellow-100">
                  {serviceList.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => handleLoanClick(m)}
                      className="px-3 py-2 rounded-lg hover:bg-yellow-50 cursor-pointer transition-colors"
                    >
                      <p className="font-medium">{m.name}</p>
                      <p className="text-xs text-gray-500">{m.marathiName}</p>
                      {m.cost && (
                        <div className="mt-1 text-xs text-yellow-600 font-medium">
                          Cost: {m.cost}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="border border-orange-200 rounded-xl p-4 bg-gradient-to-r from-orange-50 to-amber-50">
              <div className="flex items-center gap-3 mb-2">
                <Phone className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="text-sm text-gray-600">Call us anytime</div>
                  <a
                    href="tel:9850366753"
                    className="text-lg font-bold text-orange-700 hover:text-orange-800"
                    onClick={() => setOpenMenu(false)}
                  >
                    +91 98503 66753
                  </a>
                </div>
              </div>
            </div>

            {/* Apply Now Mobile */}
            <Link
              to="/apply"
              className="block w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
              onClick={() => setOpenMenu(false)}
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}

      {/* Add CSS animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            max-height: 0;
            opacity: 0;
          }
          to {
            max-height: 500px;
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
          overflow: hidden;
        }
      `}</style>
    </nav>
  );
}

export default Header;