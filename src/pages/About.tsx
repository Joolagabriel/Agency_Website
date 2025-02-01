import React from 'react';

export default function About() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-teal-700">About Us</h1>
          
          <div className="mb-12">
            <div className="space-y-6 text-lg text-gray-700">
              <p>
                Imagine the relief of knowing your child is in safe, nurturing hands—every single day. That's the vision that inspired Olives. We began with one simple goal: to ensure families across Alberta can find high-quality day homes that truly care for each child's well-being. Today, we proudly serve parents in the Calgary and Cochrane regions, working hand-in-hand with educators who diligently meet every Government of Alberta guideline and regulation.
              </p>
              <p>
                We know life can get hectic—and juggling work, home, and family demands is no small feat. Finding the right childcare shouldn't add to the stress. That's why we streamline the process, from reviewing applications to interviewing prospective educators, ensuring each one embodies the warmth, professionalism, and dedication your child deserves.
              </p>
              <p>
                Ready to take the next step? Get in touch with us, and we'll connect you with a government-approved childcare program that perfectly aligns with your family's needs. Let Olives guide you toward a stress-free, caring day home—one loving step at a time.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-teal-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-teal-700">Our Mission</h2>
              <p className="text-gray-700">
                To provide high-quality, affordable childcare that supports the development 
                of children while meeting the needs of working families.
              </p>
            </div>
            <div className="bg-teal-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-teal-700">Our Vision</h2>
              <p className="text-gray-700">
                To be the leading family day home agency in Calgary, known for excellence 
                in childcare and family support services.
              </p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80"
              alt="Toddler during activity time"
              className="w-full h-[300px] object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-teal-700">Our Values</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-teal-700">Safety First:</span>
                  <span>Ensuring the wellbeing of every child in our care</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-teal-700">Quality Care:</span>
                  <span>Providing exceptional childcare services</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-teal-700">Family Partnership:</span>
                  <span>Working together with families for the best outcomes</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-teal-700">Continuous Improvement:</span>
                  <span>Always striving to enhance our services</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}