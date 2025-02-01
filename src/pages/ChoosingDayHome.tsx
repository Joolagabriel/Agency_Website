import React from 'react';

export default function ChoosingDayHome() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-teal-700">Choosing a Day Home</h1>
          
          <div className="space-y-6 text-lg text-gray-700">
            <p>
              Choosing the right day home for your child is a significant decision, and we understand the importance of feeling confident in your choice. That's why every day home in our network undergoes a thorough screening process before joining our agency. We conduct safety audits, complete criminal record checks, and offer ongoing training to each provider. This way, you can rest assured that any day home you consider through us is held to the highest standards of care.
            </p>
            
            <p>
              Beyond our screening, we encourage you to consider other key factors when selecting a day home. Ask about the daily schedule, the educator's qualifications and experience, how they handle emergencies, and the ways they communicate with parents. Understanding these details will help you find a provider who aligns with your family's values and your child's unique needs.
            </p>
            
            <p>
              Use our guide below as a starting point to ensure you ask all the essential questions—then choose a day home that truly feels right for both you and your child.
            </p>

            <div className="mt-8">
              <a 
                href="https://www.alberta.ca/about-child-care-in-alberta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-teal-600 hover:text-teal-700 font-semibold transition-colors"
              >
                A Guide to Licensed and Approved Childcare in Alberta
                <svg 
                  className="ml-2 w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}