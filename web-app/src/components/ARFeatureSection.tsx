import * as React from "react";
import { motion } from "framer-motion";
import { Section } from "./ui/Section";
import ARVisualization from "./ARVisualization";
import { getConstants } from "../lib/getconstants";
import { apiAggregator } from "../lib/api-integration/api-aggregator";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface ARFeature {
  id: string;
  name: string;
  description: string;
  realWorldExamples?: string[];
}

const ARFeatureSection: React.FC = () => {
  const { t } = useTranslation();
  const { AR_FEATURES } = getConstants(t);
  const [activeMode, setActiveMode] = React.useState<'destination' | 'room' | 'navigation' | 'landmark'>('destination');
  const [features, setFeatures] = useState<ARFeature[]>(AR_FEATURES);
  const [loading, setLoading] = useState(false);

  // Fetch real data to enhance AR features with actual examples
  useEffect(() => {
    const fetchARFeatureData = async () => {
      setLoading(true);
      try {
        // Get popular destinations from API for destination preview examples
        const destinationsResult = await apiAggregator.searchPlaces({
          query: "famous landmarks Paris",
          type: "tourist_attraction"
        });
        
        // Get hotel data for room visualization examples
        const hotelsResult = await apiAggregator.searchHotels({
          cityCode: "PAR", // Paris as example
          checkInDate: "2025-07-20",
          checkOutDate: "2025-07-25",
          adults: 2
        });
        
        if (destinationsResult.success) {
          // Initialize landmarks array before using it
          const landmarks = destinationsResult.data?.results?.slice(0, 3).map((place: any) => place.name) || [];
          
          // Update features with real data examples
          const updatedFeatures = features.map(feature => {
            switch (feature.id) {
              case 'destination':
                return {
                  ...feature,
                  realWorldExamples: landmarks,
                  description: `${feature.description} Preview famous landmarks like ${landmarks.join(', ')} before your trip.`
                };
              case 'room':
                const hotelNames = hotelsResult.success && hotelsResult.data?.data 
                  ? hotelsResult.data.data.slice(0, 2).map((hotel: any) => hotel.hotel.name) 
                  : [];
                return {
                  ...feature,
                  realWorldExamples: hotelNames,
                  description: `${feature.description} Visualize your stay at top accommodations like ${hotelNames.join(' or ')}.`
                };
              case 'navigation':
                return {
                  ...feature,
                  description: `${feature.description} Get real-time AR directions between attractions in your destination.`
                };
              case 'landmark':
                return {
                  ...feature,
                  realWorldExamples: landmarks,
                  description: `${feature.description} Identify and learn about ${landmarks.length}+ landmarks in real-time.`
                };
              default:
                return feature;
            }
          });
          
          setFeatures(updatedFeatures);
        }
      } catch (error) {
        console.error("Error fetching AR feature data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchARFeatureData();
  }, []);

  return (
    <Section variant="default" spacing="xl" id="ar-features" 
      style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("/images/ar-visualization.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Augmented Reality Travel Experience</h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore destinations before you arrive, visualize accommodations, and navigate with confidence using our cutting-edge AR technology powered by real-time data.
          </p>
          
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.id}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${activeMode === feature.id ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'}`}
                onClick={() => setActiveMode(feature.id as any)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <ARFeatureIcon id={feature.id} className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.name}
                      {loading && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-full animate-pulse">
                          Loading live data...
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                    {feature.realWorldExamples && feature.realWorldExamples.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {feature.realWorldExamples.map((example, i) => (
                          <span key={i} className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                            {example}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <ARVisualization 
            mode={activeMode} 
            className="max-w-sm" 
          />
        </motion.div>
      </div>
    </Section>
  );
};

// Component for AR feature icons
const ARFeatureIcon: React.FC<{ id: string; className?: string }> = ({ id, className }) => {
  switch (id) {
    case 'destination':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'room':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
    case 'navigation':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      );
    case 'landmark':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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

export default ARFeatureSection;
