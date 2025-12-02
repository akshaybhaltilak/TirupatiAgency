import React from 'react';

function BankMarquee() {
  const banks = [
    {
      name: "SBI",
      logo: "https://www.freepnglogos.com/uploads/sbi-logo-png/image-sbi-logo-logopedia-fandom-powered-wikia-0.png"
    },
    {
      name: "HDFC",
      logo: "https://w7.pngwing.com/pngs/697/318/png-transparent-hdfc-bank-hd-logo.png"
    },
    {
      name: "ICICI",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/2560px-ICICI_Bank_Logo.svg.png"
    },
    {
      name: "Axis Bank",
      logo: "https://ipbindia.com/wp-content/uploads/2023/03/axis.png"
    },
    {
      name: "PNB",
      logo: "https://pngcut.com/wp-content/uploads/2025/01/Punjab-National-Bank-png-download-2.png"
    },
    {
      name: "Bank of Baroda",
      logo: "https://companieslogo.com/img/orig/BANKBARODA.NS_BIG-4f3f4c39.png?t=1604067029&download=true"
    },
    {
      name: "Kotak Mahindra",
      logo: "https://pngimagefree.com/wp-content/uploads/Kotak-Mahindra-Bank-Logo-PNG@.png"
    },
    {
      name: "IDFC First Bank",
      logo: "https://companieslogo.com/img/orig/IDFCFIRSTB.NS_BIG-f326a18d.png?t=1613442190"
    }
  ];

  const reversedBanks = [...banks].reverse();

  return (
    <div className="bg-gray-50 py-4 border-y border-gray-200 overflow-hidden relative">
      {/* Section Header - More Compact */}
      <div className="text-center mb-4">
        <h3 className="text-2xl font-semibold text-gray-900 mb-1">
          Trusted Banking Partners
        </h3>
        <p className="text-gray-600 text-md">
          Working with India's leading financial institutions
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        
        {/* First Line - Forward */}
        <div className="flex animate-marqueeForward whitespace-nowrap mb-2">
          {banks.concat(banks).map((bank, index) => (
            <div key={`forward-${index}`} className="inline-flex items-center mx-4">
              <div className="w-20 h-12  flex items-center justify-center transition-all duration-300 hover:scale-105">
                <img 
                  src={bank.logo} 
                  alt={bank.name}
                  className="max-w-full max-h-12 object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Second Line - Reverse */}
        {/* <div className="flex animate-marqueeReverse whitespace-nowrap">
          {reversedBanks.concat(reversedBanks).map((bank, index) => (
            <div key={`reverse-${index}`} className="inline-flex items-center mx-4">
              <div className="w-20 h-12 flex items-center justify-center  transition-all duration-300 hover:scale-105">
                <img 
                  src={bank.logo} 
                  alt={bank.name}
                  className="max-w-full max-h-12 object-contain"
                />
              </div>
            </div>
          ))}
        </div> */}
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes marqueeForward {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeReverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        
        /* Desktop speed */
        .animate-marqueeForward {
          animation: marqueeForward 20s linear infinite;
        }
        .animate-marqueeReverse {
          animation: marqueeReverse 20s linear infinite;
        }
        
        /* Faster on mobile */
        @media (max-width: 768px) {
          .animate-marqueeForward {
            animation: marqueeForward 12s linear infinite;
          }
          .animate-marqueeReverse {
            animation: marqueeReverse 12s linear infinite;
          }
        }
        
        /* Pause on hover */
        .animate-marqueeForward:hover,
        .animate-marqueeReverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export default BankMarquee;