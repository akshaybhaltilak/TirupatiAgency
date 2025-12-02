import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Download,
  Share2,
  Home,
  Building,
  GraduationCap,
  Briefcase,
  Settings,
  User,
  FileSearch,
  BarChart,
  FileCheck,
  Phone,
  FileText,
  CheckCircle,
  ArrowLeft,
  Building2,
  School,
  Factory,
  Stethoscope,
  Calculator,
  MapPin,
  Landmark,
  Banknote,
  TrendingUp
} from 'lucide-react';
import jsPDF from 'jspdf';
import loanDetails from '../data/loanDetails.json';

function LoanDetails() {
  const { loanId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [applicantType, setApplicantType] = useState('salaried');
  const [selectedSubtype, setSelectedSubtype] = useState(null);

  const service = loanDetails[loanId];
  const pageRef = useRef();

  // Image mapping for different loan types
  const getLoanImage = () => {
    const serviceName = service.name.toLowerCase();
    const serviceId = service.id.toLowerCase();
    
    // Check specific service IDs first
    if (serviceId.includes('home-loan')) {
      return "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";
    }
    if (serviceId.includes('plot-purchase') || serviceId.includes('land')) {
      return "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";
    }
    if (serviceId.includes('education')) {
      return "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";
    }
    if (serviceId.includes('business') || serviceId.includes('project')) {
      return "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";
    }
    if (serviceId.includes('doctor') || serviceId.includes('medical')) {
      return "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";
    }
    if (serviceId.includes('machine') || serviceId.includes('equipment')) {
      return "https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";
    }
    if (serviceId.includes('loan-against-property')) {
      return "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";
    }
    if (serviceId.includes('mortgage')) {
      return "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";
    }
    
    // Fallback based on category
    if (service.category === 'loan') {
      return "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";
    }
    if (service.category === 'mortgage') {
      return "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";
    }
    if (service.category === 'service') {
      return "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";
    }
    
    return "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";
  };

  const getIconComponent = (iconName) => {
    const iconComponents = {
      Home, Building, GraduationCap, Briefcase, Settings, User,
      FileSearch, BarChart, FileCheck, Building2, School,
      Factory, Stethoscope, Calculator, MapPin, Landmark,
      Banknote, TrendingUp
    };
    return iconComponents[iconName] || FileText;
  };

  const IconComponent = getIconComponent(service.icon);
  const loanImage = getLoanImage();

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-orange-100 to-amber-100 rounded-full flex items-center justify-center mb-6">
            <FileSearch className="w-10 h-10 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-6">The requested service could not be found.</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Share function
  const handleShare = async () => {
    const shareData = {
      title: `${service.name} - Tirupati Agencies`,
      text: `Check out ${service.name} from Tirupati Agencies`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled or failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (err) {
        prompt('Copy this link:', window.location.href);
      }
    }
  };

  // PDF Generation (keeping your existing implementation)
  const handleDownloadPDF = () => {
    // ... your existing PDF generation code
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const margin = 40;
    let y = 60;

    // Header
    doc.setFillColor(249, 115, 22, 0.1);
    doc.rect(0, 0, doc.internal.pageSize.width, 80, 'F');

    doc.setFontSize(18);
    doc.setTextColor(249, 115, 22);
    doc.setFont('helvetica', 'bold');
    doc.text('Tirupati Agencies', margin, 40);

    doc.setFontSize(10);
    doc.setTextColor(99, 102, 106);
    doc.setFont('helvetica', 'normal');
    doc.text('Trusted Financial & Property Services', margin, 56);
    y = 100;

    // Title
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(33, 37, 41);
    doc.text(service.name, margin, y);
    y += 20;

    if (service.marathiName) {
      doc.setFontSize(10);
      doc.setTextColor(99, 102, 106);
      doc.text(service.marathiName, margin, y);
      y += 20;
    }

    // Continue with your existing PDF generation...

    const filenameSafe = service.name.replace(/\s+/g, '_').toLowerCase();
    doc.save(`${filenameSafe}_tirupati_agencies.pdf`);
  };

  // Render documents
  const renderDocuments = () => {
    if (service.category === 'service') {
      return (
        <div className="space-y-3">
          {service.documents?.map((doc, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-orange-200 transition-all">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-100 to-amber-100 flex items-center justify-center">
                <FileText className="w-4 h-4 text-orange-600" />
              </div>
              <span className="text-gray-700 font-medium">{doc}</span>
            </div>
          ))}
        </div>
      );
    }

    const documents = selectedSubtype ? selectedSubtype.documents : service.documents;

    return (
      <div className="space-y-6">
        {/* Basic KYC Documents */}
        {documents?.basicKyc && (
          <div className="bg-gradient-to-br from-orange-50/50 to-white p-5 rounded-2xl border border-orange-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-100 to-amber-100 flex items-center justify-center">
                <User className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Basic KYC Documents</h3>
                <p className="text-sm text-gray-500">सर्वसाधारण कागदपत्रे</p>
              </div>
            </div>
            <div className="grid gap-2">
              {documents.basicKyc.map((doc, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Income Documents */}
        {documents?.[applicantType] && (
          <div className="bg-gradient-to-br from-blue-50/50 to-white p-5 rounded-2xl border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {applicantType === 'salaried' ? 'Income Documents' : 'Business Documents'}
                </h3>
                <p className="text-sm text-gray-500">
                  {applicantType === 'salaried' ? 'उत्पन्नाचे कागदपत्रे' : 'व्यवसाय कागदपत्रे'}
                </p>
              </div>
            </div>
            <div className="grid gap-2">
              {documents[applicantType].map((doc, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                  <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Property/Other Documents */}
        {documents?.property && (
          <div className="bg-gradient-to-br from-green-50/50 to-white p-5 rounded-2xl border border-green-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center">
                <Building className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {service.category === 'loan' ? 'Property Documents' : 'Additional Documents'}
                </h3>
                <p className="text-sm text-gray-500">
                  {service.category === 'loan' ? 'मालमत्तेचे कागदपत्रे' : 'अतिरिक्त कागदपत्रे'}
                </p>
              </div>
            </div>
            <div className="grid gap-2">
              {documents.property.map((doc, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section with Image */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <img
          src={loanImage}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        
        <div className="relative h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{service.name}</h1>
                <p className="text-lg text-orange-100">{service.marathiName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                service.category === 'loan' 
                  ? 'bg-orange-500 text-white' 
                  : service.category === 'mortgage'
                  ? 'bg-amber-500 text-white'
                  : 'bg-blue-500 text-white'
              }`}>
                {service.category === 'loan' ? 'Loan Product' : service.category === 'mortgage' ? 'Mortgage Service' : 'Professional Service'}
              </span>
              
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Available Across Maharashtra</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Back</span>
        </button>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex items-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition"
            title="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>

          <button
            onClick={handleDownloadPDF}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-lg transition"
            title="Download PDF"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-12 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-100 to-amber-100 flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
                  <p className="text-sm text-gray-500">Service Details & Information</p>
                </div>
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">{service.description}</p>

              {/* Key Metrics */}
              {service.category === 'loan' ? (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-5 border border-orange-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-100 to-amber-100 flex items-center justify-center">
                        <Banknote className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{service.maxAmount || 'Custom'}</div>
                        <div className="text-sm text-gray-500">Maximum Loan Amount</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-5 border border-amber-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-100 to-yellow-100 flex items-center justify-center">
                        <Calculator className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{service.tenure || 'Flexible'}</div>
                        <div className="text-sm text-gray-500">Repayment Tenure</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-5 border border-blue-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{service.duration || 'Custom'}</div>
                        <div className="text-sm text-gray-500">Processing Time</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-5 border border-green-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center">
                        <Landmark className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{service.cost || 'Get Quote'}</div>
                        <div className="text-sm text-gray-500">Starting Cost</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Subtypes Section */}
            {service.subtypes && service.subtypes.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Available Options</h3>
                <div className="grid gap-4">
                  {service.subtypes.map((subtype, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedSubtype(selectedSubtype?.id === subtype.id ? null : subtype)}
                      className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedSubtype?.id === subtype.id
                          ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-amber-50'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            selectedSubtype?.id === subtype.id
                              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                              : 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-600'
                          }`}>
                            <CheckCircle className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{subtype.name}</h4>
                            <p className="text-sm text-gray-500">{subtype.marathiName}</p>
                          </div>
                        </div>
                      </div>
                      
                      {selectedSubtype?.id === subtype.id && subtype.description && (
                        <div className="mt-4 pl-14">
                          <div className="p-4 bg-white rounded-lg border border-orange-100">
                            <p className="text-gray-700">{subtype.description}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Required Documents</h3>
                    <p className="text-sm text-gray-500">कागदपत्रांची यादी</p>
                  </div>
                </div>

                {service.category === 'loan' && (
                  <div className="flex gap-2 bg-gradient-to-r from-gray-50 to-white p-1 rounded-xl border border-gray-200">
                    <button
                      onClick={() => setApplicantType('salaried')}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        applicantType === 'salaried'
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Salaried
                    </button>
                    <button
                      onClick={() => setApplicantType('business')}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        applicantType === 'business'
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Business
                    </button>
                  </div>
                )}
              </div>

              {renderDocuments()}
            </div>

            {/* Process Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center">
                  <Settings className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Process Flow</h3>
                  <p className="text-sm text-gray-500">आमची प्रक्रिया</p>
                </div>
              </div>

              <div className="space-y-4">
                {service.process?.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center justify-center text-lg font-bold">
                        {idx + 1}
                      </div>
                      {idx < service.process.length - 1 && (
                        <div className="h-8 w-0.5 bg-gradient-to-b from-orange-200 to-amber-200 mx-auto"></div>
                      )}
                    </div>
                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-100 flex-1">
                      <p className="text-gray-800">{step}</p>
                    </div>
                  </div>
                ))}

                {!service.process && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center mb-4">
                      <Clock className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">Process details will be provided upon application</p>
                  </div>
                )}
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Key Benefits</h3>
                  <p className="text-sm text-gray-500">लाभ आणि फायदे</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {service.benefits?.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-gray-700">{b}</p>
                  </div>
                ))}

                {!service.benefits && (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-gray-500">Contact us to learn about specific benefits</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Quick Action Card */}
            <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-xl font-bold mb-4">Ready to Apply?</h3>
              <p className="text-orange-100 mb-6">Our experts are ready to guide you through the process.</p>
              
              <div className="space-y-3">
                <Link 
                  to="/apply" 
                  className="block w-full bg-white text-orange-600 text-center py-3 rounded-xl font-bold hover:bg-orange-50 transition"
                >
                  Apply Now
                </Link>
                
                <a 
                  href="tel:9850366753"
                  className="block w-full bg-white/20 backdrop-blur-sm text-white text-center py-3 rounded-xl font-bold hover:bg-white/30 transition border border-white/30"
                >
                  Call: 9850366753
                </a>
                
                <button
                  onClick={handleDownloadPDF}
                  className="block w-full bg-white/10 backdrop-blur-sm text-white text-center py-3 rounded-xl font-bold hover:bg-white/20 transition border border-white/20"
                >
                  Download PDF
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-orange-100" />
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-2">
                  <CheckCircle className="w-4 h-4 text-orange-100" />
                  <span>No Hidden Charges</span>
                </div>
              </div>
            </div>

            {/* Service Info Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h4 className="font-bold text-gray-900 mb-4">Service Details</h4>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Service Category</div>
                  <div className="font-medium text-gray-900 capitalize">{service.category}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">Service ID</div>
                  <div className="font-medium text-gray-900">{service.id}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">Available For</div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded">Salaried</span>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">Business</span>
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded">Professionals</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h4 className="font-bold text-gray-900 mb-4">Share This Service</h4>
              <p className="text-gray-600 text-sm mb-4">Help others find this financial solution</p>
              
              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium hover:shadow-lg transition"
              >
                <Share2 className="w-5 h-5" />
                Share with Friends & Family
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanDetails;