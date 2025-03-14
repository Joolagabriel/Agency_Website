import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import ChoosingDayHome from './pages/ChoosingDayHome';
import Registration from './pages/Registration';
import Resources from './pages/Resources';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import OpenDayHome from './pages/OpenDayHome';
import WhyOurAgency from './pages/WhyOurAgency';
import ApplicationProcess from './pages/ApplicationProcess';
import EducatorLogin from './pages/EducatorLogin';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/choosing-dayhome" element={<ChoosingDayHome />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/open-dayhome" element={<OpenDayHome />} />
            <Route path="/open-dayhome/why-our-agency" element={<WhyOurAgency />} />
            <Route path="/open-dayhome/application-process" element={<ApplicationProcess />} />
            <Route path="/open-dayhome/resources" element={<Resources />} />
            <Route path="/educator-login" element={<EducatorLogin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;