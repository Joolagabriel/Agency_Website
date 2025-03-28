import React from 'react';
import { Book, Calendar, FileText, Users, Lightbulb, Download } from 'lucide-react';

export default function EducatorsResources() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-teal-700">Educator's Resources</h1>
        
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
            <p className="text-lg text-gray-700">
              Access our comprehensive collection of resources designed to support your success as a day home provider. 
              These tools and materials will help you create an engaging, safe, and nurturing environment for children.
            </p>
          </div>

          {/* Resource Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <Book className="w-8 h-8 text-teal-600" />
                <h2 className="text-xl font-bold text-teal-700">Program Planning</h2>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-teal-600" />
                  <a href="#" className="text-gray-700 hover:text-teal-600">Daily Schedule Template</a>
                </li>
                <li className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-teal-600" />
                  <a href="#" className="text-gray-700 hover:text-teal-600">Activity Planning Guide</a>
                </li>
                <li className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-teal-600" />
                  <a href="#" className="text-gray-700 hover:text-teal-600">Learning Through Play Guide</a>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <Calendar className="w-8 h-8 text-teal-600" />
                <h2 className="text-xl font-bold text-teal-700">Documentation</h2>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-teal-600" />
                  <a href="#" className="text-gray-700 hover:text-teal-600">Attendance Record Template</a>
                </li>
                <li className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-teal-600" />
                  <a href="#" className="text-gray-700 hover:text-teal-600">Incident Report Form</a>
                </li>
                <li className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-teal-600" />
                  <a href="#" className="text-gray-700 hover:text-teal-600">Monthly Report Template</a>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <FileText className="w-8 h-8 text-teal-600" />
                <h2 className="text-xl font-bold text-teal-700">Policies & Procedures</h2>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-teal-600" />
                  <a href="#" className="text-gray-700 hover:text-teal-600">Parent Handbook Template</a>
                </li>
                <li className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-teal-600" />
                  <a href="#" className="text-gray-700 hover:text-teal-600">Emergency Procedures Guide</a>
                </li>
                <li className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-teal-600" />
                  <a href="#" className="text-gray-700 hover:text-teal-600">Health & Safety Guidelines</a>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <Users className="w-8 h-8 text-teal-600" />
                <h2 className="text-xl font-bold text-teal-700">Parent Communication</h2>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-teal-600" />
                  <a href="#" className="text-gray-700 hover:text-teal-600">Newsletter Templates</a>
                </li>
                <li className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-teal-600" />
                  <a href="#" className="text-gray-700 hover:text-teal-600">Daily Report Forms</a>
                </li>
                <li className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-teal-600" />
                  <a href="#" className="text-gray-700 hover:text-teal-600">Parent Meeting Guidelines</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Professional Development Section */}
          <div className="bg-teal-50 p-8 rounded-lg shadow-lg mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <Lightbulb className="w-8 h-8 text-teal-600" />
              <h2 className="text-2xl font-bold text-teal-700">Professional Development</h2>
            </div>
            <div className="space-y-6">
              <p className="text-gray-700">
                Access our library of professional development resources to enhance your skills and knowledge:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-teal-700 mb-2">Online Workshops</h3>
                  <p className="text-gray-600">Regular training sessions on various childcare topics</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-teal-700 mb-2">Resource Library</h3>
                  <p className="text-gray-600">Educational materials and activity ideas</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-teal-700 mb-2">Mentorship Program</h3>
                  <p className="text-gray-600">Connect with experienced providers</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-teal-700 mb-2">Community Forums</h3>
                  <p className="text-gray-600">Share experiences and best practices</p>
                </div>
              </div>
            </div>
          </div>

          {/* Note Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-gray-700">
              Need additional resources or support? Contact your consultant for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
