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
  ArrowLeft
} from 'lucide-react';
import jsPDF from 'jspdf';
import loanDetails from '../data/loanDetails.json';

function LoanDetails() {
  const { loanId } = useParams();
  const [activeTab, setActiveTab] = useState('overview'); // kept for any small UI usage
  const [applicantType, setApplicantType] = useState('salaried');
  const [selectedSubtype, setSelectedSubtype] = useState(null);

  const service = loanDetails[loanId];
  const pageRef = useRef();

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Link to="/" className="text-orange-600 hover:text-orange-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const iconComponents = {
    Home,
    Building,
    GraduationCap,
    Briefcase,
    Settings,
    User,
    FileSearch,
    BarChart,
    FileCheck
  };

  const getIconComponent = (iconName) => {
    return iconComponents[iconName] || FileText;
  };

  const IconComponent = getIconComponent(service.icon);

  // --- SHARE FUNCTION (Web Share API fallback to clipboard)
  const handleShare = async () => {
    const shareData = {
      title: `${service.name} - Tirupati Agencies`,
      text: `${service.name} - Details from Tirupati Agencies`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // user cancelled or error
        console.log('Share cancelled or failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (err) {
        // fallback alert
        prompt('Copy this link:', window.location.href);
      }
    }
  };

  // --- PDF GENERATION (using jsPDF)
  const handleDownloadPDF = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const margin = 40;
    let y = 60;

    // Header: branding
    doc.setFillColor(249, 250, 251); // very light background
    doc.rect(0, 0, doc.internal.pageSize.width, 80, 'F');

    doc.setFontSize(18);
    doc.setTextColor(33, 37, 41);
    doc.setFont('helvetica', 'bold');
    doc.text('Tirupati Agencies', margin, 40);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Trusted Financial & Property Services', margin, 56);
    y = 100;

    // Title
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(service.name, margin, y);
    y += 20;

    if (service.marathiName) {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(99, 102, 106);
      doc.text(service.marathiName, margin, y);
      y += 20;
    }

    doc.setTextColor(33, 37, 41);

    // Overview / Description (wrap text)
    if (service.description) {
      doc.setFontSize(11);
      const splitDesc = doc.splitTextToSize(service.description, doc.internal.pageSize.width - margin * 2);
      doc.text(splitDesc, margin, y);
      y += splitDesc.length * 14 + 8;
    }

    // Loan / Service metrics
    if (service.category === 'loan') {
      const metrics = [
        ['Interest Rate', service.interestRate || '-'],
        ['Max Amount', service.maxAmount || '-'],
        ['Tenure', service.tenure || '-'],
      ];

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Key Metrics', margin, y);
      y += 18;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      metrics.forEach(([k, v]) => {
        // page break if near bottom
        if (y > doc.internal.pageSize.height - 80) {
          doc.addPage();
          y = 60;
        }
        doc.text(`${k}: ${String(v)}`, margin, y);
        y += 16;
      });
      y += 6;
    } else if (service.category === 'service') {
      if (service.duration || service.cost) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Service Info', margin, y);
        y += 18;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        if (service.duration) { doc.text(`Processing Time: ${service.duration}`, margin, y); y += 16; }
        if (service.cost) { doc.text(`Starting Cost: ${service.cost}`, margin, y); y += 16; }
        y += 6;
      }
    }

    // Documents
    const documents = selectedSubtype ? selectedSubtype.documents : service.documents;
    if (documents) {
      if (y > doc.internal.pageSize.height - 140) { doc.addPage(); y = 60; }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Required Documents', margin, y);
      y += 18;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);

      // Basic KYC
      if (documents.basicKyc && documents.basicKyc.length) {
        doc.text('Basic KYC:', margin, y);
        y += 16;
        documents.basicKyc.forEach((d) => {
          if (y > doc.internal.pageSize.height - 60) { doc.addPage(); y = 60; }
          const split = doc.splitTextToSize('- ' + d, doc.internal.pageSize.width - margin * 2);
          doc.text(split, margin + 10, y);
          y += split.length * 12;
        });
      }

      // Applicant type docs
      if (documents[applicantType] && documents[applicantType].length) {
        if (y > doc.internal.pageSize.height - 140) { doc.addPage(); y = 60; }
        doc.text(applicantType === 'salaried' ? 'Income Documents (Salaried):' : 'Business Documents:', margin, y);
        y += 16;
        documents[applicantType].forEach((d) => {
          if (y > doc.internal.pageSize.height - 60) { doc.addPage(); y = 60; }
          const split = doc.splitTextToSize('- ' + d, doc.internal.pageSize.width - margin * 2);
          doc.text(split, margin + 10, y);
          y += split.length * 12;
        });
      }

      // Property docs
      if (documents.property && documents.property.length) {
        if (y > doc.internal.pageSize.height - 140) { doc.addPage(); y = 60; }
        doc.text('Property / Other Documents:', margin, y);
        y += 16;
        documents.property.forEach((d) => {
          if (y > doc.internal.pageSize.height - 60) { doc.addPage(); y = 60; }
          const split = doc.splitTextToSize('- ' + d, doc.internal.pageSize.width - margin * 2);
          doc.text(split, margin + 10, y);
          y += split.length * 12;
        });
      }
      y += 8;
    }

    // Process steps
    if (service.process && service.process.length) {
      if (y > doc.internal.pageSize.height - 140) { doc.addPage(); y = 60; }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Process', margin, y);
      y += 18;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      service.process.forEach((step, idx) => {
        if (y > doc.internal.pageSize.height - 60) { doc.addPage(); y = 60; }
        const split = doc.splitTextToSize(`${idx + 1}. ${step}`, doc.internal.pageSize.width - margin * 2);
        doc.text(split, margin, y);
        y += split.length * 12 + 6;
      });
      y += 6;
    }

    // Benefits
    if (service.benefits && service.benefits.length) {
      if (y > doc.internal.pageSize.height - 140) { doc.addPage(); y = 60; }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Benefits', margin, y);
      y += 18;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      service.benefits.forEach((b) => {
        if (y > doc.internal.pageSize.height - 60) { doc.addPage(); y = 60; }
        const split = doc.splitTextToSize('- ' + b, doc.internal.pageSize.width - margin * 2);
        doc.text(split, margin + 6, y);
        y += split.length * 12;
      });
    }

    // Footer contact
    doc.setFontSize(10);
    doc.setTextColor(99, 102, 106);
    const footerY = doc.internal.pageSize.height - 30;
    doc.text('Tirupati Agencies • Call: 9850366753 • Visit: Tirupati Agencies', margin, footerY);

    // Save
    const filenameSafe = service.name.replace(/\s+/g, '_').toLowerCase();
    doc.save(`${filenameSafe}_tirupati_agencies.pdf`);
  };

  // Helper to render the documents block (reused in UI)
  const renderDocuments = () => {
    if (service.category === 'service') {
      return (
        <div className="space-y-4">
          {service.documents?.map((doc, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <FileText className="w-4 h-4 text-orange-600" />
              <span className="text-gray-700">{doc}</span>
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
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic KYC Documents (सर्वसाधारण कागदपत्रे)</h3>
            <div className="grid gap-2">
              {documents.basicKyc.map((doc, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FileText className="w-4 h-4 text-orange-600" />
                  <span className="text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Income Documents */}
        {documents?.[applicantType] && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {applicantType === 'salaried' ? 'Income Documents (उत्पन्नाचे कागदपत्रे)' : 'Business Documents (व्यवसाय कागदपत्रे)'}
            </h3>
            <div className="grid gap-2">
              {documents[applicantType].map((doc, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FileText className="w-4 h-4 text-orange-600" />
                  <span className="text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Property/Other Documents */}
        {documents?.property && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {service.category === 'loan' ? 'Property Documents (मालमत्तेचे कागदपत्रे)' : 'Additional Documents'}
            </h3>
            <div className="grid gap-2">
              {documents.property.map((doc, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FileText className="w-4 h-4 text-orange-600" />
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
    <div className="min-h-screen bg-gray-50">
      {/* Header top */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
                {/* <span className="text-sm">Back</span> */}
              </button>

              {/* <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-orange-600 border border-gray-100">
                <IconComponent className="w-6 h-6" />
              </div> */}

              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">{service.name}</h1>
                <p className="text-sm text-gray-600">{service.marathiName}</p>
                {service.category === 'service' && (
                  <span className="inline-block bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full mt-2">
                    Service
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>

              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-3 py-2 bg-orange-600 text-white rounded-lg text-sm hover:bg-orange-700 transition"
                title="Download PDF"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Page content — single column (no sidebar) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" ref={pageRef}>
        {/* Overview */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Overview</h2>
          <p className="text-gray-600">{service.description}</p>

          {/* Key metrics */}
          {service.category === 'loan' && (
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <div className="text-xl font-bold text-gray-900">{service.interestRate}</div>
                <div className="text-xs text-gray-500 mt-1">Interest Rate</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <div className="text-xl font-bold text-gray-900">{service.maxAmount}</div>
                <div className="text-xs text-gray-500 mt-1">Max Amount</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <div className="text-xl font-bold text-gray-900">{service.tenure}</div>
                <div className="text-xs text-gray-500 mt-1">Tenure</div>
              </div>
            </div>
          )}

          {/* Service metrics */}
          {service.category === 'service' && (
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <div className="text-xl font-bold text-gray-900">{service.duration}</div>
                <div className="text-xs text-gray-500 mt-1">Processing Time</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <div className="text-xl font-bold text-gray-900">{service.cost}</div>
                <div className="text-xs text-gray-500 mt-1">Starting Cost</div>
              </div>
            </div>
          )}
        </section>

        {/* Subtypes (if any) */}
        {service.subtypes && service.subtypes.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Sub-types</h3>
            <div className="grid gap-3">
              {service.subtypes.map((subtype, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedSubtype(selectedSubtype?.id === subtype.id ? null : subtype)}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${
                    selectedSubtype?.id === subtype.id ? 'border-orange-300 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                  } cursor-pointer transition`}
                >
                  <div className="mt-1">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{subtype.name}</div>
                    <div className="text-sm text-gray-500">{subtype.marathiName}</div>
                    {subtype.description && <div className="text-sm text-gray-600 mt-1">{subtype.description}</div>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Documents */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Required Documents</h3>

            {service.category === 'loan' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setApplicantType('salaried')}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${applicantType === 'salaried' ? 'bg-orange-100 text-orange-700' : 'bg-gray-50 text-gray-700'}`}
                >
                  Salaried
                </button>
                <button
                  onClick={() => setApplicantType('business')}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${applicantType === 'business' ? 'bg-orange-100 text-orange-700' : 'bg-gray-50 text-gray-700'}`}
                >
                  Business
                </button>
              </div>
            )}
          </div>

          <div>
            {renderDocuments()}
          </div>
        </section>

        {/* Process */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Process</h3>
          <div className="space-y-3">
            {service.process?.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 text-center flex items-center justify-center text-sm font-semibold text-gray-700">
                  {idx + 1}
                </div>
                <div className="text-gray-700">{step}</div>
              </div>
            ))}

            {!service.process && <div className="text-sm text-gray-500">Process details are not available.</div>}
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits</h3>
          <div className="grid gap-3">
            {service.benefits?.map((b, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div className="text-gray-700">{b}</div>
              </div>
            ))}
            {!service.benefits && <div className="text-sm text-gray-500">No benefits listed.</div>}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Ready to proceed?</h3>
          <p className="text-gray-600 mb-4">Our advisors can help you with documentation and quick processing.</p>

          <div className="flex text-center flex-col sm:flex-row gap-3">
            <Link to="/apply" className="px-4 py-2 rounded-md bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 transition">
              Apply Now
            </Link>

            <a href="tel:9850366753" className="px-4 py-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 flex items-center gap-2 justify-center">
              <Phone className="w-4 h-4" />
              Call: 9850366753
            </a>

            <button
              onClick={handleShare}
              className="px-4 py-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 flex items-center gap-2 justify-center"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>

            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 rounded-md bg-orange-50 text-orange-700 border border-orange-100 text-sm font-semibold"
            >
              <Download className="w-4 h-4 inline mr-2" /> Download PDF
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LoanDetails;
