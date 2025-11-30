import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import LoanDetails from './Pages/LoanDetails';
import Apply from './Pages/Apply';
import Header from './Components/Header';
import Footer from './Components/Footer';
import './App.css';
import ScrollToTop from './Components/ScrollToTop';
import About from './Pages/About';

function App() {
  return (



    <div className="min-h-screen bg-gray-50">
      <Header />
      <ScrollToTop /> {/* This fixes scrolling issue */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loan/:loanId" element={<LoanDetails />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <Footer />
    </div>

  );
}

export default App;
