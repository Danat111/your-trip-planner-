import * as React from "react";
import { motion } from "framer-motion";
import { Section } from "./ui/Section";
import AIRecommendation from "./AIRecommendation";
import { getConstants } from "../lib/getconstants";
import { apiAggregator } from "../lib/api-integration/api-aggregator";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface AIFeature {
  id: string;
  name: string;
  description: string;
  examples?: string[];
}

const AIFeatureSection: React.FC = () => {
  const { t } = useTranslation();
  const { AI_FEATURES } = getConstants(t);
  const [activeFeature, setActiveFeature] = React.useState<'itinerary' | 'personalization' | 'prediction' | 'contextual'>('itinerary');
  const [features, setFeatures] = useState<AIFeature[]>(AI_FEATURES);
  const [loading, setLoading] = useState(false);

  // Fetch real data to enhance AI features with actual examples
  useEffect(() => {
    const fetchAIFeatureData = async () => {
      setLoading(true);
      try {
        // Get place data for recommendations
        const placesResult = await apiAggregator.searchPlaces({
          query: "famous landmarks Paris",
          type: "tourist_attraction"
        });
        
        // Get weather data for smart planning examples
        const weatherResult = await apiAggregator.getWeatherForecast({
          lat: 48.8566, // Paris latitude
          lon: 2.3522, // Paris longitude
          units: "metric"
        });
        
        if (placesResult.success) {
          // Update features with real data examples
          const updatedFeatures = features.map(feature => {
            switch (feature.id) {
              case 'itinerary':
                const destinations = placesResult.data?.results?.slice(0, 3).map((place: any) => place.name) || [];
                return {
                  ...feature,
                  examples: destinations,
                  description: `${feature.description} Our AI suggests attractions like ${destinations.join(', ')} based on your preferences.`
                };
              case 'personalization':
                return {
                  ...feature,
                  description: `${feature.description} Get personalized recommendations tailored to your unique travel style.`
                };
              case 'prediction':
                const weatherInfo = weatherResult.success && weatherResult.data?.list 
                  ? weatherResult.data.list.slice(0, 2).map((item: any) => 
                      `${item.weather[0].main} (${Math.round(item.main.temp)}°C)`
                    ) 
                  : [];
                return {
                  ...feature,
                  examples: weatherInfo,
                  description: `${feature.description} Plan around weather conditions like ${weatherInfo.join(' or ')}.`
                };
              case 'contextual':
                return {
                  ...feature,
                  description: `${feature.description} Get insider tips from locals and experienced travelers.`
                };
              default:
                return feature;
            }
          });
          
          setFeatures(updatedFeatures);
        }
      } catch (error) {
        console.error("Error fetching AI feature data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAIFeatureData();
  }, []);

  return (
    <Section variant="default" spacing="xl" id="ai-features"
      style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("/images/ai-recommendations.jpg")',
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
          className="order-2 lg:order-1"
        >
          <AIRecommendation 
            featureId={activeFeature} 
            className="max-w-md mx-auto" 
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="order-1 lg:order-2"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">AI-Powered Travel Recommendations</h2>
          <p className="text-xl text-gray-600 mb-8">
            Experience personalized travel planning with our advanced AI that learns your preferences and creates the perfect itinerary just for you.
          </p>
          
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.id}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${activeFeature === feature.id ? 'bg-indigo-50 border-l-4 border-indigo-500' : 'hover:bg-gray-50'}`}
                onClick={() => feature.id === 'itinerary' || feature.id === 'personalization' || feature.id === 'prediction' || feature.id === 'contextual' 
                  ? setActiveFeature(feature.id) 
                  : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <AIFeatureIcon id={feature.id} className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.name}
                      {loading && (
                        <span className="ml-2 text-xs bg-indigo-100 text-indigo-800 py-1 px-2 rounded-full animate-pulse">
                          Loading live data...
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                    {feature.examples && feature.examples.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {feature.examples.map((example, i) => (
                          <span key={i} className="inline-block bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded">
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
      </div>
    </Section>
  );
};

// Component for AI feature icons
const AIFeatureIcon: React.FC<{ id: string; className?: string }> = ({ id, className }) => {
  switch (id) {
    case 'personalization':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case 'itinerary':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      );
    case 'contextual':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case 'prediction':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
  }
};

export default AIFeatureSection;
