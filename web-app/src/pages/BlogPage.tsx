import * as React from "react";
import { Section } from "../components/ui/Section";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { getConstants } from "../lib/getconstants";
import { useTranslation } from "react-i18next";

const BlogPage: React.FC = () => {
  const { t } = useTranslation();
  const { BLOG_POSTS } = getConstants(t);
  return (
    <div>
      <Section variant="primary" spacing="xl">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Travel Insights & Inspiration
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto mb-12">
            Discover travel tips, technology insights, and destination guides from our team of experts.
          </p>
        </div>
      </Section>
      
      <Section variant="default" spacing="xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <Card key={post.id} variant="bordered" className="overflow-hidden">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <p className="text-gray-500 italic">Featured Image</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-sm font-medium text-blue-600">{post.category}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">By {post.author}</span>
                    <Button variant="link" size="sm">Read More</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-8">More Travel Inspiration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  id: "sustainable-travel",
                  title: "Sustainable Travel: Reducing Your Carbon Footprint",
                  excerpt: "Practical tips for eco-friendly travel without sacrificing experiences.",
                  category: "Sustainability",
                  date: "2025-03-10",
                  author: "Emma Rodriguez"
                },
                {
                  id: "family-destinations",
                  title: "Top Family-Friendly Destinations for 2025",
                  excerpt: "Discover perfect vacation spots that both parents and kids will love.",
                  category: "Family Travel",
                  date: "2025-02-28",
                  author: "David Kim"
                },
                {
                  id: "travel-photography",
                  title: "Capture the Moment: Travel Photography Tips",
                  excerpt: "Expert advice for taking stunning travel photos with any camera.",
                  category: "Photography",
                  date: "2025-02-15",
                  author: "Thomas Wilson"
                }
              ].map((post) => (
                <Card key={post.id} variant="bordered" className="overflow-hidden">
                  <div className="bg-gray-200 h-48 flex items-center justify-center">
                    <p className="text-gray-500 italic">Featured Image</p>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="text-sm font-medium text-blue-600">{post.category}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">By {post.author}</span>
                      <Button variant="link" size="sm">Read More</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="primary" size="lg">Load More Articles</Button>
          </div>
        </div>
      </Section>
      
      <Section variant="secondary" spacing="lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Get the latest travel tips, technology updates, and exclusive offers delivered straight to your inbox.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button variant="primary" size="lg">Subscribe</Button>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default BlogPage;
