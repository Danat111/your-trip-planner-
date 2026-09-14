import * as React from "react";

interface AIRecommendationProps {
  featureId?: 'itinerary' | 'personalization' | 'prediction' | 'contextual';
  className?: string;
}

const AIRecommendation: React.FC<AIRecommendationProps> = ({ featureId = 'itinerary', className = '' }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <h3 className="text-xl font-bold mb-4">AI Travel Recommendations</h3>
      <div className="space-y-4">
        {featureId === 'itinerary' && (
          <div className="bg-blue-50 p-4 rounded-md">
            <h4 className="font-medium text-blue-700">Personalized Itinerary</h4>
            <p className="text-gray-700 mt-2">
              Based on your preferences, we recommend exploring the historic district on your first day, followed by the coastal trails on day two.
            </p>
          </div>
        )}
        
        {featureId === 'personalization' && (
          <div className="bg-indigo-50 p-4 rounded-md">
            <h4 className="font-medium text-indigo-700">Personalized Recommendations</h4>
            <p className="text-gray-700 mt-2">
              Based on your past trips, we've found activities that match your interests in adventure travel and cultural experiences.
            </p>
          </div>
        )}
        
        {featureId === 'prediction' && (
          <div className="bg-green-50 p-4 rounded-md">
            <h4 className="font-medium text-green-700">Predictive Analytics</h4>
            <p className="text-gray-700 mt-2">
              Our analysis suggests booking your flight now, as prices are predicted to increase by 15% in the next two weeks.
            </p>
          </div>
        )}
        
        {featureId === 'contextual' && (
          <div className="bg-purple-50 p-4 rounded-md">
            <h4 className="font-medium text-purple-700">Contextual Awareness</h4>
            <p className="text-gray-700 mt-2">
              There's a local festival happening during your stay. We've adjusted your itinerary to include this unique cultural experience.
            </p>
          </div>
        )}
        
        <div className="bg-green-50 p-4 rounded-md">
          <h4 className="font-medium text-green-700">Budget Optimization</h4>
          <p className="text-gray-700 mt-2">
            We've found 3 highly-rated restaurants within your budget range and 2 accommodations with special offers this week.
          </p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-md">
          <h4 className="font-medium text-purple-700">Local Insights</h4>
          <p className="text-gray-700 mt-2">
            Locals recommend visiting the central market on Thursday mornings for the freshest produce and authentic crafts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendation;
