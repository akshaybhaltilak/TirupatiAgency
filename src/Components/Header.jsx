import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Phone,
  ChevronDown,
  Menu,
  X,
  Info,
  HelpCircle,
} from "lucide-react";

import loanData from "../data/loanDetails.json";

function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const navigate = useNavigate();

  const loans = Object.values(loanData || []);

  const handleLoanClick = (loan) => {
    navigate(`/loan/${loan.id}`);
    setDropdownOpen(null);
    setOpenMenu(false);
  };

  const handleServiceClick = (service) => {
    navigate(`/service/${service.id}`);
    setDropdownOpen(null);
    setOpenMenu(false);
  };

  // Filter categories
  const loanList = loans.filter((item) => item.category === "loan");
  const mortgageList = loans.filter((item) => item.category === "mortgage");
  const serviceList = loans.filter((item) => item.category === "service");

  const toggleDropdown = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  return (
    <nav className="bg-white text-gray-900 shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center m-0 p-0">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">

            {/* Dropdown 1 - Loans */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("loan")}
                className="flex items-center gap-1 font-medium hover:text-orange-500 transition-colors duration-200"
              >
                Loans <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen === "loan" ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen === "loan" && (
                <div className="absolute left-0 w-72 bg-white text-gray-900 shadow-xl rounded-xl mt-3 p-3 border border-gray-200">
                  {loanList.map((loan) => (
                    <div
                      key={loan.id}
                      onClick={() => handleLoanClick(loan)}
                      className="px-3 py-2 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors duration-200"
                    >
                      <p className="font-medium">{loan.name}</p>
                      <p className="text-xs text-gray-500">{loan.marathiName}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown 2 - Mortgage */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("mortgage")}
                className="flex items-center gap-1 font-medium hover:text-orange-500 transition-colors duration-200"
              >
                Mortgage <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen === "mortgage" ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen === "mortgage" && (
                <div className="absolute left-0 w-72 bg-white text-gray-900 shadow-xl rounded-xl mt-3 p-3 border border-gray-200">
                  {mortgageList.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleLoanClick(item)}
                      className="px-3 py-2 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors duration-200"
                    >
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.marathiName}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown 3 - Services */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("service")}
                className="flex items-center gap-1 font-medium hover:text-orange-500 transition-colors duration-200"
              >
                Service <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen === "service" ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen === "service" && (
                <div className="absolute left-0 w-72 bg-white text-gray-900 shadow-xl rounded-xl mt-3 p-3 border border-gray-200">
                  {serviceList.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleLoanClick(item)}
                      className="px-3 py-2 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors duration-200"
                    >
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.marathiName}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* About */}
            <Link
              to="/about"
              className="font-medium hover:text-orange-500 transition-colors duration-200 flex items-center gap-1"
            >
              About
            </Link>


            {/* Contact */}
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-orange-600" />
              <a
                href="tel:9850366753"
                className="hover:text-orange-500 transition-colors duration-200 font-bold"
              >
                +91 98503 66753
              </a>
            </div>
          </div>

          {/* Apply Now */}
          <Link
            to="/apply"
            className="hidden md:block bg-orange-500 text-white font-semibold px-5 py-2 rounded-lg shadow-sm hover:bg-orange-600 transition-all duration-200 hover:shadow-md"
          >
            Apply Now
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            onClick={() => setOpenMenu(!openMenu)}
          >
            {openMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {openMenu && (
        <div className="md:hidden bg-white text-gray-900 shadow-lg border-t p-5 space-y-4">

          {/* Loans */}
          <div>
            <button
              onClick={() => toggleDropdown("loan")}
              className="flex justify-between w-full font-medium text-left items-center py-2"
            >
              <span>Loans</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen === "loan" ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen === "loan" && (
              <div className="mt-2 pl-3 space-y-2 border-l-2 border-orange-200">
                {loanList.map((loan) => (
                  <div
                    key={loan.id}
                    onClick={() => handleLoanClick(loan)}
                    className="py-2 px-3 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors duration-200"
                  >
                    <p className="font-medium">{loan.name}</p>
                    <p className="text-xs text-gray-500">{loan.marathiName}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mortgage */}
          <div>
            <button
              onClick={() => toggleDropdown("mortgage")}
              className="flex justify-between w-full font-medium text-left items-center py-2"
            >
              <span>Mortgage</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen === "mortgage" ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen === "mortgage" && (
              <div className="mt-2 pl-3 space-y-2 border-l-2 border-orange-200">
                {mortgageList.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => handleLoanClick(m)}
                    className="py-2 px-3 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors duration-200"
                  >
                    <p className="font-medium">{m.name}</p>
                    <p className="text-xs text-gray-500">{m.marathiName}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Services */}
          <div>
            <button
              onClick={() => toggleDropdown("service")}
              className="flex justify-between w-full font-medium text-left items-center py-2"
            >
              <span>Services</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen === "service" ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen === "service" && (
              <div className="mt-2 pl-3 space-y-2 border-l-2 border-orange-200">
                {serviceList.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => handleLoanClick(m)}
                    className="py-2 px-3 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors duration-200"
                  >
                    <p className="font-medium">{m.name}</p>
                    <p className="text-xs text-gray-500">{m.marathiName}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* About */}
          <Link
            to="/about"
            className="flex items-center gap-2 font-medium py-2 hover:text-orange-500 transition-colors duration-200"
            onClick={() => setOpenMenu(false)}
          >
            About
          </Link>


          {/* Contact */}
          <div className="flex items-center gap-2 text-sm pt-2 border-t border-gray-200">
            <Phone className="w-4 h-4 text-orange-600" />
            <a
              href="tel:9850366753"
              className="hover:text-orange-500 transition-colors duration-200 font-bold"
              onClick={() => setOpenMenu(false)}
            >
              +91 98503 66753
            </a>
          </div>

          {/* Apply Now Mobile */}
          <Link
            to="/apply"
            className="block bg-orange-500 text-white text-center py-3 rounded-lg font-medium shadow-sm hover:bg-orange-600 transition-all duration-200 mt-4"
            onClick={() => setOpenMenu(false)}
          >
            Apply Now
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Header;