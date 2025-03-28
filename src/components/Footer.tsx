import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-gradient-to-br from-teal-600 to-green-500 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={logo} 
                alt="Olives Logo" 
                className="h-12 w-auto"
              />
              <span className="text-xl font-bold">
                Olives Family Day Home Agency
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Hours of Operation</h3>
            <ul className="space-y-2">
              <li>Monday - Friday: 8:30 AM - 4:30 PM</li>
              <li>Saturday - Sunday: Closed</li>
            </ul>
            <div className="space-y-2 mt-4">
              <Link 
                to="/educator-login" 
                onClick={scrollToTop}
                className="inline-block w-full px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-center"
              >
                Educator Login
              </Link>
              <Link 
                to="/employee-login" 
                onClick={scrollToTop}
                className="inline-block w-full px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-center"
              >
                Employee Login
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" onClick={scrollToTop} className="hover:text-teal-200">Home</Link></li>
              <li><Link to="/about" onClick={scrollToTop} className="hover:text-teal-200">About</Link></li>
              <li><Link to="/registration" onClick={scrollToTop} className="hover:text-teal-200">Find A Day Home</Link></li>
              <li><Link to="/open-dayhome" onClick={scrollToTop} className="hover:text-teal-200">Open A Day Home</Link></li>
              <li><Link to="/contact" onClick={scrollToTop} className="hover:text-teal-200">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <p className="flex items-center space-x-2">
                <Phone size={16} />
                <span>(587) 889-3261</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail size={16} />
                <span>contact@olivesfamilydayhome.ca</span>
              </p>
              <p className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Calgary, Alberta</span>
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-teal-500 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Olives Family Day Home Agency. All rights reserved.</p>
          <p className="text-sm mt-2 text-teal-100">
            Website design and strategy by <a href="https://www.kettsefi.ca" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">Kettsefi Technologies Inc.</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
