import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { getConstants } from "../lib/getconstants";
import { useTranslation } from "react-i18next";

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const { SITE_NAME, SITE_DESCRIPTION, HERO_FEATURES } = getConstants(t);
  return (
    <div className="relative min-h-screen flex items-center pt-24 pb-12">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Hero Image Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: 'url("/images/hero-background.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/60"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Plan Your Perfect Trip with AR & AI Technology
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-lg">
              {SITE_DESCRIPTION}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <Button size="lg">Get Started</Button>
              <Button variant="outline" size="lg">Watch Demo</Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {HERO_FEATURES.map((feature, index) => (
                <motion.div 
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  className="flex items-start"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mr-3 flex-shrink-0">
                    <HeroFeatureIcon id={feature.id} className="w-5 h-5 text-blue-200" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">{feature.name}</h3>
                    <p className="text-blue-200 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Hero App Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Phone frame */}
              <div className="relative w-[280px] h-[580px] bg-gray-900 rounded-[3rem] border-[14px] border-gray-900 shadow-2xl overflow-hidden">
                {/* App screen */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 overflow-hidden">
                  {/* App content */}
                  <div className="p-4">
                    {/* App header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-600 font-bold text-sm mr-2">
                          YTP
                        </div>
                        <span className="text-white font-medium">{SITE_NAME}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* App content */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-2">Your Paris Trip</h3>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>June 15-22, 2025</span>
                        </div>
                        <div className="flex space-x-2 mb-3">
                          <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Itinerary</div>
                          <div className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">AI Optimized</div>
                        </div>
                        <div className="h-32 bg-blue-50 rounded-lg mb-3 flex items-center justify-center">
                          <div className="text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm text-blue-600">View in AR</span>
                          </div>
                        </div>
                        <button className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-white">Recommended</h3>
                        <span className="text-xs text-blue-100">View All</span>
                      </div>
                      <div className="flex space-x-3 overflow-x-auto pb-2">
                        <div className="w-24 flex-shrink-0">
                          <div className="h-24 bg-blue-400/20 rounded-lg mb-2"></div>
                          <div className="text-xs text-white">Eiffel Tower</div>
                        </div>
                        <div className="w-24 flex-shrink-0">
                          <div className="h-24 bg-blue-400/20 rounded-lg mb-2"></div>
                          <div className="text-xs text-white">Louvre Museum</div>
                        </div>
                        <div className="w-24 flex-shrink-0">
                          <div className="h-24 bg-blue-400/20 rounded-lg mb-2"></div>
                          <div className="text-xs text-white">Notre Dame</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button className="flex-1 bg-white/10 backdrop-blur-sm text-white rounded-lg py-2 text-sm font-medium">
                        Explore
                      </button>
                      <button className="flex-1 bg-white/10 backdrop-blur-sm text-white rounded-lg py-2 text-sm font-medium">
                        My Trips
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Phone notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-3xl"></div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-50 blur-2xl"></div>
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-50 blur-2xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Component for hero feature icons
const HeroFeatureIcon: React.FC<{ id: string; className?: string }> = ({ id, className }) => {
  switch (id) {
    case 'ar':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'ai':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'personalized':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case 'offline':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    case 'collaborative':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case 'secure':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      );
  }
};

export default HeroSection;
