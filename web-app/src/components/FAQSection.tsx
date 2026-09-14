import * as React from "react";
import { motion } from "framer-motion";
import { Section } from "./ui/Section";
import { getConstants } from "../lib/getconstants";
import { useTranslation } from "react-i18next";

const FAQSection: React.FC = () => {
  const { t } = useTranslation();
  const { FAQS } = getConstants(t);
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section variant="secondary" spacing="xl" id="faq">
      <div className="text-center mb-16">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-600 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Find answers to common questions about Your Trip Planner
        </motion.p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        {FAQS.map((faq, index) => (
          <motion.div
            key={index}
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div 
              className={`border rounded-lg overflow-hidden ${openIndex === index ? 'border-blue-500 shadow-md' : 'border-gray-200'}`}
            >
              <button
                className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-lg text-gray-900">{faq.question}</span>
                <span className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="p-4 pt-0 text-gray-600">
                  {faq.answer}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <p className="text-gray-600">
          Still have questions? <a href="#contact" className="text-blue-600 hover:text-blue-800 font-medium">Contact us</a>
        </p>
      </div>
    </Section>
  );
};

export default FAQSection;
