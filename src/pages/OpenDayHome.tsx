import React from 'react';
import { CheckCircle, Heart, Shield, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OpenDayHome() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-teal-700">Open a Day Home</h1>
        
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
            <h2 className="text-2xl font-bold mb-4 text-teal-700">Start Your Rewarding Career in Child Care</h2>
            <p className="text-gray-700 mb-6">
              Join Olives Family Day Home Agency and become part of a supportive community dedicated to providing quality child care. 
              We offer comprehensive support, training, and resources to help you build a successful day home business.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Ongoing support and mentorship</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Professional development opportunities</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Marketing and client referrals</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Competitive rates and benefits</span>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Heart className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-teal-700">Fulfilling Career</h3>
              <p className="text-gray-600">Make a difference in children's lives while building your own business</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Shield className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-teal-700">Full Support</h3>
              <p className="text-gray-600">Receive guidance, resources, and backing from our experienced team</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <GraduationCap className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-teal-700">Growth Opportunities</h3>
              <p className="text-gray-600">Access training and development to enhance your skills</p>
            </div>
          </div>

          {/* Requirements Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
            <h2 className="text-2xl font-bold mb-6 text-teal-700">Requirements to Open a Day Home</h2>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Must be 18 years or older</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Clear criminal record check and child intervention check</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Current First Aid certification including infant/child CPR</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Safe and child-friendly home environment</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Commitment to ongoing professional development</span>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="bg-teal-50 p-8 rounded-lg shadow-lg mb-12">
            <h2 className="text-2xl font-bold mb-6 text-teal-700">How We Support You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Business Support</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Marketing and advertising</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Parent referrals</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Administrative assistance</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Professional Development</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Regular training sessions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Resource materials</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Mentorship opportunities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 text-teal-700">Ready to Get Started?</h2>
            <p className="text-gray-700 mb-8">
              Take the first step towards your new career in child care. Contact us today to learn more about becoming a day home provider with Olives Family Day Home Agency.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}