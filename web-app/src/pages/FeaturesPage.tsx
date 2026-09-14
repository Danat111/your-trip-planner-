import * as React from "react";
import { Section } from "../components/ui/Section";
import FeaturesGrid from "../components/FeaturesGrid";
import ARFeatureSection from "../components/ARFeatureSection";
import AIFeatureSection from "../components/AIFeatureSection";
import AdditionalFeaturesSection from "../components/AdditionalFeaturesSection";
import FAQSection from "../components/FAQSection";

const FeaturesPage: React.FC = () => {
  return (
    <div>
      <Section variant="primary" spacing="xl">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Powerful Features for Modern Travelers
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto mb-12">
            Discover how Your Trip Planner combines cutting-edge technology with intuitive design to transform your travel experience.
          </p>
        </div>
      </Section>
      
      <FeaturesGrid />
      <ARFeatureSection />
      <AIFeatureSection />
      <AdditionalFeaturesSection />
      <FAQSection />
    </div>
  );
};

export default FeaturesPage;
