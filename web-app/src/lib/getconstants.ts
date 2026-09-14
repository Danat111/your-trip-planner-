// lib/getConstants.ts
import { TFunction } from "i18next";

export const getConstants = (t: TFunction) => ({
  SITE_NAME: t("SITE_NAME", "Your Trip Planner"),
  SITE_DESCRIPTION: t("SITE_DESCRIPTION", "Experience travel like never before with AR and AI."),

  NAV_ITEMS: [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.features"), path: "/features" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.blog"), path: "/blog" },
    { name: t("nav.contact"), path: "/contact" }
  ],

  HERO_FEATURES: [
    { id: "ar", name: t("hero.features.ar.name"), description: t("hero.features.ar.desc") },
    { id: "ai", name: t("hero.features.ai.name"), description: t("hero.features.ai.desc") },
    { id: "personalized", name: t("hero.features.personalized.name"), description: t("hero.features.personalized.desc") },
    { id: "offline", name: t("features.offline.name"), description: t("features.offline.desc") },
    { id: "collaborative", name: t("features.collaborative.name"), description: t("features.collaborative.desc") },
    { id: "secure", name: t("features.secure.name"), description: t("features.secure.desc") }
  ],

  FEATURES: [
    { id: "planning", name: t("features.planning.name"), description: t("features.planning.desc") },
    { id: "ar", name: t("features.ar.name"), description: t("features.ar.desc") },
    { id: "ai", name: t("features.ai.name"), description: t("features.ai.desc") },
    { id: "booking", name: t("features.booking.name"), description: t("features.booking.desc") },
    { id: "sharing", name: t("features.sharing.name"), description: t("features.sharing.desc") },
    { id: "offline", name: t("features.offline.name"), description: t("features.offline.desc") }
  ],

  AR_FEATURES: [
    { id: "destination", name: t("arFeatures.destination.name"), description: t("arFeatures.destination.desc") },
    { id: "room", name: t("arFeatures.room.name"), description: t("arFeatures.room.desc") },
    { id: "navigation", name: t("arFeatures.navigation.name"), description: t("arFeatures.navigation.desc") },
    { id: "landmark", name: t("arFeatures.landmark.name"), description: t("arFeatures.landmark.desc") }
  ],

  AI_FEATURES: [
    { id: "itinerary", name: t("aiFeatures.itinerary.name"), description: t("aiFeatures.itinerary.desc") },
    { id: "personalization", name: t("aiFeatures.personalization.name"), description: t("aiFeatures.personalization.desc") },
    { id: "prediction", name: t("aiFeatures.prediction.name"), description: t("aiFeatures.prediction.desc") },
    { id: "contextual", name: t("aiFeatures.contextual.name"), description: t("aiFeatures.contextual.desc") }
  ],

  ADDITIONAL_FEATURES: [
    { id: "accessibility", name: t("additional.accessibility.name"), description: t("additional.accessibility.desc") },
    { id: "sustainability", name: t("additional.sustainability.name"), description: t("additional.sustainability.desc") },
    { id: "budget", name: t("additional.budget.name"), description: t("additional.budget.desc") },
    { id: "social", name: t("additional.social.name"), description: t("additional.social.desc") },
    { id: "collaborative", name: t("features.collaborative.name"), description: t("features.collaborative.desc") },
    { id: "integration", name: t("additional.integration.name"), description: t("additional.integration.desc") }
  ],

  TESTIMONIALS: [
    { name: t("testimonials.items.0.name"), title: t("testimonials.items.0.title"), quote: t("testimonials.items.0.quote") },
    { name: t("testimonials.items.1.name"), title: t("testimonials.items.1.title"), quote: t("testimonials.items.1.quote") },
    { name: t("testimonials.items.2.name"), title: t("testimonials.items.2.title"), quote: t("testimonials.items.2.quote") }
  ],

  FAQS: [
    { question: t("faq.q1.q"), answer: t("faq.q1.a") },
    { question: t("faq.q2.q"), answer: t("faq.q2.a") },
    { question: t("faq.q3.q"), answer: t("faq.q3.a") },
    { question: t("faq.q4.q"), answer: t("faq.q4.a") },
    { question: t("faq.q5.q"), answer: t("faq.q5.a") },
    { question: t("faq.q6.q"), answer: t("faq.q6.a") }
  ],

  BLOG_POSTS: [
    {
      id: "ar-travel-revolution",
      title: t("blog.posts.0.title"),
      excerpt: t("blog.posts.0.excerpt"),
      category: t("blog.posts.0.category"),
      date: "2025-04-15",
      author: "Alex Rivera"
    },
    {
      id: "ai-personalization",
      title: t("blog.posts.1.title"),
      excerpt: t("blog.posts.1.excerpt"),
      category: t("blog.posts.1.category"),
      date: "2025-04-02",
      author: "Mia Johnson"
    },
    {
      id: "hidden-paris",
      title: t("blog.posts.2.title"),
      excerpt: t("blog.posts.2.excerpt"),
      category: t("blog.posts.2.category"),
      date: "2025-03-28",
      author: "Sophie Martin"
    },
    {
      id: "budget-travel-tips",
      title: t("blog.posts.3.title"),
      excerpt: t("blog.posts.3.excerpt"),
      category: t("blog.posts.3.category"),
      date: "2025-03-15",
      author: "Ryan Cooper"
    }
  ],

  CONTACT_INFO: {
    email: "hello@yourtripplanner.com",
    phone: "+1 (555) 123-4567",
    address: t("contact.address"),
    hours: t("contact.hours"),
    social: {
      twitter: "https://twitter.com/yourtripplanner",
      facebook: "https://facebook.com/yourtripplanner",
      instagram: "https://instagram.com/yourtripplanner",
      linkedin: "https://linkedin.com/company/yourtripplanner"
    }
  },

  FOOTER_LINKS: {
    quickLinks: [
      { name: t("footer.quick.home"), url: "/" },
      { name: t("footer.quick.about"), url: "/about" },
      { name: t("footer.quick.features"), url: "/features" },
      { name: t("footer.quick.pricing"), url: "/pricing" },
      { name: t("footer.quick.blog"), url: "/blog" }
    ],
    features: [
      { name: t("footer.features.ar"), url: "/features#ar-features" },
      { name: t("footer.features.ai"), url: "/features#ai-features" },
      { name: t("footer.features.trip"), url: "/features#planning" },
      { name: t("footer.features.offline"), url: "/features#offline" },
      { name: t("footer.features.group"), url: "/features#group" }
    ],
    legal: [
      { name: t("footer.legal.terms"), url: "/terms" },
      { name: t("footer.legal.privacy"), url: "/privacy" },
      { name: t("footer.legal.cookies"), url: "/cookies" },
      { name: t("footer.legal.accessibility"), url: "/accessibility" }
    ]
  }
});
