import React from 'react';
import { CheckCircle, Award, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WhyOurAgency() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-teal-700">Why Choose Our Agency?</h1>
        
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
            <p className="text-lg text-gray-700 mb-6">
              At Olives Family Day Home Agency, we're committed to supporting our educators in providing exceptional childcare services. 
              Our agency stands out through our dedication to quality, support, and professional development.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <Award className="w-8 h-8 text-teal-600" />
                <h2 className="text-xl font-bold text-teal-700">Professional Support</h2>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Dedicated consultant support</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Regular check-ins and guidance</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">24/7 emergency assistance</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <Users className="w-8 h-8 text-teal-600" />
                <h2 className="text-xl font-bold text-teal-700">Business Growth</h2>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Marketing and advertising support</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Parent referrals and placement</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Business development resources</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="bg-teal-50 p-8 rounded-lg shadow-lg mb-12">
            <h2 className="text-2xl font-bold mb-6 text-teal-700">Additional Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Training & Development</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Regular professional development sessions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Access to educational resources</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Curriculum planning support</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Administrative Support</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Subsidy program assistance</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Paperwork and documentation help</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Insurance coverage guidance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-white p-8 rounded-lg shadow-lg">
            <Heart className="w-12 h-12 text-teal-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-teal-700">Ready to Join Our Community?</h2>
            <p className="text-gray-700 mb-6">
              Take the first step towards a rewarding career in childcare with Olives Family Day Home Agency.
            </p>
            <Link
              to="/open-dayhome/application-process"
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Start Your Application
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
