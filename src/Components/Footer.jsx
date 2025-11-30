import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  MessageCircle,
} from "lucide-react";

import loanData from "../data/loanDetails.json";

function Footer() {
  const loans = Object.values(loanData || {}).filter(
    (item) => item.category === "loan"
  );

  const mortgages = Object.values(loanData || {}).filter(
    (item) => item.category === "mortgage"
  );

  const otherServices = Object.values(loanData || {}).filter(
    (item) => item.category === "service"
  );

  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand Info */}
          <div>
           <img src="/logo.png" alt="" className="w-auto h-10" />
            <p className="text-gray-300 mt-4 leading-relaxed">
              Your trusted loan & mortgage partner in Maharashtra.
              10+ years of service and 5000+ satisfied clients.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
              <a
                href="https://wa.me/919850366753"
                className="p-2 rounded-full bg-white/10 hover:bg-orange-500 transition"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </a>

              <a
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-orange-500 transition"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Loan Types */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">
              Loan Types
            </h4>

            <ul className="space-y-2">
              {loans.map((loan) => (
                <li key={loan.id}>
                  <Link
                    to={`/loan/${loan.id}`}
                    className="text-gray-300 hover:text-orange-400 transition"
                  >
                    {loan.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mortgage & Other Services */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-orange-400">
              Mortgage Services
            </h4>
            <ul className="space-y-2 mb-6">
              {mortgages.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/loan/${item.id}`}
                    className="text-gray-300 hover:text-orange-400 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-lg font-semibold mb-3 text-orange-400">
              Other Services
            </h4>
            <ul className="space-y-2">
              {otherServices.map((item) => (
                <li key={item.id}>
                  <Link
                   to={`/loan/${item.id}`}
                    className="text-gray-300 hover:text-orange-400 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Branches */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">
              Contact & Branches
            </h4>

            <div className="space-y-3 text-gray-300">

              {/* Phone 1 */}
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-orange-500" />
                <a href="tel:9850366753" className="hover:text-orange-400">
                  +91 98503 66753
                </a>
              </div>

              {/* Phone 2 */}
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-orange-500" />
                <a href="tel:9175854236" className="hover:text-orange-400">
                  +91 91758 54236
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-orange-500" />
                <a
                  href="mailto:tirupatiagencies1234@gmail.com"
                  className="hover:text-orange-400 break-all"
                >
                  tirupatiagencies1234@gmail.com
                </a>
              </div>

              {/* Head Office */}
              <div className="flex items-start space-x-2 mt-4">
                <MapPin className="w-4 h-4 text-orange-500 mt-1" />
                <p>
                  <span className="font-semibold text-orange-400">
                    Head Office:
                  </span>{" "}
                  Sudarabai Tower Chowk, Akola, Maharashtra – 444004
                </p>
              </div>

              {/* Branches */}
              <div className="mt-4">
                <p className="font-semibold text-orange-400 mb-2">Branches:</p>
                <ul className="space-y-1 ml-1">
                  <li>• Buldhana</li>
                  <li>• Dhule</li>
                  <li>• Yavatmal</li>
                  <li>• Washim</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-400">
          <p>
            © 2025 Tirupati Agencies. All rights reserved.
          </p>
          <p className="mt-1 text-sm">
            Designed & Developed by{" "}
            <span className="text-orange-400 font-medium">
              WebReich Solutions
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
