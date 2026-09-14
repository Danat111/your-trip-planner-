import * as React from "react";
import HeroSection from "../components/HeroSection";
import FeaturesGrid from "../components/FeaturesGrid";
import ARFeatureSection from "../components/ARFeatureSection";
import AIFeatureSection from "../components/AIFeatureSection";
import AdditionalFeaturesSection from "../components/AdditionalFeaturesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import FAQSection from "../components/FAQSection";
import BlogPreviewSection from "../components/BlogPreviewSection";
import ContactSection from "../components/ContactSection";
import TripPlanner from "../components/TripPlanner";

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <TripPlanner />
      <FeaturesGrid />
      <ARFeatureSection />
      <AIFeatureSection />
      <AdditionalFeaturesSection />
      <TestimonialsSection />
      <FAQSection />
      <BlogPreviewSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
