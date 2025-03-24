import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import EmployeeLogin from './pages/EmployeeLogin';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Dashboard from './pages/Dashboard';

function AppContent() {
  const location = useLocation();

  const isDashboardRoute = (pathname: string) => {
    return pathname === '/dashboard' || pathname === '/employee-dashboard' || pathname.startsWith('/employee-dashboard/');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboardRoute(location.pathname) && <Header />}
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
          <Route path="/employee-login" element={<EmployeeLogin />} />
          <Route path="/employee-dashboard/*" element={<EmployeeDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      {!isDashboardRoute(location.pathname) && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;