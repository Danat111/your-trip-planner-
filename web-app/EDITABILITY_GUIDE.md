# Your Trip Planner - Editability and Extension Guide

## Introduction

This guide provides detailed instructions on how to edit, extend, and maintain the 'Your Trip Planner' website. The project has been built with modularity and extensibility in mind, making it straightforward to add new features or modify existing ones.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Modifying Content](#modifying-content)
3. [Adding New Pages](#adding-new-pages)
4. [Extending Components](#extending-components)
5. [Styling Guidelines](#styling-guidelines)
6. [Adding New Features](#adding-new-features)
7. [State Management](#state-management)
8. [Deployment Process](#deployment-process)

## Project Structure

The project follows a modular structure that separates concerns and makes navigation intuitive:

```
your_trip_planner_new_app/
├── public/                  # Static assets and HTML template
├── src/                     # Source code
│   ├── assets/              # Images, fonts, and other static assets
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # Base UI components (Button, Card, etc.)
│   │   └── ...              # Feature-specific components
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
└── package.json             # Dependencies and scripts
```

## Modifying Content

### Website Text and Data

Most of the website content is centralized in the `src/lib/constants.ts` file. This makes it easy to update text, features, and other content without diving into component code:

```typescript
// src/lib/constants.ts
export const SITE_NAME = "Your Trip Planner";
export const SITE_DESCRIPTION = "Experience travel like never before...";

export const FEATURES = [
  {
    id: "planning",
    name: "Smart Trip Planning",
    description: "Create detailed itineraries with day-by-day activities..."
  },
  // Add or modify features here
];

// Other content sections follow the same pattern
```

To update content:
1. Open `src/lib/constants.ts`
2. Find the relevant section (FEATURES, AR_FEATURES, etc.)
3. Modify the text or add new items
4. Save the file and the changes will be reflected throughout the site

### Images and Assets

To update or add images:

1. Place new images in the `src/assets/` directory
2. Import and use them in components:

```typescript
import newImage from '../assets/new-image.jpg';

// Then in your component:
<img src={newImage} alt="Description" />
```

## Adding New Pages

To add a new page to the website:

1. Create a new file in the `src/pages/` directory:

```typescript
// src/pages/NewPage.tsx
import * as React from "react";
import { Section } from "../components/ui/Section";
import ResponsiveContainer from "../components/ui/ResponsiveContainer";

const NewPage: React.FC = () => {
  return (
    <div>
      <Section variant="primary" spacing="xl">
        <ResponsiveContainer>
          <h1 className="text-4xl font-bold text-center mb-6">
            New Page Title
          </h1>
          <p className="text-xl text-center mb-12">
            Page description goes here.
          </p>
        </ResponsiveContainer>
      </Section>
      
      {/* Add more sections as needed */}
    </div>
  );
};

export default NewPage;
```

2. Add the route in `src/App.tsx`:

```typescript
import NewPage from "./pages/NewPage";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Add your new route here */}
            <Route path="/new-page" element={<NewPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
```

3. Add a navigation link in `src/lib/constants.ts`:

```typescript
export const NAV_ITEMS = [
  { name: "Home", path: "/" },
  // Add your new page to navigation
  { name: "New Page", path: "/new-page" },
  // Other navigation items
];
```

## Extending Components

### Creating New UI Components

To create a new reusable UI component:

1. Create a new file in `src/components/ui/`:

```typescript
// src/components/ui/NewComponent.tsx
import * as React from "react";

interface NewComponentProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export const NewComponent: React.FC<NewComponentProps> = ({
  title,
  description,
  className = "",
  children,
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      {description && <p className="text-gray-600 mb-4">{description}</p>}
      {children}
    </div>
  );
};

export default NewComponent;
```

2. Use the component in your pages or other components:

```typescript
import NewComponent from "../components/ui/NewComponent";

// In your component or page:
<NewComponent 
  title="Component Title" 
  description="Optional description"
>
  <p>Additional content goes here</p>
</NewComponent>
```

### Creating Feature Components

For more complex feature components:

1. Create a new file in `src/components/`:

```typescript
// src/components/NewFeatureSection.tsx
import * as React from "react";
import { Section } from "./ui/Section";
import ResponsiveContainer from "./ui/ResponsiveContainer";

const NewFeatureSection: React.FC = () => {
  return (
    <Section variant="default" spacing="lg" id="new-feature">
      <ResponsiveContainer>
        <h2 className="text-3xl font-bold text-center mb-12">
          New Feature Title
        </h2>
        
        {/* Feature content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature details */}
        </div>
      </ResponsiveContainer>
    </Section>
  );
};

export default NewFeatureSection;
```

2. Add the component to the relevant page:

```typescript
import NewFeatureSection from "../components/NewFeatureSection";

// In your page component:
<NewFeatureSection />
```

## Styling Guidelines

### Using Tailwind CSS

The project uses Tailwind CSS for styling. To maintain consistency:

1. Use the predefined color classes that match the design system:
   - Primary colors: `text-blue-600`, `bg-blue-500`, etc.
   - Secondary colors: `text-gray-700`, `bg-gray-100`, etc.

2. Use the responsive prefixes for different screen sizes:
   - Mobile (default): `text-lg`
   - Tablet: `md:text-xl`
   - Desktop: `lg:text-2xl`

Example:
```html
<div className="text-lg md:text-xl lg:text-2xl text-blue-600">
  Responsive text that changes size on different devices
</div>
```

### Customizing the Theme

To modify the theme or add new design tokens:

1. Edit the `tailwind.config.js` file:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Add or modify colors
        primary: {
          500: '#3b82f6',
          // Add more shades
        },
      },
      // Add other theme customizations
    },
  },
  // Other Tailwind configuration
};
```

## Adding New Features

### AR Technology Features

To add a new AR feature:

1. Add the feature to the AR_FEATURES array in `src/lib/constants.ts`:

```typescript
export const AR_FEATURES = [
  // Existing features
  {
    id: "new-ar-feature",
    name: "New AR Feature",
    description: "Description of the new AR feature."
  },
];
```

2. Extend the ARVisualization component to support the new feature:

```typescript
// In src/components/ARVisualization.tsx
// Add a new case to the switch statement:

switch (mode) {
  // Existing cases
  case "new-ar-feature":
    return (
      <div className={className}>
        {/* New AR feature visualization */}
      </div>
    );
  // Default case
}
```

### AI Technology Features

Similarly, to add a new AI feature:

1. Add to the AI_FEATURES array in constants.ts
2. Extend the AIRecommendation component

## State Management

The project uses Redux for state management. To add new state features:

1. Create a new slice file:

```typescript
// src/lib/slices/newFeatureSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NewFeatureState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: NewFeatureState = {
  data: [],
  loading: false,
  error: null,
};

const newFeatureSlice = createSlice({
  name: 'newFeature',
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action: PayloadAction<any[]>) {
      state.data = action.payload;
      state.loading = false;
    },
    fetchError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchError } = newFeatureSlice.actions;
export default newFeatureSlice.reducer;
```

2. Add the reducer to the store:

```typescript
// src/lib/store.ts
import newFeatureReducer from './slices/newFeatureSlice';

export const store = configureStore({
  reducer: {
    // Existing reducers
    newFeature: newFeatureReducer,
  },
});
```

3. Use the state in components:

```typescript
import { useSelector, useDispatch } from 'react-redux';
import { fetchStart, fetchSuccess, fetchError } from '../lib/slices/newFeatureSlice';

// In your component:
const dispatch = useDispatch();
const { data, loading, error } = useSelector((state) => state.newFeature);

// Fetch data
React.useEffect(() => {
  const fetchData = async () => {
    dispatch(fetchStart());
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      dispatch(fetchSuccess(data));
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
  
  fetchData();
}, [dispatch]);
```

## Deployment Process

### Building for Production

To build the application for production:

```bash
npm run build
# or
pnpm run build
```

This will create a `dist` directory with optimized production files.

### Deploying to a Hosting Service

The built application can be deployed to various hosting services:

#### Netlify

1. Connect your repository to Netlify
2. Set the build command to `npm run build`
3. Set the publish directory to `dist`

#### Vercel

1. Connect your repository to Vercel
2. Vercel will automatically detect the React application and configure the build settings

#### GitHub Pages

1. Update the `base` property in `vite.config.ts` to match your repository name
2. Run `npm run build`
3. Deploy the `dist` directory to GitHub Pages

### Environment Variables

For environment-specific configuration:

1. Create `.env` files for different environments:
   - `.env` - Default environment variables
   - `.env.development` - Development-specific variables
   - `.env.production` - Production-specific variables

2. Access environment variables in your code:

```typescript
// Variables must be prefixed with VITE_
const apiUrl = import.meta.env.VITE_API_URL;
```

## Conclusion

This guide covers the fundamental aspects of editing and extending the 'Your Trip Planner' website. The modular architecture and clear separation of concerns make it straightforward to maintain and enhance the application as needed.

For additional assistance or questions about specific implementation details, refer to the comprehensive project documentation or reach out to the development team.
