import * as React from "react";
import { motion } from "framer-motion";

interface ARVisualizationProps {
  mode: 'destination' | 'room' | 'navigation' | 'landmark';
  className?: string;
}

const ARVisualization: React.FC<ARVisualizationProps> = ({ mode, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* AR Visualization Container */}
      <div className="aspect-[3/4] bg-gradient-to-br from-blue-900 to-indigo-900 rounded-xl overflow-hidden shadow-lg relative">
        {/* AR Interface Elements */}
        <div className="absolute inset-0 p-4 flex flex-col">
          {/* AR Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>AR View</span>
            </div>
            <div className="flex space-x-2">
              <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* AR Content based on mode */}
          <div className="flex-1 flex items-center justify-center">
            {mode === 'destination' && <DestinationPreview />}
            {mode === 'room' && <RoomVisualization />}
            {mode === 'navigation' && <StreetNavigation />}
            {mode === 'landmark' && <LandmarkRecognition />}
          </div>
          
          {/* AR Footer */}
          <div className="mt-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <div className="flex justify-between items-center">
                <div className="text-white text-sm font-medium">
                  {mode === 'destination' && 'Eiffel Tower, Paris'}
                  {mode === 'room' && 'Deluxe Suite, Grand Hotel'}
                  {mode === 'navigation' && 'Walking to Notre Dame'}
                  {mode === 'landmark' && 'Colosseum, Rome'}
                </div>
                <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                  {mode === 'destination' && 'Explore'}
                  {mode === 'room' && 'Book Now'}
                  {mode === 'navigation' && 'Follow'}
                  {mode === 'landmark' && 'Details'}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* AR Visualization Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* This is where the 3D content would be rendered */}
          {/* For now, we'll use placeholder elements */}
          <div className="relative w-full h-full">
            {mode === 'destination' && (
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511739001486-6bfe10ce785f')] bg-cover bg-center opacity-40"></div>
            )}
            {mode === 'room' && (
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590490360182-c33d57733427')] bg-cover bg-center opacity-40"></div>
            )}
            {mode === 'navigation' && (
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503917988258-f87a78e3c995')] bg-cover bg-center opacity-40"></div>
            )}
            {mode === 'landmark' && (
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552832230-c0197dd311b5')] bg-cover bg-center opacity-40"></div>
            )}
          </div>
        </div>
      </div>
      
      {/* AR Controls */}
      <div className="mt-4 flex justify-center">
        <div className="bg-white rounded-full shadow-md p-1 flex space-x-1">
          <button className={`w-8 h-8 rounded-full flex items-center justify-center ${mode === 'destination' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button className={`w-8 h-8 rounded-full flex items-center justify-center ${mode === 'room' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>
          <button className={`w-8 h-8 rounded-full flex items-center justify-center ${mode === 'navigation' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </button>
          <button className={`w-8 h-8 rounded-full flex items-center justify-center ${mode === 'landmark' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// AR Mode Components
const DestinationPreview: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      {/* Information Points */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer"
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-white font-bold">1</span>
      </motion.div>
      
      <motion.div 
        className="absolute top-1/3 right-1/3 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer"
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
      >
        <span className="text-white font-bold">2</span>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer"
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ repeat: Infinity, duration: 2, delay: 1 }}
      >
        <span className="text-white font-bold">3</span>
      </motion.div>
      
      {/* Info Card */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-lg p-3 w-4/5">
        <h3 className="text-white text-sm font-medium">Eiffel Tower</h3>
        <p className="text-blue-100 text-xs">Iconic wrought-iron lattice tower on the Champ de Mars in Paris, France.</p>
      </div>
    </div>
  );
};

const RoomVisualization: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      {/* Room Measurements */}
      <div className="absolute top-1/4 left-1/4 right-1/4 h-px bg-white/50 flex items-center justify-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-0.5 text-white text-xs">
          4.5m
        </div>
      </div>
      
      <div className="absolute top-1/4 bottom-1/4 left-1/4 w-px bg-white/50 flex items-center justify-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-0.5 text-white text-xs">
          3.2m
        </div>
      </div>
      
      {/* Furniture Placement */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-12 border-2 border-dashed border-white/70 rounded-sm"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-full px-2 py-0.5 text-white text-xs whitespace-nowrap">
          King Size Bed
        </div>
      </motion.div>
      
      {/* Info Card */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-lg p-3 w-4/5">
        <h3 className="text-white text-sm font-medium">Deluxe Suite</h3>
        <p className="text-blue-100 text-xs">Spacious room with king-size bed, en-suite bathroom, and city view.</p>
      </div>
    </div>
  );
};

const StreetNavigation: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      {/* Direction Arrow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
        </svg>
      </motion.div>
      
      {/* Distance Indicator */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
        <span className="font-medium">250m</span> ahead
      </div>
      
      {/* Points of Interest */}
      <div className="absolute top-1/3 right-8 flex items-center">
        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
          <span className="text-white text-xs">Café de Paris</span>
        </div>
      </div>
      
      <div className="absolute bottom-1/3 left-8 flex items-center">
        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
          <span className="text-white text-xs">Hotel Luxe</span>
        </div>
      </div>
      
      {/* Info Card */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-lg p-3 w-4/5">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-white text-sm font-medium">Notre Dame</h3>
            <p className="text-blue-100 text-xs">ETA: 5 minutes</p>
          </div>
          <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            Directions
          </button>
        </div>
      </div>
    </div>
  );
};

const LandmarkRecognition: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      {/* Landmark Outline */}
      <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/4 border-2 border-blue-500 rounded-md"></div>
      
      {/* Recognition Indicator */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-6 h-6 border-2 border-blue-500 rounded-full flex items-center justify-center"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
      </motion.div>
      
      <motion.div 
        className="absolute top-1/4 right-1/4 w-6 h-6 border-2 border-blue-500 rounded-full flex items-center justify-center"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
      >
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/4 left-1/4 w-6 h-6 border-2 border-blue-500 rounded-full flex items-center justify-center"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ repeat: Infinity, duration: 2, delay: 1 }}
      >
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-6 h-6 border-2 border-blue-500 rounded-full flex items-center justify-center"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ repeat: Infinity, duration: 2, delay: 1.5 }}
      >
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
      </motion.div>
      
      {/* Info Card */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-lg p-3 w-4/5">
        <h3 className="text-white text-sm font-medium">Colosseum, Rome</h3>
        <p className="text-blue-100 text-xs">Built in 70-80 AD, the largest ancient amphitheater ever built.</p>
        <div className="mt-2 flex justify-between">
          <div className="text-xs text-blue-100">
            <span className="text-yellow-400">★★★★★</span> 4.8/5
          </div>
          <div className="text-xs text-blue-100">
            Open: 8:30 AM - 7:00 PM
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARVisualization;
