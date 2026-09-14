# Your Trip Planner - Project Documentation

## Overview

This documentation provides a comprehensive guide to the 'Your Trip Planner' website project, a modern travel planning application that leverages cutting-edge AR and AI technologies to revolutionize how users plan, experience, and share their travel journeys.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Setup and Installation](#setup-and-installation)
3. [Core Features](#core-features)
4. [Component Documentation](#component-documentation)
5. [AR Technology Implementation](#ar-technology-implementation)
6. [AI Features Implementation](#ai-features-implementation)
7. [Customization Guide](#customization-guide)
8. [Deployment Instructions](#deployment-instructions)
9. [Extending the Application](#extending-the-application)

## Project Structure

The project follows a modern React application structure with TypeScript for type safety:

```
your_trip_planner_new_app/
├── public/                  # Static assets and HTML template
├── src/                     # Source code
│   ├── assets/              # Images, fonts, and other static assets
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # Base UI components (Button, Card, etc.)
│   │   ├── ARFeatureSection.tsx    # AR technology showcase
│   │   ├── AIFeatureSection.tsx    # AI capabilities showcase
│   │   ├── ARVisualization.tsx     # AR visualization component
│   │   ├── AIRecommendation.tsx    # AI recommendation component
│   │   └── ...              # Other components
│   ├── lib/                 # Utilities and shared code
│   │   ├── api.ts           # API service for network requests
│   │   ├── constants.ts     # Application constants and content
│   │   ├── hooks.ts         # Custom React hooks
│   │   ├── store.ts         # Redux store configuration
│   │   ├── theme.tsx        # Theme context and provider
│   │   └── utils.ts         # Utility functions
│   ├── pages/               # Page components
│   │   ├── HomePage.tsx     # Home page component
│   │   └── ...              # Other pages
│   ├── App.tsx              # Main application component
│   ├── index.css            # Global styles
│   └── main.tsx             # Application entry point
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
└── README.md                # Project readme
```

## Setup and Installation

To set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd your_trip_planner_new_app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   # or
   pnpm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   # or
   pnpm run build
   ```

## Core Features

The 'Your Trip Planner' website includes the following core features:

### 1. Modern, Responsive Design
- Fully responsive across mobile, tablet, and desktop devices
- Tailwind CSS for styling with custom design system
- Smooth animations and transitions using Framer Motion
- Dark mode support

### 2. AR Technology Features
- Destination Preview: Virtual exploration of destinations
- AR Room Visualization: Preview of hotel rooms and amenities
- Street-Level Navigation: AR overlays for walking directions
- Landmark Recognition: Information about landmarks when pointing camera

### 3. AI Capabilities
- Personalized Itinerary Generation: Custom travel plans based on preferences
- Smart Recommendations: AI-powered suggestions for activities and places
- Predictive Pricing: Price forecasts for flights and accommodations
- Contextual Awareness: Recommendations based on location, weather, and events

### 4. Additional Features
- Collaborative Trip Planning: Tools for group travel planning
- Budget Management: Financial tracking and optimization
- Sustainability Features: Eco-friendly travel options
- Accessibility Tools: Features for travelers with disabilities

## Component Documentation

### UI Components

#### Button
A versatile button component with multiple variants and sizes.

**Props**:
- `variant`: 'default' | 'outline' | 'ghost' | 'link'
- `size`: 'sm' | 'md' | 'lg'
- `className`: Additional CSS classes
- All standard button attributes

**Usage**:
```tsx
import { Button } from './components/ui/Button';

<Button variant="default" size="md">
  Get Started
</Button>
```

#### Card
A container component for displaying content in a card format.

**Props**:
- `variant`: 'default' | 'bordered'
- `className`: Additional CSS classes
- `children`: React nodes

**Usage**:
```tsx
import { Card } from './components/ui/Card';

<Card variant="bordered">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

#### Section
A layout component for creating consistent page sections.

**Props**:
- `variant`: 'default' | 'primary' | 'secondary'
- `spacing`: 'sm' | 'md' | 'lg' | 'xl'
- `className`: Additional CSS classes
- `children`: React nodes

**Usage**:
```tsx
import { Section } from './components/ui/Section';

<Section variant="primary" spacing="lg">
  <h2>Section Title</h2>
  <p>Section content goes here</p>
</Section>
```

### Feature Components

#### HeroSection
The main landing section of the homepage.

**Usage**:
```tsx
import HeroSection from './components/HeroSection';

<HeroSection />
```

#### FeaturesGrid
Displays the main features of the application in a grid layout.

**Usage**:
```tsx
import FeaturesGrid from './components/FeaturesGrid';

<FeaturesGrid />
```

#### ARFeatureSection
Showcases the AR technology features with interactive demonstrations.

**Usage**:
```tsx
import ARFeatureSection from './components/ARFeatureSection';

<ARFeatureSection />
```

#### AIFeatureSection
Highlights the AI capabilities with visual examples.

**Usage**:
```tsx
import AIFeatureSection from './components/AIFeatureSection';

<AIFeatureSection />
```

## AR Technology Implementation

The AR features are implemented using the `ARVisualization` component, which provides visual demonstrations of the AR capabilities:

### ARVisualization Component

**Props**:
- `mode`: 'destination' | 'room' | 'navigation' | 'landmark'
- `className`: Additional CSS classes

**Usage**:
```tsx
import ARVisualization from './components/ARVisualization';

<ARVisualization mode="destination" className="w-full max-w-md mx-auto" />
```

### AR Modes

1. **Destination Preview Mode**:
   Visualizes a destination with interactive information points.

2. **Room Visualization Mode**:
   Shows a hotel room with AR furniture placement and measurements.

3. **Navigation Mode**:
   Demonstrates street-level AR navigation with directional indicators.

4. **Landmark Recognition Mode**:
   Displays information about landmarks with interactive points.

## AI Features Implementation

The AI capabilities are implemented using the `AIRecommendation` component:

### AIRecommendation Component

**Props**:
- `type`: 'itinerary' | 'personalization' | 'prediction' | 'contextual'
- `className`: Additional CSS classes

**Usage**:
```tsx
import AIRecommendation from './components/AIRecommendation';

<AIRecommendation type="itinerary" className="w-full max-w-md mx-auto" />
```

### AI Recommendation Types

1. **Itinerary Generation**:
   Shows personalized travel itineraries based on user preferences.

2. **Personalization**:
   Displays user travel profile and preferences with recommendations.

3. **Price Prediction**:
   Visualizes price forecasts for flights and accommodations.

4. **Contextual Recommendations**:
   Shows recommendations based on location, weather, and local events.

## Customization Guide

### Modifying Content

Most of the website content is stored in the `constants.ts` file, making it easy to update without changing the code structure:

```tsx
// src/lib/constants.ts
export const SITE_NAME = 'Your Trip Planner';
export const SITE_DESCRIPTION = 'Plan your perfect trip with AR and AI technology';

export const FEATURES = [
  {
    id: 'ar-destination',
    name: 'AR Destination Preview',
    description: 'Explore destinations virtually before visiting',
    // ...
  },
  // ...
];

// Update these values to change the content throughout the site
```

### Styling Customization

The project uses Tailwind CSS for styling, with a custom theme defined in `tailwind.config.js`:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Customize the primary color palette
          500: '#3b82f6',
          // ...
        },
        // ...
      },
      // ...
    },
  },
  // ...
};
```

Global styles are defined in `index.css`, where you can add or modify CSS variables and custom styles.

## Deployment Instructions

### Building for Production

To build the application for production:

```bash
npm run build
# or
pnpm run build
```

This will create a `dist` directory with the production-ready files.

### Deploying to a Static Hosting Service

The built application can be deployed to any static hosting service:

1. **Netlify**:
   - Connect your repository to Netlify
   - Set the build command to `npm run build`
   - Set the publish directory to `dist`

2. **Vercel**:
   - Connect your repository to Vercel
   - Vercel will automatically detect the React application and configure the build settings

3. **GitHub Pages**:
   - Update the `base` property in `vite.config.ts` to match your repository name
   - Run `npm run build`
   - Deploy the `dist` directory to GitHub Pages

## Extending the Application

The application is designed to be easily extensible for adding new features or modifying existing ones.

### Adding New Pages

To add a new page:

1. Create a new file in the `src/pages` directory:
   ```tsx
   // src/pages/NewPage.tsx
   import * as React from 'react';
   
   const NewPage: React.FC = () => {
     return (
       <div>
         <h1>New Page</h1>
         {/* Page content */}
       </div>
     );
   };
   
   export default NewPage;
   ```

2. Add the route in `App.tsx`:
   ```tsx
   // src/App.tsx
   import NewPage from './pages/NewPage';
   
   function App() {
     return (
       <Router>
         <Routes>
           <Route path="/" element={<HomePage />} />
           <Route path="/new-page" element={<NewPage />} />
           {/* Other routes */}
         </Routes>
       </Router>
     );
   }
   ```

### Adding New Features

To add a new feature:

1. Create a new component in the `src/components` directory
2. Update the constants in `src/lib/constants.ts` if needed
3. Import and use the component in the relevant page or section

### Implementing Backend Integration

The application is prepared for backend integration with the `api.ts` service:

```tsx
// Example of adding an API endpoint
import api from '../lib/api';

// Function to fetch user trips
export const fetchUserTrips = async (userId: string) => {
  try {
    const response = await api.get(`/users/${userId}/trips`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user trips:', error);
    throw error;
  }
};
```

### Adding State Management

The application uses Redux for state management. To add a new feature to the Redux store:

1. Create a new slice file:
   ```tsx
   // src/features/trips/tripSlice.ts
   import { createSlice, PayloadAction } from '@reduxjs/toolkit';
   
   interface Trip {
     id: string;
     destination: string;
     startDate: string;
     endDate: string;
   }
   
   interface TripState {
     trips: Trip[];
     loading: boolean;
     error: string | null;
   }
   
   const initialState: TripState = {
     trips: [],
     loading: false,
     error: null,
   };
   
   const tripSlice = createSlice({
     name: 'trips',
     initialState,
     reducers: {
       // Reducers here
     },
   });
   
   export const { actions } = tripSlice;
   export default tripSlice.reducer;
   ```

2. Add the reducer to the store:
   ```tsx
   // src/lib/store.ts
   import tripReducer from '../features/trips/tripSlice';
   
   export const store = configureStore({
     reducer: {
       trips: tripReducer,
       // Other reducers
     },
     // ...
   });
   ```

This documentation provides a comprehensive guide to understanding, customizing, and extending the 'Your Trip Planner' website. The modular architecture and clear separation of concerns make it easy to maintain and enhance the application as needed.
