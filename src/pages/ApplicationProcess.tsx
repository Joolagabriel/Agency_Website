import React from 'react';
import { ClipboardList, FileCheck, UserCheck, Home, BookOpen, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ApplicationProcess() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-teal-700">Application Process</h1>
        
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
            <p className="text-lg text-gray-700">
              Becoming a day home provider with Olives Family Day Home Agency is a straightforward process. 
              We're here to guide you through each step and help you start your rewarding career in childcare.
            </p>
          </div>

          {/* Application Steps */}
          <div className="space-y-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="bg-teal-100 p-3 rounded-full">
                  <ClipboardList className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-teal-700">1. Initial Application</h3>
                  <p className="text-gray-700">
                    Complete our online <Link to="/contact" className="text-teal-600 hover:text-teal-700 underline">application form</Link> or <Link to="/contact" className="text-teal-600 hover:text-teal-700 underline">contact us</Link> to express your interest. 
                    We'll review your application and get in touch to discuss the next steps.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="bg-teal-100 p-3 rounded-full">
                  <FileCheck className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-teal-700">2. Documentation</h3>
                  <p className="text-gray-700">Submit required documents:</p>
                  <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                    <li>Criminal Record Check with Vulnerable Sector Search</li>
                    <li>Child Intervention Record Check</li>
                    <li>First Aid Certificate (including infant/child CPR)</li>
                    <li>Three professional references</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="bg-teal-100 p-3 rounded-full">
                  <UserCheck className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-teal-700">3. Interview</h3>
                  <p className="text-gray-700">
                    Meet with our team to discuss your experience, goals, and vision for your day home. 
                    We'll answer any questions you have about joining our agency.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="bg-teal-100 p-3 rounded-full">
                  <Home className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-teal-700">4. Home Safety Check</h3>
                  <p className="text-gray-700">
                    We'll conduct a thorough safety inspection of your home to ensure it meets all 
                    provincial requirements for childcare. We'll provide guidance on any necessary modifications.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="bg-teal-100 p-3 rounded-full">
                  <BookOpen className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-teal-700">5. Orientation & Training</h3>
                  <p className="text-gray-700">
                    Complete our comprehensive orientation program covering policies, procedures, 
                    and best practices in childcare.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="bg-teal-100 p-3 rounded-full">
                  <Calendar className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-teal-700">6. Opening Your Day Home</h3>
                  <p className="text-gray-700">
                    Once all requirements are met, we'll help you prepare for opening day and 
                    begin matching you with families seeking childcare.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-teal-50 p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-teal-700">Start Your Journey Today</h2>
            <p className="text-gray-700 mb-6">
              Ready to begin your career as a day home provider? Contact us to start your application process.
            </p>
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
