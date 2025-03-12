import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { PhoneInput } from '../components/PhoneInput';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

// Initialize EmailJS
emailjs.init("yIwujzVKRxyNqnaUe");

export default function Registration() {
  const [formData, setFormData] = useState({
    parentFirstName: '',
    parentLastName: '',
    email: '',
    phone: '',
    childName: '',
    childAge: '',
    startDate: '',
    schedule: '',
    location: '',
    additionalInfo: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      phone: value
    }));
  };

  const handleLocationChange = (option: any) => {
    setFormData(prev => ({
      ...prev,
      location: option.label
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(
        'service_3j52x8r',
        'template_ojrhyt1',
        {
          from_name: `${formData.parentFirstName} ${formData.parentLastName}`,
          from_email: formData.email,
          phone: formData.phone,
          subject: 'New Day Home Registration',
          child_name: formData.childName,
          child_age: formData.childAge,
          start_date: formData.startDate,
          schedule: formData.schedule,
          location: formData.location,
          additional_info: formData.additionalInfo,
          to_email: 'contact@olivesfamilydayhome.ca'
        }
      );
      setStatus('success');
      setFormData({
        parentFirstName: '',
        parentLastName: '',
        email: '',
        phone: '',
        childName: '',
        childAge: '',
        startDate: '',
        schedule: '',
        location: '',
        additionalInfo: ''
      });
    } catch (error) {
      setStatus('error');
      console.error('Failed to send registration:', error);
    }
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-teal-700">Register for Child Care</h1>
        
        <div className="max-w-4xl mx-auto">
          {/* Introduction Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 text-teal-700">Looking for Quality Child Care?</h2>
            <p className="text-gray-700 mb-6">
              We understand that finding the right child care is one of the most important decisions you'll make for your family. 
              Our registration process is designed to help us understand your needs and match you with the perfect day home provider.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Licensed and approved day homes</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Qualified and trained providers</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Safe and nurturing environments</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Ongoing support and monitoring</span>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-teal-700">Registration Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Parent Information */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Parent Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="parentFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="parentFirstName"
                      name="parentFirstName"
                      value={formData.parentFirstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="parentLastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="parentLastName"
                      name="parentLastName"
                      value={formData.parentLastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <PhoneInput
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Child Information */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Child Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="childName" className="block text-sm font-medium text-gray-700 mb-1">
                      Child's Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="childName"
                      name="childName"
                      value={formData.childName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="childAge" className="block text-sm font-medium text-gray-700 mb-1">
                      Child's Age <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="childAge"
                      name="childAge"
                      value={formData.childAge}
                      onChange={handleChange}
                      min="0"
                      max="12"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Care Requirements */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Care Requirements</h3>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Desired Start Date <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="schedule" className="block text-sm font-medium text-gray-700 mb-1">
                      Care Schedule Needed <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="schedule"
                      name="schedule"
                      value={formData.schedule}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select schedule</option>
                      <option value="full-time">Full Time (Monday-Friday)</option>
                      <option value="part-time">Part Time</option>
                      <option value="flexible">Flexible Schedule</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Location <span className="text-red-600">*</span>
                    </label>
                    <GooglePlacesAutocomplete
                      apiKey="AIzaSyBn57Dhki8_CT34NgLN5S32o6uQ44Q2rRg"
                      selectProps={{
                        value: formData.location ? { label: formData.location, value: formData.location } : null,
                        onChange: handleLocationChange,
                        placeholder: "Enter your preferred area/community",
                        className: "w-full"
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Information
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Please share any additional requirements or information that will help us find the right day home for your child"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    ></textarea>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  status === 'sending' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {status === 'sending' ? 'Submitting...' : 'Submit Registration'}
              </button>

              {status === 'success' && (
                <p className="text-green-600 text-center mt-4">Registration submitted successfully!</p>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-center mt-4">Failed to submit registration. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}