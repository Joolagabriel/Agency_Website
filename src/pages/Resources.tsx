import React from 'react';
import { Link } from 'react-router-dom';

export default function Resources() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-teal-700">Resources</h1>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <p className="text-lg text-gray-700 mb-8">
              We're currently assembling a wide range of insightful resources—including programs, 
              support materials, informative videos, and useful links. Stay tuned for exciting 
              updates as we expand our collection!
            </p>
            <p className="text-gray-700 mb-4">Any enquiries, please feel free to</p>
            <Link
              to="/contact"
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
