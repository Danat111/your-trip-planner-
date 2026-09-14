import * as React from "react";
import { Section } from "../components/ui/Section";
import { Card } from "../components/ui/Card";

const AboutPage: React.FC = () => {
  return (
    <div>
      <Section variant="primary" spacing="xl">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            About Your Trip Planner
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto mb-12">
            Revolutionizing travel planning with cutting-edge technology and a passion for exploration.
          </p>
        </div>
      </Section>
      
      <Section variant="default" spacing="lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-lg mb-4">
                Your Trip Planner was born from a simple idea: travel planning should be as enjoyable as the journey itself. Founded in 2023 by a team of travel enthusiasts and technology experts, we set out to create a platform that combines the latest in AR and AI technology with intuitive design.
              </p>
              <p className="text-lg mb-4">
                After countless hours of development and testing with real travelers, we launched a platform that transforms how people discover, plan, and experience destinations around the world.
              </p>
              <p className="text-lg">
                Today, Your Trip Planner helps thousands of travelers create unforgettable experiences with personalized recommendations, immersive previews, and seamless planning tools.
              </p>
            </div>
            <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 italic">Company Image Placeholder</p>
            </div>
          </div>
        </div>
      </Section>
      
      <Section variant="secondary" spacing="lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Mission</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl mb-6 text-center">
              We believe that travel has the power to transform lives, broaden perspectives, and create lasting connections. Our mission is to make meaningful travel experiences accessible to everyone through technology that inspires, informs, and delights.
            </p>
            <p className="text-xl text-center">
              By combining cutting-edge AR and AI with human expertise, we're creating tools that help travelers discover the perfect destinations, make informed decisions, and experience places more deeply than ever before.
            </p>
          </div>
        </div>
      </Section>
      
      <Section variant="default" spacing="xl">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Alex Rivera",
                title: "Founder & CEO",
                bio: "Former travel blogger with a passion for technology and user experience."
              },
              {
                name: "Mia Johnson",
                title: "Chief Technology Officer",
                bio: "AR/VR specialist with 15 years of experience in immersive technologies."
              },
              {
                name: "David Kim",
                title: "Head of AI Development",
                bio: "AI researcher focused on personalization and recommendation systems."
              },
              {
                name: "Sophie Martin",
                title: "Chief Experience Officer",
                bio: "Travel industry veteran dedicated to creating exceptional user journeys."
              }
            ].map((member, index) => (
              <Card key={index} variant="bordered" className="p-6">
                <div className="bg-gray-200 h-40 w-40 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <p className="text-gray-500 italic text-sm">Photo</p>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">{member.name}</h3>
                <p className="text-gray-600 text-center mb-3">{member.title}</p>
                <p className="text-center">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>
      
      <Section variant="primary" spacing="lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            We're always looking for passionate individuals to join our team and help shape the future of travel technology.
          </p>
          <button className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-lg transition-colors">
            View Career Opportunities
          </button>
        </div>
      </Section>
    </div>
  );
};

export default AboutPage;
