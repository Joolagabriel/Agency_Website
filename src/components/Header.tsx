import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpenDayHomeDropdownOpen, setIsOpenDayHomeDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const mobileMenu = document.getElementById('mobile-menu');
      const menuButton = document.getElementById('menu-button');
      
      if (mobileMenu && menuButton && 
          !mobileMenu.contains(event.target as Node) && 
          !menuButton.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header>
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}>
        <div className="container mx-auto px-4 py-4">
          <nav className={`rounded-2xl transition-all duration-300 ${
            isScrolled 
              ? 'bg-gradient-to-br from-teal-600/20 to-green-500/20 backdrop-blur-sm shadow-lg' 
              : 'bg-gradient-to-br from-teal-600/10 to-green-500/10 backdrop-blur-[2px]'
          }`}>
            <div className="px-8">
              <div className="flex justify-between items-center h-20">
                <Link to="/" className="flex items-center space-x-3">
                  <img 
                    src={logo} 
                    alt="Olives Logo" 
                    className="h-12 w-auto"
                  />
                  <span className="text-2xl font-extrabold text-teal-900">
                    Olives Family Day Home Agency
                  </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                  <Link to="/" className="text-teal-900 font-bold hover:text-teal-950 transition-colors">Home</Link>
                  <Link to="/about" className="text-teal-900 font-bold hover:text-teal-950 transition-colors">About</Link>
                  
                  {/* Find A Day Home Dropdown */}
                  <div className="relative group">
                    <button 
                      className="flex items-center space-x-1 text-teal-900 font-bold hover:text-teal-950 transition-colors"
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      <span>Find A Day Home</span>
                      <ChevronDown size={20} />
                    </button>
                    <div 
                      className={`absolute left-0 mt-2 w-64 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                        isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      <div className="py-1">
                        <Link 
                          to="/choosing-dayhome"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-900"
                        >
                          Choosing A Day Home
                        </Link>
                        <Link 
                          to="/registration"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-900"
                        >
                          Registration
                        </Link>
                        <Link 
                          to="/resources"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-900"
                        >
                          Resources
                        </Link>
                        <Link 
                          to="/faq"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-900"
                        >
                          FAQ
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Open A Day Home Dropdown */}
                  <div className="relative group">
                    <button 
                      className="flex items-center space-x-1 text-teal-900 font-bold hover:text-teal-950 transition-colors"
                      onMouseEnter={() => setIsOpenDayHomeDropdownOpen(true)}
                      onMouseLeave={() => setIsOpenDayHomeDropdownOpen(false)}
                    >
                      <span>Open A Day Home</span>
                      <ChevronDown size={20} />
                    </button>
                    <div 
                      className={`absolute left-0 mt-2 w-64 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                        isOpenDayHomeDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}
                      onMouseEnter={() => setIsOpenDayHomeDropdownOpen(true)}
                      onMouseLeave={() => setIsOpenDayHomeDropdownOpen(false)}
                    >
                      <div className="py-1">
                        <Link 
                          to="/open-dayhome"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-900"
                        >
                          Overview
                        </Link>
                        <Link 
                          to="/open-dayhome/why-our-agency"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-900"
                        >
                          Why Our Agency?
                        </Link>
                        <Link 
                          to="/open-dayhome/application-process"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-900"
                        >
                          Application Process
                        </Link>
                        <Link 
                          to="/open-dayhome/resources"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-900"
                        >
                          Resources
                        </Link>
                      </div>
                    </div>
                  </div>

                  <Link 
                    to="/contact" 
                    className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Contact Us
                  </Link>
                </div>

                {/* Mobile Menu Button */}
                <button 
                  id="menu-button"
                  className="md:hidden text-teal-900 focus:outline-none"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div
              id="mobile-menu"
              className={`md:hidden transition-all duration-300 ease-in-out ${
                isMobileMenuOpen 
                  ? 'max-h-screen opacity-100 visible'
                  : 'max-h-0 opacity-0 invisible'
              }`}
            >
              <div className="px-8 py-4 space-y-4 bg-white rounded-b-2xl shadow-lg">
                <Link 
                  to="/" 
                  className="block text-teal-900 font-bold hover:text-teal-950"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className="block text-teal-900 font-bold hover:text-teal-950"
                  onClick={closeMobileMenu}
                >
                  About
                </Link>

                <div className="space-y-2">
                  <p className="font-bold text-teal-900">Find A Day Home</p>
                  <div className="pl-4 space-y-2">
                    <Link 
                      to="/choosing-dayhome" 
                      className="block text-gray-700 hover:text-teal-900"
                      onClick={closeMobileMenu}
                    >
                      Choosing A Day Home
                    </Link>
                    <Link 
                      to="/registration" 
                      className="block text-gray-700 hover:text-teal-900"
                      onClick={closeMobileMenu}
                    >
                      Registration
                    </Link>
                    <Link 
                      to="/resources" 
                      className="block text-gray-700 hover:text-teal-900"
                      onClick={closeMobileMenu}
                    >
                      Resources
                    </Link>
                    <Link 
                      to="/faq" 
                      className="block text-gray-700 hover:text-teal-900"
                      onClick={closeMobileMenu}
                    >
                      FAQ
                    </Link>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-bold text-teal-900">Open A Day Home</p>
                  <div className="pl-4 space-y-2">
                    <Link 
                      to="/open-dayhome" 
                      className="block text-gray-700 hover:text-teal-900"
                      onClick={closeMobileMenu}
                    >
                      Overview
                    </Link>
                    <Link 
                      to="/open-dayhome/why-our-agency" 
                      className="block text-gray-700 hover:text-teal-900"
                      onClick={closeMobileMenu}
                    >
                      Why Our Agency?
                    </Link>
                    <Link 
                      to="/open-dayhome/application-process" 
                      className="block text-gray-700 hover:text-teal-900"
                      onClick={closeMobileMenu}
                    >
                      Application Process
                    </Link>
                    <Link 
                      to="/open-dayhome/resources" 
                      className="block text-gray-700 hover:text-teal-900"
                      onClick={closeMobileMenu}
                    >
                      Resources
                    </Link>
                  </div>
                </div>

                <Link 
                  to="/contact" 
                  className="block bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg text-center transition-all duration-300"
                  onClick={closeMobileMenu}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* Spacer div to prevent content from jumping when nav becomes fixed */}
      <div className="h-32"></div>
    </header>
  );
}