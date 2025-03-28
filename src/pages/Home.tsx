import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80",
      alt: "Children playing with colorful blocks"
    },
    {
      url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80",
      alt: "Child drawing with crayons"
    },
    {
      url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80",
      alt: "Children laughing together"
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className="relative h-[600px] overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={image.url}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
              Welcome to Olives Family Day Home Agency
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in-up animation-delay-200">
              Nurturing Young Minds in a Safe and Loving Environment
            </p>
            <Link 
              to="/contact"
              onClick={scrollToTop}
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up animation-delay-400"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link 
              to="/registration"
              onClick={scrollToTop}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              <img 
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80"
                alt="Find a day home"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-teal-700">Find A Day Home</h3>
                <p className="text-gray-600">Find the perfect day home for your child in a safe and nurturing environment.</p>
              </div>
            </Link>
            <Link 
              to="/open-dayhome"
              onClick={scrollToTop}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              <img 
                src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80"
                alt="Open a day home"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-teal-700">Open A Day Home</h3>
                <p className="text-gray-600">Join our network of professional day home providers and start your own business.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
